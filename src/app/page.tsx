import { unstable_noStore as noStore } from "next/cache";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  noStore();
  const session = await getServerAuthSession();
  if (session?.user ? redirect("/dashboard") : redirect("/login")) return <></>;
}
