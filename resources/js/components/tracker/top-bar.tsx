import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

interface TopBarProps {
    availableSectors?: string[];
    activeSector?: string | null;
}

export default function TopBar({
    availableSectors = [],
    activeSector = null,
}: TopBarProps) {
    const { url, props } = usePage();
    const user = props.auth?.user ?? null;
    const initialSearch = (props.search as string) || '';
    const [search, setSearch] = useState(initialSearch);
    const [filterOpen, setFilterOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setSearch(initialSearch);
    }, [initialSearch]);

    function handleSearch(value: string) {
        setSearch(value);

        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        searchTimeout.current = setTimeout(() => {
            const params = new URLSearchParams(window.location.search);
            if (value) {
                params.set('search', value);
            } else {
                params.delete('search');
            }
            
            // Allow searching on the news page as well
            const basePath = (url === '/' || url.startsWith('/?') || url.startsWith('/news')) ? (url.split('?')[0] || '/') : '/';
            const query = params.toString();
            
            router.get(
                `${basePath}${query ? `?${query}` : ''}`,
                {},
                { preserveState: true, preserveScroll: true, replace: true }
            );
        }, 500);
    }

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setFilterOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (searchTimeout.current) clearTimeout(searchTimeout.current);
        };
    }, []);

    function handleSectorFilter(sector: string | null) {
        const basePath = (url === '/' || url.startsWith('/?')) ? (url.split('?')[0] || '/') : '/';
        const params = new URLSearchParams(window.location.search);

        if (sector) {
            params.set('sector', sector);
        } else {
            params.delete('sector');
        }

        const query = params.toString();
        router.get(
            `${basePath}${query ? `?${query}` : ''}`,
            {},
            { preserveState: true, preserveScroll: true },
        );
        setFilterOpen(false);
    }

    return (
        <header className="sticky top-0 z-30 flex justify-between items-center h-16 px-8 w-full bg-surface border-b border-outline-variant">
            <div className="flex items-center gap-4 flex-1">
                <div className="relative max-w-md w-full">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                        search
                    </span>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search startups, sectors, founders..."
                        className="w-full bg-surface-container-low border border-outline-variant rounded-full py-2 pl-10 pr-4 text-body-sm font-mono focus:outline-none focus:border-primary transition-colors"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Filter dropdown - Only visible on home page */}
                {(url === '/' || url.startsWith('/?')) && (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setFilterOpen(!filterOpen)}
                            className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-body-base transition-colors active:scale-95 duration-100 ${
                                activeSector
                                    ? 'border-secondary bg-secondary-container text-on-secondary-container'
                                    : 'border-outline-variant hover:bg-surface-container'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                filter_list
                            </span>
                            <span>
                                {activeSector ? activeSector : 'Filter'}
                            </span>
                            {activeSector && (
                                <span
                                    className="material-symbols-outlined text-[16px] ml-1 hover:text-error"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSectorFilter(null);
                                    }}
                                >
                                    close
                                </span>
                            )}
                        </button>

                        {filterOpen && availableSectors.length > 0 && (
                            <div className="absolute right-0 top-full mt-2 w-56 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-lg py-2 z-50">
                                <p className="px-4 py-2 text-label-caps font-mono font-bold text-on-surface-variant/60 uppercase">
                                    Filter by Industry
                                </p>
                                <button
                                    onClick={() => handleSectorFilter(null)}
                                    className={`w-full text-left px-4 py-2.5 text-body-sm hover:bg-surface-container-high transition-colors flex items-center gap-2 ${!activeSector ? 'text-secondary font-semibold' : ''}`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        {!activeSector
                                            ? 'radio_button_checked'
                                            : 'radio_button_unchecked'}
                                    </span>
                                    All Sectors
                                </button>
                                {availableSectors.map((sector) => (
                                    <button
                                        key={sector}
                                        onClick={() =>
                                            handleSectorFilter(sector)
                                        }
                                        className={`w-full text-left px-4 py-2.5 text-body-sm hover:bg-surface-container-high transition-colors flex items-center gap-2 ${activeSector === sector ? 'text-secondary font-semibold' : ''}`}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            {activeSector === sector
                                                ? 'radio_button_checked'
                                                : 'radio_button_unchecked'}
                                        </span>
                                        {sector}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {(url === '/' || url.startsWith('/?')) && (
                    <div className="h-8 w-px bg-outline-variant mx-2" />
                )}

                {user ? (
                    <div className="flex items-center gap-3">
                        <Link
                            href="/startups/create"
                            className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-full text-body-sm font-mono font-bold uppercase tracking-wider hover:bg-primary/90 transition-all active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                add
                            </span>
                            Submit
                        </Link>
                        <Link
                            href="/dashboard"
                            className="text-primary hover:bg-surface-container rounded-full p-2 transition-colors"
                            title="Dashboard"
                        >
                            {user.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-7 h-7 rounded-full object-cover"
                                />
                            ) : (
                                <span className="material-symbols-outlined text-[28px]">
                                    account_circle
                                </span>
                            )}
                        </Link>
                    </div>
                ) : (
                    <Link
                        href="/login"
                        className="flex items-center gap-2 bg-primary text-on-primary px-5 py-2 rounded-full text-body-sm font-mono font-bold uppercase tracking-wider hover:bg-primary/90 transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            login
                        </span>
                        Sign In
                    </Link>
                )}
            </div>
        </header>
    );
}
