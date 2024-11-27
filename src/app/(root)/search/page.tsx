import ProfileHeader from "@/components/profile/profile-header";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import Image from "next/image";
import UserCard from "@/components/cards/user-card";

export default async function page() {
  const user = await currentUser();
  if (!user) return;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // fetch Users
  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 30,
  });

  console.log(result);

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      {/* search bar */}

      {/* render all */}
      <div className="mt-14 flex flex-col gap-8">
        {result.users.length === 0 ? (
          <p className="no-result">No users </p>
        ) : (
          <>
            {result.users.map(({ name, id, unboarded, username,image })  => (
              <UserCard key={id} id={id} name={name} unboarded={unboarded} personType='User' image={image} username={username}/>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
