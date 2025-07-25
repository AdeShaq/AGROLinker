
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { PhoneOutgoing, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UssdModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function UssdModal({ isOpen, onClose }: UssdModalProps) {
    const { toast } = useToast();
    const ussdCode = '*384*0519#';

    const handleCopyToPhone = () => {
        navigator.clipboard.writeText(ussdCode).then(() => {
            toast({
                title: "USSD Code Copied!",
                description: "The USSD code has been copied to your clipboard.",
            });
            window.location.href = `tel:${encodeURIComponent(ussdCode)}`;
        }).catch(err => {
             toast({
                title: "Error",
                description: "Could not copy code. Please try again.",
                variant: "destructive",
            });
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#1A2D27] text-white border-gray-700 max-w-sm">
                <DialogHeader className="items-center text-center">
                    <div className="p-3 bg-green-500/20 rounded-full mb-2 w-fit">
                        <PhoneOutgoing className="h-6 w-6 text-green-300"/>
                    </div>
                    <DialogTitle className="text-xl">Access via USSD</DialogTitle>
                    <DialogDescription>
                        No internet? No problem! You can access AgroLinker services by dialing our USSD code.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 text-center">
                    <p className="text-sm text-gray-400">Dial the code below on your phone:</p>
                    <div className="my-4 p-4 bg-[#2C3E38] rounded-xl">
                        <p className="text-3xl font-bold tracking-widest text-green-400">{ussdCode}</p>
                    </div>
                </div>
                <DialogFooter className="flex-col gap-2">
                    <Button onClick={handleCopyToPhone} className="w-full bg-green-600 hover:bg-green-700">
                        <Copy className="mr-2 h-4 w-4" />
                        Copy to Dialer
                    </Button>
                    <Button onClick={onClose} variant="outline" className="w-full border-gray-600 hover:bg-gray-700/50">
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

