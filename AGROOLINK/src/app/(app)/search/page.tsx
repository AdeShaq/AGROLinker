

'use client';

import { useState } from 'react';
import { ArrowLeft, ListFilter, Star, Tractor, Search } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppBottomNav from '@/components/app-bottom-nav';
import { useUser } from '@/context/UserContext';
import type { User } from '@/lib/types';


const mockJobs = [
    {
        type: 'job',
        title: 'Cassava Harvesting',
        author: 'Amaka F.',
        price: '₦2,000',
        duration: '1 day',
        distance: '2.1km away',
        posted: 'Posted 2h ago',
        tags: ['Urgent', 'Experience Required'],
        icon: Tractor,
        iconBg: 'bg-green-300/20',
        iconColor: 'text-green-300',
    },
    {
        type: 'job',
        title: 'Cassava Farm Preparation',
        author: 'Chidi O.',
        price: '₦5,000',
        duration: '3 days',
        distance: '5.2km away',
        posted: 'Posted 4h ago',
        tags: ['High Pay'],
        icon: () => (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.2231 20.9998C14.4716 20.9998 14.7107 20.9095 14.8966 20.7416L20.2435 15.8231C20.4294 15.6551 20.5283 15.4225 20.5283 15.1786V4.82117C20.5283 4.57728 20.4294 4.34468 20.2435 4.1767L14.8966 3.25816C14.7107 3.09021 14.4716 3 14.2231 3H9.77685C9.5284 3 9.28929 3.09021 9.10338 3.25816L3.75652 4.1767C3.57061 4.34468 3.47168 4.57728 3.47168 4.82117V15.1786C3.47168 15.4225 3.57061 15.6551 3.75652 15.8231L9.10338 20.7416C9.28929 20.9095 9.5284 20.9998 9.77685 20.9998H14.2231Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8.25V15.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.25 12.75L12 15.75L15.75 12.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        ),
        iconBg: 'bg-yellow-300/20',
        iconColor: 'text-yellow-300',
    },
    {
        type: 'job',
        title: 'Cassava Processing Help',
        author: 'Grace N.',
        price: '₦1,500',
        duration: 'Half day',
        distance: '3.8km away',
        posted: 'Posted 6h ago',
        tags: ['Entry Level'],
        icon: () => (
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 16L12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M17.6568 6.34315L13.4142 10.5858" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M10.5858 13.4142L6.34315 17.6569" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8 12L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M22 12L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M17.6568 17.6569L13.4142 13.4142" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M10.5858 10.5858L6.34315 6.34315" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
        ),
        iconBg: 'bg-purple-300/20',
        iconColor: 'text-purple-300',
    }
];

const filterCategories = ["All", "Jobs", "Helpers", "Farmers", "Nearby"];

const JobCard = ({ item, index }: { item: any, index: number }) => (
    <div className="bg-[#2C3E38] rounded-2xl p-4 space-y-3 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
        <div className="flex items-start gap-4">
             <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${item.iconBg}`}>
                <item.icon className={`h-5 w-5 ${item.iconColor}`} />
            </div>
            <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-white">{item.title}</h3>
                    <div className="text-right">
                        <p className="font-bold text-lg text-green-400">{item.price}</p>
                        <p className="text-xs text-gray-400">{item.duration}</p>
                    </div>
                </div>
                 <p className="text-sm text-gray-400">by {item.author}</p>
                 <p className="text-xs text-gray-500 mt-1">{item.distance} &bull; {item.posted}</p>
            </div>
        </div>
        <div className="flex justify-between items-center">
             <div className="flex items-center gap-2">
                {item.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className={`text-xs font-normal ${tag === 'Urgent' || tag === 'High Pay' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-300'} border-none`}>{tag}</Badge>
                ))}
            </div>
            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-6 h-9">Apply</Button>
        </div>
    </div>
);

