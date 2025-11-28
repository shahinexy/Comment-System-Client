// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { useUpdateDoctorApprovalStatusMutation } from "@/redux/features/doctor/doctor.api";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { RiDeleteBinLine } from "react-icons/ri";
// import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
// import { toast } from "sonner";

// interface ActionModalProps {
//   id: string;
//   type: "doctorApproval" | "user";
//   btn: "icon" | "btn";
//   message: string;
//   approvalStatus?: "APPROVED" | "PENDING" | "REJECTED";
// }

// const ActionModal = ({
//   id,
//   type,
//   btn,
//   message,
//   approvalStatus,
// }: ActionModalProps) => {
//   const [open, setOpen] = useState(false);
//   const [updateDoctorStatus] = useUpdateDoctorApprovalStatusMutation();
//   const router = useRouter();

//   const handleAction = async () => {
//     const toastId = toast.loading(
//       type === "user" ? "Deleting user..." : "Updating status..."
//     );

//     try {
//       let res;
//       if (type === "doctorApproval" && approvalStatus) {
//         res = await updateDoctorStatus({
//           id,
//           data: { approvalStatus },
//         }).unwrap();
//       } else if (type === "user") {
//         // res = await deleteUser(id).unwrap();
//       }

//       if (res?.data) {
//         toast.success(
//           type === "user"
//             ? "User deleted successfully!"
//             : "Status updated successfully!",
//           { id: toastId }
//         );
//         setOpen(false);
//         router.refresh();
//       } else {
//         toast.error("Something went wrong!", { id: toastId });
//       }
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to process request", {
//         id: toastId,
//       });
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       {btn === "icon" ? (
//         <DialogTrigger asChild>
//           <button
//             aria-label="Delete"
//             className="w-9 h-9 bg-[#FD10B620] hover:bg-[#FD10B640] transition-all 
//             rounded-full flex justify-center items-center group"
//           >
//             <RiDeleteBinLine className="text-xl text-primary group-hover:scale-110 transition-transform" />
//           </button>
//         </DialogTrigger>
//       ) : (
//         <DialogTrigger asChild>
//           <button
//             className={` ${
//               message === "Reject"
//                 ? "bg-secondary hover:bg-secondary/80"
//                 : "bg-primary hover:bg-[#e00e9f]"
//             } text-white py-2 px-6 
//             rounded-md font-medium transition-all shadow-sm hover:shadow-md w-full`}
//           >
//             {message}
//           </button>
//         </DialogTrigger>
//       )}

//       <DialogContent
//         className="max-w-[480px] !rounded-xl border border-gray-100 shadow-xl 
//         px-6 py-6 bg-white transition-all duration-200 ease-in-out"
//       >
//         <DialogHeader>
//           <DialogTitle>
//             <div className="flex items-start gap-6">
//               <div className="bg-secondary/10 p-2 rounded-full flex-shrink-0">
//                 <HiOutlineQuestionMarkCircle className="text-secondary text-3xl" />
//               </div>

//               <div className="flex flex-col justify-between space-y-4 w-full">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     Are you sure you want to proceed?
//                   </h3>
//                   <p className="text-sm text-gray-500">
//                     This action {type === "doctorApproval" ? "can" : "cannot"}{" "}
//                     be undone. Please confirm to continue.
//                   </p>
//                 </div>

//                 <div className="flex justify-end gap-3 pt-2">
//                   <button
//                     onClick={() => setOpen(false)}
//                     className="border border-gray-300 py-2 px-5 rounded-lg 
//                     text-gray-700 font-medium hover:bg-gray-100 transition-all"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleAction}
//                     className="bg-secondary hover:bg-secondary/80 text-white 
//                     py-2 px-6 rounded-lg font-medium transition-all shadow-sm hover:shadow-md"
//                   >
//                     Confirm
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </DialogTitle>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default ActionModal;
