

// 'use client';

// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { BarChart, Home, Users, FileText, DollarSign } from 'lucide-react';
// import PerformanceChart from '@/components/admin/PerformanceChart';
// import LatestInquiries from '@/components/admin/LatestInquiries';

// export default function AdminDashboard() {
//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-bold text-red-600">Admin Dashboard</h1>

//       {/* Stats Cards */}
//       <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
//         <Card className="hover:shadow-lg transition">
//           <CardHeader className="flex items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-gray-500">Total Properties</CardTitle>
//             <Home className="w-5 h-5 text-red-600" />
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-semibold">120</p>
//           </CardContent>
//         </Card>

//         <Card className="hover:shadow-lg transition">
//           <CardHeader className="flex items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
//             <Users className="w-5 h-5 text-red-600" />
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-semibold">45</p>
//           </CardContent>
//         </Card>

//         <Card className="hover:shadow-lg transition">
//           <CardHeader className="flex items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-gray-500">Reports</CardTitle>
//             <FileText className="w-5 h-5 text-red-600" />
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-semibold">8</p>
//           </CardContent>
//         </Card>

//         <Card className="hover:shadow-lg transition">
//           <CardHeader className="flex items-center justify-between pb-2">
//             <CardTitle className="text-sm font-medium text-gray-500">Revenue</CardTitle>
//             <DollarSign className="w-5 h-5 text-red-600" />
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-semibold">$12,000</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Activity + Chart Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Activities</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ul className="text-sm text-gray-600 space-y-2">
//               <li>🟢 New property added: "Luxury Villa"</li>
//               <li>🔄 Listing updated: "City Apartment"</li>
//               <li>👤 New user registered</li>
//               <li>📩 Message from contact form</li>
//             </ul>
//           </CardContent>
//         </Card>

//         <Card>
//          <CardHeader>
//             <CardTitle>Performance</CardTitle>
//           </CardHeader>
//           <CardContent className="h-full">
//             <PerformanceChart />
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }




'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Home, Users, FileText, DollarSign } from 'lucide-react';
import PerformanceChart from '@/components/admin/PerformanceChart';
import LatestInquiries from '@/components/admin/LatestInquiries';

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-red-600">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Properties</CardTitle>
            <Home className="w-5 h-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">120</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
            <Users className="w-5 h-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">45</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Reports</CardTitle>
            <FileText className="w-5 h-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">8</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Revenue</CardTitle>
            <DollarSign className="w-5 h-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">$12,000</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity + Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>🟢 New property added: "Luxury Villa"</li>
              <li>🔄 Listing updated: "City Apartment"</li>
              <li>👤 New user registered</li>
              <li>📩 Message from contact form</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            <PerformanceChart />
          </CardContent>
        </Card>
      </div>

      {/* Latest Inquiries Table */}
      <LatestInquiries />
    </div>
  );
}


