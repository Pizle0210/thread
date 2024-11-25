import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ThreadType = {
  id: string;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  createdAt: string;
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  parentId: string | null;
  currentUserId?: string;
};

export default function ThreadCard({
  id,
  content,
  author,
  createdAt,
  parentId,
  community,
  comments,
  currentUserId,
  isComment,
}: ThreadType) {
  return (
    <article
      className={cn(
        `flex w-full flex-col rounded-xl ${isComment ? "px-7" : "bg-dark-4 p-4 sm:p-7"}`,
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-3">
          <div className="flex flex-col items-center">
            <Link
              href={`/profile/${author?.id}`}
              className="relative h-12 w-12 sm:h-16 sm:w-16"
            >
              <Image
                src={author.image}
                alt="profile image"
                fill
                priority
                className="cursor-pointer rounded-full"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col space-y-2 sm:space-y-3">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h5 className="cursor-pointer text-base-semibold text-light-2">
                {author.name}
              </h5>
            </Link>

            <p className="text-small-regular text-gray-300">{content}</p>
            <div className="flex gap-3">
              <Image
                src={"/assets/heart-gray.svg"}
                height={26}
                width={26}
                priority
                alt="heart"
                className="cursor-pointer object-contain"
              />
              <Link href={`/thread/${id}`} className="">
                <Image
                  src={"/assets/reply.svg"}
                  height={26}
                  width={26}
                  priority
                  alt="reply"
                  className="cursor-pointer object-contain"
                />
              </Link>
              <Image
                src={"/assets/repost.svg"}
                height={26}
                width={26}
                priority
                alt="repost"
                className="cursor-pointer object-contain"
              />
              <Image
                src={"/assets/share.svg"}
                height={26}
                width={26}
                priority
                alt="share"
                className="cursor-pointer object-contain"
              />
            </div>

            {isComment && comments.length > 0 && (
              <Link href={`/thread/${id}`}>
                <p className="mt-1 text-gray-400">{comments.length} replies</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
