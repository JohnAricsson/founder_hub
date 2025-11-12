"use client";

import { LogOut } from "lucide-react";
import { signIn, signOut } from "next-auth/react";

interface AuthButtonProps {
  sessionExists: boolean;
}

export default function AuthButton({ sessionExists }: AuthButtonProps) {
  if (sessionExists) {
    return (
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="font-semibold cursor-pointer"
      >
        <span className="max-sm:hidden">Logout</span>
        <LogOut className="size-6 sm:hidden text-red-500" />
      </button>
    );
  } else {
    return (
      <button
        onClick={() => signIn("github")}
        className="font-semibold cursor-pointer"
      >
        Login
      </button>
    );
  }
}
