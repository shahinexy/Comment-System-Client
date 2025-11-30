/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { usePostReact, useSinglePost } from "@/api/post";
import Loader from "@/components/common/Loader";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { RiMessage2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/AuthProvider/AuthContext";
import { IoIosArrowBack } from "react-icons/io";
import CommentForm from "./PostComponent/CommentForm";
import type { TPost } from "@/type/dataType";
import { updateReaction } from "@/utils/updateReaction";

const SinglePost = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext) || {};
  const postReactMutation = usePostReact();
  const { data, isLoading } = useSinglePost(id!);
  const [postData, setPostData] = useState<TPost | null>(null);
  console.log(postData);
  useEffect(() => {
    if (data?.data) {
      setPostData(data?.data);
    }
  }, [data]);

  const handleReaction = (postData: any, reactionType: "LIKE" | "DISLIKE") => {
    const updated = updateReaction(postData, user.id, reactionType);

    setPostData(updated);
    postReactMutation.mutate({ id: postData?.id, data: { reactionType } });
  };

  if (isLoading) return <Loader />;

  if (!postData) {
    return <p className="text-center mt-10">Post not found.</p>;
  }

  return (
    <div className="space-y-6">
      <Link to={"/"} className="flex items-center gap-1">
        <IoIosArrowBack /> Back
      </Link>
      <div className="bg-white p-5 rounded-lg">
        <div className="mt-4 flex items-center gap-3 mb-5">
          {postData?.user?.image ? (
            <img
              src={postData?.user.image}
              alt={postData?.user.fullName}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white">
              {postData?.user.fullName[0].toUpperCase()}
            </div>
          )}
          <p className="text-lg font-medium">{postData?.user.fullName}</p>
        </div>

        <p className="">{postData?.description}</p>

        {postData?.image && (
          <img
            src={postData?.image}
            alt="Post image"
            className="mt-3 rounded-lg w-full object-cover"
          />
        )}

        <div className="flex gap-4 mt-3 text-gray-500">
          <button
            onClick={() => handleReaction(postData, "LIKE")}
            className={`flex gap-1 items-center text-lg `}
          >
            <AiFillLike
              size={20}
              className={`${
                user?.id === postData?.viewerReaction?.userId &&
                postData?.viewerReaction?.reactionType === "LIKE"
                  ? "text-primary"
                  : "text-gray-300"
              }`}
            />{" "}
            {postData?.likeCount}
          </button>
          <button
            onClick={() => handleReaction(postData, "DISLIKE")}
            className="flex gap-1 items-center text-lg"
          >
            <AiFillDislike
              size={20}
              className={`${
                user?.id === postData?.viewerReaction?.userId &&
                postData?.viewerReaction?.reactionType === "DISLIKE"
                  ? "text-primary"
                  : "text-gray-300"
              }`}
            />{" "}
            {postData?.dislikeCount}
          </button>
          <span className="flex gap-1 items-center text-lg">
            <RiMessage2Line size={20} /> {postData?.commentCount}
          </span>
        </div>
      </div>

      <CommentForm postId={postData.id} />
    </div>
  );
};

export default SinglePost;
