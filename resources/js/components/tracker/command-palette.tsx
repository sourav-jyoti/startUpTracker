import { useState, useEffect } from 'react';
import { Command } from 'cmdk';
import { router } from '@inertiajs/react';
import { Search, Rocket, Star, LayoutDashboard, Bookmark, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Toggle the menu when ⌘K is pressed
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    useEffect(() => {
        if (!search) {
            setResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/search?q=${encodeURIComponent(search)}`);
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    };

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-2xl overflow-hidden border border-outline-variant"
                    >
                        <Command className="flex flex-col h-full">
                            <div className="flex items-center px-4 border-b border-outline-variant">
                                <Search className="w-5 h-5 text-on-surface-variant mr-3" />
                                <Command.Input 
                                    autoFocus
                                    placeholder="Search startups, actions, or pages..." 
                                    className="flex-1 h-14 bg-transparent outline-none text-body-base placeholder:text-on-surface-variant/50"
                                    onValueChange={setSearch}
                                />
                                {loading && <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-3" />}
                                <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-surface-container-high px-1.5 font-mono text-[10px] font-medium text-on-surface-variant opacity-100">
                                    <span className="text-xs">ESC</span>
                                </kbd>
                            </div>

                            <Command.List className="max-h-[300px] overflow-y-auto p-2 custom-scrollbar">
                                <Command.Empty className="py-6 text-center text-on-surface-variant text-body-sm">
                                    No results found.
                                </Command.Empty>

                                {search && results.length > 0 && (
                                    <Command.Group heading="Startups" className="text-label-caps font-mono font-bold text-on-surface-variant px-3 py-2 opacity-50">
                                        {results.map((startup) => (
                                            <Command.Item
                                                key={startup.id}
                                                onSelect={() => runCommand(() => router.get(`/startups/${startup.slug}`))}
                                                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-container-high cursor-pointer transition-colors aria-selected:bg-surface-container-high"
                                            >
                                                <div className="w-8 h-8 bg-surface-container rounded flex items-center justify-center">
                                                    {startup.logo_url ? (
                                                        <img src={startup.logo_url} className="w-5 h-5 object-contain" />
                                                    ) : (
                                                        <Rocket className="w-4 h-4" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-body-sm font-bold truncate">{startup.name}</p>
                                                    <p className="text-label-sm text-on-surface-variant truncate">{startup.sector}</p>
                                                </div>
                                            </Command.Item>
                                        ))}
                                    </Command.Group>
                                )}

                                <Command.Group heading="Navigation" className="text-label-caps font-mono font-bold text-on-surface-variant px-3 py-2 opacity-50 mt-4">
                                    <Command.Item
                                        onSelect={() => runCommand(() => router.visit('/?tab=analytics'))}
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-container-high cursor-pointer transition-colors aria-selected:bg-surface-container-high"
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        <span className="text-body-sm">Analytics</span>
                                    </Command.Item>
                                    <Command.Item
                                        onSelect={() => runCommand(() => router.get('/'))}
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-container-high cursor-pointer transition-colors aria-selected:bg-surface-container-high"
                                    >
                                        <Rocket className="w-4 h-4" />
                                        <span className="text-body-sm">Startup Feed</span>
                                    </Command.Item>
                                </Command.Group>

                                <Command.Group heading="Actions" className="text-label-caps font-mono font-bold text-on-surface-variant px-3 py-2 opacity-50 mt-4">
                                    <Command.Item
                                        onSelect={() => runCommand(() => router.get('/startups/create'))}
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-container-high cursor-pointer transition-colors aria-selected:bg-surface-container-high"
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span className="text-body-sm">Submit New Startup</span>
                                    </Command.Item>
                                </Command.Group>
                            </Command.List>
                        </Command>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
