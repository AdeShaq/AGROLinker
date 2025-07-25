
"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Leaf, Mail, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/context/UserContext';
import React, { useEffect, useState } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import CompleteProfileModal from './complete-profile-modal';

export default function LoginScreen() {
    const router = useRouter();
    const { toast } = useToast();
    const { currentUser, loading, signup, login } = useUser();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newlyCreatedUser, setNewlyCreatedUser] = useState<FirebaseUser | null>(null);

    useEffect(() => {
        if (!loading && currentUser?.name && currentUser.role) {
            router.push('/dashboard');
        }
    }, [currentUser, loading, router]);

    const handleSignIn = async () => {
        if (!email || !password) {
            toast({ variant: "destructive", title: "Login Failed", description: "Please enter both email and password." });
            return;
        }
        try {
            await login(email, password);
            toast({ title: "Login Successful", description: "Welcome back!" });
            router.push('/dashboard');
        } catch (error: any) {
            toast({ variant: "destructive", title: "Login Failed", description: error.message });
        }
    }

    const handleCreateAccount = async () => {
        if (!email || !password) {
            toast({ variant: "destructive", title: "Signup Failed", description: "Please enter both email and password." });
            return;
        }
         try {
            const userCredential = await signup(email, password);
            setNewlyCreatedUser(userCredential);
            setIsModalOpen(true);
            // Don't toast here, wait for profile completion
        } catch (error: any) {
            toast({ variant: "destructive", title: "Signup Failed", description: error.message });
        }
    }
    
    const onModalClose = () => {
        setIsModalOpen(false);
        setNewlyCreatedUser(null);
        // After profile is completed, the context useEffect will redirect to dashboard
    }
    
     const onProfileComplete = () => {
        setIsModalOpen(false);
        setNewlyCreatedUser(null);
        toast({ title: "Profile Complete!", description: "Welcome to AgroLinker!" });
        router.push('/dashboard');
    };

    return (
        <>
            <div className="relative min-h-screen w-full flex flex-col text-white font-body">
                {/* Background Image */}
                <Image
                    src="/images/image_fx (3).jpg"
                    alt="Farmers in a field"
                    fill
                    className="object-cover z-0 animate-fade-in"
                    data-ai-hint="farmers field"
                />
                <div className="absolute inset-0 bg-primary/70 z-10" />

                {/* Content */}
                <div className="relative z-20 flex flex-col flex-grow items-center justify-center p-6 text-center animate-fade-in-up">
                    
                    <main className="flex-grow flex flex-col justify-center items-center w-full max-w-sm">
                        {/* Logo and Title */}
                        <div className="mb-8">
                            <div className="inline-block p-4 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
                                <Leaf className="h-10 w-10 text-white" />
                            </div>
                            <h1 className="text-4xl font-bold font-headline">AgroLinker</h1>
                            <p className="text-lg opacity-90 mt-1">Connecting farmers & field workers</p>
                        </div>
                        
                        <div className="w-full space-y-4 text-left">
                            <div>
                                <Label htmlFor="email" className="text-white/80">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input 
                                        id="email" 
                                        type="email" 
                                        placeholder="Enter your email" 
                                        className="bg-white/10 border-white/30 pl-10 text-white placeholder:text-gray-300"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input 
                                        id="password" 
                                        type="password" 
                                        placeholder="Enter your password" 
                                        className="bg-white/10 border-white/30 pl-10 text-white placeholder:text-gray-300"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>


                        {/* Action Buttons */}
                        <div className="w-full space-y-4 mt-6">
                            <Button 
                                size="lg" 
                                className="w-full bg-white hover:bg-gray-200 text-primary font-bold text-lg"
                                onClick={handleSignIn}
                            >
                                Sign In
                            </Button>
                            <Button 
                                size="lg" 
                                variant="outline"
                                className="w-full bg-transparent hover:bg-white/20 border-white text-white font-bold text-lg"
                                onClick={handleCreateAccount}
                            >
                                Create Account
                            </Button>
                        </div>

                        <p className="mt-8 text-sm opacity-80">
                            Join thousands of farmers and workers <br/> across Nigeria 🇳🇬
                        </p>
                    </main>
                </div>
            </div>
            {newlyCreatedUser && (
                <CompleteProfileModal 
                    isOpen={isModalOpen}
                    onClose={onModalClose}
                    onProfileComplete={onProfileComplete}
                    user={newlyCreatedUser}
                />
            )}
        </>
    );
}
