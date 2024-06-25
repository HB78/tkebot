import BackgroundVideoSignup from "@/components/backgroundVideo/BackgroundVideoSignup";
import SignupForm from "@/components/forms/SignupForm";
import tke from "@/public/tke.jpg";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authOptions } from "./../api/auth/[...nextauth]/route";

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (session || session?.user) {
    redirect("/tkebot");
  }
  const SignUpClasse = `flex min-h-full w-full flex-1 flex-col justify-center relative object-contain items-center px-6 lg:px-8 md:flex-row lg:flex-row lg:min-h-screen`;

  const backgroundClass = `absolute top-0 left-0 w-full h-full object-contain z-[-1]`;

  return (
    <main className={SignUpClasse}>
      <div className={backgroundClass}>
        <BackgroundVideoSignup />
      </div>
      <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm ">
        <Image
          height={56}
          width={56}
          className="mx-auto"
          src={tke}
          alt="Your Company"
        />
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 lg:text3xl lg:backdrop-blur-md">
          Sign up to your account
        </h1>
      </div>

      <div className="mt-10 w-full sm:mx-auto sm:w-full sm:max-w-sm ">
        {/* //ici le formulaire a mettre */}
        <SignupForm />
        <Link
          href="/login"
          className="bg-green-500 text-white font-bold py-2 px-4 rounded  float-right mt-4 hover:bg-green-300"
        >
          Sign in
        </Link>
      </div>
    </main>
  );
};

export default Home;
