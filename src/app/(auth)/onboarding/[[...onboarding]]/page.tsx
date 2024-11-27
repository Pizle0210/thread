import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import AccountProfile from "@/components/forms/AccountProfile";
export async function page() {
  const user = await currentUser();

  const userInfo = {};

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : (user.firstName ?? ""),
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20 max-sm:w-full">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile to use Threads
      </p>

      <section className="mt-9 rounded-md bg-dark-4 max-sm:p-10 sm:p-14">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}
