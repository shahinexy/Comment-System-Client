/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePostComments } from "@/api/post";
import Pagination from "@/components/common/Pagination";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import MyFormInput from "@/components/form/MyFormInput";
import type { TComment } from "@/type/dataType";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

const PostComments = ({ id }: { id: string }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = usePostComments(id, 20, currentPage);

  const metaData = data?.data?.meta;
  const comments = data?.data?.data;

  const handleCommentSubmit = (formData: any) => {
    console.log("New comment:", formData);
    // call create comment API here
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      {/* Comment Form */}
      <div className="border p-4 rounded-lg bg-white mb-5">
        <MyFormWrapper onSubmit={handleCommentSubmit}>
          <MyFormInput
            type="textarea"
            rows={3}
            name="content"
            label="Write a comment"
            placeholder="Type your comment..."
          />

          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition"
          >
            Post Comment
          </button>
        </MyFormWrapper>
      </div>

      {/* Comment List */}
      <div className="space-y-4">
        {comments?.map((comment: TComment) => (
          <div
            key={comment.id}
            className="border p-4 rounded-lg bg-gray-50 flex gap-3"
          >
            {/* Avatar */}
            {comment.user.image ? (
              <img
                src={comment.user.image}
                alt={comment.user.fullName}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white text-lg">
                {comment.user.fullName[0].toUpperCase()}
              </div>
            )}

            {/* Comment Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-lg">{comment.user.fullName}</h4>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <p className="text-gray-700 mt-1">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {metaData?.total > 20 && (
        <div className="mt-4">
          <Pagination
            currentPage={metaData?.page}
            totalItem={metaData?.total}
            limit={20}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default PostComments;
