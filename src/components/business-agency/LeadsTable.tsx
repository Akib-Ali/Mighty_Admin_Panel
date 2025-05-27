"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockLeads = [
  { name: "Ali Khan", contact: "ali@example.com", date: "2025-05-01" },
  { name: "Sara Sheikh", contact: "sara@example.com", date: "2025-05-02" },
  { name: "Amit Verma", contact: "amit@example.com", date: "2025-05-03" },
  { name: "John Smith", contact: "john@example.com", date: "2025-05-04" },
  { name: "Fatima Noor", contact: "fatima@example.com", date: "2025-05-05" },
];

export const LeadsTable = ({ limit = 5 }: { limit?: number }) => {
  return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockLeads.slice(0, limit).map((lead, idx) => (
              <TableRow key={idx}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.contact}</TableCell>
                <TableCell>{lead.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      
  );
};
