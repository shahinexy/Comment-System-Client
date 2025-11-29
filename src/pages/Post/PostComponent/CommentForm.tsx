/* eslint-disable react-hooks/set-state-in-effect */
import { AuthContext } from "@/AuthProvider/AuthContext";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import { usePostSocket } from "@/Hooks/useSocketIo";
import { useContext, useEffect, useState } from "react";
import type { FieldValues } from "react-hook-form";
import PostComments from "./PostComments";
import { usePostComments } from "@/api/post";
import Loader from "@/components/common/Loader";
import Pagination from "@/components/common/Pagination";
import type { TComment } from "@/type/dataType";

const CommentForm = ({ postId }: { postId: string }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [commentList, setCommentList] = useState<TComment[]>([]);
  const { token } = useContext(AuthContext) || {};
  const { postComment, comment, setComment } = usePostSocket(
    "ws://localhost:2025",
    token!,
    postId
  );
  
  const { data, isLoading } = usePostComments(postId, 10, currentPage);

  const metaData = data?.data?.meta;

  useEffect(() => {
    setCommentList(data?.data?.data);
  }, [data]);

  useEffect(() => {
    if (comment) {
      setCommentList(prev => [comment, ...prev]);
      setComment(null)
    }
  }, [comment]);

  const handleCommentSubmit = (data: FieldValues) => {
    postComment(data.content);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="">
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

      <PostComments commentList={commentList} />

      <div className="mt-4">
        <Pagination
          currentPage={metaData?.page}
          totalItem={metaData?.total}
          limit={10}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default CommentForm;
