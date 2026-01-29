
import { notFound } from "next/navigation"
import { ShieldCheck, AlertTriangle, XCircle, MapPin, Calendar, Box } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import Link from "next/link"

// Mock Data Fetcher (Replace with API call to NestJS Backend)
async function getBatchData(batchId: string) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock Database
    const mockDb: Record<string, any> = {
        "valid-batch": {
            status: "VALID",
            productName: "Amoxicillin 500mg",
            batchNumber: "BATCH-8392",
            manufacturer: "BioGen Pharma Ltd.",
            mfgDate: "2025-10-15",
            expDate: "2027-10-15",
            factoryLoc: "Plant 4, California, USA",
            chainHash: "0x7f83...92a1",
            events: [
                { date: "2025-10-15", event: "Manufactured", location: "California, USA" },
                { date: "2025-10-20", event: "Shipped to Distributor", location: "Nevada, USA" },
                { date: "2025-10-25", event: "Received by Pharmacy", location: "New York, USA" }
            ]
        },
        "recalled-batch": {
            status: "RECALLED",
            productName: "Cough Syrup Pediatric",
            batchNumber: "BATCH-9999",
            manufacturer: "MediCare Corp",
            reason: "Contamination detected in raw material verified on 2025-11-01"
        }
    }

    // Default to VALID for random IDs for demo purposes, unless specific keys used
    if (mockDb[batchId]) return mockDb[batchId];

    // Fallback Mock
    return {
        status: "VALID",
        productName: "Generic Ibuprofen 200mg",
        batchNumber: batchId,
        manufacturer: "Global Health Inc.",
        mfgDate: "2026-01-01",
        expDate: "2028-01-01",
        factoryLoc: "Zurich, Switzerland",
        chainHash: "0x3a1...f9b2",
        events: [
            { date: "2026-01-01", event: "Manufactured", location: "Zurich, CH" }
        ]
    }
}

export default async function VerificationResultPage({ params }: { params: { batchId: string } }) {
    const data = await getBatchData(params.batchId);

    if (!data) return notFound();

    return (
        <div className="min-h-screen bg-slate-50 p-4 flex items-center justify-center">
            <Card className="w-full max-w-lg shadow-xl border-t-8 border-t-transparent overflow-hidden"
                style={{ borderTopColor: data.status === 'VALID' ? '#22c55e' : (data.status === 'RECALLED' ? '#ef4444' : '#f59e0b') }}>

                {/* Status Header */}
                <div className={`p-8 flex flex-col items-center text-center gap-4 ${data.status === 'VALID' ? 'bg-green-50' :
                        data.status === 'RECALLED' ? 'bg-red-50' : 'bg-amber-50'
                    }`}>
                    {data.status === 'VALID' && (
                        <>
                            <div className="p-4 bg-green-100 rounded-full">
                                <ShieldCheck className="h-12 w-12 text-green-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-green-700">Verified Authentic</h1>
                                <p className="text-green-600/80 font-medium">Recorded on Blockchain</p>
                            </div>
                        </>
                    )}
                    {data.status === 'RECALLED' && (
                        <>
                            <div className="p-4 bg-red-100 rounded-full">
                                <XCircle className="h-12 w-12 text-red-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-red-700">WARNING: RECALLED</h1>
                                <p className="text-red-600/80 font-medium">Do not consume this product</p>
                            </div>
                        </>
                    )}
                </div>

                <CardContent className="space-y-6 pt-6">
                    {/* Product Details */}
                    <div className="grid gap-4">
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-muted-foreground">Product</span>
                            <span className="font-semibold">{data.productName}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-muted-foreground">Batch Number</span>
                            <span className="font-mono bg-slate-100 px-2 rounded">{data.batchNumber}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="text-muted-foreground">Manufacturer</span>
                            <span className="font-medium">{data.manufacturer}</span>
                        </div>
                    </div>

                    {/* Expiry Warning if applicable (Logic could be added) */}

                    {/* Supply Chain Timeline */}
                    <div className="space-y-4">
                        <h3 className="font-medium flex items-center gap-2">
                            <Box className="h-4 w-4" /> Supply Chain Journey
                        </h3>
                        <div className="relative border-l-2 border-slate-200 ml-2 space-y-6 pl-6 pb-2">
                            {data.events?.map((event: any, i: number) => (
                                <div key={i} className="relative">
                                    <div className="absolute -left-[31px] bg-white border-2 border-slate-300 rounded-full w-4 h-4 mt-1.5" />
                                    <div className="flex flex-col">
                                        <span className="font-medium text-sm">{event.event}</span>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                            <Calendar className="h-3 w-3" /> {event.date}
                                            <MapPin className="h-3 w-3 ml-2" /> {event.location}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3 bg-slate-50 p-6">
                    {data.status === 'VALID' ? (
                        <p className="text-xs text-center text-muted-foreground">
                            Blockchain Hash: <span className="font-mono">{data.chainHash}</span>
                        </p>
                    ) : (
                        <div className="w-full p-3 bg-red-100 text-red-800 text-sm rounded-md border border-red-200">
                            <strong>Recall Reason:</strong> {data.reason}
                        </div>
                    )}

                    <div className="flex gap-2 w-full mt-2">
                        <Link href="/scan" className="w-full">
                            <Button variant="outline" className="w-full">Scan Another</Button>
                        </Link>
                        {data.status !== 'VALID' && (
                            <Button variant="destructive" className="w-full">Report Issue</Button>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
