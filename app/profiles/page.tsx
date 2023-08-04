"use client";
import { redirect, useRouter } from "next/navigation";
import useCurrentUser from "../hooks/useCurrentUser";

const page = () => {
  const router = useRouter();
  const { data: user, isLoading } = useCurrentUser();
  if (isLoading) {
    return <div className="text-white text-3xl">Loading...</div>;
  }

  if (!user) {
    redirect("/auth");
  }

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is watching ?
        </h1>
        <div className="flex items-center justify-center mt-10 gap-8">
          <div onClick={() => {router.push('/')}}>
            <div className="group flex-row w-44 mx-auto">
              <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                <img src="/images/default-blue.png" alt="profile" />
              </div>
              <div className="mt-4 text-gray-400 text-3xl text-center group-hover:text-white capitalize">
                {user.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
