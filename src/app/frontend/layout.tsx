// // app/(frontend)/layout.tsx
// "use client";

// import ClientLayout from "@/components/shared/ClientLayout";

// export default function FrontendLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return <ClientLayout>{children}</ClientLayout>;
// }
// //



// app/(frontend)/layout.tsx
// "use client";

// import ClientLayout from "@/components/shared/ClientLayout";
import ReactQueryProvider from "@/lib/reactQueryClient"; // ✅ import this!

// export default function FrontendLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <ReactQueryProvider> 
//       <ClientLayout>{children}</ClientLayout>
//     </ReactQueryProvider>
//   );
// }



// app/(frontend)/layout.tsx
import ClientLayout from "@/components/shared/ClientLayout";

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>

      <ClientLayout>{children}</ClientLayout>
    </ReactQueryProvider>

  );
}

