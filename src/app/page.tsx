import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "Please sign in to use the app." });
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Customer <span className="text-[hsl(280,100%,70%)]">Journey</span>
        </h1>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session ? (<span>Logged in as {session.user?.name}</span>) : (<span>{hello ? hello.greeting : "Loading..."}</span>)}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div>

        <CrudShowcase />
        <Customers />
        <Posts />

      </div>
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}

async function Customers() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const data = await api.customer.getAll.query();

  return (
    <div className="w-full max-w-xs">
      {data?.map((customer) => (<div key={customer.id}>{customer.name}</div>))}
    </div>
  );
}

async function Posts() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const data = await api.post.getAll.query();

  return (
    <div className="w-full max-w-xs">
      {data?.map((post) => (<div key={post.id}>{post.name} - Created at {post.createdAt.toString()}</div>))}
    </div>
  );
}