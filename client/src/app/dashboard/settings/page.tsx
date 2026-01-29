
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

export default function SettingsPage() {
    const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                setUser({
                    name: decoded.name || decoded.email.split('@')[0],
                    email: decoded.email,
                    role: decoded.role
                });
            } catch (e) {
                console.error("Invalid token", e);
            }
        }
    }, []);

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>

            <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-3 max-w-[400px]">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="mt-4 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your organization details and contact info.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name / Organization</Label>
                                <Input id="name" defaultValue={user?.name || "Loading..."} key={user?.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Contact Email</Label>
                                <Input id="email" defaultValue={user?.email || "Loading..."} disabled />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save Changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="security" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Password & Authentication</CardTitle>
                            <CardDescription>Manage your password and 2FA settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="current">Current Password</Label>
                                <Input id="current" type="password" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="new">New Password</Label>
                                <Input id="new" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Update Password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="notifications" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>Choose what alerts you want to receive.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground">Notification settings coming soon.</div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
