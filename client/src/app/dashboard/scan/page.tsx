
"use client"

import { useState, useEffect } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScanLine, PackageCheck, Loader2, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function ScanShipmentPage() {
    const [data, setData] = useState<string | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if (data) return; // Stop scanning if we have data

        const scanner = new Html5QrcodeScanner(
            "shipment-reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
            false
        );

        scanner.render((decodedText) => {
            scanner.clear();
            setData(decodedText.includes('/v/') ? decodedText.split('/v/')[1] : decodedText);
        }, (err) => { });

        return () => {
            scanner.clear().catch(e => console.error(e));
        }
    }, [data]);

    const handleReceive = async () => {
        setIsProcessing(true);
        // Simulate API call to backend to append 'RECEIVED' event to Blockchain
        setTimeout(() => {
            setIsProcessing(false);
            setSuccess(true);
        }, 2000);
    }

    const reset = () => {
        setData(null);
        setSuccess(false);
    }

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold tracking-tight">Scan Incoming Shipment</h2>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Scanner</CardTitle>
                        <CardDescription>Scan the QR code on the box to log it in the supply chain.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {!data ? (
                            <div id="shipment-reader" className="w-full rounded-lg overflow-hidden border-2 border-slate-200"></div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                                <div className="bg-green-100 p-4 rounded-full">
                                    <ScanLine className="h-8 w-8 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">Code Detected</h3>
                                    <p className="font-mono text-muted-foreground bg-slate-100 px-2 py-1 rounded mt-2">{data}</p>
                                </div>
                                <Button variant="ghost" size="sm" onClick={reset}>Scan Again</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Event Details</CardTitle>
                        <CardDescription>Confirm the details before logging to the blockchain.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label>Event Type</Label>
                            <Input value="RECEIVED_AT_DISTRIBUTOR" disabled />
                        </div>
                        <div className="grid gap-2">
                            <Label>Location Name</Label>
                            <Input value="Central Warehouse, NY" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Handler ID</Label>
                            <Input value="USER-8291 (You)" disabled />
                        </div>

                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg flex items-center gap-3">
                                <PackageCheck className="h-5 w-5" />
                                <div>
                                    <span className="font-bold block">Shipment Logged!</span>
                                    <span className="text-xs">TxHash: 0x19...b29</span>
                                </div>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        {!success ? (
                            <Button className="w-full" onClick={handleReceive} disabled={!data || isProcessing}>
                                {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MapPin className="mr-2 h-4 w-4" />}
                                Log Shipment receipt
                            </Button>
                        ) : (
                            <Button className="w-full" variant="outline" onClick={reset}>Process Next Item</Button>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
