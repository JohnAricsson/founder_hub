import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import AuthButton from "./AuthButton"; // client component

const Navbar = async () => {
  const session = await auth();

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
                <span>Create</span>
              </Link>
              <AuthButton sessionExists={true} />
              <Link href={`/user/${session.id}`}>
                <span>{session.user.name}</span>
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
