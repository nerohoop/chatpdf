import { Button } from "@/components/ui/button";
import { auth, UserButton } from "@clerk/nextjs";
import { ArrowRight, LogIn } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;

  return (
    <div className="w-screen min-h-screen bg-gradient-to-tr from-indigo-300 to-purple-400">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
            <UserButton afterSignOutUrl="/" />
          </div>

          {/* <div className="flex mt-2">{isAuth && <></>}</div> */}

          <p className="max-w-xl my-2 text-lg text-slate-600">
            Join millions of students, researchers and professinals to instantly
            anwer questions and understand research with AI
          </p>

          {isAuth ? (
            <h1>Logged In!</h1>
          ) : (
            <Link href="/sign-in">
              <Button>
                Login to get Started!
                <LogIn className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
