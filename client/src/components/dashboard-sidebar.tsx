"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Box, ScanLine, FileText, Settings, LogOut, Menu, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

interface SidebarProps {
    role?: string;
}

export function DashboardSidebar({ role = "Manufacturer" }: SidebarProps) {
    const pathname = usePathname()
    const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                // JWT payload: { email, sub, role, iat, exp }
                // We might need to fetch full profile or trust if backend includes name. 
                // Currently backend token payload is { email, sub, role }. 
                // Let's rely on stored user object if available, or fall back to token.
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                } else {
                    setUser({
                        name: decoded.email.split('@')[0], // Fallback name
                        email: decoded.email,
                        role: decoded.role || role
                    });
                }
            } catch (e) {
                console.error("Invalid token", e);
            }
        }
    }, [role]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }

    const links = [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "My Batches", href: "/dashboard/batches", icon: Box },
        { name: "Scan Shipment", href: "/dashboard/scan", icon: ScanLine },
        { name: "Recall Action", href: "/dashboard/recall", icon: AlertTriangle },
        { name: "Reports", href: "/dashboard/reports", icon: FileText },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ]

    return (
        <div className="flex h-full flex-col border-r bg-white w-64 hidden md:flex">
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                    <ScanLine className="h-6 w-6" />
                    <span>MedSure</span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-4">
                <nav className="grid items-start px-4 text-sm font-medium">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary hover:bg-muted ${pathname === link.href ? "bg-muted text-primary" : "text-muted-foreground"}`}
                        >
                            <link.icon className="h-4 w-4" />
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="mt-auto p-4">
                <Separator className="my-2" />
                <div className="flex items-center gap-3 px-2 py-2">
                    <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-medium truncate" title={user?.name}>{user?.name || "Guest"}</span>
                        <span className="text-xs text-muted-foreground truncate" title={user?.role}>{user?.role || role}</span>
                    </div>
                </div>
                <Button variant="ghost" className="w-full justify-start mt-2 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </div>
    )
}

export function MobileSidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden shrink-0">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <div className="flex items-center gap-2 font-bold text-xl text-primary mb-6">
                    <ScanLine className="h-6 w-6" />
                    <span>MedSure</span>
                </div>
                <nav className="grid gap-2 text-lg font-medium">
                    <Link href="/dashboard" className="flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link href="/dashboard/batches" className="flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                        <Box className="h-5 w-5" />
                        My Batches
                    </Link>
                    <Link href="/dashboard/scan" className="flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                        <ScanLine className="h-5 w-5" />
                        Scan Shipment
                    </Link>
                    <Link href="/dashboard/recall" className="flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                        <AlertTriangle className="h-5 w-5" />
                        Recall Action
                    </Link>
                    <Link href="/dashboard/reports" className="flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                        <FileText className="h-5 w-5" />
                        Reports
                    </Link>
                    <Link href="/dashboard/settings" className="flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                        <Settings className="h-5 w-5" />
                        Settings
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
    )
}
