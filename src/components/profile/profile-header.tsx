import Image from "next/image";
import React from "react";
type ProfileHeaderProps<T> = T & {
  accountId: string;
  authUserId: string;
  name: string;
  imgUrl: string;
  bio: string;
  username: string;
};

export default function ProfileHeader<T>({
  accountId,
  authUserId,
  name,
  imgUrl,
  bio,
  username,
}: ProfileHeaderProps<T>) {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              fill
              alt="profile image"
              className="rounded-full object-cover shadow-2xl"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-light-1">
              {name}
            </h2>
            <p className="text-base-medium text-gray-400">{username}</p>
          </div>
        </div>
      </div>

      {/* community */}

      {/* bio */}
      <p className="mt-5 max-w-lg text-base-regular text-white/60">{bio}</p>
      <div className="5 mt-12 h-0 w-full bg-dark-3" />
    </div>
  );
}
