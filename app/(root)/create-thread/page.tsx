import PostThread from "@/components/forms/PostThread";
import { fetchUserPosts } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();

  if(!user) return null;

  const userInfo = await fetchUserPosts(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">Create Thread</h1>

      <PostThread userId={userInfo._id} />
   </>
  )
}
export default Page;