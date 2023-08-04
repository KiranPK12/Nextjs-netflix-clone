import { redirect } from "next/navigation";
import getCurrentUser from "./actions/getCurrentUser";
import Navbar from "./components/Navbar/Navbar";
import Billboard from "./components/Billboard/Billboard";

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/auth");
  }
  return (
    <>
      <Navbar />
      <Billboard />
    </>
  );
}
