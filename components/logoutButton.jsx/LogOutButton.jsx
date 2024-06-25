"use client";
import { signOut } from "next-auth/react";

const LogOutButton = () => {
  return (
    // <form
    //   action={async () => {
    //     "use server";
    //     await signOut({ callbackUrl: "/" });
    //   }}
    // >
    // </form>
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={async () => {
        await signOut({ callbackUrl: "/" });
      }}
    >
      Sign Out
    </button>
  );
};

export default LogOutButton;
