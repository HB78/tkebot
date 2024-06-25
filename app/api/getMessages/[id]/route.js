import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req, { params }) => {
  console.log("params:", params);
  const { id } = params;
  console.log("id:", id);
  // je vais utiliser sessionpour la sécurité du site plus tard
  return NextResponse.json("Hello World", { status: 200 });
};
