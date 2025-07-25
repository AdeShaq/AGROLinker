
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { HelpRequest } from '@/lib/types';
import { initialRequests } from '@/lib/data';

interface RequestContextType {
    requests: HelpRequest[];
    addRequest: (request: HelpRequest) => void;
    updateRequest: (requestId: string, updates: Partial<HelpRequest>) => void;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

export const RequestProvider = ({ children }: { children: ReactNode }) => {
    const [requests, setRequests] = useState<HelpRequest[]>(initialRequests);

    const addRequest = (request: HelpRequest) => {
        setRequests(prevRequests => [request, ...prevRequests]);
    };

    const updateRequest = (requestId: string, updates: Partial<HelpRequest>) => {
        setRequests(prevRequests =>
            prevRequests.map(req =>
                req.id === requestId ? { ...req, ...updates } : req
            )
        );
    };

    return (
        <RequestContext.Provider value={{ requests, addRequest, updateRequest }}>
            {children}
        </RequestContext.Provider>
    );
};

export const useRequest = (): RequestContextType => {
    const context = useContext(RequestContext);
    if (context === undefined) {
        throw new Error('useRequest must be used within a RequestProvider');
    }
    return context;
};
