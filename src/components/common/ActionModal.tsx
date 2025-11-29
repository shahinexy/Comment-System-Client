import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useContext, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { toast } from "sonner";
import { AuthContext } from "@/AuthProvider/AuthContext";
import { usePostSocket } from "@/Hooks/useSocketIo";

const ActionModal = ({
  commentId,
  postId,
}: {
  commentId: string;
  postId: string;
}) => {
  const [open, setOpen] = useState(false);

    const { token } = useContext(AuthContext) || {};
    const { deleteComment } = usePostSocket(
      "ws://localhost:2025",
      token!,
      postId
    );
  const handleAction = async () => {
    const toastId = toast.loading("Deleting…");

    deleteComment({commentId, type: "comment" })

    toast.success("Deleted successfully", { id: toastId });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-red-900 hover:text-red-800 cursor-pointer transition-transform hover:scale-125">
        <RiDeleteBinLine size={15} />
      </DialogTrigger>

      <DialogContent className="max-w-[420px] rounded-xl border border-gray-200 shadow-lg px-6 py-6 bg-white animate-in fade-in duration-200">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="bg-red-100 p-3 rounded-full">
                <HiOutlineExclamationTriangle className="text-red-600 text-3xl" />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  Delete Comment?
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  This action is permanent and cannot be undone. Are you sure
                  you want to delete this comment?
                </p>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setOpen(false)}
                    className="border border-gray-300 py-2 px-4 rounded-lg 
                    text-gray-700 font-medium hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleAction}
                    className="bg-red-600 hover:bg-red-700 text-white 
                    py-2 px-5 rounded-lg font-medium transition-all shadow-sm hover:shadow-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ActionModal;
