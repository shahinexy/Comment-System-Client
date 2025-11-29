/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthContext } from "@/AuthProvider/AuthContext";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import { usePostSocket } from "@/Hooks/useSocketIo";
import { useContext } from "react";
import type { FieldValues } from "react-hook-form";

const CommentForm = ({
  postId,
//   onNewComment,
}: {
  postId: string;
//   onNewComment: (comment: TComment) => void;
}) => {
  const { token } = useContext(AuthContext) || {};

  const { postComment, comments } = usePostSocket("ws://localhost:2025", token!, postId);

  const handleCommentSubmit = (data: FieldValues) => {
    postComment(data.content);
  };
console.log(comments);
  // Listen for new comments from socket
//   useEffect(() => {

//     onNewComment(comments);
//     // Assuming your hook exposes 'comments' array or socket listener
//     // Adjust according to your usePostSocket hook
//     // postCommentHook.onNewComment(handleNewCommentFromSocket);

//   }, [comments]);

  return (
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
  );
};


export default CommentForm;
