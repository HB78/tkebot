"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export function AlertDialogDemo() {
  //function to delete account
  const deleteProfil = async () => {
    // Add logic here to look up the user from the credentials supplied
    const res = await fetch("http://localhost:3000/api/deleteUser", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      console.log("res:", res);
      return res;
    }
    toast.success("Profil supprimé avec succès");
    const result = await res.json();
    console.log("result:", result);
    signOut({ callbackUrl: "/" });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-700">Delete account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Etes vous sur ?</DialogTitle>
          <DialogDescription>
            Attention cette action est irréversible et supprimera votre compte
            et toutes vos données.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => {
              deleteProfil();
            }}
          >
            Confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
