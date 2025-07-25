
'use client'

import React from 'react';
import type { User, HelpRequest } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Star, MessageSquare } from "lucide-react";
import { mockUsers } from "@/lib/data";
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRequest } from '@/context/RequestContext';
import { useUser } from '@/context/UserContext';


const HelperCard = ({ helper, index }: { helper: User, index: number }) => (
    <Card className="bg-[#2C3E38] border-gray-700 text-white animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
        <CardContent className="p-4">
            <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-green-400">
                    <AvatarImage src={helper.avatar || `https://placehold.co/48x48`} alt={helper.name} data-ai-hint="user avatar" />
                    <AvatarFallback>{helper.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                    <h3 className="font-bold">{helper.name}</h3>
                    <div className="flex items-center text-yellow-400 mt-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < (helper.rating || 0) ? 'fill-current' : ''}`} />
                        ))}
                         <span className="ml-1 text-xs text-gray-400">({helper.rating})</span>
                    </div>
                </div>
                <Link href={`/chat/${helper.id}`}>
                    <Button size="sm" variant="ghost" className="text-green-400 hover:bg-green-800/50">
                        <MessageSquare className="h-4 w-4" />
                    </Button>
                </Link>
            </div>
            <p className="text-xs text-gray-400 mt-3">Skills: {helper.skills?.join(', ')}</p>
            <p className="text-xs text-gray-400 mt-1">Location: {helper.lga}</p>
            <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">View Profile</Button>
        </CardContent>
    </Card>
);

const GigCard = ({ gig, farmer, index }: { gig: HelpRequest, farmer?: User, index: number }) => (
    <Card className="bg-[#2C3E38] border-gray-700 text-white animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
        <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="text-base">{gig.taskType}</CardTitle>
                    {farmer && <CardDescription className="text-gray-400 text-xs">by {farmer.name}</CardDescription>}
                </div>
                <Badge variant="outline" className="border-green-800 text-green-300 capitalize">{gig.rewardType}</Badge>
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-gray-300 mb-3 line-clamp-2">{gig.description}</p>
            <p className="text-lg font-semibold text-green-400">₦{gig.budget.toLocaleString()}</p>
        </CardContent>
         <CardFooter className="text-xs text-gray-500 justify-between">
            <span>{gig.lga}</span>
            <span>Posted recently</span>
        </CardFooter>
    </Card>
)

export default function FarmerDashboard({ user }: { user: User }) {
    const { users } = useUser();
    const { requests } = useRequest();

    const topHelpers = mockUsers
        .filter(u => u.role === 'helper' && u.isAvailable && (u.rating || 0) >= 4)
        .slice(0, 4);
        
    const recentGigs = requests.filter(r => r.status === 'open');

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-headline">Farmer Dashboard</h1>
                    <p className="text-gray-400">Find talent and see market activity.</p>
                </div>
                 <Link href="/post">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <PlusCircle className="mr-2 h-4 w-4" /> Post New Request
                    </Button>
                </Link>
            </div>

            <Tabs defaultValue="helpers" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-[#1A2D27]">
                    <TabsTrigger value="helpers">Find Helpers</TabsTrigger>
                    <TabsTrigger value="gigs">Recent Gigs</TabsTrigger>
                </TabsList>
                <TabsContent value="helpers" className="mt-4">
                     <div className="grid gap-4 md:grid-cols-2">
                        {topHelpers.map((helper, index) => <HelperCard key={helper.id} helper={helper} index={index} />)}
                     </div>
                </TabsContent>
                <TabsContent value="gigs" className="mt-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        {recentGigs.map((gig, index) => {
                             const farmer = users.find(u => u.id === gig.farmerId);
                             return <GigCard key={gig.id} gig={gig} farmer={farmer} index={index} />
                        })}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
