
'use client';

import { ArrowLeft, ChevronRight, User, Lock, CreditCard, Globe, LogOut } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const settingsItems = [
    {
        section: "Account",
        items: [
            { icon: User, label: "Account Information", description: "Change your personal details", href: "/profile/edit" },
            { icon: Lock, label: "Password & Security", description: "Change your password", href: "#" },
        ]
    },
    {
        section: "Payment",
        items: [
             { icon: CreditCard, label: "Payment Methods", description: "Add or remove payment methods", href: "#" },
        ]
    },
    {
        section: "General",
        items: [
            { icon: Globe, label: "Language", description: "English", href: "#" },
        ]
    }
]

export default function SettingsPage() {
    const router = useRouter();

    const handleLogout = () => {
        router.push('/login');
    }

  return (
    <div className="flex min-h-screen flex-col bg-[#111814] text-white">
      <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#1A2D27] p-4">
        <Link href="/profile">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full h-10 w-10">
                <ArrowLeft className="h-6 w-6" />
            </Button>
        </Link>
        <h1 className="text-xl font-bold">Settings</h1>
      </header>
      <main className="flex-1 p-4">
        <div className="space-y-6">
            {settingsItems.map(section => (
                 <div key={section.section}>
                     <h2 className="text-sm font-semibold text-gray-400 px-4 pb-2">{section.section}</h2>
                     <div className="space-y-2">
                        {section.items.map(item => (
                             <Link href={item.href || '#'} key={item.label} className="flex items-center rounded-2xl bg-[#1A2D27] p-4 text-left active:bg-[#2C3E38]">
                                <div className={`mr-4 rounded-lg bg-[#2C3E38] p-2`}>
                                    <item.icon className="h-5 w-5 text-gray-300"/>
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-bold">{item.label}</h4>
                                    <p className="text-xs text-gray-400">{item.description}</p>
                                </div>
                                <ChevronRight className="h-5 w-5 text-gray-500" />
                            </Link>
                        ))}
                     </div>
                 </div>
            ))}
             <div className="pt-6">
                 <Button onClick={handleLogout} variant="destructive" className="w-full bg-red-800/20 text-red-400 border border-red-800 hover:bg-red-800/40">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
             </div>
        </div>
      </main>
    </div>
  );
}
