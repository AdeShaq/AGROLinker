
'use client';

import { ArrowLeft, CheckCircle, UserPlus, MessageSquareWarning } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const notifications = [
    { 
        id: 1, 
        type: 'job_accepted',
        user: { name: 'Yusuf Alabi', avatar: 'https://placehold.co/40x40' },
        text: 'has accepted your job post for',
        job: 'Water Pump Repair',
        time: '5m ago',
        read: false,
    },
    { 
        id: 2, 
        type: 'job_completed',
        user: { name: 'Sade Ajayi', avatar: 'https://placehold.co/40x40' },
        text: 'has marked the job',
        job: 'Transport Seedlings',
        status: 'as completed.',
        time: '1h ago',
        read: false,
    },
    { 
        id: 3, 
        type: 'new_message',
        user: { name: 'Amaka F.', avatar: 'https://placehold.co/40x40' },
        text: 'sent you a message.',
        time: '3h ago',
        read: true,
    },
    { 
        id: 4, 
        type: 'job_flagged',
        user: { name: 'Admin', avatar: 'https://placehold.co/40x40' },
        text: 'has flagged your request',
        job: 'Cassava Harvesting',
        status: 'due to policy violations.',
        time: '1d ago',
        read: true,
    },
];

const NotificationIcon = ({ type }: { type: string }) => {
    switch (type) {
        case 'job_accepted':
            return <UserPlus className="h-5 w-5 text-blue-400" />;
        case 'job_completed':
            return <CheckCircle className="h-5 w-5 text-green-400" />;
        case 'new_message':
            return <MessageSquareWarning className="h-5 w-5 text-purple-400" />;
        case 'job_flagged':
            return <MessageSquareWarning className="h-5 w-5 text-red-400" />;
        default:
            return <CheckCircle className="h-5 w-5 text-gray-400" />;
    }
};

export default function NotificationsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#111814] text-white">
      <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#1A2D27] p-4">
        <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full h-10 w-10">
                <ArrowLeft className="h-6 w-6" />
            </Button>
        </Link>
        <h1 className="text-xl font-bold">Notifications</h1>
        <div className="w-10"></div>
      </header>
      <main className="flex-1 space-y-3 p-4">
        {notifications.map((notification) => (
             <div key={notification.id} className={`flex items-start gap-4 rounded-2xl p-4 ${notification.read ? 'bg-[#1A2D27]' : 'bg-[#2C3E38]'}`}>
                <div className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-black/20`}>
                   <NotificationIcon type={notification.type} />
                </div>
                <div className="flex-grow">
                    <p className="text-sm text-gray-300">
                        <span className="font-bold text-white">{notification.user.name}</span>
                        {' '}{notification.text}{' '}
                        {notification.job && <span className="font-semibold text-green-400">"{notification.job}"</span>}
                        {' '}{notification.status}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
                {!notification.read && <div className="h-2 w-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>}
            </div>
        ))}
        {notifications.length === 0 && (
            <div className="text-center py-20">
                <p className="text-gray-500">You have no notifications yet.</p>
            </div>
        )}
      </main>
    </div>
  );
}
