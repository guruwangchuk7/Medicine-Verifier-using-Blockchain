
"use client"

import { useEffect, useState } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScanLine } from "lucide-react"

export default function ScanPage() {
    const router = useRouter()
    const [scanResult, setScanResult] = useState<string | null>(null)

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
        );

        scanner.render(onScanSuccess, onScanFailure);

        function onScanSuccess(decodedText: string, decodedResult: any) {
            // Handle the scanned code as you like, for example:
            console.log(`Code matched = ${decodedText}`, decodedResult);
            scanner.clear();
            setScanResult(decodedText);

            // Extract BatchID if it's a URL
            // Expected format: https://medsure.app/v/{batchId}
            if (decodedText.includes('/v/')) {
                const batchId = decodedText.split('/v/')[1];
                router.push(`/v/${batchId}`);
            } else {
                // Fallback for direct IDs
                router.push(`/v/${decodedText}`);
            }
        }

        function onScanFailure(error: any) {
            // handle scan failure, usually better to ignore and keep scanning.
            // for example:
            // console.warn(`Code scan error = ${error}`);
        }

        return () => {
            scanner.clear().catch(error => {
                console.error("Failed to clear html5-qrcode scanner. ", error);
            });
        }
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                        <ScanLine className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Scan Medicine QR</CardTitle>
                </CardHeader>
                <CardContent>
                    <div id="reader" className="w-full rounded-lg overflow-hidden border-2 border-slate-200"></div>
                    <p className="text-center text-sm text-muted-foreground mt-4">
                        Center the QR code within the frame to verify authenticity.
                    </p>
                    <div className="mt-4 flex justify-center">
                        <Button variant="outline" onClick={() => router.push('/')}>
                            Back to Home
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
