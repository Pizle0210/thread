"use server";

import { revalidatePath } from "next/cache";
import { User } from "../models/user.model";
import { connectToDB } from "../mongoose";

export async function updateUser<T>(
  userId: string,
  username: string,
  name: string,
  bio: string,
  image: string,
  path: string
): Promise<T | null | void> {
  connectToDB();

  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );
  
    if (path === "/profile/edit") revalidatePath(path);
    
  } catch (error:unknown) {
    const errMsg = error instanceof Error ? error.message : 'An error has occured'   
    throw new Error(errMsg)
  }
}
