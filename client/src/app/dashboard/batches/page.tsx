
"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function BatchesPage() {
    const batches = [
        { id: "BATCH-2023-001", product: "Paracetamol 500mg", quantity: 5000, date: "2025-10-15", status: "Active" },
        { id: "BATCH-2023-002", product: "Ibuprofen 200mg", quantity: 12000, date: "2025-10-20", status: "In Transit" },
        { id: "BATCH-2023-003", product: "Amoxicillin 250mg", quantity: 8500, date: "2025-11-01", status: "Active" },
        { id: "BATCH-2023-004", product: "Metformin 500mg", quantity: 3000, date: "2025-11-05", status: "Delivered" },
        { id: "BATCH-2023-005", product: "Amlodipine 5mg", quantity: 6000, date: "2025-11-12", status: "Recalled" },
    ]

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight">My Batches</h2>
                    <p className="text-muted-foreground">Manage and track your pharmaceutical production batches.</p>
                </div>
                <Link href="/dashboard/create-batch">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create New Batch
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Batch List</CardTitle>
                    <CardDescription>A list of all batches manufactured by your organization.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center mb-4">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search batches..."
                                className="pl-8"
                            />
                        </div>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Batch ID</TableHead>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Mfg Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {batches.map((batch) => (
                                <TableRow key={batch.id}>
                                    <TableCell className="font-medium">{batch.id}</TableCell>
                                    <TableCell>{batch.product}</TableCell>
                                    <TableCell>{batch.quantity.toLocaleString()}</TableCell>
                                    <TableCell>{batch.date}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                batch.status === "Active" ? "outline" :
                                                    batch.status === "Recalled" ? "destructive" :
                                                        "secondary"
                                            }
                                        >
                                            {batch.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">View</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
