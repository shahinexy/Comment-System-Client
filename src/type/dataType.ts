export type TUser = {
  fullName: string;
  image?: string | null;
};

export type TPost = {
  id: string;
  description: string;
  image?: string;
  user: TUser;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  createdAt: string;
  viewerReaction?: {
    reactionType: "LIKE" | "DISLIKE" | null;
    userId: string;
  };
};

export type TCommentUser = {
  id: string;
  fullName: string;
  image: string;
};

export type TComment = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  postId: string;
  user: TCommentUser;
};

export type TCommentReply = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  commentId: string;
  user: TCommentUser;
};
