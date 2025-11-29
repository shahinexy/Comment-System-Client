/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  usePostReact,
  usePosts,
  useUnauthenticatedUserPosts,
} from "@/api/post";
import { AuthContext } from "@/AuthProvider/AuthContext";
import Loader from "@/components/common/Loader";
import type { TPost } from "@/type/dataType";
import { useContext, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { RiMessage2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const PostList = () => {
  const [filterBy, setFilterBy] = useState<
    "mostLiked" | "mostDisliked" | "all"
  >("all");

  const { user } = useContext(AuthContext) || {};
  const postReactMutation = usePostReact();

  const privateQuery = usePosts(filterBy, user?.id);
  const publicQuery = useUnauthenticatedUserPosts(filterBy);

  const data = user ? privateQuery.data : publicQuery.data;
  const isLoading = user ? privateQuery.isLoading : publicQuery.isLoading;

  if (isLoading) return <Loader />;

  const posts = data?.data?.data;

  const handleReaction = (postData: any, reactionType: "LIKE" | "DISLIKE") => {
    postReactMutation.mutate(
      { id: postData?.id, data: { reactionType } }
    );
  };
  return (
    <div className="space-y-5">
      <div className="flex justify-end gap-3 mb-3">
        <button
          className={`px-3 py-1 rounded-md border ${
            filterBy === "mostLiked"
              ? "bg-primary text-white"
              : "bg-white text-black"
          }`}
          onClick={() => setFilterBy("mostLiked")}
        >
          Most Liked
        </button>

        <button
          className={`px-3 py-1 rounded-md border ${
            filterBy === "mostDisliked"
              ? "bg-primary text-white"
              : "bg-white text-black"
          }`}
          onClick={() => setFilterBy("mostDisliked")}
        >
          Most Disliked
        </button>

        <button
          className={`px-3 py-1 rounded-md border ${
            filterBy === "all" ? "bg-primary text-white" : "bg-white text-black"
          }`}
          onClick={() => setFilterBy("all")}
        >
          All
        </button>
      </div>

      {posts?.map((post: TPost) => (
        <div key={post.id} className="bg-white p-5 rounded-lg">
          <div className="mt-4 flex items-center gap-3 mb-5">
            {post.user.image ? (
              <img
                src={post.user.image}
                alt={post.user.fullName}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white">
                {post.user.fullName[0].toUpperCase()}
              </div>
            )}
            <p className="text-lg font-medium">{post.user.fullName}</p>
          </div>

          <p className="">{post.description}</p>

          {post.image && (
            <img
              src={post.image}
              alt="Post image"
              className="mt-3 rounded-lg w-full object-cover"
            />
          )}

          <div className="flex gap-4 mt-3 text-gray-500">
            <button
              onClick={() => handleReaction(post, "LIKE")}
              className={`flex gap-1 items-center text-lg `}
            >
              <AiFillLike
                size={20}
                className={`${
                  user?.id === post?.viewerReaction?.userId &&
                  post?.viewerReaction?.reactionType === "LIKE"
                    ? "text-primary"
                    : "text-gray-300"
                }`}
              />{" "}
              {post.likeCount}
            </button>
            <button
              onClick={() => handleReaction(post, "DISLIKE")}
              className="flex gap-1 items-center text-lg"
            >
              <AiFillDislike
                size={20}
                className={`${
                  user?.id === post?.viewerReaction?.userId &&
                  post?.viewerReaction?.reactionType === "DISLIKE"
                    ? "text-primary"
                    : "text-gray-300"
                }`}
              />{" "}
              {post.dislikeCount}
            </button>
            <Link
              to={`/post/${post?.id}`}
              className="flex gap-1 items-center text-lg"
            >
              <RiMessage2Line size={20} /> {post.commentCount}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
