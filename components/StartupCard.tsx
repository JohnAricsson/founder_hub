import React from "react";
import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author: { _id: authorId, name },
    title,
    category,
    _id,
    image,
    description,
  } = post;
  return (
    <li className="startup-card group ">
      <div className="flex justify-between items-center">
        <p className="startup-card_date">{formatDate(post._createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 " />
          <span className="text-[16px]">{views}</span>
        </div>
      </div>
      <div className="flex-between  gap-5">
        <Link href={`/user/${authorId}`}>
          <p className="text-[16px] font-light line-clamp-1">{name}</p>
        </Link>
        <div className="flex-1 flex justify-between items-center">
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26 font-semibold line-clamp-1">{title}</h3>
          </Link>
          <Link href={`/user/${authorId}`}>
            <Image
              src="https://placehold.co/48x48"
              alt="Placeholder"
              width={48}
              height={48}
              className="rounded-full"
            />
          </Link>
        </div>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>

        <img src={image} className="startup-card_img rounded-3xl" />
      </Link>
      <div className="flex justify-between items-center gap-3 mt-5">
        <Link href={`/?query=${category.toLowerCase()}`}>
          <p className="text-[16px] font-medium">{category}</p>
        </Link>
        <Button className="startup-card-btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export default StartupCard;
