
'use client';

import { useState } from 'react';
import { ArrowLeft, Search, Plus } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppBottomNav from '@/components/app-bottom-nav';
import { Badge } from '@/components/ui/badge';
import NewChatModal from './new-chat-modal';
import { useChat } from '@/context/ChatContext';
import { useUser } from '@/context/UserContext';
import { mockUsers } from '@/lib/data';


export default function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { users, currentUser } = useUser();
  const { chats } = useChat();

  const chatListData = Object.keys(chats).map(chatId => {
      const otherUserId = chatId.split('--').find(id => id !== currentUser?.id);
      if (!otherUserId) return null;
      
      const otherUser = users.find(u => u.id === otherUserId);
      if (!otherUser) return null;

      const chatMessages = chats[chatId];
      const lastMessage = chatMessages[chatMessages.length - 1];

      return {
          id: otherUser.id,
          name: otherUser.name,
          avatar: otherUser.avatar || 'https://placehold.co/40x40',
          lastMessage: lastMessage ? lastMessage.text : 'No messages yet',
          time: lastMessage ? lastMessage.time : '',
          unread: 0, // Implement unread logic if needed
          online: otherUser.isAvailable, // Example online status
          typing: false, // Implement typing logic if needed
      }
  }).filter(Boolean);


  const filteredChats = chatListData.filter(chat => 
    chat && (
        chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <>
      <div className="flex min-h-screen flex-col bg-[#111814] pb-24 text-white">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between gap-3 bg-[#1A2D27] p-4 animate-fade-in-down">
          <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="text-white flex-shrink-0">
              <ArrowLeft className="h-6 w-6" />
              </Button>
          </Link>
          <h1 className="text-xl font-bold">Messages</h1>
          <Button variant="ghost" size="icon" className="text-white flex-shrink-0" onClick={() => setIsModalOpen(true)}>
              <Plus className="h-6 w-6" />
          </Button>
        </header>

        <main className="flex-1 space-y-4 p-4 animate-fade-in-up">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search users or messages..."
              className="rounded-full border-none bg-[#2C3E38] pl-10 text-white placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Chat List */}
          <div className="space-y-3">
              {filteredChats.map((chat, index) => (
                  chat && <Link href={`/chat/${chat.id}`} key={chat.id}>
                      <div className="flex items-center gap-4 rounded-2xl bg-[#1A2D27] p-3 hover:bg-[#2C3E38] transition-colors animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                          <div className="relative">
                              <Avatar className="h-14 w-14 border-2 border-green-400">
                                  <AvatarImage src={chat.avatar} alt={chat.name} data-ai-hint="user avatar" />
                                  <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              {chat.online && <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-[#1A2D27]"></div>}
                          </div>
                          <div className="flex-grow">
                              <div className="flex justify-between">
                                  <h3 className="font-bold">{chat.name}</h3>
                                  <p className="text-xs text-gray-400">{chat.time}</p>
                              </div>
                              <div className="flex justify-between items-center">
                                  <p className={`text-sm  truncate w-48 ${chat.typing ? 'text-green-400' : 'text-gray-400'}`}>{chat.lastMessage}</p>
                                  {chat.unread > 0 && (
                                      <Badge className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-black border-none">
                                          {chat.unread}
                                      </Badge>
                                  )}
                              </div>
                          </div>
                      </div>
                  </Link>
              ))}
              {filteredChats.length === 0 && (
                <div className="text-center text-gray-400 pt-10 animate-fade-in">
                    <p>No conversations found.</p>
                    <p className="text-sm">Start a new chat using the '+' button above.</p>
                </div>
              )}
          </div>
        </main>

        <AppBottomNav active="Messages" />
      </div>
      <NewChatModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
