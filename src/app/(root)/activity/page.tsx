import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await currentUser();
  if (!user) return;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  // get Activity
  const activity = await getActivity(userInfo._id);
  console.log(activity);

  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="activity-card">
                  <div className="h-12 w-12 rounded-full">
                    <Image
                      src={activity.author.image}
                      alt="profile image"
                      aria-label="profile image"
                      width={20}
                      height={20}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                  <p className="!text-small-regular text-light-1 ">
                    {" "}
                    <span className="text-primary-500 mr-1">{activity.author.name}</span> replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="!text-body-medium text-light-3">No activity yet</p>
        )}
      </section>
    </section>
  );
}
