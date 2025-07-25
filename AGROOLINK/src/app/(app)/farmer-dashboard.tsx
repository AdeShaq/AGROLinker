
'use client'

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Clock, CheckCircle, UserCheck } from "lucide-react";
import type { User, HelpRequest } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { useRequest } from '@/context/RequestContext';

const StatusIcon = ({ status }: { status: HelpRequest['status'] }) => {
    switch (status) {
        case 'open':
            return <Clock className="h-5 w-5 text-yellow-400" />;
        case 'accepted':
            return <UserCheck className="h-5 w-5 text-blue-400" />;
        case 'completed':
            return <CheckCircle className="h-5 w-5 text-green-400" />;
        default:
            return <Clock className="h-5 w-5 text-gray-400" />;
    }
};

const statusColor: { [key in HelpRequest['status']]: string } = {
  open: 'bg-yellow-500/20 text-yellow-300',
  accepted: 'bg-blue-500/20 text-blue-300',
  completed: 'bg-green-500/20 text-green-300',
  flagged: 'bg-red-500/20 text-red-300',
}

export default function FarmerDashboard({ user }: { user: User }) {
    const { requests } = useRequest();
    const farmerRequests = requests.filter(req => req.farmerId === user.id);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-headline">Your Requests</h1>
                    <p className="text-gray-400">Here are your current help requests.</p>
                </div>
                <Link href="/post">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <PlusCircle className="mr-2 h-4 w-4" /> Post New Request
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {farmerRequests.map((request) => (
                    <Card key={request.id} className="bg-[#2C3E38] border-gray-700 text-white">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                             <CardTitle className="text-sm font-medium">{request.taskType}</CardTitle>
                             <StatusIcon status={request.status} />
                        </CardHeader>
                        <CardContent>
                             <p className="text-xs text-gray-400 pb-4">{request.description}</p>
                             <div className="flex items-center justify-between text-sm text-gray-400">
                                <Badge variant="outline" className={`capitalize border-none ${statusColor[request.status]}`}>{request.status}</Badge>
                                <span>{formatDistanceToNow(request.createdAt, { addSuffix: true })}</span>
                             </div>
                        </CardContent>
                    </Card>
                ))}
                 {farmerRequests.length === 0 && (
                    <p className="col-span-full text-center text-gray-500">You have not posted any requests yet.</p>
                )}
            </div>
        </div>
    );
}
