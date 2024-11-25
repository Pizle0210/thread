"use server";
import { revalidatePath } from "next/cache";
import { Thread } from "../models/thread.model";
import { User } from "../models/user.model";
import { connectToDB } from "../mongoose";
import { toast } from "sonner";

export async function createThread({
  text,
  author,
  communityId,
  path,
}: {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}) {
  try {
    connectToDB();

    const createdThread = await Thread.create({
      text,
      author,
      community: null,
    });

    // update user model
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`could not update thread: ${error.message}`);
  }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  try {
    connectToDB();

    // calculate the number of posts to skip
    const skipAmount = (pageNumber - 1) * pageSize;

    //  Top-level threads (posts with no parents...)
    const postQuery = Thread.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      });

    const totalPostsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });
    const posts = await postQuery.exec();
    const isThereNextPage = totalPostsCount > skipAmount + posts.length;

    return { posts, isThereNextPage };
  } catch (error: unknown) {
    const errMsg =
      error instanceof Error ? error.message : `Couldn't fetch posts`;
    throw new Error(errMsg);
  }
}




export async function fetchThreadById(id: string) {
  connectToDB();
  try {
    const thread = await Thread.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author", //populates each child thread with its author
            model: User,
            select: "_id id name image parentId",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      })
      .exec();
    // return fetched thread to Thread page
    return thread;
  } catch (error: unknown) {
    const errMsg =
      error instanceof Error ? error.message : `Couldn't fetch threads`;
    toast.error(errMsg);
  }
}



export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  path: string,
) {
  connectToDB();

  try {
    // Find the original thread by its ID
    const originalThread = await Thread.findById(threadId);

    if (!originalThread) {
      throw new Error("Thread not found");
    }

    // Create the new comment thread
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId, // Set the parentId to the original thread's ID
    });

    // Save the comment thread to the database
    const savedCommentThread = await commentThread.save();

    // Add the comment thread's ID to the original thread's children array
    originalThread.children.push(savedCommentThread._id);

    // Save the updated original thread to the database
    await originalThread.save();

    revalidatePath(path);
  } catch (err) {
    console.error("Error while adding comment:", err);
    throw new Error("Unable to add comment");
  }
} 