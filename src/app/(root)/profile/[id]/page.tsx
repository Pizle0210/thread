import ProfileHeader from "@/components/profile/profile-header";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import Image from "next/image";
import Threadtab from "@/components/profile/thread-tab";

export default async function page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return;

  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section>
      {/* Profile header */}
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
        username={userInfo.username}
      />

      <div className="mt-9">
        <Tabs value="threads" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>
                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium">
                    {userInfo?.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full text-light-1"
            >
              <Threadtab
                accountId={userInfo.id}
                accountType="User"
                currentUserId={user.id}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
