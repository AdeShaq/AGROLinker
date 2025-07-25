
'use client';

import {
  Bell,
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useUser } from "@/context/UserContext";
import FarmerDashboard from './farmer-dashboard';
import HelperDashboard from './helper-dashboard';
import AdminDashboard from './admin-dashboard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppBottomNav from '@/components/app-bottom-nav';
import React, { useState, useEffect } from 'react';
import UssdModal from './ussd-modal';

export default function DashboardPage() {
    const { currentUser, setCurrentUser, users } = useUser();
    const [isUssdModalOpen, setIsUssdModalOpen] = useState(false);

    useEffect(() => {
        const hasSeenUssdModal = sessionStorage.getItem('hasSeenUssdModal');
        if (!hasSeenUssdModal) {
            const timer = setTimeout(() => {
                setIsUssdModalOpen(true);
                sessionStorage.setItem('hasSeenUssdModal', 'true');
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    if (!currentUser) return null;

    const handleRoleChange = (userId: string) => {
        const user = users.find((u) => u.id === userId);
        if (user) {
          setCurrentUser(user);
        }
    };

    const renderDashboard = () => {
        switch (currentUser.role) {
            case 'farmer':
                return <FarmerDashboard user={currentUser} />;
            case 'helper':
                return <HelperDashboard user={currentUser} />;
            case 'admin':
                return <AdminDashboard user={currentUser} />;
            default:
                return <div>Select a role to see the dashboard.</div>
        }
    }

  return (
    <>
    <div className="flex min-h-screen flex-col bg-[#111814] pb-24 text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-[#1A2D27] animate-fade-in-down">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={currentUser.avatar || "https://placehold.co/40x40"} alt={currentUser.name} data-ai-hint="user avatar" />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
           <div>
              <p className="text-sm text-gray-400">Welcome back,</p>
              <h1 className="font-bold text-lg">{currentUser.name.split(' ')[0]}</h1>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <Select onValueChange={handleRoleChange} defaultValue={currentUser.id}>
                <SelectTrigger className="w-auto bg-transparent border-none text-white focus:ring-0">
                    <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className="bg-[#2C3E38] text-white border-gray-600">
                    {users.map(user => (
                        <SelectItem key={user.id} value={user.id} className="focus:bg-green-800">
                        {user.name} ({user.role})
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Link href="/profile/notifications">
              <Button variant="ghost" size="icon" className="relative text-white">
                  <Bell className="h-6 w-6" />
                  <span className="absolute right-1 top-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#1A2D27]"></span>
              </Button>
            </Link>
        </div>
      </header>

      <main className="flex-1 space-y-6 p-4">
        {renderDashboard()}
      </main>

      <AppBottomNav active="Home" />
    </div>
    <UssdModal isOpen={isUssdModalOpen} onClose={() => setIsUssdModalOpen(false)} />
    </>
  );
}
