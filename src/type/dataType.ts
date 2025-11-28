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
}