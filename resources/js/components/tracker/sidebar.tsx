import { Link, usePage } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';

const authNavItems = [
    { name: 'Add Startup', icon: 'add_circle', href: '/startups/create' },
];

export default function Sidebar() {
    const { url, props } = usePage();
    const user = props.auth?.user ?? null;

    const navItems = [
        { name: 'Explore', icon: 'explore', href: '/explore' },
        ...(user ? [
            { name: 'Submissions', icon: 'rocket_launch', href: '/explore?tab=submissions' },
            { name: 'Watchlist', icon: 'bookmark', href: '/explore?tab=watchlist' },
        ] : []),
        { name: 'Analytics', icon: 'monitoring', href: '/explore?tab=analytics' },
        { name: 'News', icon: 'newspaper', href: '/news' },
    ];

    function isActive(href: string): boolean {
        // Parse current page URL and its tab parameter
        const cleanUrl = url.startsWith('/') ? url : '/' + url;
        const currentUrlObj = new URL(cleanUrl, 'http://localhost');
        const currentTab = currentUrlObj.searchParams.get('tab') || 'explore';
        const currentPath = currentUrlObj.pathname;

        // Parse item href
        const targetUrlObj = new URL(href, 'http://localhost');
        const targetTab = targetUrlObj.searchParams.get('tab') || 'explore';
        const targetPath = targetUrlObj.pathname;

        if (targetPath === '/' || targetPath === '/explore') {
            // Under root path, both path and tab parameter must match
            return (currentPath === '/' || currentPath === '/explore' || (currentPath.startsWith('/startups') && !currentPath.startsWith('/startups/create'))) && currentTab === targetTab;
        }

        return currentPath.startsWith(targetPath);
    }

    return (
        <aside className="fixed left-0 top-0 h-full flex flex-col py-8 px-4 z-40 bg-surface-container-lowest border-r border-outline-variant w-[240px]">
            {/* Logo */}
            <Link href="/" className="mb-10 px-2 flex items-center gap-2.5 group">
                <AppLogoIcon className="w-8 h-8 shadow-sm group-hover:scale-105 transition-transform duration-300" />
                <div>
                    <h1 className="text-body-lg font-bold text-primary leading-none tracking-tight">
                        StartUpTracker
                    </h1>
                    <p className="text-[9px] font-mono font-bold text-on-surface-variant opacity-70 uppercase tracking-widest mt-0.5 leading-none">
                        Venture Insights
                    </p>
                </div>
            </Link>

            {/* Main Navigation */}
            <nav className="flex-1 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 transition-all rounded-lg ${
                            isActive(item.href)
                                ? 'bg-primary-container text-on-primary-container font-semibold translate-x-1'
                                : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                        }`}
                    >
                        <span
                            className="material-symbols-outlined"
                            style={
                                isActive(item.href)
                                    ? { fontVariationSettings: "'FILL' 1" }
                                    : undefined
                            }
                        >
                            {item.icon}
                        </span>
                        <span className="text-label-caps font-mono font-bold uppercase">
                            {item.name}
                        </span>
                    </Link>
                ))}

                {/* Authenticated-only nav items */}
                {user && (
                    <>
                        <div className="pt-3 pb-1 px-4">
                            <div className="border-t border-outline-variant" />
                        </div>
                        {authNavItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 transition-all rounded-lg ${
                                    isActive(item.href)
                                        ? 'bg-primary-container text-on-primary-container font-semibold translate-x-1'
                                        : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-high'
                                }`}
                            >
                                <span
                                    className="material-symbols-outlined"
                                    style={
                                        isActive(item.href)
                                            ? { fontVariationSettings: "'FILL' 1" }
                                            : undefined
                                    }
                                >
                                    {item.icon}
                                </span>
                                <span className="text-label-caps font-mono font-bold uppercase">
                                    {item.name}
                                </span>
                            </Link>
                        ))}
                    </>
                )}
            </nav>
        </aside>
    );
}
