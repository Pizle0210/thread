import ThreadCard from "@/components/cards/thread-card";
import { fetchPosts } from "@/lib/actions/thread.action";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const User = await currentUser()
  console.log(User?.id );

  const result = await fetchPosts(1, 30)
  console.log(result);
  return (
    <div className="">
      <h1 className="head-text text-start">Home</h1>

      {/* posts */}
      <section className="mt-7 flex flex-col gap-10">
        {
          result.posts === null ? (
            <p className="no-result">No thread found</p>
          ) : (
            <>
              {
                result.posts.map(({ _id, text, author, createdAt,parentId,community, comment }) => (
                  <ThreadCard key={_id} id={_id} currentUserId={User?.id||""} parentId={parentId} content={text} author={author} community={community} createdAt={createdAt} comments={comment} />
                ))
              }
            </>
          )
        }
      </section>
    </div>
  );
}
currentUser

// _id: new ObjectId('672cbabf3eae43a9372c74a1'),
//   text: 'Trump baby, Omo iya mi jhoor!',
//     author: [Object],
//       community: null,
//         createdAt: 2024 - 11-07T12: 56: 51.138Z,