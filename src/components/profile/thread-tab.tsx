import { fetchUserPost } from "@/lib/actions/thread.action";
import { redirect } from "next/navigation";
import React from "react";
import ThreadCard from "../cards/thread-card";

export default async function Threadtab({
  currentUserId,
  accountId,
  accountType,
}: {
  currentUserId: string;
  accountId: string;
  accountType: string;
}) {
  let result = await fetchUserPost(accountId);
  if (!result) redirect("/");

  console.log(result);

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === "User"
              ? {
                  name: result.name,
                  image: result.image,
                  id: result.id,
                }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  );
}
