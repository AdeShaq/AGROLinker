
'use client';

import { ArrowLeft, CheckCircle, Clock, UserCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import type { HelpRequest } from '@/lib/types';
import { useUser } from '@/context/UserContext';
import { useRequest } from '@/context/RequestContext';

const StatusIcon = ({ status }: { status: HelpRequest['status'] }) => {
    switch (status) {
        case 'open':
            return <Clock className="h-5 w-5 text-yellow-500" />;
        case 'accepted':
            return <UserCheck className="h-5 w-5 text-blue-500" />;
        case 'completed':
            return <CheckCircle className="h-5 w-5 text-green-500" />;
        default:
            return <Clock className="h-5 w-5 text-gray-500" />;
    }
};

const NairaIcon = ({ className }: { className?: string }) => (
    <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 18V6H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 12H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 18L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export default function JobHistoryPage() {
    const { currentUser, users } = useUser();
    const { requests } = useRequest();
    
    if (!currentUser) return null;

    const jobHistory = requests.filter(req => 
        (currentUser.role === 'farmer' && req.farmerId === currentUser.id) || 
        (currentUser.role === 'helper' && req.assignedHelperId === currentUser.id)
    );

  return (
    <div className="flex min-h-screen flex-col bg-[#111814] text-white">
      <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#1A2D27] p-4">
        <Link href="/profile">
            <Button variant="ghost" size="icon" className="text-white">
                <ArrowLeft className="h-6 w-6" />
            </Button>
        </Link>
        <h1 className="text-xl font-bold">Job History</h1>
      </header>
      <main className="flex-1 p-4 space-y-4">
        {jobHistory.length > 0 ? (
            jobHistory.map((job) => {
                const otherUser = currentUser.role === 'farmer' 
                    ? users.find(u => u.id === job.assignedHelperId) 
                    : users.find(u => u.id === job.farmerId);
                
                return (
                    <Card key={job.id} className="bg-[#1A2D27] border-gray-700 text-white">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg">{job.taskType}</CardTitle>
                                    <p className="text-sm text-gray-400">{job.description}</p>
                                </div>
                                <Badge variant="outline" className={`capitalize border-none ${job.status === 'completed' ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/20 text-blue-300'}`}>{job.status}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                           <div className="flex justify-between items-center text-sm">
                               <p className="text-gray-400">{currentUser.role === 'farmer' ? 'Helper' : 'Farmer'}: <span className="font-semibold text-white">{otherUser?.name || 'Not Assigned'}</span></p>
                               <p className="flex items-center font-bold text-lg"><NairaIcon className="mr-1"/>{job.budget.toLocaleString()}</p>
                           </div>
                           <div className="flex justify-between items-center text-xs text-gray-500">
                               <span>{format(job.createdAt, 'MMM d, yyyy')}</span>
                               <span>{job.lga}</span>
                           </div>
                        </CardContent>
                    </Card>
                )
            })
        ) : (
             <div className="text-center py-10">
                <p className="text-gray-500">You have no job history yet.</p>
            </div>
        )}
      </main>
    </div>
  );
}
