"use server";

import { revalidatePath } from "next/cache";
import { User } from "../models/user.model";
import { connectToDB } from "../mongoose";


// updating user
export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path
}:{userId: string,
  username: string,
  name: string,
  bio: string,
  image: string,
  path: string}): Promise<void> {
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
      { upsert: true } //updates row if it exist in db && inserts a new row if specified value doesn't exist
    );
  
    if (path === "/profile/edit") revalidatePath(path);
    
  } catch (error:unknown) {
    const errMsg = error instanceof Error ? error.message : 'An error has occured'   
    throw new Error(errMsg)
  }
}




// fetching User

export async function fetchUser(userId:string) {
  try {
    connectToDB()

    return await User.findOne({
      id:userId
    })
      // .populate({
      // path: 'communities',
      // model: Community })
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : `error encountered. could not fetch users`;
    throw new Error(errMsg)
    
  }
}