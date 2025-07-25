
'use client';

import {
  ArrowLeft,
  MoreVertical,
  Star,
  Wallet,
  ArrowUp,
  CheckCircle,
  Clock,
  User,
  Bell,
  Settings,
  HelpCircle,
  Shield,
  LogOut,
  ChevronRight,
  History,
  Camera,
  Plus,
} from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import AppBottomNav from '@/components/app-bottom-nav';

const NairaIcon = ({ className }: { className?: string }) => (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 18V6H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 18L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const menuItems = [
    { section: "Account", items: [
        { icon: User, label: "Edit Profile", description: "Update your information", href: "/profile/edit", iconBg: "bg-blue-100 dark:bg-blue-900/30", iconColor: "text-blue-500" },
        { icon: History, label: "Job History", description: "View all your jobs", href: "/profile/history", iconBg: "bg-green-100 dark:bg-green-900/30", iconColor: "text-green-500" },
        { icon: Star, label: "Reviews", description: "See what others say", href: "/profile/reviews", iconBg: "bg-yellow-100 dark:bg-yellow-900/30", iconColor: "text-yellow-500" },
        { icon: Bell, label: "Notifications", description: "Manage preferences", href: "/profile/notifications", iconBg: "bg-purple-100 dark:bg-purple-900/30", iconColor: "text-purple-500" },
        { icon: Settings, label: "Settings", description: "App preferences", href: "/profile/settings", iconBg: "bg-gray-100 dark:bg-gray-700", iconColor: "text-gray-500" },
    ]},
    { section: "Support & Legal", items: [
        { icon: HelpCircle, label: "Help & Support", description: "Get assistance", href: "/profile/support", iconBg: "bg-orange-100 dark:bg-orange-900/30", iconColor: "text-orange-500" },
        { icon: Shield, label: "Privacy Policy", description: "Read our policy", href: "/profile/privacy", iconBg: "bg-indigo-100 dark:bg-indigo-900/30", iconColor: "text-indigo-500" },
    ]}
]

export default function ProfilePage() {
    const { currentUser, logout } = useUser();

    if (!currentUser) {
        // Or a loading spinner
        return <div>Loading...</div>;
    }

    const handleLogout = async () => {
        await logout();
    }

  return (
    <div className="flex min-h-screen flex-col bg-[#111814] pb-24 text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-[#1A2D27] p-4 shadow-sm animate-fade-in-down">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="bg-gray-100/10 text-white hover:bg-gray-100/20 rounded-full h-10 w-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Profile</h1>
        <Button variant="ghost" size="icon" className="bg-gray-100/10 text-white hover:bg-gray-100/20 rounded-full h-10 w-10">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </header>

      {/* Profile Content */}
      <main className="flex-1 overflow-y-auto animate-fade-in-up">
        {/* Profile Header */}
        <div className="px-4 py-6">
            <div className="bg-[#1A2D27] rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                         <Avatar className="h-24 w-24 border-4 border-[#1A2D27] shadow-md">
                            <AvatarImage src={currentUser.avatar || "https://placehold.co/80x80"} alt={currentUser.name} data-ai-hint="user avatar" />
                            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <Button size="icon" className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-green-600 hover:bg-green-700 shadow-lg">
                            <Camera className="h-4 w-4 text-white"/>
                        </Button>
                    </div>
                    <h2 className="text-xl font-bold mb-1">{currentUser.name}</h2>
                    <p className="text-sm text-gray-400 mb-2 capitalize">{currentUser.role}</p>
                    <div className="flex items-center text-yellow-500 mb-3">
                        <Star className="h-4 w-4 fill-current"/>
                        <Star className="h-4 w-4 fill-current"/>
                        <Star className="h-4 w-4 fill-current"/>
                        <Star className="h-4 w-4 fill-current"/>
                        <Star className="h-4 w-4" />
                        <span className="ml-2 text-sm text-gray-400">4.2 (89 reviews)</span>
                    </div>
                    <div className="flex space-x-6">
                        <div className="text-center">
                            <p className="text-lg font-bold text-agro-green">127</p>
                            <p className="text-xs text-gray-400">Jobs Posted</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-bold text-blue-500">43</p>
                            <p className="text-xs text-gray-400">Completed</p>
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-bold text-purple-500">2.3k</p>
                            <p className="text-xs text-gray-400">Followers</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Wallet Section */}
        <div className="px-4 mb-6">
            <div className="bg-gradient-to-r from-green-600 to-green-400 rounded-2xl p-6 text-white shadow-lg">
                 <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-semibold">Wallet Balance</h3>
                        <p className="text-3xl font-bold">₦12,500</p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Wallet className="text-xl"/>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <Button className="flex-1 bg-white/20 backdrop-blur-sm rounded-xl py-3 text-center font-medium hover:bg-white/30 h-auto">
                        <Plus className="mr-2 h-4 w-4"/>Top Up
                    </Button>
                    <Button className="flex-1 bg-white/20 backdrop-blur-sm rounded-xl py-3 text-center font-medium hover:bg-white/30 h-auto">
                        <ArrowUp className="mr-2 h-4 w-4"/>Withdraw
                    </Button>
                </div>
            </div>
        </div>

        {/* Quick Stats */}
        <div className="px-4 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-white">This Month</h3>
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#1A2D27] rounded-xl shadow-sm p-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-900/30 rounded-full flex items-center justify-center">
                           <CheckCircle className="text-green-500 h-5 w-5"/>
                        </div>
                        <div>
                            <p className="text-lg font-bold">12</p>
                            <p className="text-sm text-gray-400">Jobs Completed</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#1A2D27] rounded-xl shadow-sm p-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-900/30 rounded-full flex items-center justify-center">
                            <Clock className="text-blue-500 h-5 w-5"/>
                        </div>
                        <div>
                            <p className="text-lg font-bold">48h</p>
                            <p className="text-sm text-gray-400">Hours Worked</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#1A2D27] rounded-xl shadow-sm p-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-yellow-900/30 rounded-full flex items-center justify-center">
                            <Star className="text-yellow-500 h-5 w-5"/>
                        </div>
                        <div>
                            <p className="text-lg font-bold">4.8</p>
                            <p className="text-sm text-gray-400">Avg Rating</p>
                        </div>
                    </div>
                </div>
                <div className="bg-[#1A2D27] rounded-xl shadow-sm p-4">
                    <div className="flex items-center space-x-3">
                         <div className="w-10 h-10 bg-purple-900/30 rounded-full flex items-center justify-center">
                           <NairaIcon className="text-purple-500 h-5 w-5"/>
                        </div>
                        <div>
                            <p className="text-lg font-bold">₦24k</p>
                            <p className="text-sm text-gray-400">Earned</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Menu Sections */}
        {menuItems.map(section => (
            <div key={section.section} className="px-4 mb-6">
                <div className="bg-[#1A2D27] rounded-2xl shadow-sm">
                {section.items.map((item, index) => (
                    <Link href={item.href || '#'} key={item.label} className={`flex items-center justify-between p-4 ${index !== section.items.length - 1 ? 'border-b border-gray-700' : ''}`}>
                        <div className="flex items-center space-x-3">
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.iconBg}`}>
                               <item.icon className={`h-5 w-5 ${item.iconColor}`}/>
                           </div>
                           <div>
                               <h4 className="font-medium text-white">{item.label}</h4>
                               <p className="text-sm text-gray-400">{item.description}</p>
                           </div>
                        </div>
                       <ChevronRight className="h-5 w-5 text-gray-400" />
                   </Link>
                ))}
                </div>
            </div>
        ))}
         <div className="px-4 mb-6">
             <div className="bg-[#1A2D27] rounded-2xl shadow-sm">
                 <Button onClick={handleLogout} className="w-full flex items-center justify-between p-4 h-auto bg-transparent hover:bg-red-900/10">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-900/30 rounded-full flex items-center justify-center">
                            <LogOut className="h-5 w-5 text-red-500"/>
                        </div>
                        <div>
                           <h4 className="font-medium text-red-500">Logout</h4>
                           <p className="text-sm text-gray-400">Sign out of your account</p>
                        </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                 </Button>
             </div>
         </div>
      </main>

      <AppBottomNav active="Profile" />
    </div>
  );
}
