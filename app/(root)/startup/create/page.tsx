import React from "react";
import StartupForm from "@/components/StartupForm";
import { auth } from "@/auth";
import { redirect, RedirectType } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/", RedirectType.replace);
  }

  return (
    <>
      <section className="pink_container min-h-[230px]!">
        <h1 className="heading"> Submit Your Business</h1>
      </section>
      <StartupForm />
    </>
  );
};

export default page;
