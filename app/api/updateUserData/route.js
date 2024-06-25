import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export const PUT = async (req) => {
  // je vais utiliser sessionpour la sécurité du site plus tard
  const session = await getServerSession(authOptions);
  try {
    if (!session || !session?.user) {
      return new NextResponse("vous n'êtes pas connecté", { status: 401 });
    }

    const body = await req.json();
    const { job, password, username } = body;

    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });

    if (session?.user?.id !== user.id) {
      return new NextResponse("vous n'avez pas les droits", { status: 403 });
    }

    if (!user) {
      return new NextResponse("cet utilisateur n'existe pas", {
        status: 404,
      });
    }

    // if (!job && !password && !username) {
    //   return new NextResponse("les champs sont vident", {
    //     status: 400,
    //   });
    // }

    // const userDataToUpdate = {};
    // if (job) {
    //   if (job.length > 50 || job.length < 2) {
    //     userDataToUpdate.job = job;
    //   }
    // }
   
    //   if (username.length > 50 || username.length < 2) {
    //     userDataToUpdate.username = username;
    //   }

    // if (password) {
    //   const hashPassword = bcrypt.hashSync(password, 10);
    //   userDataToUpdate.password = hashPassword;
    // }

    const hashPassword = bcrypt.hashSync(password, 10);

    const userUpdated = await prisma.user.update({
      where: { id: user.id },
      data: {
        username: !username ? user.username : username,
        job: !job ? user.job : job,
        password: !password ? user.password : hashPassword,
      },
    });
    // const stringifyUserUpdated = JSON.stringify(userUpdated);

    return NextResponse.json("utilisateur mis à jour avec succès", {
      message: "utilisateur mis à jour",
      status: 200,
    });
  } catch (error) {
    console.log("error:", error);
    return new NextResponse(
      "erreur du serveur dans la fonction update user route",
      {
        status: 500,
      }
    );
  }
};
