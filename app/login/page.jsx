import BackgroundVideoLogin from "@/components/backgroundVideo/BackgroundVideoLogin";
import LoginForm from "@/components/forms/LoginForm";
import tke from "@/public/tke.jpg";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "./../api/auth/[...nextauth]/route";

/* eslint-disable no-unused-vars */
const Home = async () => {
  const session = await getServerSession(authOptions);
  if (session || session?.user) {
    redirect("/tkebot");
  }

  const LoginClasse =
    "relative flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8";
  const backgroundClass =
    //a la fin j'avais mis hidden et lg:block pour cacher la video en responsive mais je vais laisser comme ca pour le moment on verra si on le remet
    "absolute top-0 left-0 w-full h-screen object-cover z-[-1]";

  return (
    <main className={LoginClasse}>
      <div className={backgroundClass}>
        <BackgroundVideoLogin />
      </div>
      <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          priority
          width={56}
          height={56}
          className="mx-auto"
          src={tke}
          alt="Your Company"
        />
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 lg:text-4xl">
          Sign in to your account
        </h1>
      </div>

      <div className="mt-2 w-full sm:mx-auto sm:w-full sm:max-w-sm ">
        {/* plus haut le j'avais mis a l(origine un mt-10 mais je vais le mettre a 2 pour voir ce que ca donne) */}
        {/* //ici le formulaire a mettre */}
        <LoginForm />
        <Link
          href="/signup"
          className="bg-green-500 text-white font-bold py-2 px-4 rounded  float-right mt-4 hover:bg-green-300"
        >
          Signup
        </Link>
      </div>
    </main>
  );
};

export default Home;
