"use server";

import { revalidatePath } from "next/cache";
import { User } from "../models/user.model";
import { connectToDB } from "../mongoose";
import { Thread } from "../models/thread.model";
import type { FilterQuery, SortOrder } from "mongoose";

// updating user
export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}): Promise<void> {
  try {
    connectToDB();
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }, //updates row if it exist in db && inserts a new row if specified value doesn't exist
    );

    if (path === "/profile/edit") revalidatePath(path);
  } catch (error: unknown) {
    const errMsg =
      error instanceof Error ? error.message : "An error has occured";
    throw new Error(errMsg);
  }
}

// fetching User

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({
      id: userId,
    });
    // .populate({
    // path: 'communities',
    // model: Community })
  } catch (error: unknown) {
    const errMsg =
      error instanceof Error
        ? error.message
        : `error encountered. could not fetch users`;
    throw new Error(errMsg);
  }
}

// fetch users post

export async function fetchUserPost(userId: string) {
  try {
    connectToDB();
    //find threads belonging to the userId
    const threads = await User.findOne({ id: userId }).populate({
      path: "threads",
      model: Thread,
      populate: {
        path: "children",
        model: Thread,
        populate: {
          path: "author",
          model: User,
          select: "name image id",
        },
      },
    });

    return threads;
  } catch (error: unknown) {
    const errMsg =
      error instanceof Error ? error.message : "Failed to fetch posts";
    throw new Error(errMsg);
  }
}

// fetch users

export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 30,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };

    if (searchString.trim() !== "") {
      query.$or = [
        {
          username: { $regex: regex },
        },
        {
          name: { $regex: regex },
        },
      ];
    }

    const sortOptions = { createdAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalUserCount = await User.countDocuments(query);
    const users = await usersQuery.exec();

    const isNext = totalUserCount > skipAmount + users.length;

    return { users, isNext };
  } catch (error) {
    const errMsg =
      error instanceof Error ? error.message : "Couldn't fetch users";
    throw new Error(errMsg);
  }
}

export async function getActivity(userId: string) {
  try {
    connectToDB();

    // find all threads by user
    const userThreads = await Thread.find({ author: userId });

     
    // collect all child thread ids(replies) from the children field
       const childThreadIds = userThreads.reduce((acc, userThread) => {
         return acc.concat(userThread.children);
       }, []);
    // replies of other users ignoring author's replies
    const replies = await Thread.find({
      _id: { $in: childThreadIds },
      author: { $ne: userId }, //  $ne = not
    }).populate({
      path: "author",
      model: User,
      select: "name image _id",
    });

    // return
    return replies;
  } catch (error: unknown) {
    const errMsg =
      error instanceof Error ? error.message : "Couldn't fetch activities";
    throw new Error(errMsg); 
  }
}
