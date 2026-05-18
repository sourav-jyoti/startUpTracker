import { Link, usePage } from '@inertiajs/react';
import { BookOpen, FolderGit2, LayoutGrid, ShieldCheck, Rocket, Search, Users } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import admin from '@/routes/admin';
import type { NavItem } from '@/types';

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const { url } = usePage();
    const isAdmin = auth.user?.is_admin;
    const isAdminRoute = url.startsWith('/admin') || window.location.pathname.startsWith('/admin');

    const mainNavItems: NavItem[] = isAdminRoute ? [
        {
            title: 'Admin Dashboard',
            href: '/admin/dashboard',
            icon: ShieldCheck,
        },
        {
            title: 'Manage Users',
            href: '/admin/users',
            icon: Users,
        },

    ] : [
        {
            title: 'Explore',
            href: '/',
            icon: Search,
        },
    ];

    if (!isAdminRoute && isAdmin) {
        mainNavItems.push({
            title: 'Admin Dashboard',
            href: admin.dashboard.url(),
            icon: ShieldCheck,
        });
    }

    const footerNavItems: NavItem[] = [
        {
            title: 'Documentation',
            href: 'https://laravel.com/docs/starter-kits#react',
            icon: BookOpen,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} label={isAdminRoute ? 'Administration' : 'Platform'} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
