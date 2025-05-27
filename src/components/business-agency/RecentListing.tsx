"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockListings = [
  { title: "Luxury Villa", city: "Dubai", date: "2025-05-01" },
  { title: "Sea View Apartment", city: "Sharjah", date: "2025-05-02" },
  { title: "Penthouse", city: "Abu Dhabi", date: "2025-05-03" },
  { title: "Family House", city: "Dubai", date: "2025-05-04" },
  { title: "Studio Flat", city: "Ajman", date: "2025-05-05" },
];

export const RecentListing = ({ limit = 5 }: { limit?: number }) => {
  return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockListings.slice(0, limit).map((listing, idx) => (
              <TableRow key={idx}>
                <TableCell>{listing.title}</TableCell>
                <TableCell>{listing.city}</TableCell>
                <TableCell>{listing.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
  );
};
