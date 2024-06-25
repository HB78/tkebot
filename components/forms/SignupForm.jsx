"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import * as yup from "yup";

const SignupForm = () => {
  const labelClassName =
    "block text-xl font-medium leading-6 text-gray-900 lg:text-md";

  const inputClassName =
    "px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 lg:text-xl";
  const router = useRouter();

  const schema = yup.object().shape({
    username: yup
      .string("entrez un nom valide")
      .required("remplissez le champs"),
    Job: yup.string("entrez un nom valide").required("remplissez le champs"),
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

  const onSubmit = async (data) => {
    console.log("data:", data);
    const res = await fetch(`http://localhost:3000/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
        job: data.Job,
      }),
    });
    if (res.ok) {
      toast.success("utilisateur crée avec succès");
      router.push("/login");
    } else {
      const errorResponse = await res.json();
      console.log(errorResponse, errors);
      toast.error(errorResponse);
    }
  };

  return (
    <form className="space-y-6" method="POST" onSubmit={handleSubmit(onSubmit)}>
      <Toaster richColors position="top-left" />
      <section>
        <>
          <label htmlFor="username" className={labelClassName}>
            Username
          </label>

          <input
            id="username"
            type="text"
            autoComplete="username"
            placeholder="username"
            className={inputClassName}
            {...register("username")}
          />
          <small className="text-red-500">{errors.username?.message}</small>
        </>
        <>
          <label htmlFor="Job" className={labelClassName}>
            Job
          </label>

          <input
            id="Job"
            type="text"
            autoComplete="Job"
            placeholder="Job"
            className={inputClassName}
            {...register("Job")}
          />
          <small className="text-red-500">{errors.Job?.message}</small>
        </>
        <>
          <label htmlFor="email" className={labelClassName}>
            Email address
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="email"
            {...register("email")}
            className={inputClassName}
          />
        </>
        <small className="text-red-500">{errors.email?.message}</small>

        <>
          <label htmlFor="password" className={labelClassName}>
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="password"
            autoComplete="current-password"
            className={inputClassName}
            {...register("password")}
          />
        </>
        <small className="text-red-500">{errors.password?.message}</small>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full justify-center mt-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isSubmitting ? "Loading..." : "Sign up"}
          </button>
        </div>
      </section>
    </form>
  );
};

export default SignupForm;
