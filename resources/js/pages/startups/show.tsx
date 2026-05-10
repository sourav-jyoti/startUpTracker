import { Head, router } from '@inertiajs/react';
import StartupDetailModal from '@/components/tracker/startup-detail-modal';
import TrackerLayout from '@/layouts/tracker-layout';
import type { Startup } from '@/types';

interface Props {
    startup: Startup;
}

export default function StartupShow({ startup }: Props) {
    function handleClose() {
        router.visit('/', { preserveScroll: true });
    }

    return (
        <>
            <Head title={`${startup.name} - Startup Tracker`} />
            <div className="flex-1 flex items-center justify-center">
                <StartupDetailModal
                    startup={startup}
                    onClose={handleClose}
                />
            </div>
        </>
    );
}

StartupShow.layout = (page: React.ReactNode) => (
    <TrackerLayout>{page}</TrackerLayout>
);
