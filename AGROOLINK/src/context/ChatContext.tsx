
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Message {
    id: string;
    senderId: string; // 'system' for system messages
    text: string;
    time: string;
}

export interface Chat {
    [chatId: string]: Message[];
}

const initialMessages: Message[] = [
    {
        id: '1',
        senderId: 'user-8', // Amaka F.
        text: 'Hello! Thank you for the job offer for Cassava Harvesting 🙏',
        time: '2:30 PM',
    },
    {
        id: '2',
        senderId: 'user-8', // Amaka F.
        text: "I can start tomorrow at 7am if that works for you?",
        time: '2:31 PM',
    },
    {
        id: '3',
        senderId: 'user-11', // kvngshaggy
        text: 'Hello! Yes, 7am tomorrow sounds perfect. Welcome aboard!',
        time: '2:35 PM',
    },
];

const initialChatId = ['user-11', 'user-8'].sort().join('--');


const initialChatsState: Chat = {
    [initialChatId]: initialMessages
}

interface ChatContextType {
    chats: Chat;
    getMessages: (chatId: string) => Message[];
    addMessage: (chatId: string, message: Message) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const [chats, setChats] = useState<Chat>(initialChatsState);

    const getMessages = (chatId: string): Message[] => {
        return chats[chatId] || [];
    };

    const addMessage = (chatId: string, message: Message) => {
        setChats(prevChats => {
            const existingMessages = prevChats[chatId] || [];
            return {
                ...prevChats,
                [chatId]: [...existingMessages, message],
            };
        });
    };

    return (
        <ChatContext.Provider value={{ chats, getMessages, addMessage }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = (): ChatContextType => {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};
