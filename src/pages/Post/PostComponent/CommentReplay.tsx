/* eslint-disable react-hooks/set-state-in-effect */
import { useCommentReplies } from "@/api/post";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import type { FieldValues } from "react-hook-form";
import { formatDistanceToNow } from "date-fns";
import type { TCommentReply } from "@/type/dataType";
import { usePostSocket } from "@/Hooks/useSocketIo";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/AuthProvider/AuthContext";
import Loader from "@/components/common/Loader";

const CommentReplay = ({
  commentId,
  postId,
}: {
  commentId: string;
  postId: string;
}) => {
  const [replyList, setReplyList] = useState<TCommentReply[]>([]);
  const { data, isLoading } = useCommentReplies(commentId);
  const { token } = useContext(AuthContext) || {};

  const { postCommentReply, commentReply, setCommentReply } = usePostSocket(
    "ws://localhost:2025",
    token!,
    postId
  );

  useEffect(() => {
    setReplyList(data?.data);
  }, [data]);

  useEffect(() => {
    if (commentReply) {
      setReplyList((prev) => [...prev, commentReply]);
      setCommentReply(null);
    }
  }, [commentReply]);

  const handleCommentSubmit = (data: FieldValues) => {
    postCommentReply({ commentId: commentId, content: data.content });
  };

  if (isLoading) return <Loader />;
  return (
    <div className="relative">
      <div className="max-h-[500px] overflow-y-auto rounded-lg bg-white px-5 pt-1 pb-24 space-y-2">
        {replyList?.length < 1 && (
          <p className="text-center text-primary my-12 font-medium">
            No reply yet...
          </p>
        )}
        {replyList?.map((reply: TCommentReply) => (
          <div
            key={reply?.id}
            className="w-full border p-1 rounded-lg bg-gray-50 flex gap-3"
          >
            {reply.user.image ? (
              <img
                src={reply.user.image}
                alt={reply.user.fullName}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-lg">
                {reply.user.fullName[0].toUpperCase()}
              </div>
            )}

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{reply.user.fullName}</h4>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(reply.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <p className="text-gray-900">{reply.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-white border-t px-5 py-2">
        <MyFormWrapper
          onSubmit={handleCommentSubmit}
          className="flex justify-between gap-2"
        >
          <MyFormInput
            type="textarea"
            rows={1}
            name="content"
            placeholder="Type your reply..."
            className="flex-1"
            inputClassName="!py-3"
          />

          <div className="inline-block">
            <button
              type="submit"
              className="px-4 py-3 bg-primary text-white rounded-md hover:bg-secondary transition"
            >
              Reply
            </button>
          </div>
        </MyFormWrapper>
      </div>
    </div>
  );
};

export default CommentReplay;
