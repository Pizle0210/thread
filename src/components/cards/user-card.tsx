"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function UserCard({
  id,
  name,
  unboarded,
  username,
  image,
  personType,
}: {
  id: string;
  name: string;
  username: string;
  unboarded: boolean;
  image: string;
  personType: string;
}) {
  const router = useRouter();

  return (
    <article className="user-card">
      <div className="user-card_avatar">
        <div className="h-16 w-16 overflow-hidden rounded-full">
          <Image
            src={image}
            className="w-full rounded-full object-cover"
            alt="profile-image"
            aria-label="profile image"
            height={48}
            width={48}
          />
        </div>
        <div className="flex-1 text-ellipsis">
          <h4 className="text-body-semibold text-light-1">{name}</h4>
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div>
      <Button
        className="user-card_btn"
        onClick={() => router.push(`/profile/${id}`)}
        
      >
        View Handle
      </Button>
    </article>
  );
}
