import { Head, useForm, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    HelpCircle, 
    Send, 
    CheckCircle, 
    MessageSquare, 
    Clock, 
    AlertCircle, 
    ChevronDown, 
    BookOpen, 
    Mail,
    Search,
    MessageCircle,
    ArrowRight,
    Sparkles,
    User,
    Tag,
    FileText,
    ShieldAlert
} from 'lucide-react';
import { useState } from 'react';
import TrackerLayout from '@/layouts/tracker-layout';

interface SupportTicket {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    category: string;
    priority: string;
    status: string;
    created_at: string;
}

interface Props {
    initialUser?: {
        name: string;
        email: string;
    } | null;
    status?: string | null;
    tickets?: SupportTicket[];
}

interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const FAQS: FAQItem[] = [
    {
        category: 'general',
        question: 'What is Startup Tracker?',
        answer: 'Startup Tracker is a modern ecosystem analytics platform that allows founders, investors, and enthusiasts to keep track of weekly funding trends, startup sectors, and direct tech industry insights.',
    },
    {
        category: 'account',
        question: 'How do I submit my startup?',
        answer: 'To submit your startup, first sign in to your account. Then click the "Add Startup" button in the sidebar. Fill in the startup profile details, choose a sector, input your funding amount, and click submit!',
    },
    {
        category: 'features',
        question: 'What are upvotes and bookmarks?',
        answer: 'Upvotes help showcase promising startups, promoting them higher in the featured feeds. Bookmarks allow you to save specific startups in your dashboard watchlist to easily track their progress over time.',
    },
    {
        category: 'technical',
        question: 'Can I import my startup data via API?',
        answer: 'Currently, startup submissions are manual to ensure data accuracy and quality control. We are actively developing a public API for batch data ingestion. Please contact support if you need bulk importing.',
    },
    {
        category: 'billing',
        question: 'Are there any platform listing fees?',
        answer: 'Listing your startup on the basic tier of Startup Tracker is 100% free. Premium features like advanced analytics, direct investor outreach, and spotlight listings will be available in our upcoming pro tier.',
    },
];

const CATEGORY_MAP = {
    general: 'General Inquiry',
    bug: 'Technical Issue / Bug',
    billing: 'Billing & Upgrade',
    feature: 'Feature Request'
};

const PRIORITY_MAP = {
    low: 'Low (General Feedback)',
    normal: 'Normal (Standard Support)',
    high: 'High (Urgent Platform Issue)'
};

