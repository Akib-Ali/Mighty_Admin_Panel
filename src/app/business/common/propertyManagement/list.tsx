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
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { saveAs } from 'file-saver'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Header from './header'
import Link from "next/link";
// import { DeleteModal } from '@/components/common/deleteModal'
import { Switch } from "@/components/ui/switch";
import { getProperties } from '@/services/propertyService'
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from "@/components/ui/skeleton";
import { useCallback } from 'react'
import { deletePropertyById } from '@/services/propertyService'
import { toast, ToastContainer } from 'react-toastify';

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
]
const ITEMS_PER_PAGE = 15


const SkeletonRow = () => (
    <TableRow>
        {Array.from({ length: 9 }).map((_, idx) => (
            <TableCell key={idx}>
                <Skeleton className="h-4 w-full" />
            </TableCell>
        ))}
    </TableRow>
);


const PropertyManagementList = () => {

    const [mydata, setMyData] = useState(staticData)
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [sortField, setSortField] = useState('')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
    const [status, setStatus] = useState<"active" | "inactive">("active");

    const fetchProperties = useCallback(() => {
        return getProperties({
            page: currentPage,
            search,
            sortField,
            sortOrder,
            limit: ITEMS_PER_PAGE,
        });
    }, [currentPage, search, sortField, sortOrder]);

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["properties", currentPage, search, sortField, sortOrder],
        queryFn: fetchProperties,
        // keepPreviousData: true,
        // 👇 fallback to static data if API fails
        enabled: true,
    });

    const properties = data?.data || staticData;


    const dynamicpaginatedData = properties.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    console.log("dynamic data", dynamicpaginatedData)
    const filteredData = useMemo(() => {
        return mydata.filter(item =>
            item.location.toLowerCase().includes(search.toLowerCase())
        )
    }, [search, mydata])

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE
        return filteredData.slice(start, start + ITEMS_PER_PAGE)
    }, [filteredData, currentPage])

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)

    const handleSort = (field: keyof typeof staticData[0]) => {
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc'
        const sorted = [...mydata].sort((a, b) => {
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
        setMyData(sorted)
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
            <Header />

            <Card className="shadow-lg">
                <CardHeader className="flex justify-between">
                    <h1 className="text-2xl font-semibold">Property Managements</h1>
                </CardHeader>

                <CardContent className="overflow-auto min-h-[500px]">
                    <Table>
                        <TableHeader className="bg-rose-800 text-white">
                            <TableRow>
                                <TableHead>
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                                        onChange={toggleSelectAll}
                                        className="w-6 h-6 cursor-pointer bg-red-700"
                                    />
                                </TableHead>
                                {[
                                    { label: "Ref Id", icon: <MapPin />, field: "location" },
                                    { label: "Property Name", icon: <Home />, field: "readySale" },
                                    { label: "Category", field: "offPlan" },
                                    { label: "Location", icon: <Map />, field: "rent" },
                                    { label: "Rent", icon: <DollarSign />, field: "shortTermRent" },
                                    { label: "Status", field: "expiryDate" },
                                    { label: "Listing Validation", icon: <RefreshCcw />, field: "renewalDate" },
                                    { label: "Action", icon: <MoreHorizontal />, field: "actions" },
                                ].map(({ label, icon, field }) => (
                                    <TableHead key={field}>
                                        <Button
                                            variant="ghost"
                                            className="text-white hover:text-black"
                                            // onClick={() => handleSort(field)}
                                        >
                                            {icon} {label} <ArrowUpDown className="ml-1 h-3 w-3" />
                                        </Button>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>

                        {isLoading ? (
                            <TableBody>
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <SkeletonRow key={i} />
                                ))}
                            </TableBody>
                        ) : isError ? (
                            <p className="text-red-500 px-4 py-2">Failed to fetch properties. Showing fallback data.</p>
                        ) : paginatedData.length === 0 ? (
                            <p className="px-4 py-2">No Data Found</p>
                        ) : (
                            <TableBody>
                                {dynamicpaginatedData.map((item:any, index:number) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.has(item.location)}
                                                onChange={() => toggleRowSelection(item.location)}
                                                className="w-6 h-6 cursor-pointer"
                                            />
                                        </TableCell>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.location}</TableCell>
                                        <TableCell>{item.category}</TableCell>
                                        <TableCell>{item.location}</TableCell>
                                        <TableCell>{item.type}</TableCell>
                                        <TableCell>
                                            <Switch
                                                id={`status-switch-${item.id}`}
                                                checked={item.status === "ACTIVE"}
                                                onCheckedChange={(checked) => {
                                                    // Update the status dynamically
                                                    const newStatus = checked ? "ACTIVE" : "INACTIVE";

                                                    // Option 1: If you’re managing state
                                                    // updateStatus(item.id, newStatus);

                                                    // Option 2: If you're calling an API
                                                    // await updateStatusAPI(item.id, newStatus);
                                                }}
                                            />
                                        </TableCell>

                                        <TableCell>{item.furnishingStatus}</TableCell>
                                        <TableCell className="flex space-x-4">
                                            <Link href={`/business/agent/property-management/${22}`} aria-label="View" className="text-blue-600 hover:text-blue-800">
                                                <Eye size={18} />
                                            </Link>
                                            <Link href={`/business/agent/update-property/${item.id}`} aria-label="Edit" className="text-blue-600 hover:text-blue-800">
                                                <Edit size={18} />
                                            </Link>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <button
                                                        aria-label="Delete"
                                                        className="text-primary hover:text-red-800"
                                                    >
                                                        <Trash size={18} />
                                                    </button>
                                                </AlertDialogTrigger>

                                                <AlertDialogContent className="max-w-md">
                                                    <AlertDialogHeader className="flex flex-col items-center text-center space-y-4">
                                                        <div className="p-4 border-2 border-dashed border-primary rounded-full">
                                                            <Trash size={40} className="text-primary" />
                                                        </div>

                                                        <AlertDialogTitle className="text-xl font-semibold text-primary">
                                                            Are you absolutely sure?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription className="text-gray-600">
                                                            This action cannot be undone. This will permanently delete the item
                                                            from the system.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>

                                                    <AlertDialogFooter className="flex justify-center gap-4 mt-4">
                                                        <AlertDialogCancel className="px-4 py-2 rounded border">
                                                            Cancel
                                                        </AlertDialogCancel>

                                                        <AlertDialogAction
                                                            onClick={async () => {
                                                                try {
                                                                    await deletePropertyById(item.id); // ✅ send ID
                                                                    toast.success("Property deleted successfully");
                                                                    // Optionally: refresh list or re-fetch here
                                                                    refetch();

                                                                } catch (err) {
                                                                    toast.error("Failed to delete property");
                                                                    console.error(err);
                                                                }
                                                            }}
                                                            className="bg-primary text-white hover:bg-primary px-4 py-2 rounded"
                                                        >
                                                            Confirm Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        )}
                    </Table>
                </CardContent>
            </Card>

            <ToastContainer
                position="top-center"
                toastStyle={{ marginTop: '1rem' }}
            />
            {/* end table */}
        </div>
    )

}

export default PropertyManagementList