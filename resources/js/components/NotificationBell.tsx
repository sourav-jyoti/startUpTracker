import React, { useState, useEffect, useRef } from 'react';
import { Bell, Check, Trash2, Mail, Rocket, ArrowUpCircle, ExternalLink } from 'lucide-react';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { Link } from '@inertiajs/react';

interface NotificationData {
    type: string;
    title: string;
    message: string;
    url?: string;
    startup_id?: number;
    user_id?: number;
    upvoter_id?: number;
}

interface Notification {
    id: string;
    type: string;
    notifiable_type: string;
    notifiable_id: number;
    data: NotificationData;
    read_at: string | null;
    created_at: string;
    updated_at: string;
}

export default function NotificationBell() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const prevIdsRef = useRef<Set<string>>(new Set());

    const fetchNotifications = async () => {
        try {
            const response = await fetch('/api/notifications');
            if (response.ok) {
                const data: Notification[] = await response.json();
                
                // Determine unread count
                const unread = data.filter(n => n.read_at === null);
                setUnreadCount(unread.length);
                setNotifications(data);

                // Check for new notifications to trigger toast
                const newIds = new Set(data.map(n => n.id));
                const prevIds = prevIdsRef.current;

                if (prevIds.size > 0) {
                    const latestNew = data.filter(n => !prevIds.has(n.id) && n.read_at === null);
                    latestNew.forEach(notification => {
                        toast.info(notification.data.title, {
                            description: notification.data.message,
                            icon: getIconForType(notification.data.type, "w-4 h-4")
                        });
                    });
                }
                
                prevIdsRef.current = newIds;
            }
        } catch (error) {
            console.error("Failed to fetch notifications", error);
        }
    };

    useEffect(() => {
        fetchNotifications();
        // Poll every 30 seconds
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    const markAsRead = async (id: string) => {
        try {
            const res = await fetch(`/api/notifications/${id}/mark-read`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                }
            });
            if (res.ok) {
                setNotifications(notifications.map(n => n.id === id ? { ...n, read_at: new Date().toISOString() } : n));
                setUnreadCount(Math.max(0, unreadCount - 1));
            }
        } catch (error) {
            console.error("Failed to mark notification as read", error);
        }
    };

    const markAllAsRead = async () => {
        try {
            const res = await fetch(`/api/notifications/mark-all-read`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                }
            });
            if (res.ok) {
                setNotifications(notifications.map(n => ({ ...n, read_at: new Date().toISOString() })));
                setUnreadCount(0);
                toast.success("All notifications marked as read");
            }
        } catch (error) {
            console.error("Failed to mark all as read", error);
        }
    };

    const getIconForType = (type: string, className = "w-5 h-5") => {
        switch (type) {
            case 'upvote': return <ArrowUpCircle className={`${className} text-emerald-500`} />;
            case 'new_startup': return <Rocket className={`${className} text-primary`} />;
            case 'new_user': return <Mail className={`${className} text-blue-500`} />;
            case 'user_deleted': return <Trash2 className={`${className} text-error`} />;
            default: return <Bell className={className} />;
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="relative p-2 rounded-full hover:bg-surface-container-high transition-colors focus:outline-none">
                <Bell className="w-5 h-5 text-on-surface" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full animate-pulse border border-surface-container-lowest"></span>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-surface-container-lowest border border-outline-variant shadow-xl rounded-xl p-0 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant/50 bg-surface-container/30">
                    <DropdownMenuLabel className="font-bold p-0 m-0 text-title-sm flex items-center gap-2">
                        Notifications
                        {unreadCount > 0 && (
                            <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {unreadCount} new
                            </span>
                        )}
                    </DropdownMenuLabel>
                    {unreadCount > 0 && (
                        <button 
                            onClick={(e) => { e.preventDefault(); markAllAsRead(); }}
                            className="text-[10px] font-bold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-wider"
                        >
                            <Check className="w-3 h-3" /> Mark all read
                        </button>
                    )}
                </div>
                
                <div className="max-h-[350px] overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center text-on-surface-variant flex flex-col items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center mb-1">
                                <Bell className="w-5 h-5 opacity-40" />
                            </div>
                            <p className="text-body-sm">You're all caught up!</p>
                            <p className="text-[10px] opacity-60">No new notifications.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {notifications.map((notification) => (
                                <div 
                                    key={notification.id} 
                                    className={`relative p-4 border-b border-outline-variant/30 last:border-b-0 hover:bg-surface-container-high/50 transition-colors cursor-pointer group ${!notification.read_at ? 'bg-primary/5' : ''}`}
                                    onClick={() => {
                                        if (!notification.read_at) markAsRead(notification.id);
                                        if (notification.data.url) {
                                            window.location.href = notification.data.url;
                                        }
                                    }}
                                >
                                    <div className="flex gap-3 items-start">
                                        <div className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${!notification.read_at ? 'bg-surface-container-lowest shadow-sm' : 'bg-surface-container'}`}>
                                            {getIconForType(notification.data.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-body-sm truncate ${!notification.read_at ? 'font-bold text-on-surface' : 'font-medium text-on-surface-variant'}`}>
                                                {notification.data.title}
                                            </p>
                                            <p className="text-body-xs text-on-surface-variant line-clamp-2 mt-0.5">
                                                {notification.data.message}
                                            </p>
                                            <p className="text-[10px] text-on-surface-variant/70 mt-1.5 font-mono">
                                                {new Date(notification.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                        {!notification.read_at && (
                                            <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5"></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
