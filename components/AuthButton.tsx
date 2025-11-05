"use client";

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
        Logout
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
