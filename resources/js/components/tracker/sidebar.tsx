import { Link, usePage } from '@inertiajs/react';

const navItems = [
    { name: 'Home', icon: 'home', href: '/' },
    { name: 'News', icon: 'newspaper', href: '/news' },
];

const authNavItems = [
    { name: 'Add Startup', icon: 'add_circle', href: '/startups/create' },
];

const footerItems = [
    { name: 'Settings', icon: 'settings', href: '/settings/profile' },
    { name: 'Support', icon: 'help', href: '#' },
];

export default function Sidebar() {
    const { url, props } = usePage();
    const user = props.auth?.user ?? null;

    function isActive(href: string): boolean {
        if (href === '/') {
            return url === '/' || (url.startsWith('/startups') && !url.startsWith('/startups/create'));
        }

        return url.startsWith(href);
    }

    return (
        <aside className="fixed left-0 top-0 h-full flex flex-col py-8 px-4 z-40 bg-surface-container-lowest border-r border-outline-variant w-[240px]">
            {/* Logo */}
            <div className="mb-10 px-2">
                <h1 className="text-headline-md font-semibold text-primary leading-tight tracking-tight">
                    Tracker
                </h1>
                <p className="text-label-caps font-mono font-bold text-on-surface-variant opacity-70 uppercase tracking-widest mt-1">
                    Venture Insights
                </p>
            </div>

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

            {/* Footer */}
            <div className="mt-auto space-y-1 pt-6 border-t border-outline-variant">
                {footerItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-all rounded-lg"
                    >
                        <span className="material-symbols-outlined">
                            {item.icon}
                        </span>
                        <span className="text-label-caps font-mono font-bold uppercase">
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>
        </aside>
    );
}
