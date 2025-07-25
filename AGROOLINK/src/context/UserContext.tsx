
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { User, UserRole } from '@/lib/types';
import { mockUsers } from '@/lib/data';
import { auth } from '@/lib/firebase';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
} from 'firebase/auth';

interface UserContextType {
    users: User[];
    currentUser: User | null;
    loading: boolean;
    setCurrentUser: (user: User | null) => void;
    updateUser: (userId: string, updates: Partial<User>) => void;
    updateUserProfile: (userId: string, name: string, role: UserRole) => void;
    signup: (email: string, pass: string) => Promise<FirebaseUser>;
    login: (email: string, pass: string) => Promise<FirebaseUser>;
    logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [currentUser, setCurrentUserState] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setLoading(true);
            if (firebaseUser) {
                const existingUser = users.find(u => u.id === firebaseUser.uid);
                if (existingUser) {
                    setCurrentUserState(existingUser);
                } else {
                    const newUser: User = {
                        id: firebaseUser.uid,
                        name: '', // Will be set in the profile completion modal
                        email: firebaseUser.email || '',
                        phone: '',
                        role: 'farmer', // default, will be updated
                        lga: '', // will be set later
                        isAvailable: true,
                        skills: [],
                        rating: 0,
                    };
                    setUsers(prev => [...prev, newUser]);
                    setCurrentUserState(newUser);
                }
            } else {
                setCurrentUserState(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [users]); // keep users in dependency array to react to updates
    
    const setCurrentUser = (user: User | null) => {
        setCurrentUserState(user);
    };

    const updateUser = (userId: string, updates: Partial<User>) => {
        let updatedUser: User | null = null;
        setUsers(prevUsers =>
            prevUsers.map(user => {
                if (user.id === userId) {
                    updatedUser = { ...user, ...updates };
                    return updatedUser;
                }
                return user;
            })
        );
        if (currentUser && currentUser.id === userId) {
            setCurrentUserState(updatedUser);
        }
    };
    
    const updateUserProfile = (userId: string, name: string, role: UserRole) => {
        updateUser(userId, { name, role });
    }
    
    const signup = async (email: string, pass: string) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        return userCredential.user;
    };
    
    const login = async (email: string, pass: string) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        return userCredential.user;
    };
    
    const logout = async () => {
        await signOut(auth);
        setCurrentUserState(null);
        window.location.href = '/';
    };

    return (
        <UserContext.Provider value={{ users, currentUser, loading, setCurrentUser, updateUser, updateUserProfile, signup, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
