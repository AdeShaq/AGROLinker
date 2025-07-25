
'use client';

import React from 'react';
import type { User, HelpRequest } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/context/UserContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MapPin } from 'lucide-react';
import { useRequest } from '@/context/RequestContext';

const GigCard = ({ gig, onAccept, farmer, index }: { gig: HelpRequest, onAccept: (gig: HelpRequest) => void, farmer?: User, index: number }) => (
    <Card className="flex flex-col bg-[#2C3E38] border-gray-700 text-white animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
        <CardHeader>
            <div className="flex justify-between items-start">
                <CardTitle>{gig.taskType}</CardTitle>
                <Badge variant="outline" className="border-green-800 text-green-300 capitalize">{gig.rewardType}</Badge>
            </div>
            {farmer && (
                <div className="flex items-center gap-2 pt-2">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={farmer.avatar} alt={farmer.name} data-ai-hint="user avatar" />
                        <AvatarFallback>{farmer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-gray-400">Posted by {farmer.name}</span>
                </div>
            )}
        </CardHeader>
        <CardContent className="flex-grow">
            <p className="text-sm text-gray-300 mb-3 line-clamp-2">{gig.description}</p>
            <div className="flex items-center text-xs text-gray-400 gap-1">
                <MapPin className="h-3 w-3" />
                <span>{gig.lga}</span>
            </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
             <div>
                <p className="text-lg font-semibold text-green-400">₦{gig.budget.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Posted recently</p>
             </div>
            <Button size="sm" onClick={() => onAccept(gig)} className="bg-green-600 hover:bg-green-700 text-white">Accept Job</Button>
        </CardFooter>
    </Card>
)

export default function HelperDashboard({ user }: { user: User }) {
    const { toast } = useToast();
    const { users, updateUser } = useUser();
    const { requests, updateRequest } = useRequest();
    
    const isAvailable = user.isAvailable;

    const handleAvailabilityChange = (checked: boolean) => {
        updateUser(user.id, { isAvailable: checked });
        toast({
            title: `You are now ${checked ? 'available' : 'unavailable'} for work.`,
        });
    }

    const handleAcceptJob = (gig: HelpRequest) => {
        updateRequest(gig.id, { status: 'accepted', assignedHelperId: user.id });
        toast({
            title: "Job Accepted!",
            description: `You have accepted the task: "${gig.taskType}". The farmer will be notified.`,
        });
    };
    
    const availableJobs = requests.filter(req => req.status === 'open');

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex items-center justify-between">
                 <div>
                    <h1 className="text-2xl font-bold font-headline">Hottest Gigs</h1>
                    <p className="text-gray-400">Here are available jobs in your area.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="availability-mode" checked={isAvailable} onCheckedChange={handleAvailabilityChange} />
                    <Label htmlFor="availability-mode" className="text-sm">Available</Label>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {isAvailable && availableJobs.map((job, index) => {
                    const farmer = users.find(u => u.id === job.farmerId);
                    return (
                        <GigCard key={job.id} gig={job} onAccept={handleAcceptJob} farmer={farmer} index={index} />
                    )
                })}
            </div>

            {(!isAvailable || availableJobs.length === 0) && (
                <div className="text-center py-16 col-span-full bg-[#1A2D27] rounded-2xl animate-fade-in">
                    <p className="text-gray-400">
                        {isAvailable ? "No jobs currently available in your area. We'll notify you!" : "You are currently marked as unavailable. Toggle the switch to see jobs."}
                    </p>
                </div>
            )}
        </div>
    );
}
