
'use client';

import { ArrowLeft, Phone, MoreVertical, Send, Paperclip, Check, X, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect, useMemo } from 'react';
import { useUser } from '@/context/UserContext';
import type { User } from '@/lib/types';
import { useParams, notFound } from 'next/navigation';
import { useChat } from '@/context/ChatContext';
import type { Message } from '@/context/ChatContext';

const TypingIndicator = () => (
    <div className="flex items-center space-x-1 p-2">
        <span className="h-2 w-2 bg-green-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="h-2 w-2 bg-green-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="h-2 w-2 bg-green-400 rounded-full animate-bounce"></span>
    </div>
);

const JobOfferCard = ({ onAccept, onDecline }: { onAccept: () => void; onDecline: () => void }) => (
    <div className="bg-[#1A2D27] rounded-2xl p-4 mx-4 my-4 border border-gray-700 animate-fade-in-up">
        <div className="flex items-center gap-3">
            <div className="flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center bg-green-500/20">
                <Briefcase className="h-5 w-5 text-green-300"/>
            </div>
            <div className="flex-grow">
                <h3 className="font-bold text-white">Job Offer: Cassava Harvesting</h3>
                <p className="text-sm text-gray-300">Budget: ₦2,000</p>
            </div>
        </div>
        <div className="mt-4 flex gap-3">
            <Button onClick={onDecline} className="flex-1 bg-red-600/80 hover:bg-red-700 text-white"><X className="mr-2 h-4 w-4"/>Decline</Button>
            <Button onClick={onAccept} className="flex-1 bg-green-600 hover:bg-green-700 text-white"><Check className="mr-2 h-4 w-4"/>Accept</Button>
        </div>
    </div>
)

export default function ChatPage() {
    const params = useParams();
    const { users, currentUser } = useUser();
    const { getMessages, addMessage } = useChat();
    
    const [chatUser, setChatUser] = useState<User | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showJobOffer, setShowJobOffer] = useState(true);

    const chatId = useMemo(() => {
        if (!currentUser || !chatUser) return null;
        return [currentUser.id, chatUser.id].sort().join('--');
    }, [currentUser, chatUser]);

    const messages = chatId ? getMessages(chatId) : [];

    useEffect(() => {
        const userId = params.id as string;
        const user = users.find(u => u.id === userId);
        if (user) {
            setChatUser(user);
        } else {
           notFound();
        }
    }, [params.id, users]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() === '' || !chatId || !currentUser) return;

        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            senderId: currentUser.id,
            text: inputValue,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        addMessage(chatId, newMessage);
        setInputValue('');

        // Simulate response typing
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            if(chatUser) {
                const responseMessage: Message = {
                    id: `msg-${Date.now() + 1}`,
                    senderId: chatUser.id,
                    text: 'Okay, sounds good!',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                };
                addMessage(chatId, responseMessage);
            }
        }, 2000);
    }

    const addSystemMessage = (text: string) => {
        if (!chatId) return;
        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            senderId: 'system',
            text: text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        addMessage(chatId, newMessage);
    }

    const handleAcceptOffer = () => {
        addSystemMessage("You have accepted the job offer: Cassava Harvesting.");
        setShowJobOffer(false);
    }

    const handleDeclineOffer = () => {
        addSystemMessage("You have declined the job offer: Cassava Harvesting.");
        setShowJobOffer(false);
    }

  if (!chatUser || !currentUser) {
    return (
         <div className="flex min-h-screen flex-col bg-[#111814] text-white items-center justify-center">
            Loading chat...
        </div>
    );
  }


  return (
    <div className="flex min-h-screen flex-col bg-[#111814] text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between gap-3 bg-[#1A2D27] p-3 shadow-md animate-fade-in-down">
        <div className="flex items-center gap-3">
            <Link href="/chat">
                <Button variant="ghost" size="icon" className="text-white flex-shrink-0">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
            </Link>
            <Avatar className="h-10 w-10">
                <AvatarImage src={chatUser.avatar || "https://placehold.co/40x40"} alt={chatUser.name} data-ai-hint="user avatar" />
                <AvatarFallback>{chatUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <h2 className="font-bold">{chatUser.name}</h2>
                <p className="text-xs text-green-400">Online</p>
            </div>
        </div>
        <div className="flex items-center">
            <Button variant="ghost" size="icon"><Phone className="h-5 w-5"/></Button>
            <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5"/></Button>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 space-y-4 pt-4 overflow-y-auto">
        {chatUser.name === 'Amaka F.' && showJobOffer && <JobOfferCard onAccept={handleAcceptOffer} onDecline={handleDeclineOffer} />}
        
        {/* Messages */}
        <div className="px-4 space-y-4">
            {messages.length === 0 && (
                <div className="text-center text-sm text-gray-500 py-10 animate-fade-in">
                    Send a message to start the conversation.
                </div>
            )}
            {messages.map((msg) => {
                const senderType = msg.senderId === currentUser.id ? 'me' : msg.senderId === 'system' ? 'system' : 'other';
                return (
                    <div key={msg.id} className={`flex flex-col animate-fade-in-up ${senderType === 'me' ? 'items-end' : senderType === 'system' ? 'items-center' : 'items-start'}`}>
                       {senderType === 'system' ? (
                            <div className="text-center text-xs text-gray-400 p-2 my-2 bg-black/20 rounded-lg">
                               {msg.text}
                            </div>
                       ) : (
                        <>
                            <div className={`flex items-end gap-2 max-w-xs ${senderType === 'me' ? 'flex-row-reverse' : ''}`}>
                            {senderType === 'other' && (
                                <Avatar className="h-8 w-8 self-end">
                                        <AvatarImage src={chatUser.avatar || "https://placehold.co/40x40"} alt={chatUser.name} data-ai-hint="user avatar" />
                                        <AvatarFallback>{chatUser.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                            )}
                                <div className={`rounded-2xl px-4 py-2 ${senderType === 'me' ? 'bg-green-600 rounded-br-none' : 'bg-[#2C3E38] rounded-bl-none'}`}>
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                            <p className={`text-xs text-gray-500 mt-1 ${senderType === 'me' ? 'mr-2' : 'ml-10'}`}>{msg.time}</p>
                        </>
                       )}
                    </div>
                )
            })}
             {isTyping && (
                <div className="flex items-end gap-2 max-w-xs animate-fade-in-up">
                    <Avatar className="h-8 w-8 self-end">
                        <AvatarImage src={chatUser.avatar || "https://placehold.co/40x40"} alt={chatUser.name} data-ai-hint="user avatar" />
                        <AvatarFallback>{chatUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="bg-[#2C3E38] rounded-2xl rounded-bl-none px-4 py-2">
                        <TypingIndicator />
                    </div>
                </div>
            )}
        </div>
      </main>

      {/* Input Footer */}
      <footer className="sticky bottom-0 bg-[#1A2D27] p-3 animate-fade-in-up">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Button type="button" variant="secondary" size="icon" className="bg-[#2C3E38] rounded-full h-10 w-10">
                <Paperclip className="h-5 w-5 text-gray-400" />
            </Button>
            <div className="relative flex-grow">
                <Input 
                    placeholder="Type a message..." 
                    className="bg-[#2C3E38] rounded-full border-none pr-12 text-white" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </div>
             <Button type="submit" size="icon" className="bg-green-600 hover:bg-green-700 rounded-full h-10 w-10">
                <Send className="h-5 w-5" />
            </Button>
        </form>
      </footer>
    </div>
  );
}
