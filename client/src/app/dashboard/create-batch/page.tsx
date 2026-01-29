
"use client"

import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Plus, Printer } from "lucide-react"

export default function CreateBatchPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [batchId, setBatchId] = useState<string | null>(null)

    // Mock submission
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API Call
        setTimeout(() => {
            setIsLoading(false)
            setBatchId(`BATCH-${Math.floor(Math.random() * 10000)}`)
        }, 1500)
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Create New Batch</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Batch Entry Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Batch Details</CardTitle>
                        <CardDescription>Enter the manufacturing details to register on blockchain.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form id="create-batch-form" onSubmit={onSubmit} className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="product">Product Name</Label>
                                <Input id="product" placeholder="e.g. Paracetamol 500mg" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="quantity">Quantity</Label>
                                    <Input id="quantity" type="number" placeholder="1000" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="batchNo">Batch No (Manual)</Label>
                                    <Input id="batchNo" placeholder="Optional" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="mfgDate">Mfg Date</Label>
                                    <Input id="mfgDate" type="date" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="expDate">Exp Date</Label>
                                    <Input id="expDate" type="date" required />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="factory">Factory Location</Label>
                                <Input id="factory" placeholder="e.g. Plant A, New York" />
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="ghost">Cancel</Button>
                        <Button type="submit" form="create-batch-form" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                            Register Batch
                        </Button>
                    </CardFooter>
                </Card>

                {/* QR Code Preview */}
                <Card className="flex flex-col items-center justify-center p-6 bg-slate-50">
                    {batchId ? (
                        <div className="flex flex-col items-center gap-6 text-center animate-in fade-in zoom-in duration-500">
                            <div className="p-4 bg-white rounded-xl shadow-sm border">
                                <QRCodeSVG
                                    value={`https://medsure.app/v/${batchId}`}
                                    size={200}
                                    level={"H"}
                                    includeMargin={true}
                                />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-bold text-lg text-green-600">Batch Registered Successfully!</h3>
                                <p className="text-sm font-mono text-muted-foreground">{batchId}</p>
                                <p className="text-xs text-muted-foreground">TxHash: 0x8a7...b29</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => window.print()}>
                                    <Printer className="mr-2 h-4 w-4" /> Print Label
                                </Button>
                                <Button onClick={() => setBatchId(null)}>
                                    Create Another
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground">
                            <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 mb-4 w-64 h-64 flex items-center justify-center mx-auto">
                                <span className="text-sm">QR Code will appear here</span>
                            </div>
                            <p className="text-sm">Fill the form to generate secure QR labels</p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    )
}
