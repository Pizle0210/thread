
import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function Page() {
  const user = await currentUser()
  if (!user) return;

  const userInfo = await fetchUser(user.id);
  console.log(userInfo._id);
  if (!userInfo?.onboarded) redirect('/onboarding')

  return (
    <>
      <h1 className="head-text mb-3">Create Thread</h1>

      <PostThread userId={userInfo._id} />
    </>
  )
}
