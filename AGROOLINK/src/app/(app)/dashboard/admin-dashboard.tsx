

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { User, HelpRequest } from '@/lib/types';
import { useUser } from "@/context/UserContext";
import { useRequest } from "@/context/RequestContext";


const statusColor: { [key in HelpRequest['status']]: string } = {
  open: 'bg-yellow-500/20 text-yellow-300',
  accepted: 'bg-blue-500/20 text-blue-300',
  completed: 'bg-green-500/20 text-green-300',
  flagged: 'bg-red-500/20 text-red-300',
}

export default function AdminDashboard({ user }: { user: User }) {
  const { users } = useUser();
  const { requests } = useRequest();

  const allRequests = requests.map(req => {
    const farmer = users.find(u => u.id === req.farmerId);
    const helper = users.find(u => u.id === req.assignedHelperId);
    return {...req, farmerName: farmer?.name, helperName: helper?.name }
  });

  return (
    <div className="space-y-6 animate-fade-in-up">
        <div>
            <h1 className="text-2xl font-bold font-headline">Admin Dashboard</h1>
            <p className="text-gray-400">Overview of all platform activity.</p>
        </div>
        <div className="bg-[#1A2D27] rounded-2xl p-2">
            <Table>
                <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-800/20">
                    <TableHead className="text-white">Task Type</TableHead>
                    <TableHead className="text-white">Farmer</TableHead>
                    <TableHead className="text-white">Helper</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white">Budget</TableHead>
                    <TableHead className="text-white">AI Suggestion</TableHead>
                    <TableHead>
                    <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {allRequests.map((request) => (
                    <TableRow key={request.id} className="border-gray-800 hover:bg-gray-800/30">
                    <TableCell className="font-medium">{request.taskType}</TableCell>
                    <TableCell>{request.farmerName}</TableCell>
                    <TableCell>{request.helperName || 'N/A'}</TableCell>
                    <TableCell>
                        <Badge variant="outline" className={`capitalize border-none ${statusColor[request.status]}`}>{request.status}</Badge>
                    </TableCell>
                    <TableCell>₦{request.budget.toLocaleString()}</TableCell>
                    <TableCell>
                        {request.aiSuggestion ? (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Info className="h-4 w-4 text-blue-400" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs bg-[#2C3E38] text-white border-gray-700">
                                    <p className="font-bold">AI Reasoning</p>
                                    <p>{request.aiSuggestion.reasoning}</p>
                                    <p className="mt-2 font-bold">Suggested Helpers:</p>
                                    <p>{request.aiSuggestion.suggestedHelperIds.join(', ')}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        ) : 'N/A'}
                    </TableCell>
                    <TableCell>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost" className="hover:bg-gray-700">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#2C3E38] text-white border-gray-700">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="focus:bg-green-800">View Details</DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-green-800">Approve Match</DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-green-800">Flag Request</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    </div>
  );
}
