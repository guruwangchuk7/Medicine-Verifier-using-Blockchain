
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Filter } from "lucide-react"

export default function ReportsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight">Reports</h2>
                    <p className="text-muted-foreground">View and download analytics and compliance reports.</p>
                </div>
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export All
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="hover:bg-slate-50 transition-colors cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-medium">Production Summary</CardTitle>
                        <FileText className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Monthly breakdown of manufactured batches and quantities.</p>
                        <div className="text-sm font-bold text-primary">View Report &rarr;</div>
                    </CardContent>
                </Card>

                <Card className="hover:bg-slate-50 transition-colors cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-medium">Distribution Log</CardTitle>
                        <FileText className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Track where your shipments are going and delivery times.</p>
                        <div className="text-sm font-bold text-primary">View Report &rarr;</div>
                    </CardContent>
                </Card>

                <Card className="hover:bg-slate-50 transition-colors cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-medium">Compliance Audit</CardTitle>
                        <FileText className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">Generated blockchain logs for regulatory submission.</p>
                        <div className="text-sm font-bold text-primary">View Report &rarr;</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Generated Reports</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-sm text-muted-foreground flex items-center justify-center p-8 border border-dashed rounded-lg">
                        No reports generated this month.
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
