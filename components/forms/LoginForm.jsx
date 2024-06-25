"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import * as yup from "yup";

const LoginForm = () => {
  const labelClassNameLogin =
    "block text-sm font-medium leading-6 text-grey-900 lg:text-2xl";

  const inputClassNameLogin =
    "px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 lg:text-xl";

  const router = useRouter();
  //on créer le schéma de verification des input avec yup
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Entrez une adresse email valide")
      .required("Remplissez le champ 'Email'"),
    password: yup.string().required("Remplissez le champ 'Mot de passe'"),
  });
  //on créer les constante de validation des input avec react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data, e) => {
    try {
      e.preventDefault();
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (result?.error) {
        console.log("result?.error:", result?.error);
        console.log("result:", result);
        // Gérez l'erreur, par exemple affichez un message d'erreur
        toast.error("mauvais mot de passe ou email incorrecte");
        return;
      }
      toast.success("connexion réussie, vous allez etre redirigé");
      router.push("/tkebot");
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <form className="space-y-6" method="POST" onSubmit={handleSubmit(onSubmit)}>
      <Toaster richColors position="top-left" />
      <div>
        <label htmlFor="email" className={labelClassNameLogin}>
          Email
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="email"
            required
            {...register("email")}
            className={inputClassNameLogin}
          />
        </div>
        <small className="text-red-500">{errors.email?.message}</small>
      </div>
      <div>
        <label htmlFor="password" className={labelClassNameLogin}>
          Password
        </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            placeholder="password"
            required
            {...register("password")}
            className={inputClassNameLogin}
          />
        </div>
        <small className="text-red-500">{errors.email?.message}</small>
      </div>
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isSubmitting ? "Loading..." : "Sign in"}
        </button>
        <p className="text-md font-bold hover:text-blue-700 cursor-pointer">
          <Link href="/forgot-password">Forgot password ?</Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
