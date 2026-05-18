import { Link, router } from '@inertiajs/react';
import { LogOut, Settings, HelpCircle } from 'lucide-react';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';
import type { User } from '@/types';

type Props = {
    user: User;
};

export function UserMenuContent({ user }: Props) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <>
            {/* User info header */}
            <div className="flex items-center gap-2 px-3 py-2 text-left text-sm border-b border-outline-variant">
                <UserInfo user={user} showEmail={true} />
            </div>

            {/* Menu items */}
            <div className="py-1">
                <Link
                    href={edit()}
                    prefetch
                    onClick={cleanup}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-on-surface hover:bg-surface-container transition-colors"
                >
                    <Settings size={16} />
                    Settings
                </Link>
                <Link
                    href="/support"
                    prefetch
                    onClick={cleanup}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-on-surface hover:bg-surface-container transition-colors"
                >
                    <HelpCircle size={16} />
                    Support
                </Link>
            </div>

            {/* Logout */}
            <div className="border-t border-outline-variant py-1">
                <Link
                    href={logout()}
                    as="button"
                    onClick={handleLogout}
                    data-test="logout-button"
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-error hover:bg-error/10 transition-colors"
                >
                    <LogOut size={16} />
                    Log out
                </Link>
            </div>
        </>
    );
}