const HelperCard = ({ item, index }: { item: any, index: number }) => (
     <div className="bg-[#2C3E38] rounded-2xl p-4 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
        <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20 border-2 border-green-400">
                <AvatarImage src={item.avatar} alt={item.name} data-ai-hint="user avatar" />
                <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
                 <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-white">{item.name}</h3>
                        <p className="text-sm text-gray-400 capitalize">{item.role}</p>
                    </div>
                     <div className="flex items-center gap-1 bg-yellow-400/20 text-yellow-300 px-2 py-1 rounded-md">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-bold text-sm">{item.rating || 0}</span>
                    </div>
                </div>
                <p className="text-xs text-gray-300 mt-2 capitalize">Skills: {item.skills?.join(', ') || 'N/A'}</p>
            </div>
        </div>
         <div className="flex justify-between items-end mt-3">
             <div className="text-xs space-y-2">
                 <p className="text-gray-400">{item.lga} &bull; <span className="text-green-400 font-semibold">{item.isAvailable ? 'Available now' : 'Unavailable'}</span></p>
                 <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs font-normal bg-green-500/20 text-green-300 border-none">Verified</Badge>
                </div>
             </div>
              <Button className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-6 h-9">Contact</Button>
         </div>
     </div>
);


export default function SearchPage() {
  const { users } = useUser();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('cassava');

  const userResults = users.map(user => ({
      type: user.role, // 'farmer' or 'helper'
      ...user,
  }));

  const allResults = [...mockJobs, ...userResults];

  const filteredResults = allResults.filter(item => {
    const term = searchTerm.toLowerCase();
    const nameMatch = item.name?.toLowerCase().includes(term);
    const titleMatch = item.title?.toLowerCase().includes(term);
    const authorMatch = item.author?.toLowerCase().includes(term);

    const matchesSearchTerm = nameMatch || titleMatch || authorMatch;
    
    if (!matchesSearchTerm && term !== 'cassava') return false;
    
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Jobs') return item.type === 'job';
    if (activeFilter === 'Helpers') return item.type === 'helper';
    if (activeFilter === 'Farmers') return item.type === 'farmer';
    
    return true;
  });

  return (
    <div className="flex min-h-screen flex-col bg-[#111814] pb-24 text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 gap-3 sticky top-0 bg-[#1A2D27] z-10 animate-fade-in-down">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="text-white flex-shrink-0">
              <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
                placeholder="Search for jobs or users..."
                className="bg-[#2C3E38] border-none rounded-full pl-10 text-white placeholder:text-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <Button variant="ghost" size="icon" className="text-white flex-shrink-0">
            <ListFilter className="h-6 w-6" />
        </Button>
      </header>

      <main className="flex-1 space-y-4 p-4 animate-fade-in-up">
        
        {/* Filter Chips */}
        <div className="flex space-x-2 overflow-x-auto pb-2 -mt-2">
            {filterCategories.map((category) => (
                <Button 
                    key={category} 
                    variant="secondary" 
                    onClick={() => setActiveFilter(category)}
                    className={`rounded-full whitespace-nowrap h-8 text-sm ${activeFilter === category ? 'bg-green-400 text-black hover:bg-green-500' : 'bg-[#2C3E38] text-white hover:bg-[#44554f]'}`}>
                    {category}
                </Button>
            ))}
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center">
            <p className="text-sm text-gray-400">Found {filteredResults.length} results for "{searchTerm}"</p>
            <Button variant="ghost" className="text-green-400 h-auto p-0 text-sm">
                <ListFilter className="h-4 w-4 mr-1" />
                Sort
            </Button>
        </div>

        {/* Results List */}
        <div className="space-y-4">
            {filteredResults.map((item, index) => {
                if (item.type === 'job') {
                    return <JobCard key={`job-${index}`} item={item} index={index} />
                }
                if (item.type === 'helper' || item.type === 'farmer') {
                    return <HelperCard key={`user-${item.id}`} item={item} index={index} />
                }
                return null;
            })}
        </div>

        {/* Load More */}
        <div className="pt-4">
            <Button variant="outline" className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-[#2C3E38] hover:text-white">
                Load More Results
            </Button>
        </div>

      </main>

      <AppBottomNav active="Search" />
    </div>
  );
}
