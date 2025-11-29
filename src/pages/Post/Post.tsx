/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useSinglePost } from "@/api/post";
import Loader from "@/components/common/Loader";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { RiMessage2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/AuthProvider/AuthContext";
import { IoIosArrowBack } from "react-icons/io";
import CommentForm from "./PostComponent/CommentForm";

const SinglePost = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext) || {};

  const { data, isLoading } = useSinglePost(id!);

  if (isLoading) return <Loader />;

  const post = data?.data;

  return (
    <div className="space-y-6">
      <Link to={"/"} className="flex items-center gap-1">
        <IoIosArrowBack /> Back
      </Link>
      <div className="bg-white p-5 rounded-lg">
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
          <button className={`flex gap-1 items-center text-lg `}>
            <AiFillLike
              size={20}
              className={`${
                user?.id === post?.viewerReaction?.userId &&
                post?.viewerReaction?.reactionType === "LIKE"
                  ? "text-primary"
                  : "text-gray-400"
              }`}
            />{" "}
            {post.likeCount}
          </button>
          <button className="flex gap-1 items-center text-lg">
            <AiFillDislike
              size={20}
              className={`${
                user?.id === post?.viewerReaction?.userId &&
                post?.viewerReaction?.reactionType === "DISLIKE"
                  ? "text-primary"
                  : "text-gray-400"
              }`}
            />{" "}
            {post.dislikeCount}
          </button>
          <span className="flex gap-1 items-center text-lg">
            <RiMessage2Line size={20} /> {post.commentCount}
          </span>
        </div>
      </div>

      <CommentForm postId={post?.id}/>
    </div>
  );
};

export default SinglePost;