export default function Support({ initialUser, status, tickets }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFaqTab, setActiveFaqTab] = useState<'all' | 'general' | 'account' | 'features'>('all');
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const [rightColumnTab, setRightColumnTab] = useState<'tickets' | 'faqs'>(initialUser && tickets && tickets.length > 0 ? 'tickets' : 'faqs');
    const [openTicketIndex, setOpenTicketIndex] = useState<number | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submittedTicket, setSubmittedTicket] = useState<{
        name: string;
        email: string;
        subject: string;
        category: string;
        priority: string;
    } | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: initialUser?.name || '',
        email: initialUser?.email || '',
        subject: '',
        message: '',
        category: 'general',
        priority: 'normal',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/support', {
            onSuccess: () => {
                setSubmittedTicket({
                    name: data.name,
                    email: data.email,
                    subject: data.subject,
                    category: data.category,
                    priority: data.priority,
                });
                reset('subject', 'message');
                setIsSuccess(true);
            },
        });
    }

    const filteredFaqs = FAQS.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeFaqTab === 'all' || faq.category === activeFaqTab;

        return matchesSearch && matchesTab;
    });

    return (
        <>
            <Head title="Support & Help Center" />
            <div className="flex-1 p-8 overflow-y-auto max-w-7xl mx-auto w-full">
                
                {/* Hero / Header Section with animated mesh background */}
                <div className="relative overflow-hidden bg-surface-container-lowest rounded-3xl border border-outline-variant p-8 md:p-12 mb-12 shadow-sm">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/5 rounded-full -ml-24 -mb-24 blur-3xl" />
                    
                    {/* Decorative abstract grid pattern */}
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                         style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                    <div className="relative text-center max-w-3xl mx-auto">
                        <div className="flex items-center justify-center gap-2 text-primary font-bold text-label-caps mb-4 tracking-widest">
                            <Sparkles className="w-4 h-4 animate-pulse" />
                            HELP CENTER & KNOWLEDGE
                        </div>
                        <h1 className="text-display-lg md:text-[40px] font-bold text-on-surface mb-4 leading-tight tracking-tight">
                            How can we help you today?
                        </h1>
                        <p className="text-body-lg text-on-surface-variant mb-8 max-w-xl mx-auto leading-relaxed">
                            Search our extensive knowledge base or submit a support request. Our engineering team is always on standby.
                        </p>
                        
                        {/* Elegant Search Bar (Perfect layout alignment using Lucide Search icon & padding) */}
                        <div className="relative max-w-md mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant opacity-60 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search frequently asked questions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-surface-container-low border border-outline-variant rounded-2xl py-4 pr-4 text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner placeholder-on-surface-variant/50"
                                style={{ paddingLeft: '48px' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Two Column Layout (Form & FAQs) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left: Beautiful Contact Form or Success Screen */}
                    <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant p-8 rounded-3xl shadow-sm relative overflow-hidden min-h-[620px] flex flex-col justify-between transition-all duration-300 hover:shadow-md">
                        <AnimatePresence mode="wait">
                            {!isSuccess ? (
                                <motion.div
                                    key="support-form"
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.25 }}
                                    className="flex-1 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="mb-8">
                                            <div className="w-12 h-12 bg-primary/5 border border-primary/10 rounded-2xl flex items-center justify-center mb-4">
                                                <MessageSquare className="w-6 h-6 text-primary" />
                                            </div>
                                            <h2 className="text-headline-md font-bold text-on-surface">
                                                Submit a Support Ticket
                                            </h2>
                                            <p className="text-body-sm text-on-surface-variant mt-1.5 leading-relaxed">
                                                Have an issue or feedback? Send us a ticket and our platform engineering group will review it instantly.
                                            </p>
                                        </div>

                                        {status && (
                                            <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 rounded-2xl flex items-center gap-3">
                                                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                                                <span className="text-body-sm font-semibold">{status}</span>
                                            </div>
                                        )}

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <div className="space-y-2">
                                                    <label htmlFor="name" className="text-label-caps font-mono font-bold text-on-surface-variant opacity-75">Your Name</label>
                                                    <div className="relative">
                                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant opacity-60 pointer-events-none" />
                                                        <input
                                                            id="name"
                                                            type="text"
                                                            value={data.name}
                                                            onChange={(e) => setData('name', e.target.value)}
                                                            className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 pr-4 text-body-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all placeholder-on-surface-variant/40 hover:border-outline transition-colors"
                                                            style={{ paddingLeft: '40px' }}
                                                            placeholder="John Doe"
                                                            required
                                                        />
                                                    </div>
                                                    {errors.name && <p className="text-xs text-error flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.name}</p>}
                                                </div>

                                                <div className="space-y-2">
                                                    <label htmlFor="email" className="text-label-caps font-mono font-bold text-on-surface-variant opacity-75">Your Email</label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant opacity-60 pointer-events-none" />
                                                        <input
                                                            id="email"
                                                            type="email"
                                                            value={data.email}
                                                            onChange={(e) => setData('email', e.target.value)}
                                                            className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 pr-4 text-body-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all placeholder-on-surface-variant/40 hover:border-outline transition-colors"
                                                            style={{ paddingLeft: '40px' }}
                                                            placeholder="john@example.com"
                                                            required
                                                        />
                                                    </div>
                                                    {errors.email && <p className="text-xs text-error flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.email}</p>}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <div className="space-y-2">
                                                    <label htmlFor="category" className="text-label-caps font-mono font-bold text-on-surface-variant opacity-75">Category</label>
                                                    <div className="relative">
                                                        <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant opacity-60 pointer-events-none" />
                                                        <select
                                                            id="category"
                                                            value={data.category}
                                                            onChange={(e) => setData('category', e.target.value)}
                                                            className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 pr-10 text-body-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all appearance-none cursor-pointer font-medium hover:border-outline transition-colors"
                                                            style={{ paddingLeft: '40px' }}
                                                        >
                                                            <option value="general">General Inquiry</option>
                                                            <option value="bug">Technical Issue / Bug</option>
                                                            <option value="billing">Billing & Upgrade</option>
                                                            <option value="feature">Feature Request</option>
                                                        </select>
                                                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/60 pointer-events-none" />
                                                    </div>
                                                    {errors.category && <p className="text-xs text-error flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.category}</p>}
                                                </div>

                                                <div className="space-y-2">
                                                    <label htmlFor="priority" className="text-label-caps font-mono font-bold text-on-surface-variant opacity-75">Priority Level</label>
                                                    <div className="relative">
                                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant opacity-60 pointer-events-none" />
                                                        <select
                                                            id="priority"
                                                            value={data.priority}
                                                            onChange={(e) => setData('priority', e.target.value)}
                                                            className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 pr-10 text-body-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all appearance-none cursor-pointer font-medium hover:border-outline transition-colors"
                                                            style={{ paddingLeft: '40px' }}
                                                        >
                                                            <option value="low">Low (General Feedback)</option>
                                                            <option value="normal">Normal (Standard Support)</option>
                                                            <option value="high">High (Urgent Platform Issue)</option>
                                                        </select>
                                                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/60 pointer-events-none" />
                                                    </div>
                                                    {errors.priority && <p className="text-xs text-error flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.priority}</p>}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="subject" className="text-label-caps font-mono font-bold text-on-surface-variant opacity-75">Subject</label>
                                                <div className="relative">
                                                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant opacity-60 pointer-events-none" />
                                                    <input
                                                        id="subject"
                                                        type="text"
                                                        value={data.subject}
                                                        onChange={(e) => setData('subject', e.target.value)}
                                                        className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 pr-4 text-body-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all placeholder-on-surface-variant/40 hover:border-outline transition-colors"
                                                        style={{ paddingLeft: '40px' }}
                                                        placeholder="Brief summary of your query"
                                                        required
                                                    />
                                                </div>
                                                {errors.subject && <p className="text-xs text-error flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.subject}</p>}
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="message" className="text-label-caps font-mono font-bold text-on-surface-variant opacity-75">Message Details</label>
                                                <div className="relative">
                                                    <MessageCircle className="absolute left-4 top-3.5 w-4 h-4 text-on-surface-variant opacity-60 pointer-events-none" />
                                                    <textarea
                                                        id="message"
                                                        value={data.message}
                                                        onChange={(e) => setData('message', e.target.value)}
                                                        className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-3 pr-4 text-body-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all h-36 resize-none placeholder-on-surface-variant/40 leading-relaxed hover:border-outline transition-colors"
                                                        style={{ paddingLeft: '40px' }}
                                                        placeholder="Describe your issue or query in detail (min 10 characters)..."
                                                        required
                                                    />
                                                </div>
                                                {errors.message && <p className="text-xs text-error flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" />{errors.message}</p>}
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="w-full bg-primary text-on-primary py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/10 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 cursor-pointer text-body-sm"
                                            >
                                                <Send className="w-4 h-4" />
                                                {processing ? 'Submitting Ticket...' : 'Submit Support Ticket'}
                                            </button>
                                        </form>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="success-screen"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.25 }}
                                    className="flex-1 flex flex-col justify-between py-4"
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <motion.div 
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                                            className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mb-6 relative"
                                        >
                                            <motion.div
                                                animate={{ scale: [1, 1.25, 1] }}
                                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                                className="absolute inset-0 rounded-full bg-emerald-500/5"
                                            />
                                            <CheckCircle className="w-8 h-8 text-emerald-600" />
                                        </motion.div>

                                        <h2 className="text-headline-md font-bold text-on-surface">
                                            Ticket Submitted Successfully!
                                        </h2>
                                        
                                        <p className="text-body-sm text-on-surface-variant mt-3 max-w-md leading-relaxed">
                                            Thank you, <span className="font-semibold text-on-surface">{submittedTicket?.name}</span>. We've received your support request and assigned it to our platform engineering group.
                                        </p>

                                        {/* Dynamic details checklist */}
                                        <div className="w-full bg-surface-container-low border border-outline-variant/60 rounded-2xl p-5 mt-6 text-left space-y-4">
                                            <h3 className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/30 pb-2">
                                                Ticket Info Summary
                                            </h3>
                                            
                                            <div className="grid grid-cols-2 gap-4 text-body-xs">
                                                <div>
                                                    <span className="text-on-surface-variant/75 font-mono block">CATEGORY</span>
                                                    <span className="font-semibold text-on-surface block mt-0.5">
                                                        {submittedTicket ? CATEGORY_MAP[submittedTicket.category as keyof typeof CATEGORY_MAP] : ''}
                                                    </span>
                                                </div>
                                                
                                                <div>
                                                    <span className="text-on-surface-variant/75 font-mono block">PRIORITY</span>
                                                    <div className="mt-1">
                                                        {submittedTicket?.priority === 'high' ? (
                                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-error-container text-on-error-container border border-error/20">
                                                                <ShieldAlert className="w-3 h-3" /> URGENT
                                                            </span>
                                                        ) : submittedTicket?.priority === 'normal' ? (
                                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-700 border border-amber-500/20">
                                                                <Clock className="w-3 h-3" /> NORMAL
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-700 border border-blue-500/20">
                                                                <HelpCircle className="w-3 h-3" /> LOW
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="col-span-2">
                                                    <span className="text-on-surface-variant/75 font-mono block">SUBJECT</span>
                                                    <span className="font-semibold text-on-surface block mt-0.5 leading-normal">
                                                        {submittedTicket?.subject}
                                                    </span>
                                                </div>

                                                <div className="col-span-2 border-t border-outline-variant/30 pt-3 flex items-center justify-between text-body-xs font-semibold">
                                                    <div className="flex items-center gap-1.5 text-on-surface-variant">
                                                        <Mail className="w-3.5 h-3.5 text-primary/60" />
                                                        <span>Contact Email:</span>
                                                    </div>
                                                    <span className="text-primary font-bold">{submittedTicket?.email}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex items-center gap-2 px-3 py-1.5 bg-emerald-500/5 text-emerald-700 border border-emerald-500/10 rounded-xl text-body-xs font-semibold">
                                            <span className="relative flex h-2.5 w-2.5">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                            </span>
                                            <span>Staff Active • Estimated Response: &lt; 32 Minutes</span>
                                        </div>
                                    </div>

                                    <div className="mt-8 space-y-3">
                                        <button
                                            type="button"
                                            onClick={() => setIsSuccess(false)}
                                            className="w-full bg-primary text-on-primary py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/10 transition-all active:scale-95 cursor-pointer text-body-sm"
                                        >
                                            <MessageSquare className="w-4 h-4" />
                                            Submit Another Request
                                        </button>

                                        <Link
                                            href="/"
                                            className="w-full bg-surface-container border border-outline-variant hover:bg-surface-container-high text-on-surface py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer text-body-sm text-center"
                                        >
                                            Return to Home
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>


                    {/* Right Column: Toggleable FAQs or My Tickets */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {/* Tab Switcher for Logged In Users */}
                        {initialUser && (
                            <div className="flex items-center gap-2 p-1 bg-surface-container-low border border-outline-variant/60 rounded-2xl w-full">
                                <button
                                    type="button"
                                    onClick={() => setRightColumnTab('tickets')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl transition-all font-bold text-body-xs uppercase tracking-wider cursor-pointer border-0 ${
                                        rightColumnTab === 'tickets'
                                            ? 'bg-surface-container-lowest text-primary shadow-sm'
                                            : 'text-on-surface-variant hover:text-on-surface'
                                    }`}
                                >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                    My Tickets ({tickets?.length || 0})
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRightColumnTab('faqs')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl transition-all font-bold text-body-xs uppercase tracking-wider cursor-pointer border-0 ${
                                        rightColumnTab === 'faqs'
                                            ? 'bg-surface-container-lowest text-primary shadow-sm'
                                            : 'text-on-surface-variant hover:text-on-surface'
                                    }`}
                                >
                                    <HelpCircle className="w-3.5 h-3.5" />
                                    FAQs
                                </button>
                            </div>
                        )}

                        {rightColumnTab === 'tickets' && initialUser ? (
                            <div className="bg-surface-container-lowest border border-outline-variant p-8 rounded-3xl shadow-sm">
                                <div className="mb-6 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-headline-md font-bold text-on-surface">
                                            My Support Tickets
                                        </h2>
                                        <p className="text-body-sm text-on-surface-variant mt-1">
                                            Track the resolution status of your active inquiries.
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 bg-primary/5 border border-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <MessageSquare className="w-6 h-6 text-primary" />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {tickets && tickets.length > 0 ? (
                                        tickets.map((ticket, index) => {
                                            const isOpen = openTicketIndex === index;
                                            const ticketDate = new Date(ticket.created_at).toLocaleDateString(undefined, {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            });

                                            return (
                                                <div 
                                                    key={ticket.id} 
                                                    className={`border border-outline-variant/60 rounded-2xl p-4 transition-all duration-300 ${
                                                        isOpen 
                                                            ? 'bg-surface-container-low border-primary/30' 
                                                            : 'bg-surface-container-lowest hover:bg-surface-container-low/50'
                                                    }`}
                                                >
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex items-start justify-between gap-4">
                                                            <button
                                                                onClick={() => setOpenTicketIndex(isOpen ? null : index)}
                                                                className="flex-1 flex items-center justify-between text-left font-bold text-body-sm text-on-surface hover:text-primary transition-colors cursor-pointer border-0 bg-transparent p-0"
                                                            >
                                                                <span className="pr-4">{ticket.subject}</span>
                                                                <ChevronDown 
                                                                    className={`w-4 h-4 text-on-surface-variant transition-transform duration-300 flex-shrink-0 ${
                                                                        isOpen ? 'rotate-180 text-primary' : ''
                                                                    }`}
                                                                />
                                                            </button>
                                                        </div>
                                                        <div className="flex flex-wrap items-center gap-2 text-[10px]">
                                                            <span className="font-mono text-on-surface-variant opacity-60">{ticketDate}</span>
                                                            <span className="px-2 py-0.5 rounded-md bg-surface-container border border-outline-variant text-on-surface-variant font-bold uppercase tracking-wider">
                                                                {CATEGORY_MAP[ticket.category as keyof typeof CATEGORY_MAP] || ticket.category}
                                                            </span>
                                                            {ticket.status === 'resolved' ? (
                                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                                                                    <CheckCircle className="w-3 h-3" /> RESOLVED
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold bg-amber-500/10 text-amber-700 border border-amber-500/20">
                                                                    <Clock className="w-3 h-3" /> IN REVIEW
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <AnimatePresence initial={false}>
                                                        {isOpen && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                                                className="overflow-hidden"
                                                            >
                                                                <p className="text-body-sm text-on-surface-variant mt-3 leading-relaxed border-t border-outline-variant/40 pt-3 whitespace-pre-line">
                                                                    {ticket.message}
                                                                </p>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="text-center py-12 text-on-surface-variant bg-surface-container-low/50 rounded-2xl border border-dashed border-outline-variant/60">
                                            <MessageSquare className="w-10 h-10 text-on-surface-variant/40 mx-auto mb-3" />
                                            <p className="text-body-sm font-semibold">No tickets submitted yet</p>
                                            <p className="text-xs text-on-surface-variant mt-1.5 opacity-70">Use the form on the left to submit your first ticket.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-surface-container-lowest border border-outline-variant p-8 rounded-3xl shadow-sm">
                                <div className="mb-6 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-headline-md font-bold text-on-surface">
                                            Frequently Asked
                                        </h2>
                                        <p className="text-body-sm text-on-surface-variant mt-1">
                                            Quick answers to common inquiries.
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 bg-primary/5 border border-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <HelpCircle className="w-6 h-6 text-primary" />
                                    </div>
                                </div>

                                {/* FAQ Filtering Tabs */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {(['all', 'general', 'account', 'features'] as const).map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => {
                                                setActiveFaqTab(tab);
                                                setOpenFaqIndex(null);
                                            }}
                                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer border-0 ${
                                                activeFaqTab === tab
                                                    ? 'bg-primary text-on-primary shadow-sm'
                                                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                                            }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>

                                {/* FAQ Accordion List (Card design format) */}
                                <div className="space-y-3">
                                    {filteredFaqs.length > 0 ? (
                                        filteredFaqs.map((faq, index) => {
                                            const isOpen = openFaqIndex === index;

                                            return (
                                                <div 
                                                    key={index} 
                                                    className={`border border-outline-variant/60 rounded-2xl p-4 transition-all duration-300 ${
                                                        isOpen 
                                                            ? 'bg-surface-container-low border-primary/30' 
                                                            : 'bg-surface-container-lowest hover:bg-surface-container-low/50'
                                                    }`}
                                                >
                                                    <button
                                                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                                                        className="w-full flex items-center justify-between text-left font-semibold text-body-sm text-on-surface hover:text-primary transition-colors cursor-pointer border-0 bg-transparent p-0"
                                                    >
                                                        <span className="pr-4">{faq.question}</span>
                                                        <ChevronDown 
                                                            className={`w-4 h-4 text-on-surface-variant transition-transform duration-300 flex-shrink-0 ${
                                                                isOpen ? 'rotate-180 text-primary' : ''
                                                            }`}
                                                        />
                                                    </button>
                                                    <AnimatePresence initial={false}>
                                                        {isOpen && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                                                className="overflow-hidden"
                                                            >
                                                                <p className="text-body-sm text-on-surface-variant mt-3 leading-relaxed border-t border-outline-variant/40 pt-3">
                                                                    {faq.answer}
                                                                </p>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="text-center py-10 text-on-surface-variant bg-surface-container-low/50 rounded-2xl border border-dashed border-outline-variant/60">
                                            <p className="text-body-sm font-semibold">No questions matched</p>
                                            <p className="text-xs text-on-surface-variant mt-1.5 opacity-70">Try resetting filters or adjusting search queries.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Extra developer docs card */}
                        <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-3xl shadow-sm flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0 shadow-sm">
                                <MessageCircle className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-body-sm font-bold text-on-surface mb-0.5">Looking for Developer Docs?</h3>
                                <p className="text-body-xs text-on-surface-variant leading-relaxed">
                                    Check our technical API integrations, Webhook setups, and developer tracking references.
                                </p>
                                <a 
                                    href="/news" 
                                    className="inline-flex items-center gap-1.5 text-indigo-600 font-bold text-body-xs hover:underline mt-2 cursor-pointer group"
                                >
                                    Access Developer Guides
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}


Support.layout = (page: React.ReactNode) => (
    <TrackerLayout>{page}</TrackerLayout>
);
