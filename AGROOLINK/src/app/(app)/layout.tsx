
'use client';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function AppLayoutContent({ children }: { children: React.ReactNode }) {
    const { currentUser, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !currentUser) {
            router.push('/login');
        }
    }, [currentUser, loading, router]);

    if (loading || !currentUser) {
        // You can show a loading spinner here
        return <div className="flex items-center justify-center min-h-screen bg-[#111814] text-white">Loading...</div>;
    }

    return <div className="min-h-screen w-full">{children}</div>;
}


export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayoutContent>{children}</AppLayoutContent>
  );
}
