import BackgroundPlayerVideo from "@/components/backgroundVideo/BackgroundPlayerVideo";
import Link from "next/link";
export const dynamic = "force-dynamic";

/* eslint-disable no-unused-vars */
const Home = () => {
  return (
    <main className="w-screen h-screen object-cover">
      <div className="overlay"></div>
      <div className="object-cover">
        <BackgroundPlayerVideo />
      </div>
      <section className="content">
        <h1 className="text-[2rem] text-center">
          Welcome to Thyssen Krump Elevator
        </h1>
        <nav className="w-full flex flex-col gap-8 items-center pt-[2.9rem]">
          <Link href="/login" className="content_button_authButton">
            Connexion
          </Link>
          {/* <Link to="/register" className="content_button_authButton">Inscription</Link> */}
        </nav>
      </section>
    </main>
  );
};

export default Home;
