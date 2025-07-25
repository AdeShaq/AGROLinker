
'use client';

import React, { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search } from 'lucide-react';
import type { User } from '@/lib/types';

interface NewChatModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NewChatModal({ isOpen, onClose }: NewChatModalProps) {
    const { users, currentUser } = useUser();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    const handleUserSelect = (user: User) => {
        onClose();
        router.push(`/chat/${user.id}`);
    };

    const filteredUsers = users.filter(user =>
        user.id !== currentUser?.id &&
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#1A2D27] text-white border-gray-700 max-w-sm">
                <DialogHeader>
                    <DialogTitle>Start a new chat</DialogTitle>
                    <DialogDescription>
                        Find a user on the platform to start a conversation with.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Search by name..."
                            className="w-full rounded-full border-none bg-[#2C3E38] pl-10 text-white placeholder:text-gray-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <button
                                key={user.id}
                                onClick={() => handleUserSelect(user)}
                                className="w-full flex items-center gap-4 rounded-lg p-2 text-left hover:bg-[#2C3E38] transition-colors"
                            >
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="user avatar" />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold">{user.name}</h3>
                                    <p className="text-sm text-gray-400 capitalize">{user.role}</p>
                                </div>
                            </button>
                        ))
                    ) : (
                        <p className="text-center text-gray-400 py-4">
                            {searchTerm ? 'No users found.' : 'Start typing to search for users.'}
                        </p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
