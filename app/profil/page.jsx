import { AlertDialogDemo } from "@/components/AlertDialogDemo";
import UpdateProfilForm from "@/components/forms/UpdateProfilForm";
import { Toaster } from "sonner";

const Home = async () => {
  return (
    <main>
      <Toaster richColors position="top-left" />
      <h1 className="bg-[#141414] text-white p-4">
        Modifier vos informations personnelles
      </h1>

      <section className="bg-[#141414] text-white min-h-screen flex items-center justify-center">
        <div className="bg-[#333333] rounded-lg w-full max-w-[600px] p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Profile</h1>
            <AlertDialogDemo />
          </div>
          <div className="flex flex-col">
            <UpdateProfilForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
