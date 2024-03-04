import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";

export default async function Login() {
  noStore();
  const session = await getServerAuthSession();
  if (session?.user) {
    redirect("/dashboard");
  }
  const hello = await api.post.hello.query({
    text: "Please sign in to use the app.",
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-900 text-slate-800">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Customer <span className="text-[hsl(280,100%,70%)]">Journey</span>
        </h1>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-center text-2xl text-slate-800">
              <div>Welcome! Please sign in to use the app.</div>
            </div>
            <Button asChild variant="outline">
              <Link href="/api/auth/signin">"Sign in with Github"</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
