import { authOptions } from "@/lib/next-auth/auth";
import { getServerSession } from "next-auth";
import ProfilePage from "./_components";

const Page = async () => {
  const session = await getServerSession(authOptions);
  return <ProfilePage user={session?.user} />;
};

export default Page;
