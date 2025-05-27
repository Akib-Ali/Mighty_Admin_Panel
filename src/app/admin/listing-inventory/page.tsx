
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
  Building2,
  DollarSign,
  Clock,
  CheckCircle,
  Download,
  Search,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { saveAs } from 'file-saver'

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

  return (
    <div className="p-4 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-primary">Listing Inventory</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by location..."
            className="border px-2 py-1 rounded-md text-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Button onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV    new 
          </Button>
          <Button onClick={exportToPDF}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF new
          </Button>
        </div>
      </div>

      <div className="rounded-lg border bg-white shadow">
        <Table>
          <TableHeader className="bg-rose-800 text-white">
            <TableRow>
              {[
                { label: 'Location', icon: <MapPin />, field: 'location' },
                { label: 'Ready Sale', icon: <Home />, field: 'readySale' },
                { label: 'Off-Plan', icon: <Building2 />, field: 'offPlan' },
                { label: 'Rent', icon: <DollarSign />, field: 'rent' },
                { label: 'Short Term Rent', icon: <Clock />, field: 'shortTermRent' },
                { label: 'Validation Rate', icon: <CheckCircle />, field: 'validationRate' },
              ].map(({ label, icon, field }) => (
                <TableHead key={field}>
                  <Button
                    variant="ghost"
                    className="text-white hover:text-black"
                    onClick={() => handleSort(field as keyof typeof staticData[0])}
                  >
                    {icon}
                    {label}
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.readySale}</TableCell>
                <TableCell>{item.offPlan}</TableCell>
                <TableCell>{item.rent}</TableCell>
                <TableCell>{item.shortTermRent}</TableCell>
                <TableCell>{item.validationRate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
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


