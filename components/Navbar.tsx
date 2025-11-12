import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import AuthButton from "./AuthButton"; // client component
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
const Navbar = async () => {
  const session = await auth();
  //npx shadcn@latest add avatar
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/LogoText.png" alt="logo" width={300} height={200} />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>
              <AuthButton sessionExists={true} />
              <Link href={`/user/${session.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || "User Avatar"}
                  />
                  <AvatarFallback>
                    {session?.user?.name
                      ? session.user.name.slice(0, 2).toUpperCase()
                      : "AV"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <AuthButton sessionExists={false} />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
