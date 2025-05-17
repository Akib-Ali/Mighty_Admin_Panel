// 'use client';

// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// const inquiries = Array.from({ length: 20 }, (_, i) => ({
//   id: `INQ-${1000 + i}`,
//   user: `User ${i + 1}`,
//   property: `Property ${i + 1}`,
//   message: 'I am interested in this property.',
//   date: `2025-05-${(i % 30) + 1}`,
//   status: i % 2 === 0 ? 'New' : 'Seen',
// }));

// export default function LatestInquiries() {
//   return (
//     <Card className="w-full">
//       <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//         <CardTitle className="text-lg text-red-600">Latest Inquiries</CardTitle>
//         <Select>
//           <SelectTrigger className="w-[150px]">
//             <SelectValue placeholder="Filter" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="weekly">Weekly</SelectItem>
//             <SelectItem value="monthly">Monthly</SelectItem>
//             <SelectItem value="yearly">Yearly</SelectItem>
//           </SelectContent>
//         </Select>
//       </CardHeader>

//       <CardContent className="overflow-x-auto">
//         <table className="min-w-full text-sm text-left border border-gray-200">
//           <thead className="bg-gray-100 text-gray-700">
//             <tr>
//               <th className="p-3 border">Inquiry ID</th>
//               <th className="p-3 border">User</th>
//               <th className="p-3 border">Property</th>
//               <th className="p-3 border">Message</th>
//               <th className="p-3 border">Date</th>
//               <th className="p-3 border">Status</th>
//               <th className="p-3 border">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* {inquiries.map((inq, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 <td className="p-3 border">{inq.id}</td>
//                 <td className="p-3 border">{inq.user}</td>
//                 <td className="p-3 border">{inq.property}</td>
//                 <td className="p-3 border">{inq.message}</td>
//                 <td className="p-3 border">{inq.date}</td>
//                 <td className="p-3 border">
//                   <span
//                     className={`px-2 py-1 rounded text-xs font-medium ${
//                       inq.status === 'New'
//                         ? 'bg-red-100 text-red-600'
//                         : 'bg-green-100 text-green-600'
//                     }`}
//                   >
//                     {inq.status}
//                   </span>
//                 </td>
//                 <td className="p-3 border">
//                   <Button size="sm" variant="outline" className="text-red-600 border-red-500 hover:bg-red-100">
//                     View
//                   </Button>
//                 </td>
//               </tr>
//             ))} */}
//           </tbody>
//         </table>
//       </CardContent>
//     </Card>
//   );
// }



'use client';

import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from '@/components/ui/table'; // <-- Make sure this path is correct
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const inquiries = Array.from({ length: 20 }, (_, i) => ({
    id: `INQ-${1000 + i}`,
    user: `User ${i + 1}`,
    property: `Property ${i + 1}`,
    message: 'I am interested in this property.',
    date: `2025-05-${(i % 30) + 1}`,
    status: i % 2 === 0 ? 'New' : 'Seen',
}));

export default function LatestInquiries() {
    return (
        <Card className="w-full">
            <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <CardTitle className="text-lg text-red-600">Latest Inquiries</CardTitle>
                <Select>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>

            <CardContent className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Inquiry ID</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Property</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>INQ-1001</TableCell>
                            <TableCell>John Doe</TableCell>
                            <TableCell>3 BHK Apartment</TableCell>
                            <TableCell>I am interested in this property.</TableCell>
                            <TableCell>2025-05-10</TableCell>
                            <TableCell>
                                <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-600">
                                    New
                                </span>
                            </TableCell>
                            <TableCell>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 border-red-500 hover:bg-red-100"
                                >
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>INQ-1002</TableCell>
                            <TableCell>Jane Smith</TableCell>
                            <TableCell>Villa in Goa</TableCell>
                            <TableCell>Can I schedule a visit?</TableCell>
                            <TableCell>2025-05-11</TableCell>
                            <TableCell>
                                <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-600">
                                    Seen
                                </span>
                            </TableCell>
                            <TableCell>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 border-red-500 hover:bg-red-100"
                                >
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell>INQ-1003</TableCell>
                            <TableCell>Akash Mehta</TableCell>
                            <TableCell>Studio Apartment</TableCell>
                            <TableCell>Is this still available?</TableCell>
                            <TableCell>2025-05-12</TableCell>
                            <TableCell>
                                <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-600">
                                    New
                                </span>
                            </TableCell>
                            <TableCell>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-red-600 border-red-500 hover:bg-red-100"
                                >
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>

                </Table>
            </CardContent>
        </Card>
    );
}

