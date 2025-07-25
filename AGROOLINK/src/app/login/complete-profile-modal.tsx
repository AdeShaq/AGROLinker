
'use client';

import React, { useState } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import type { UserRole } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface CompleteProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    onProfileComplete: () => void;
    user: FirebaseUser;
}

export default function CompleteProfileModal({ isOpen, onClose, onProfileComplete, user }: CompleteProfileModalProps) {
    const { updateUserProfile } = useUser();
    const { toast } = useToast();
    const [name, setName] = useState('');
    const [role, setRole] = useState<UserRole | ''>('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
        if (!name.trim() || !role) {
            setError('Please fill out all fields.');
            return;
        }
        setError('');
        setIsSubmitting(true);
        try {
            updateUserProfile(user.uid, name, role as UserRole);
            // This now just updates the context. The redirection will be handled by the page.
            onProfileComplete();
        } catch (e) {
             toast({
                title: "Error",
                description: "Could not save profile. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="bg-[#1A2D27] text-white border-gray-700">
                <DialogHeader>
                    <DialogTitle>Complete Your Profile</DialogTitle>
                    <DialogDescription>
                        Tell us a bit more about yourself to get started.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., John Doe"
                            className="bg-[#2C3E38] border-gray-600 text-white"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">I am a...</Label>
                         <Select onValueChange={(value) => setRole(value as UserRole)} value={role}>
                            <SelectTrigger id="role" className="bg-[#2C3E38] border-gray-600 text-white">
                                <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#2C3E38] text-white border-gray-600">
                                <SelectItem value="farmer" className="focus:bg-green-800">Farmer (I want to hire help)</SelectItem>
                                <SelectItem value="helper" className="focus:bg-green-800">Helper (I'm looking for work)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-green-600 hover:bg-green-700">
                        {isSubmitting ? 'Saving...' : 'Save and Continue'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
