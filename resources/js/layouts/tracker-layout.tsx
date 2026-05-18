import { usePage } from '@inertiajs/react';
import CommandPalette from '@/components/tracker/command-palette';
import Sidebar from '@/components/tracker/sidebar';
import TopBar from '@/components/tracker/top-bar';

interface TrackerLayoutProps {
    children: React.ReactNode;
}

export default function TrackerLayout({ children }: TrackerLayoutProps) {
    const { props } = usePage();
    const availableSectors = (props.availableSectors as string[]) || [];
    const activeSector = (props.activeSector as string | null) || null;

    return (
        <div className="min-h-screen bg-background text-on-surface">
            <Sidebar />
            <div className="ml-[240px] flex flex-col min-h-screen">
                <TopBar
                    availableSectors={availableSectors}
                    activeSector={activeSector}
                />
                <main className="flex flex-1">{children}</main>
            </div>
            <CommandPalette />
        </div>
    );
}
