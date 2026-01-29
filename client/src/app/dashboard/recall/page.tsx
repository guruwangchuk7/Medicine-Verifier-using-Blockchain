
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Search, Loader2 } from "lucide-react"

export default function RecallManagementPage() {
    const [search, setSearch] = useState("")
    const [results, setResults] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Mock Search
        setTimeout(() => {
            setIsLoading(false);
            setResults([
                { id: "BATCH-8392", product: "Amoxicillin 500mg", mfg: "2025-10-15", status: "Active" },
                { id: "BATCH-9992", product: "Cough Syrup", mfg: "2025-11-01", status: "Active" },
            ].filter(b => b.id.toLowerCase().includes(search.toLowerCase()) || b.product.toLowerCase().includes(search.toLowerCase())))
        }, 1000);
    }

    const handleRecall = (id: string) => {
        // Mock Recall Action
        setResults(results.map(b => b.id === id ? { ...b, status: "RECALLED" } : b));
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold tracking-tight text-red-700 flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6" /> Recall Management
                </h2>
                <p className="text-muted-foreground">Search for batches and issue global recalls instantly.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Search Batches</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <Input
                            placeholder="Enter Batch ID or Product Name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="max-w-md"
                        />
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                            Search
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {results.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Batch ID</TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Mfg Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {results.map((batch) => (
                                    <TableRow key={batch.id}>
                                        <TableCell className="font-mono">{batch.id}</TableCell>
                                        <TableCell>{batch.product}</TableCell>
                                        <TableCell>{batch.mfg}</TableCell>
                                        <TableCell>
                                            <Badge variant={batch.status === 'Active' ? 'outline' : 'destructive'}>
                                                {batch.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {batch.status === 'Active' ? (
                                                <Button variant="destructive" size="sm" onClick={() => handleRecall(batch.id)}>
                                                    Issue Recall
                                                </Button>
                                            ) : (
                                                <span className="text-sm text-red-600 font-bold">RECALLED</span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
