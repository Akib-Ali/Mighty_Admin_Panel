// import type { Metadata } from "next";
// import { Poppins } from "next/font/google";
// import "./globals.css";


// // Import CSS for react-slick
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import ClientLayout from "@/components/shared/ClientLayout";
// // import { Provider } from 'react-redux';
// // import { store } from '@/redux/store';

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
//   display: "swap",
//   variable: "--font-poppins",
// });

// export const metadata: Metadata = {
//   title: "Mighty Warner Realty | Dubai’s #1 Property Management Experts",
//   description: "Mighty Warner Realty | Dubai’s #1 Property Management Experts",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className={poppins.variable}>
//       <body className="font-sans">
//         {/* <Provider store={store}> */}
//           <ClientLayout>{children}</ClientLayout>
//         {/* </Provider> */}
//       </body>
//     </html>
//   );
// }




// app/layout.tsx


import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactQueryProvider from "@/lib/reactQueryClient";
import LayoutWrapper from "@/components/shared/LayoutWrapper";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Mighty Warner Realty | Dubai’s #1 Property Management Experts",
  description: "Mighty Warner Realty | Dubai’s #1 Property Management Experts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  

  return (
    

    // <html lang="en" className={poppins.variable}>
    //   <body className="font-sans">
    //     <ReactQueryProvider>
    //       <LayoutWrapper>{children}</LayoutWrapper>
    //     </ReactQueryProvider>
    //   </body>
    // </html>

    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}