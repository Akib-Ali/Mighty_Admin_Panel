// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogFooter,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog"

// import { Trash } from "lucide-react"

// export function DeleteModal({
//   id,
//   onConfirm,
// }: {
//   id: string;
//   onConfirm: (id: string) => void;
// }) {

//   console.log("delete id in delete modal" , id)
//   return (
//     <AlertDialog>
//       <AlertDialogTrigger asChild>
//         <button
//           aria-label="Delete"
//           className="text-primary hover:text-red-800"
//         >
//           <Trash size={18} />
//         </button>
//       </AlertDialogTrigger>

//       <AlertDialogContent className="max-w-md">
//         <AlertDialogHeader className="flex flex-col items-center text-center space-y-4">
//           {/* Delete Icon with dashed border */}
//           <div className="p-4 border-2 border-dashed border-primary rounded-full">
//             <Trash size={40} className="text-primary" />
//           </div>

//           <AlertDialogTitle className="text-xl font-semibold text-primary">
//             Are you absolutely sure?
//           </AlertDialogTitle>
//           <AlertDialogDescription className="text-gray-600">
//             This action cannot be undone. This will permanently delete the item
//             from the system.
//           </AlertDialogDescription>
//         </AlertDialogHeader>

//         <AlertDialogFooter className="flex justify-center gap-4 mt-4">
//           <AlertDialogCancel className="px-4 py-2 rounded border">Cancel</AlertDialogCancel>
//           <AlertDialogAction
//             onClick={onConfirm}
//             className="bg-primary text-white hover:bg-primary px-4 py-2 rounded"
//           >
//             Confirm Delete
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   )
// }
