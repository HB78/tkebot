/* eslint-disable no-unused-vars */
import CreateFormForgotPassword from "@/components/forms/CreateFormForgotPassword";
import { Toaster } from "sonner";

const Home = () => {
  return (
    <main className="w-full h-screen relative">
      <Toaster richColors />
      <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
      <section className="fixed w-full px-4 py-24 z-50">
        <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
          <article className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-bold">Forgot Password</h1>
            <h2 className="text-green-600">
              Entrez l&apos;adresse email de votre compte
            </h2>
            <CreateFormForgotPassword />
          </article>
        </div>
      </section>
    </main>
  );
};

export default Home;
