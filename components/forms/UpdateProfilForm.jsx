"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";

export default function UpdateProfilForm() {
  const { data: session, update } = useSession();

  console.log("session:", session);

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  //on créer le schéma de verification des input avec yup
  const schema = yup.object().shape({
    name: yup.string("entrez un nom valide"),
    password: yup.string(),
    job: yup.string(),
  });

  //on créer les constante de validation des input avec react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //on créer la fonction de soumission du formulaire qui va mettre a jour le profil
  const updateProfil = async (data) => {
    // Add logic here to look up the user from the credentials supplied
    const res = await fetch("https://tkebot.vercel.app/api/updateUserData", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.name,
        job: data.job,
        password: data.password,
      }),
    });
    if (!res.ok) {
      console.log("res:", res);
      return res;
    }
    //en vrai je n'ai pas besoin de faire ça car j'utilise update
    // session.user.job = data?.job;

    //ce code est utile car il met a jour le token et la session coté server
    update({ username: data?.name, job: data?.job });

    toast.success("Profil mis à jour avec succès");
    const result = await res.json();
    return result;
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(updateProfil)}>
      <div className="flex flex-col">
        <label className="text-xl text-white font-bold" htmlFor="name">
          Name
        </label>
        <input
          className="p-3 my-2 bg-gray-700 rounded focus:border-red-500 focus:outline-none focus:border"
          id="name"
          placeholder={"name"}
          autoComplete="name"
          {...register("name")}
        />
        <small className="text-red-500">{errors.name?.message}</small>
      </div>
      <div className="flex flex-col font-bold">
        <label className="text-xl text-white" htmlFor="email">
          Job
        </label>
        <input
          className="p-3 my-2 bg-gray-700 rounded focus:border-red-500 focus:outline-none focus:border"
          id="job"
          type="text"
          placeholder={"job"}
          autoComplete="job"
          {...register("job")}
        />
        <small className="text-red-500">{errors.job?.message}</small>
      </div>
      <div className="relative flex flex-col font-bold">
        <label className="text-xl text-white" htmlFor="password">
          Password
        </label>
        <div className="flex w-full items-center">
          <input
            id="password"
            className="w-full p-3 my-2 bg-gray-700 rounded focus:border-red-500 focus:outline-none focus:border"
            placeholder="Password"
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
          />
          <small className="text-red-500">{errors.password?.message}</small>
          <button
            type="button"
            className="absolute right-0 mr-3"
            onClick={togglePassword}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        </div>
      </div>
      <div className="mt-8 flex justify-between gap-4">
        <Link
          href="/tkebot"
          className="bg-[#e50914] hover:bg-[#c10711] px-6 py-2 rounded-lg text-white font-semibold cursor-pointer"
        >
          Return to website
        </Link>
        <input
          type="submit"
          value={isSubmitting ? "Loading..." : "Save changes"}
          disabled={isSubmitting}
          className="bg-[#e50914] hover:bg-[#c10711] px-6 py-2 rounded-lg text-white font-semibold cursor-pointer"
        />
      </div>
    </form>
  );
}
