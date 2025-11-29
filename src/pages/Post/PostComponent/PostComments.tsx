import { usePostComments } from "@/api/post";
import Pagination from "@/components/common/Pagination";
import type { TComment } from "@/type/dataType";
import {  useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CommentReplay from "./CommentReplay";
import CommentForm from "./CommentForm";

const PostComments = ({ id }: { id: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // const [newComment, setNewComment] = useState({});
  // const [allComments, setAllComments] = useState<TComment[]>([]);

  const { data, isLoading } = usePostComments(id, 10, currentPage);

  const metaData = data?.data?.meta;
const comments = data?.data?.data
  // useEffect(() => {
  //   setAllComments(data?.data?.data);
  // }, [data]);

  // useEffect(() => {
  //   setAllComments([...allComments, newComment]);
  // }, [newComment]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      <CommentForm postId={id}  />

      {comments?.length < 1 && (
        <p className="text-center text-primary my-12 text-lg font-medium">
          No comment yet...
        </p>
      )}
      <div className="space-y-4">
        {comments?.map((comment: TComment) => (
          <div key={comment.id}>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="w-full border p-4 rounded-lg bg-gray-50 flex gap-3">
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

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-lg">
                        {comment.user.fullName}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-1">{comment.content}</p>
                    <p className="text-end text-xs text-gray-500">reply</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-white p-6 rounded-b-lg">
                  <CommentReplay commentId={comment?.id} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>

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

export default PostComments;
