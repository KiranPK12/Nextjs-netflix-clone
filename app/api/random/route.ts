import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await getCurrentUser();
    const movieCount = await prisma.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovies = await prisma.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return NextResponse.json(randomMovies[0]);
  } catch (error) {
    console.log(error);
  }
}
