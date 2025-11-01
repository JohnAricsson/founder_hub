import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY, STARTUPS_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from "markdown-it";
import ReactMarkdown from "react-markdown";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if (!post) return notFound();

  //to convert markdown pitch into HTML - npm install react-markdown
  return (
    <>
      <section className="pink_container min-h-[230px]!">
        <p className="tag tag-tri">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading max-w-5xl!">{post.description}</p>
      </section>
      <section className="section_container ">
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />
        <div
          className="space-y-5 mt-10 p-8 max-w-xs md:max-w-md mx-auto flex flex-col items-center 
                border-4 border-[#1A237E] rounded-xl ring-4 ring-[#FFC107] 
                bg-[#E8EAF6] shadow-xl"
        >
          <div className="flex w-full justify-between items-start gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-start"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-xl md:text-2xl font-medium text-[#000000]">
                  {post.author.name}
                </p>

                <p className="text-base font-medium text-[#000000]">
                  @{post.author.username}
                </p>
              </div>
            </Link>

            <p className="font-medium text-[16px] bg-[#E8EAF6] px-4 py-1 rounded-full text-[#000000]">
              {post.category}
            </p>
          </div>
        </div>
      </section>
      <div className="flex flex-col items-center mt-10 w-full px-4 sm:px-8">
        <h3 className="text-4xl font-bold text-[#1A237E] mb-6">
          Pitch Details
        </h3>
        <article className="prose prose-lg max-w-6xl w-full text-[#000000] prose-headings:text-[#1A237E] prose-p:font-normal prose-strong:font-semibold">
          <ReactMarkdown>{post?.pitch || "No details provided"}</ReactMarkdown>
        </article>
      </div>
      <section className="relative flex justify-end items-end">
        <Suspense fallback={<Skeleton />}>
          {" "}
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};
//npx shadcn@latest add Skeleton
export default page;
