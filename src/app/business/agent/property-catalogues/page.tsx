// File: ListingInventory.tsx
'use client'

import { useState, useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ArrowUpDown,
  MapPin,
  Home,
  Map,
  RefreshCcw,
  MoreHorizontal,
  DollarSign,
  Eye, Edit, Trash
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { saveAs } from 'file-saver'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import PropertyControls from './propetyControll'
import Link from "next/link";


const staticData = [
  {
    location: 'Dubai Marina',
    readySale: 12,
    offPlan: 8,
    rent: 30,
    shortTermRent: 5,
    validationRate: '92%',
  },
  {
    location: 'Palm Jumeirah',
    readySale: 5,
    offPlan: 4,
    rent: 20,
    shortTermRent: 8,
    validationRate: '88%',
  },
  {
    location: 'Downtown Dubai',
    readySale: 15,
    offPlan: 12,
    rent: 40,
    shortTermRent: 6,
    validationRate: '95%',
  },
  {
    location: 'Farrukhabad',
    readySale: 15,
    offPlan: 12,
    rent: 40,
    shortTermRent: 6,
    validationRate: '95%',
  },
  {
    location: 'Etah',
    readySale: 15,
    offPlan: 12,
    rent: 40,
    shortTermRent: 6,
    validationRate: '95%',
  },
  {
    location: 'Ghaziabad',
    readySale: 15,
    offPlan: 12,
    rent: 40,
    shortTermRent: 6,
    validationRate: '95%',
  },
  {
    location: 'Delhi',
    readySale: 15,
    offPlan: 12,
    rent: 40,
    shortTermRent: 6,
    validationRate: '95%',
  },
  {
    location: 'Noida',
    readySale: 15,
    offPlan: 12,
    rent: 40,
    shortTermRent: 6,
    validationRate: '95%',
  },
  {
    location: 'Ahemdabad',
    readySale: 15,
    offPlan: 12,
    rent: 40,
    shortTermRent: 6,
    validationRate: '95%',
  },
  {
    location: 'Gurgaon',
    readySale: 15,
    offPlan: 12,
    rent: 40,
    shortTermRent: 6,
    validationRate: '95%',
  },
  {
    location: 'Mumbai',
    readySale: 15,
    offPlan: 12,
    rent: 40,
    shortTermRent: 6,
    validationRate: '95%',
  },

  {
    location: 'Bangalore',
    readySale: 15,
    offPlan: 12,
    rent: 40,
    shortTermRent: 6,
    validationRate: '95%',
  },

  {
    location: 'Noida',
    readySale: 15,
    offPlan: 12,
    rent: 40,
    shortTermRent: 6,
    validationRate: '95%',
  },
  {
    location: 'Ahemdabad',
    readySale: 15,
    offPlan: 12,
    rent: 40,
    shortTermRent: 6,
    validationRate: '95%',
  },
  {
    location: 'Noida',
    readySale: 15,
    offPlan: 12,
    rent: 40,
    shortTermRent: 6,
    validationRate: '95%',
  },
  {
    location: 'Ahemdabad',
    readySale: 15,
    offPlan: 12,
    rent: 40,
    shortTermRent: 6,
    validationRate: '95%',
  },

]


const ITEMS_PER_PAGE = 15

const ListingInventory = () => {
  const [data, setData] = useState(staticData)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())


  const filteredData = useMemo(() => {
    return data.filter(item =>
      item.location.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, data])

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredData.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredData, currentPage])

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)

  const handleSort = (field: keyof typeof staticData[0]) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc'
    const sorted = [...data].sort((a, b) => {
      if (typeof a[field] === 'number') {
        return order === 'asc'
          ? (a[field] as number) - (b[field] as number)
          : (b[field] as number) - (a[field] as number)
      } else {
        return order === 'asc'
          ? String(a[field]).localeCompare(String(b[field]))
          : String(b[field]).localeCompare(String(a[field]))
      }
    })
    setSortField(field)
    setSortOrder(order)
    setData(sorted)
  }

  const exportToCSV = () => {
    const csvData = [
      ['Location', 'Ready Sale', 'Off-Plan', 'Rent', 'Short Term Rent', 'Validation Rate'],
      ...filteredData.map(item => [
        item.location,
        item.readySale,
        item.offPlan,
        item.rent,
        item.shortTermRent,
        item.validationRate,
      ]),
    ]

    const csvContent = csvData.map(e => e.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'listing_inventory.csv')
  }

  const exportToPDF = () => {
    const doc = new jsPDF()
    doc.text('Listing Inventory', 14, 10)
    autoTable(doc, {
      head: [['Location', 'Ready Sale', 'Off-Plan', 'Rent', 'Short Term Rent', 'Validation Rate']],
      body: filteredData.map(item => [
        item.location,
        item.readySale,
        item.offPlan,
        item.rent,
        item.shortTermRent,
        item.validationRate,
      ]),
    })
    doc.save('listing_inventory.pdf')
  }

  const toggleRowSelection = (location: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(location)) {
      newSelected.delete(location);
    } else {
      newSelected.add(location);
    }
    setSelectedRows(newSelected);
  };


  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // Select all
      setSelectedRows(new Set(paginatedData.map(item => item.location)));
    } else {
      // Deselect all
      setSelectedRows(new Set());
    }
  }



  return (
    <div className="space-y-4 p-4">
      {/* Top Action Card */}
      <PropertyControls />

      {/* Table Card */}
      <Card className="shadow-lg">
        <CardHeader className="flex justify-between">
          <h1 className="text-2xl font-semibold">Property Catalogue</h1>
        </CardHeader>
        <CardContent className="overflow-auto">
          <Table>
            <TableHeader className="bg-rose-800 text-white">
              <TableRow>
                <TableHead>
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    onChange={toggleSelectAll}
                    className="w-6 h-6 cursor-pointer bg-red-700"  // Tailwind classes to increase size and pointer cursor
                  />
                </TableHead>

                {
                  [
                    { label: 'Ref Id', icon: <MapPin />, field: 'location' },
                    { label: 'Property Title', icon: <Home />, field: 'readySale' },
                    { label: 'Category', field: 'offPlan' },
                    { label: 'Location', icon: <Map />, field: 'rent' },
                    { label: 'Rent', icon: <DollarSign />, field: 'shortTermRent' },
                    { label: 'Expiry Date', field: 'expiryDate' },
                    { label: 'Renewal Date', icon: <RefreshCcw />, field: 'renewalDate' },
                    { label: 'Action', icon: <MoreHorizontal />, field: 'actions' }
                  ]

                    .map(({ label, icon, field }) => (
                      <TableHead key={field}>
                        <Button
                          variant="ghost"
                          className="text-white hover:text-black"
                          onClick={() => handleSort(field as keyof typeof staticData[0])}
                        >
                          {icon} {label} <ArrowUpDown className="ml-1 h-3 w-3" />
                        </Button>
                      </TableHead>
                    ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedRows.has(item.location)}
                      onChange={() => toggleRowSelection(item.location)}
                      className="w-6 h-6 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.readySale}</TableCell>
                  <TableCell>{item.offPlan}</TableCell>
                  <TableCell>{item.rent}</TableCell>
                  <TableCell>{item.shortTermRent}</TableCell>
                  <TableCell>{item.validationRate}</TableCell>
                  <TableCell>24-22-2032</TableCell>

                  <TableCell className="flex space-x-4">
                    <Link
                      href={`/business/agent/property-catalogue/${22}`}
                      aria-label="View"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link
                      href={`/business/agent/update-property/${22}`}
                      aria-label="View"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </CardContent>
      </Card>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center pt-4">
        <p className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ListingInventory



