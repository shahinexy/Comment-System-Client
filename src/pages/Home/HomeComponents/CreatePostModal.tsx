/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePostCreate } from "@/api/post";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import type { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const CreatePostModal = () => {
  const [open, setOpen] = useState(false);
  const postMutation = usePostCreate();

  const handleSubmit = (data: FieldValues) => {
    const toastId = toast.loading("Uploading...");

    const formData = new FormData();

    formData.append("data", JSON.stringify({ content: data?.content }));

    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    postMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Uploaded successfully!", { id: toastId });
        setOpen(false);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Failed to upload", {
          id: toastId,
        });
        setOpen(false);
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full border border-primary bg-white text-primary font-medium rounded-full py-2 px-4 hover:bg-primary hover:text-white transition">
        Start a new post
      </DialogTrigger>

      <DialogContent className="max-w-md w-full max-h-[620px] overflow-y-auto rounded-xl p-6 bg-white shadow-lg text-black">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Upload Post
          </DialogTitle>
          <DialogDescription>
            Share your thoughts or upload an image
          </DialogDescription>
        </DialogHeader>

        <MyFormWrapper onSubmit={handleSubmit} className="space-y-2">
          <MyFormInput
            type="file"
            acceptType="image/*"
            name="image"
            label="Upload Image (optional)"
            className="border rounded-lg p-2 w-full"
            required={false}
          />

          <MyFormInput
            type="textarea"
            rows={4}
            name="content"
            label="Description"
            placeholder="Write something..."
            className="border rounded-lg p-2 w-full resize-none"
          />

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-secondary transition"
          >
           Publish Post
          </button>
        </MyFormWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
