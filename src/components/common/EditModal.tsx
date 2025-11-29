import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SquarePen } from "lucide-react";
import MyFormWrapper from "../form/MyFormWrapper";
import MyFormInput from "../form/MyFormInput";
import type { FieldValues } from "react-hook-form";
import { usePostSocket } from "@/Hooks/useSocketIo";
import { useContext, useState } from "react";
import { AuthContext } from "@/AuthProvider/AuthContext";

const EditModal = ({
  commentId,
  postId,
  defaultValue
}: {
  commentId: string;
  postId: string;
  defaultValue: string;
}) => {
  const [open, setOpen] = useState(false);
  const { token } = useContext(AuthContext) || {};
  const { updateComment } = usePostSocket(
    "ws://localhost:2025",
    token!,
    postId
  );

  const handleCommentSubmit = (data: FieldValues) => {
    updateComment({ commentId, content: data.content, type: "comment" });
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="text-primary hover:text-secondary cursor-pointer transition-transform hover:scale-125">
          <SquarePen size={14} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Comment</DialogTitle>
            <DialogDescription></DialogDescription>
            <MyFormWrapper
              onSubmit={handleCommentSubmit}
              className="flex justify-between gap-2 text-black"
              defaultValues={{content: defaultValue}}
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
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditModal;
