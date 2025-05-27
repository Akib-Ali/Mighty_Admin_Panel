import {
    Card,
    CardHeader,
    CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";

import { Slider } from "@/components/ui/slider";
import { PlusCircle, Download, Filter, ChevronDown, Trash2 } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const [search, setSearch] = useState("");
    // const [expiryDate, setExpiryDate] = useState(null);
    const [renewalDate, setRenewalDate] = useState(null);
    const [price, setPrice] = useState(5000);
    const [age, setAge] = useState(50);
    const [showDetails, setShowDetails] = useState(false);
    const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);


    const exportToCSV = () => { };
    const exportToPDF = () => { };
    const handleStatusFilter = () => { };
    const handleTypeFilter = () => { };
    const handleStatusUpdate = () => { };

    return (
        <Card className="shadow-lg">
            <CardHeader className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-4 items-center">
                    <Input
                        className="flex-grow md:max-w-xs"
                        placeholder="Search by ID, Title, Location"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />


                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowDetails(!showDetails)}
                        className="text-secondary bg-gray-200 hover:bg-gray-300"
                    >
                        <ChevronDown className={`transition-transform ${showDetails ? 'rotate-180' : ''}`} />
                    </Button>


                    <Button className="bg-secondary text-white">
                        <PlusCircle className="mr-2 w-4 h-4" /> Add Agent
                    </Button>
                    <Button onClick={exportToCSV} className="bg-primary text-white">
                        <Download className="mr-2 h-4 w-4" />Export CSV
                    </Button>
                    <Button onClick={exportToPDF} className="bg-secondary text-white">
                        <Download className="mr-2 h-4 w-4" />Export PDF
                    </Button>
                </div>
            </CardHeader>

            {showDetails && (
                <CardContent className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Filter By Status</p>
                        <Select onValueChange={handleStatusFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Filter By Type</p>
                        <Select onValueChange={handleTypeFilter}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="signature">Signature</SelectItem>
                                <SelectItem value="hot">Hot</SelectItem>
                                <SelectItem value="basics">Basics</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">Expiry Date</p>
                        {/* <DatePicker date={expiryDate} setDate={setExpiryDate} placeholder="Select expiry date" /> */}

                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">Renewal Date</p>
                        {/* <Calendar mode="single" selected={renewalDate} onSelect={setRenewalDate} className="rounded-md border" /> */}
                        {/* <DatePicker date={renewalDate} setDate={setRenewalDate} placeholder="Select renewal date" /> */}

                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">Price Range</p>
                        <Slider defaultValue={[price]} max={10000} step={100}
                        // onValueChange={setPrice}
                        />
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">Age Range</p>
                        <Slider defaultValue={[age]} max={100} step={1}
                        // onValueChange={setAge} 
                        />
                    </div>

                    {/* <Button variant="destructive">
                        <Trash2 className="mr-2 w-4 h-4" /> Delete
                    </Button> */}
                    <Button className="bg-primary">
                        <Trash2 className="mr-2 w-4 h-4" /> Delete
                    </Button>


                    <div className="flex items-center gap-2">
                        <Select onValueChange={handleStatusUpdate}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Update Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="bg-secondary text-white">Update</Button>
                    </div>
                </CardContent>
            )}
        </Card>
    );
}

