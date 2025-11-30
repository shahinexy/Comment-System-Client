import type { TPost } from "@/type/dataType";

export const updateReaction = (
  post: TPost,
  userId: string,
  reactionType: "LIKE" | "DISLIKE"
) => {
  if (!post) return post;

  const previous = post.viewerReaction;
  const updated = { ...post };

  if (!previous) {
    if (reactionType === "LIKE") updated.likeCount++;
    if (reactionType === "DISLIKE") updated.dislikeCount++;

    updated.viewerReaction = {
      reactionType,
      userId,
    };
  }

  else if (previous.reactionType === reactionType) {
    if (reactionType === "LIKE") updated.likeCount--;
    if (reactionType === "DISLIKE") updated.dislikeCount--;

    updated.viewerReaction = null;
  }

  else {
    if (reactionType === "LIKE") {
      updated.likeCount++;
      updated.dislikeCount--;
    } else {
      updated.dislikeCount++;
      updated.likeCount--;
    }

    updated.viewerReaction = {
      reactionType,
      userId,
    };
  }

  return updated;
};
