 import ThreadCard from "@/components/cards/thread-card";
import { fetchPosts } from "@/lib/actions/thread.action";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const User = await currentUser();

  const result = await fetchPosts(1, 30);
  console.log(result);
  return (
    <div className="">
      <h1 className="head-text text-start">Threads</h1>

      {/* posts */}
      <section className="mt-7 flex flex-col gap-6">
        {result.posts === null ? (
          <p className="no-result">No thread found</p>
        ) : (
          <>
            {result.posts.map(
              ({
                _id,
                text,
                author,
                createdAt,
                parentId,
                community,
                children,
              }) => (
                <ThreadCard
                  key={_id}
                  id={_id}
                  currentUserId={User?.id || ""}
                  parentId={parentId}
                  content={text}
                  author={author} 
                  community={community}
                  createdAt={createdAt}
                  comments={children}
                />
              ),
            )}
          </>
        )}
      </section>
    </div>
  );
}
