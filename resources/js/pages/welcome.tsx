import { Head, Link, usePage } from '@inertiajs/react';
import { login, register } from '@/routes';
import { useState } from 'react';
import { 
    TrendingUp, 
    ChevronRight, 
    ArrowUpRight, 
    Cpu, 
    LineChart, 
    Layers, 
    Award,
    Shield,
    Flame,
    Activity
} from 'lucide-react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props as any;
    const user = auth?.user ?? null;

    // Local state for interactive statistics demo
    const [activeDemoTab, setActiveDemoTab] = useState<'chart' | 'sectors' | 'trending'>('chart');
    const [animatedUpvotes, setAnimatedUpvotes] = useState(148);
    const [isUpvoted, setIsUpvoted] = useState(false);

    // Micro-interactions
    const handleUpvoteDemo = () => {
        if (!isUpvoted) {
            setAnimatedUpvotes(prev => prev + 1);
            setIsUpvoted(true);
        } else {
            setAnimatedUpvotes(prev => prev - 1);
            setIsUpvoted(false);
        }
    };

    return (
        <>
            <Head title="Venture Insights & Startup Tracker" />
            
            <div className="min-h-screen bg-background text-on-surface font-sans overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container relative">
                
                {/* Glowing Ambient Background Circles */}
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[120px] pointer-events-none animate-pulse duration-5000"></div>
                <div className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-secondary/8 blur-[120px] pointer-events-none animate-pulse duration-3000"></div>
                <div className="absolute bottom-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-tertiary/8 blur-[120px] pointer-events-none"></div>

                {/* Main Navigation Bar */}
                <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-outline-variant/30 transition-all duration-300">
                    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                        
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                                <span className="material-symbols-outlined text-[24px] font-bold">rocket_launch</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold tracking-tight text-on-surface flex items-center gap-1.5">
                                    StartUpTracker
                                </h1>
                                <p className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest leading-none">
                                    Venture Insights
                                </p>
                            </div>
                        </Link>

                        {/* Middle Nav Links (Desktop) */}
                        <nav className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-body-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">Features</a>
                            <a href="#stats" className="text-body-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">Ecosystem Stats</a>
                            <a href="#sectors" className="text-body-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">Sectors</a>
                            <Link href="/explore" className="text-body-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">Explore Feed</Link>
                            <Link href="/news" className="text-body-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">Venture News</Link>
                        </nav>

                        {/* CTA / User Panel */}
                        <div className="flex items-center gap-4">
                            {user ? (
                                <Link
                                    href="/explore"
                                    className="flex items-center gap-2 bg-primary text-on-primary hover:bg-primary/95 px-6 py-2.5 rounded-full text-body-sm font-mono font-bold uppercase tracking-wider shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-95"
                                >
                                    <span className="material-symbols-outlined text-[18px]">dashboard</span>
                                    Workspace
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="text-body-sm font-mono font-bold uppercase tracking-wider text-on-surface-variant hover:text-primary hover:bg-surface-container/50 px-4 py-2 rounded-full transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="hidden sm:flex items-center gap-1.5 bg-primary text-on-primary hover:bg-primary/95 px-6 py-2.5 rounded-full text-body-sm font-mono font-bold uppercase tracking-wider shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all active:scale-95"
                                        >
                                            Join Now
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 px-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                        
                        {/* Hero Text */}
                        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
                            
                            {/* Live Badge */}
                            <div className="inline-flex items-center gap-2 bg-secondary-container text-on-secondary-container border border-secondary/20 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider animate-bounce">
                                <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                                Ecosystem Tracker Active
                            </div>

                            {/* Headline */}
                            <h2 className="text-display-lg sm:text-[54px] font-bold tracking-tight text-on-surface leading-[1.1] max-w-2xl">
                                The pulse of early-stage <br />
                                <span className="bg-gradient-to-r from-primary via-tertiary to-secondary bg-clip-text text-transparent">
                                    venture insights.
                                </span>
                            </h2>

                            {/* Subtitle */}
                            <p className="text-body-base text-on-surface-variant max-w-xl">
                                Discover emerging startups, track funding rounds, and monitor developer ecosystem shifts in real-time. Spot promising founders before they hit the mainstream.
                            </p>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
                                <Link
                                    href="/explore"
                                    className="flex items-center justify-center gap-2 bg-primary text-on-primary hover:bg-primary/95 px-8 py-4 rounded-full text-body-base font-mono font-bold uppercase tracking-wider shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5 active:scale-95 text-center"
                                >
                                    <span className="material-symbols-outlined text-[20px]">explore</span>
                                    Explore Startups
                                </Link>
                                
                                <Link
                                    href="/news"
                                    className="flex items-center justify-center gap-2 border border-outline-variant bg-surface-container-low hover:bg-surface-container text-on-surface px-8 py-4 rounded-full text-body-base font-mono font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5 active:scale-95 text-center"
                                >
                                    <span className="material-symbols-outlined text-[20px]">newspaper</span>
                                    Venture News
                                </Link>
                            </div>

                            {/* Small ecosystem stats summary */}
                            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-6 border-t border-outline-variant/50 w-full max-w-lg">
                                <div>
                                    <span className="block text-2xl font-bold text-on-surface">189+</span>
                                    <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider">Startups Listed</span>
                                </div>
                                <div className="w-px h-8 bg-outline-variant/60 hidden sm:block"></div>
                                <div>
                                    <span className="block text-2xl font-bold text-on-surface">$12.4B</span>
                                    <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider">Funding Monitored</span>
                                </div>
                                <div className="w-px h-8 bg-outline-variant/60 hidden sm:block"></div>
                                <div>
                                    <span className="block text-2xl font-bold text-on-surface">12+</span>
                                    <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider">Sectors Tracked</span>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Hero Graphic (Dashboard Mockup) */}
                        <div className="lg:col-span-5 relative w-full">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-3xl blur-2xl"></div>
                            
                            {/* Glassmorphic Window Mockup */}
                            <div className="relative bg-surface-container-lowest/80 border border-outline-variant/50 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
                                
                                {/* Window Header */}
                                <div className="flex items-center justify-between px-4 py-3 bg-surface-container border-b border-outline-variant/60">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-error"></div>
                                        <div className="w-3 h-3 rounded-full bg-secondary"></div>
                                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                                    </div>
                                    <span className="text-[11px] font-mono text-on-surface-variant/70">live_tracker_demo.json</span>
                                    <div className="w-4 h-4"></div>
                                </div>

                                {/* Interactive Mockup Body */}
                                <div className="p-5 space-y-4">
                                    
                                    {/* Mock Tabs */}
                                    <div className="flex gap-2 p-1 bg-surface-container-low rounded-lg">
                                        <button 
                                            onClick={() => setActiveDemoTab('chart')}
                                            className={`flex-1 text-center py-1.5 text-xs font-mono font-bold rounded transition-all uppercase ${activeDemoTab === 'chart' ? 'bg-surface-container-lowest text-primary shadow-xs' : 'text-on-surface-variant/80 hover:text-on-surface'}`}
                                        >
                                            Trends
                                        </button>
                                        <button 
                                            onClick={() => setActiveDemoTab('sectors')}
                                            className={`flex-1 text-center py-1.5 text-xs font-mono font-bold rounded transition-all uppercase ${activeDemoTab === 'sectors' ? 'bg-surface-container-lowest text-primary shadow-xs' : 'text-on-surface-variant/80 hover:text-on-surface'}`}
                                        >
                                            Sectors
                                        </button>
                                        <button 
                                            onClick={() => setActiveDemoTab('trending')}
                                            className={`flex-1 text-center py-1.5 text-xs font-mono font-bold rounded transition-all uppercase ${activeDemoTab === 'trending' ? 'bg-surface-container-lowest text-primary shadow-xs' : 'text-on-surface-variant/80 hover:text-on-surface'}`}
                                        >
                                            Spotlight
                                        </button>
                                    </div>

                                    {/* Tab 1 Content: Mini Chart */}
                                    {activeDemoTab === 'chart' && (
                                        <div className="space-y-3 animate-fade-in duration-300">
                                            <div className="flex justify-between items-center">
                                                <h4 className="text-body-sm font-semibold text-on-surface flex items-center gap-1.5">
                                                    <TrendingUp className="w-4 h-4 text-secondary" />
                                                    Funding Trends (Q2 2026)
                                                </h4>
                                                <span className="text-xs font-mono text-secondary font-bold bg-secondary-container px-2 py-0.5 rounded">+24.8%</span>
                                            </div>
                                            
                                            {/* Beautiful CSS bar graph */}
                                            <div className="h-32 flex items-end gap-2.5 pt-4">
                                                <div className="flex-1 bg-primary/20 hover:bg-primary transition-all duration-300 rounded-t-sm h-[30%]" title="April: $1.2B"></div>
                                                <div className="flex-1 bg-primary/30 hover:bg-primary transition-all duration-300 rounded-t-sm h-[50%]" title="May: $2.1B"></div>
                                                <div className="flex-1 bg-primary/40 hover:bg-primary transition-all duration-300 rounded-t-sm h-[40%]" title="June: $1.8B"></div>
                                                <div className="flex-1 bg-gradient-to-t from-primary to-secondary hover:from-primary hover:to-secondary transition-all duration-300 rounded-t-sm h-[85%] relative group" title="July: $4.2B">
                                                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] font-mono px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">$4.2B</div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between text-[10px] font-mono text-on-surface-variant px-1 border-t border-outline-variant/40 pt-1.5">
                                                <span>APR</span>
                                                <span>MAY</span>
                                                <span>JUN</span>
                                                <span className="text-primary font-bold">JUL (EST)</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Tab 2 Content: Active Sector Pill Showcase */}
                                    {activeDemoTab === 'sectors' && (
                                        <div className="space-y-3 animate-fade-in duration-300">
                                            <h4 className="text-body-sm font-semibold text-on-surface flex items-center gap-1.5">
                                                <Layers className="w-4 h-4 text-tertiary" />
                                                Hot Ecosystem Sectors
                                            </h4>
                                            <p className="text-[11px] text-on-surface-variant leading-relaxed">
                                                Track seed & growth volumes across emerging sectors updated hourly.
                                            </p>
                                            <div className="grid grid-cols-2 gap-2 pt-1">
                                                <div className="bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-xl p-2.5 transition-colors cursor-pointer group">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">AI & ML</span>
                                                        <Cpu className="w-3.5 h-3.5 text-primary" />
                                                    </div>
                                                    <span className="text-base font-bold">$4.2B</span>
                                                    <span className="block text-[9px] font-mono text-on-surface-variant">32 Rounds</span>
                                                </div>
                                                <div className="bg-secondary/5 hover:bg-secondary/10 border border-secondary/20 rounded-xl p-2.5 transition-colors cursor-pointer group">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-secondary">FinTech</span>
                                                        <LineChart className="w-3.5 h-3.5 text-secondary" />
                                                    </div>
                                                    <span className="text-base font-bold">$2.8B</span>
                                                    <span className="block text-[9px] font-mono text-on-surface-variant">24 Rounds</span>
                                                </div>
                                                <div className="bg-tertiary/5 hover:bg-tertiary/10 border border-tertiary/20 rounded-xl p-2.5 transition-colors cursor-pointer group">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-tertiary">SaaS</span>
                                                        <Layers className="w-3.5 h-3.5 text-tertiary" />
                                                    </div>
                                                    <span className="text-base font-bold">$1.9B</span>
                                                    <span className="block text-[9px] font-mono text-on-surface-variant">19 Rounds</span>
                                                </div>
                                                <div className="bg-outline-variant/10 hover:bg-outline-variant/20 border border-outline-variant/30 rounded-xl p-2.5 transition-colors cursor-pointer group">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-on-surface-variant">BioTech</span>
                                                        <Activity className="w-3.5 h-3.5 text-on-surface-variant" />
                                                    </div>
                                                    <span className="text-base font-bold">$3.5B</span>
                                                    <span className="block text-[9px] font-mono text-on-surface-variant">12 Rounds</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Tab 3 Content: Spotlight Cards */}
                                    {activeDemoTab === 'trending' && (
                                        <div className="space-y-3 animate-fade-in duration-300">
                                            <h4 className="text-body-sm font-semibold text-on-surface flex items-center gap-1.5">
                                                <Award className="w-4 h-4 text-primary" />
                                                Spotlight Startup Card
                                            </h4>
                                            
                                            {/* Mini Startup Card Representation */}
                                            <div className="bg-surface-container border border-outline-variant rounded-xl p-4 space-y-3">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex gap-2.5 items-center">
                                                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                                                            QL
                                                        </div>
                                                        <div>
                                                            <h5 className="text-body-sm font-bold leading-none">QuantumLeap</h5>
                                                            <span className="text-[10px] font-mono text-on-surface-variant">AI & ML • Seed Stage</span>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Upvote Button with click interaction */}
                                                    <button 
                                                        onClick={handleUpvoteDemo}
                                                        className={`flex flex-col items-center justify-center border px-2.5 py-1.5 rounded-lg transition-all ${
                                                            isUpvoted 
                                                                ? 'bg-primary text-on-primary border-primary scale-105' 
                                                                : 'border-outline-variant hover:bg-surface-container-high'
                                                        }`}
                                                    >
                                                        <span className="material-symbols-outlined text-[16px] leading-none">arrow_drop_up</span>
                                                        <span className="text-xs font-mono font-bold leading-none">{animatedUpvotes}</span>
                                                    </button>
                                                </div>
                                                
                                                <p className="text-xs text-on-surface-variant leading-relaxed">
                                                    "Next-generation quantum-classical neural compiler reducing LLM optimization latency by 60%."
                                                </p>
                                                
                                                <div className="flex justify-between items-center text-[10px] font-mono text-on-surface-variant/80 border-t border-outline-variant/40 pt-2">
                                                    <span>Funded: $4.2M</span>
                                                    <span className="text-primary font-semibold hover:underline flex items-center gap-0.5 cursor-pointer">
                                                        View details <ArrowUpRight className="w-3 h-3" />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Live Stats Row */}
                <section id="stats" className="py-12 bg-surface-container-low border-y border-outline-variant/30 px-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        
                        <div className="flex items-center gap-4 bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 hover:border-primary/30 transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-[26px]">database</span>
                            </div>
                            <div>
                                <span className="block text-2xl font-bold text-on-surface leading-tight">189</span>
                                <span className="text-xs font-mono text-on-surface-variant uppercase tracking-widest">Active Startups</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 hover:border-secondary/30 transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-[26px]">monitoring</span>
                            </div>
                            <div>
                                <span className="block text-2xl font-bold text-on-surface leading-tight">$12.4B</span>
                                <span className="text-xs font-mono text-on-surface-variant uppercase tracking-widest">Total Funding</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 hover:border-tertiary/30 transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-[26px]">category</span>
                            </div>
                            <div>
                                <span className="block text-2xl font-bold text-on-surface leading-tight">12+</span>
                                <span className="text-xs font-mono text-on-surface-variant uppercase tracking-widest">Industry Sectors</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 hover:border-primary/30 transition-all duration-300 group">
                            <div className="w-12 h-12 rounded-xl bg-error/10 text-error flex items-center justify-center group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-[26px]">star</span>
                            </div>
                            <div>
                                <span className="block text-2xl font-bold text-on-surface leading-tight">4,892</span>
                                <span className="text-xs font-mono text-on-surface-variant uppercase tracking-widest">Community Upvotes</span>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 px-6 relative">
                    <div className="max-w-7xl mx-auto space-y-16">
                        
                        {/* Section Header */}
                        <div className="text-center max-w-2xl mx-auto space-y-4">
                            <span className="text-xs font-mono font-bold uppercase bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full tracking-widest">
                                Core Capabilities
                            </span>
                            <h3 className="text-headline-md sm:text-[36px] font-bold text-on-surface tracking-tight">
                                Built for founders, investors, and ecosystem builders.
                            </h3>
                            <p className="text-body-base text-on-surface-variant">
                                Explore a highly specialized workspace packed with tools designed to extract intelligence from the early-stage start-up landscape.
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            
                            {/* Feature 1 */}
                            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[26px]">explore</span>
                                </div>
                                <h4 className="text-title-sm font-bold">Chronological Explorer</h4>
                                <p className="text-body-sm text-on-surface-variant leading-relaxed">
                                    Browse the ecosystem chronologically using our advanced week-by-week selectors. Filter startups by funding size, location, and industry tags.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 hover:shadow-xl hover:border-secondary/20 transition-all duration-300 group space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[26px]">monitoring</span>
                                </div>
                                <h4 className="text-title-sm font-bold">Deep Venture Analytics</h4>
                                <p className="text-body-sm text-on-surface-variant leading-relaxed">
                                    Analyze funding volumes, average round sizes, valuation trends, and sector momentum charts updated dynamically with every single transaction.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 hover:shadow-xl hover:border-tertiary/20 transition-all duration-300 group space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[26px]">newspaper</span>
                                </div>
                                <h4 className="text-title-sm font-bold">Aggregated News Feed</h4>
                                <p className="text-body-sm text-on-surface-variant leading-relaxed">
                                    Stay ahead of markets with our automated tech ecosystem news feed, aggregating articles, funding announcements, and founder tweets.
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-error/10 text-error flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[26px]">star</span>
                                </div>
                                <h4 className="text-title-sm font-bold">Spotlight Upvoting</h4>
                                <p className="text-body-sm text-on-surface-variant leading-relaxed">
                                    Leverage crowd wisdom. Community members upvote and bookmark projects, helping outstanding startups float to the spotlight feed.
                                </p>
                            </div>

                            {/* Feature 5 */}
                            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[26px]">shield_person</span>
                                </div>
                                <h4 className="text-title-sm font-bold">Lean RBAC Permissions</h4>
                                <p className="text-body-sm text-on-surface-variant leading-relaxed">
                                    Robust, secure user-roles system distinguishing Admins, Founders, Members, and Viewers to secure sensitive startup statistics.
                                </p>
                            </div>

                            {/* Feature 6 */}
                            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 hover:shadow-xl hover:border-secondary/20 transition-all duration-300 group space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[26px]">notifications_active</span>
                                </div>
                                <h4 className="text-title-sm font-bold">Real-time Watchlists</h4>
                                <p className="text-body-sm text-on-surface-variant leading-relaxed">
                                    Bookmark early stage companies and get notified immediately when they raise capital, change stages, or publish press announcements.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Industry Sectors Showcase */}
                <section id="sectors" className="py-20 bg-surface-container-low px-6 relative">
                    <div className="max-w-7xl mx-auto space-y-12">
                        
                        {/* Title */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="space-y-3 text-left">
                                <span className="text-xs font-mono font-bold uppercase text-secondary bg-secondary/10 px-3.5 py-1 rounded-full tracking-wider border border-secondary/20">
                                    Market Segments
                                </span>
                                <h3 className="text-headline-md font-bold text-on-surface tracking-tight">
                                    Explore Hot Sectors
                                </h3>
                                <p className="text-body-sm text-on-surface-variant max-w-xl">
                                    Click any industry sector to instantly view filtered startups, check analytics, or analyze funding transactions.
                                </p>
                            </div>
                            
                            <Link 
                                href="/explore" 
                                className="flex items-center gap-1.5 text-body-sm font-mono font-bold uppercase text-primary hover:text-primary/80 group whitespace-nowrap self-start md:self-auto"
                            >
                                View all sectors 
                                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                        </div>

                        {/* Sectors Pills Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                            {[
                                { name: 'AI & ML', icon: 'cpu', color: 'border-primary text-primary hover:bg-primary/5' },
                                { name: 'FinTech', icon: 'payments', color: 'border-secondary text-secondary hover:bg-secondary/5' },
                                { name: 'SaaS', icon: 'layers', color: 'border-tertiary text-tertiary hover:bg-tertiary/5' },
                                { name: 'BioTech', icon: 'experiment', color: 'border-error text-error hover:bg-error/5' },
                                { name: 'CleanTech', icon: 'eco', color: 'border-secondary text-secondary hover:bg-secondary/5' },
                                { name: 'HealthTech', icon: 'heart_check', color: 'border-primary text-primary hover:bg-primary/5' },
                            ].map((sec) => (
                                <Link
                                    key={sec.name}
                                    href={`/explore?sector=${sec.name}`}
                                    className={`flex flex-col items-center justify-center p-6 border rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer ${sec.color}`}
                                >
                                    <span className="material-symbols-outlined text-[32px] mb-3">{sec.icon}</span>
                                    <span className="text-body-sm font-bold text-on-surface">{sec.name}</span>
                                    <span className="text-[10px] font-mono text-on-surface-variant mt-1">Explore →</span>
                                </Link>
                            ))}
                        </div>

                    </div>
                </section>

                {/* How it Works Section */}
                <section className="py-24 px-6 relative">
                    <div className="max-w-7xl mx-auto space-y-16">
                        
                        {/* Header */}
                        <div className="text-center max-w-2xl mx-auto space-y-4">
                            <span className="text-xs font-mono font-bold uppercase text-tertiary bg-tertiary/10 px-3 py-1 rounded-full tracking-widest border border-tertiary/20">
                                How It Works
                            </span>
                            <h3 className="text-headline-md font-bold tracking-tight text-on-surface">
                                Start monitoring key startup details in 3 steps
                            </h3>
                        </div>

                        {/* Steps Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                            
                            {/* Connector line (desktop only) */}
                            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-outline-variant/40 hidden md:block -z-10 -translate-y-6"></div>

                            {/* Step 1 */}
                            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 text-center space-y-4 hover:shadow-lg transition-shadow relative">
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-mono font-bold text-sm border-4 border-background">
                                    01
                                </div>
                                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto pt-1">
                                    <span className="material-symbols-outlined text-[28px]">app_registration</span>
                                </div>
                                <h4 className="text-body-base font-bold pt-2">Register & Profile</h4>
                                <p className="text-xs text-on-surface-variant leading-relaxed">
                                    Create a free member account or apply for founder status. Connect details, setup alerts, or list your active early stage startup.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 text-center space-y-4 hover:shadow-lg transition-shadow relative">
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-mono font-bold text-sm border-4 border-background">
                                    02
                                </div>
                                <div className="w-14 h-14 rounded-full bg-secondary/10 text-secondary flex items-center justify-center mx-auto pt-1">
                                    <span className="material-symbols-outlined text-[28px]">search</span>
                                </div>
                                <h4 className="text-body-base font-bold pt-2">Spotlight & Upvote</h4>
                                <p className="text-xs text-on-surface-variant leading-relaxed">
                                    Discover trending projects using timeline filters. Bookmark top assets to watchlists and upvote high-potential companies.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 text-center space-y-4 hover:shadow-lg transition-shadow relative">
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-mono font-bold text-sm border-4 border-background">
                                    03
                                </div>
                                <div className="w-14 h-14 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center mx-auto pt-1">
                                    <span className="material-symbols-outlined text-[28px]">monitoring</span>
                                </div>
                                <h4 className="text-body-base font-bold pt-2">Analyze Market Trends</h4>
                                <p className="text-xs text-on-surface-variant leading-relaxed">
                                    Monitor aggregate statistics on hot sectors, stage funding volumes, weekly submission momentum, and real-time tech news.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Breathtaking Call to Action (Bottom Banner) */}
                <section className="py-16 px-6">
                    <div className="max-w-7xl mx-auto bg-gradient-to-tr from-primary via-tertiary to-secondary rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/20 group">
                        
                        {/* Animated decorative circles */}
                        <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-white/10 blur-2xl group-hover:scale-110 transition-transform duration-1000"></div>
                        <div className="absolute bottom-[-20%] left-[-10%] w-[250px] h-[250px] rounded-full bg-black/10 blur-2xl"></div>

                        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                            <h3 className="text-display-lg sm:text-[40px] font-bold leading-tight tracking-tight">
                                Spot the next unicorn before it happens.
                            </h3>
                            
                            <p className="text-body-base opacity-90 text-white leading-relaxed max-w-xl mx-auto">
                                Join our network of investors, founders, and startup enthusiasts today. Leverage community wisdom and rich metrics to understand the venture landscape.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                                <Link
                                    href="/explore"
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-primary hover:bg-neutral-50 px-8 py-4 rounded-full text-body-base font-mono font-bold uppercase tracking-wider transition-all hover:shadow-lg active:scale-95 text-center cursor-pointer"
                                >
                                    Start Exploring
                                    <ChevronRight className="w-4 h-4 text-primary" />
                                </Link>
                                
                                {!user && canRegister && (
                                    <Link
                                        href={register()}
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black/30 border border-white/40 hover:bg-black/40 text-white px-8 py-4 rounded-full text-body-base font-mono font-bold uppercase tracking-wider transition-all active:scale-95 text-center cursor-pointer"
                                    >
                                        Create Free Account
                                    </Link>
                                )}
                            </div>

                            {/* Small bullets */}
                            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono opacity-80 pt-4">
                                <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Secure RBAC</span>
                                <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5" /> High-frequency News</span>
                                <span className="flex items-center gap-1"><Activity className="w-3.5 h-3.5" /> Interactive Charts</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer Section */}
                <footer className="bg-surface-container border-t border-outline-variant/60 py-16 px-6 relative">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                        
                        {/* Logo column */}
                        <div className="md:col-span-5 space-y-4 text-left">
                            <Link href="/" className="flex items-center gap-2 group self-start">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300">
                                    <span className="material-symbols-outlined text-[24px] font-bold">rocket_launch</span>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold tracking-tight text-on-surface">
                                        StartUpTracker
                                    </h1>
                                    <p className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-widest leading-none">
                                        Venture Insights
                                    </p>
                                </div>
                            </Link>
                            <p className="text-body-sm text-on-surface-variant max-w-sm">
                                Empowering early-stage venture monitoring and startup discovery through real-time community engagement, weekly data indexes, and high-fidelity analytics charts.
                            </p>
                        </div>

                        {/* Navigation column 1 */}
                        <div className="md:col-span-2 space-y-4 text-left">
                            <h5 className="text-label-caps font-mono font-bold text-on-surface uppercase tracking-widest">Platform</h5>
                            <ul className="space-y-2.5">
                                <li><Link href="/explore" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">Startups Feed</Link></li>
                                <li><Link href="/news" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">Venture News</Link></li>
                                <li><Link href="/explore?tab=analytics" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">Sector Analytics</Link></li>
                                <li><Link href="/startups/create" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">Submit Startup</Link></li>
                            </ul>
                        </div>

                        {/* Navigation column 2 */}
                        <div className="md:col-span-2 space-y-4 text-left">
                            <h5 className="text-label-caps font-mono font-bold text-on-surface uppercase tracking-widest">Resources</h5>
                            <ul className="space-y-2.5">
                                <li><a href="#" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">Documentation</a></li>
                                <li><a href="#" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">Ecosystem API</a></li>
                                <li><a href="#" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="text-body-sm text-on-surface-variant hover:text-primary transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>

                        {/* Social / Newsletter Column */}
                        <div className="md:col-span-3 space-y-4 text-left">
                            <h5 className="text-label-caps font-mono font-bold text-on-surface uppercase tracking-widest">Get Updates</h5>
                            <p className="text-xs text-on-surface-variant leading-relaxed">
                                Join our weekly newsletter covering early stage trends, high-momentum startups, and active sectors.
                            </p>
                            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-surface border border-outline-variant/60 rounded-full px-4 py-2 text-xs font-mono w-full focus:outline-none focus:border-primary transition-colors"
                                />
                                <button className="bg-primary hover:bg-primary/95 text-on-primary text-xs font-mono font-bold uppercase tracking-wider px-4 rounded-full transition-colors">
                                    Join
                                </button>
                            </form>
                        </div>

                    </div>

                    <div className="max-w-7xl mx-auto border-t border-outline-variant/40 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs font-mono text-on-surface-variant">
                            © {new Date().getFullYear()} Venture Insights Tracker. Built with Laravel + React + Tailwind CSS. All rights reserved.
                        </p>
                        <div className="flex gap-4 text-xs font-mono text-on-surface-variant">
                            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                            <span>•</span>
                            <a href="#" className="hover:text-primary transition-colors">GitHub</a>
                            <span>•</span>
                            <a href="#" className="hover:text-primary transition-colors">Discord</a>
                        </div>
                    </div>
                </footer>

            </div>
        </>
    );
}
