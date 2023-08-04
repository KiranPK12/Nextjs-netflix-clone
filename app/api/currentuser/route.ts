import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    return NextResponse.json(currentUser);
  } catch (error) {
    console.log(error);
  }
}



