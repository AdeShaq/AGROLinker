
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, Users, Clock, ShieldCheck, ArrowRight, ArrowLeft, HelpCircle, Banknote, Plus, RadioTower, Zap, MapPin, Tag, Star, Smartphone, Play } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

const PathIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6.5C4 5.25327 4.54464 4.14673 5.48528 3.32843C6.42592 2.51012 7.64282 2 8.90909 2C10.1754 2 11.3923 2.51012 12.3329 3.32843C13.2735 4.14673 13.8182 5.25327 13.8182 6.5C13.8182 7.74673 13.2735 8.85327 12.3329 9.67157C11.3923 10.4899 10.1754 11 8.90909 11H7.81818C6.33374 11 5.38562 12.2887 5.76102 13.682L7.81818 21.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.1818 12.5C16.1818 11.2533 16.7265 10.1467 17.6671 9.32843C18.6077 8.51012 19.8246 8 21.0909 8C22.3572 8 23.5741 8.51012 24.5147 9.32843C25.4554 10.1467 26 11.2533 26 12.5C26 13.7467 25.4554 14.8533 24.5147 15.6716C23.5741 16.4899 22.3572 17 21.0909 17C19.8246 17 18.6077 16.4899 17.6671 15.6716C16.7265 14.8533 16.1818 13.7467 16.1818 12.5Z" stroke="currentColor" strokeWidth="2"/>
    </svg>
);

const problemItems = [
    { icon: Clock, text: "Long waiting times to find workers" },
    { icon: HelpCircle, text: "No reliable way to verify skills" },
    { icon: Banknote, text: "Payment disputes and delays" },
];

const solutionItems = [
    { 
        icon: Zap, 
        title: "Instant Matching",
        text: "Find skilled workers in your area within minutes, not days",
        bgColor: "bg-green-500",
        isNew: true
    },
    { 
        icon: ShieldCheck, 
        title: "Verified Workers",
        text: "All workers are verified with ratings and proven track records",
        bgColor: "bg-yellow-500",
        isNew: false
    },
    { 
        icon: Smartphone, 
        title: "Smart Payments",
        text: "Secure payments via mobile money, cash, or airtime rewards",
        bgColor: "bg-blue-500",
        isNew: false
    },
];

const OnboardingSlide1 = () => (
    <div className="relative min-h-screen w-full flex flex-col text-white font-body">
        <Image
            src="/images/image_fx.jpg"
            alt="Farmer working in a field"
            fill
            className="object-cover z-0"
            data-ai-hint="farmer field"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 flex flex-col flex-grow p-6 h-full">
            <header className="flex-shrink-0">
                 {/* Header content is now in the main component */}
            </header>
            <div className="flex-shrink-0 pt-8 text-center">
                <div className="inline-block p-4 bg-agro-green rounded-2xl mb-2">
                    <Leaf className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold font-headline">AgroLinker</h1>
                <p className="text-sm text-agro-yellow">Connecting Farms & Workers</p>
            </div>
            <main className="flex-grow flex flex-col justify-center text-center">
                 <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                    Welcome to the <br /> Future of Farm <span className="text-agro-yellow">Work</span>
                </h2>
                <p className="mt-4 max-w-md mx-auto text-base">
                    Connect farmers with skilled helpers in your community. Make farming easier, faster, and more profitable.
                </p>
            </main>
            <footer className="flex-shrink-0 pb-20">
                <div className="flex justify-around items-center max-w-sm mx-auto mb-8">
                    <div className="flex flex-col items-center gap-2">
                        <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                            <Users className="h-6 w-6"/>
                        </div>
                        <span className="text-xs font-semibold">Local Network</span>
                    </div>
                     <div className="flex flex-col items-center gap-2">
                        <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                            <Clock className="h-6 w-6"/>
                        </div>
                        <span className="text-xs font-semibold">Quick Hire</span>
                    </div>
                     <div className="flex flex-col items-center gap-2">
                        <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                            <ShieldCheck className="h-6 w-6"/>
                        </div>
                        <span className="text-xs font-semibold">Secure Pay</span>
                    </div>
                </div>
            </footer>
        </div>
    </div>
);

const OnboardingSlide2 = () => (
     <div className="relative min-h-screen w-full flex flex-col text-white font-body bg-agro-dark">
        <Image
            src="/images/image_fx (1).jpg"
            alt="Dimly lit farm field"
            fill
            className="object-cover z-0 opacity-30"
            data-ai-hint="farm sunset"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 flex flex-col flex-grow p-6 h-full">
            <main className="flex-grow flex flex-col justify-center text-center pt-8">
                <h2 className="text-4xl font-bold leading-tight">
                    The <span className="text-red-400">Problem</span> is Real
                </h2>
                <p className="mt-2 max-w-sm mx-auto text-base opacity-90">
                    Farmers struggle to find reliable workers. Workers can't find consistent farm jobs. Time and money are wasted.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                        <p className="text-4xl font-bold text-red-400">70%</p>
                        <p className="text-sm">Farmers struggle to find workers</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                         <p className="text-4xl font-bold text-red-400">60%</p>
                         <p className="text-sm">Workers lack steady farm jobs</p>
                    </div>
                </div>
                <div className="space-y-3 mt-8 text-left">
                    {problemItems.map((item, index) => (
                         <div key={index} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full p-3 px-5">
                            <item.icon className="h-5 w-5 text-red-400" />
                            <span className="font-medium">{item.text}</span>
                        </div>
                    ))}
                </div>
            </main>
             <footer className="flex-shrink-0 pb-20" />
        </div>
    </div>
);

const OnboardingSlide3 = () => (
     <div className="relative min-h-screen w-full flex flex-col text-white font-body">
        <Image
            src="/images/image_fx (2).jpg"
            alt="Happy farmers using the app"
            fill
            className="object-cover z-0"
            data-ai-hint="happy farmers"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 flex flex-col flex-grow p-6 h-full">
            <main className="flex-grow flex flex-col justify-center text-center pt-8">
                <h2 className="text-3xl font-bold leading-tight">
                    The <span className="text-green-400">smart platform</span> that instantly connects farmers with skilled workers
                </h2>
                <p className="mt-2 max-w-sm mx-auto text-base opacity-90">
                   in their community.
                </p>
                <div className="bg-green-400/20 backdrop-blur-sm rounded-2xl p-4 mt-6">
                    <div className="flex justify-around">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-yellow-300">2min</p>
                            <p className="text-xs">Average match time</p>
                        </div>
                         <div className="border-l border-white/20"></div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-yellow-300">98%</p>
                            <p className="text-xs">Success rate</p>
                        </div>
                         <div className="border-l border-white/20"></div>
                        <div className="text-center">
                             <p className="text-2xl font-bold text-yellow-300">5K+</p>
                             <p className="text-xs">Active users</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-3 mt-6 text-left">
                    {solutionItems.map((item, index) => (
                         <div key={index} className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                            <div className={`p-3 rounded-xl ${item.bgColor}`}>
                                <item.icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                   <h3 className="font-bold">{item.title}</h3>
                                   {item.isNew && <Badge className="bg-green-500 text-white text-[10px] h-5">NEW</Badge>}
                                   {item.title === "Verified Workers" && <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />}
                                </div>
                                <p className="text-sm opacity-90">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
             <footer className="flex-shrink-0 pb-20" />
        </div>
    </div>
);

const OnboardingSlide4 = () => (
     <div className="min-h-screen w-full flex flex-col font-body bg-gradient-to-b from-green-500 to-primary text-white">
        <div className="flex-grow flex flex-col p-6 h-full">
            <main className="flex-grow flex flex-col items-center text-center pt-8">
                 <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm mb-4">
                    <PathIcon />
                </div>
                <h1 className="text-3xl font-bold">How It Works</h1>
                <p className="mt-2 text-base opacity-90 max-w-xs">Simple steps to connect farmers with workers</p>
                <div className="w-full max-w-sm mt-8 space-y-4">
                    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-5 text-left relative">
                         <div className="absolute top-4 right-4 bg-yellow-400 text-black h-6 w-6 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                         <div className="flex items-start gap-4">
                            <div className="bg-white text-green-600 rounded-2xl p-3">
                                <Plus className="h-8 w-8" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold">Post Your Job</h2>
                                <p className="text-sm opacity-90 mt-1">Farmers create a job request with details like location, task type, and payment method</p>
                                <div className="flex items-center gap-2 mt-3">
                                    <Badge variant="secondary" className="bg-white/30 text-white border-none text-xs font-normal">
                                        <Tag className="h-3 w-3 mr-1 text-yellow-400"/>
                                        Farm Work
                                    </Badge>
                                    <Badge variant="secondary" className="bg-white/30 text-white border-none text-xs font-normal">
                                        <MapPin className="h-3 w-3 mr-1 text-red-400"/>
                                        Location
                                    </Badge>
                                </div>
                            </div>
                         </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="h-6 w-6 text-white/50 animate-bounce">↓</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md rounded-3xl p-5 text-left relative">
                        <div className="absolute top-4 right-4 bg-yellow-400 text-black h-6 w-6 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                         <div className="flex items-start gap-4">
                            <div className="bg-white text-blue-600 rounded-2xl p-3">
                                <RadioTower className="h-8 w-8" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold">Smart Matching</h2>
                                <p className="text-sm opacity-90 mt-1">Our AI instantly finds nearby workers with the right skills and sends notifications</p>
                                 <div className="bg-green-400/30 backdrop-blur-sm rounded-xl p-2.5 mt-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Zap className="h-4 w-4 text-green-300"/>
                                        <span className="font-bold">5 workers</span>
                                        <span className="text-xs">found</span>
                                    </div>
                                    <span className="text-xs font-semibold text-yellow-300">2 min ago</span>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </main>
             <footer className="flex-shrink-0 pb-20" />
        </div>
    </div>
);


export default function OnboardingScreen() {
    const router = useRouter();
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) return;
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = useCallback(() => api?.scrollNext(), [api]);
    
    const handleSkip = () => router.push('/login');
    const handleFinish = () => router.push('/login');

    const slides = [<OnboardingSlide1 />, <OnboardingSlide2 />, <OnboardingSlide3 />, <OnboardingSlide4 />];

    const buttonTexts = ["Get Started", "See Our Solution", "How It Works", "Finish"];
    const showBackButton = current > 1;

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
             <Carousel setApi={setApi} className="w-full h-full">
                <CarouselContent>
                    {slides.map((slide, index) => (
                        <CarouselItem key={index}>{slide}</CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            <div className="absolute top-0 left-0 right-0 z-30 p-6 flex items-center justify-between">
                {showBackButton ? (
                     <Button variant="ghost" size="icon" className="text-white bg-white/10 hover:bg-white/20 rounded-full" onClick={scrollPrev}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                ) : <div className="w-10 h-10" /> /* Placeholder for alignment */}
               
                <div className="flex items-center gap-2">
                    {Array.from({ length: count }).map((_, i) => (
                        <div key={i} className={`h-1.5 w-6 rounded-full transition-colors ${current === i + 1 ? 'bg-white' : 'bg-white/30'}`} />
                    ))}
                </div>
                 <Button variant="ghost" className="text-white hover:bg-white/10" onClick={handleSkip}>Skip</Button>
            </div>
            
             <div className="absolute bottom-0 left-0 right-0 z-30 p-6">
                {current === 3 && (
                     <div className="flex items-center gap-4">
                        <Button size="lg" className="flex-grow bg-white hover:bg-gray-200 text-agro-dark font-bold text-lg" onClick={scrollNext}>
                            {buttonTexts[current - 1]} <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button size="icon" variant="outline" className="h-14 w-14 bg-white/10 border-white/20 backdrop-blur-sm rounded-2xl">
                            <Play className="h-6 w-6 text-white" />
                        </Button>
                    </div>
                )}
                 {current !== 3 && (
                    <Button size="lg" className="w-full bg-white hover:bg-gray-200 text-green-600 font-bold text-lg" onClick={current === count ? handleFinish : scrollNext}>
                         {buttonTexts[current - 1]} {current < count && <ArrowRight className="ml-2 h-5 w-5" />}
                    </Button>
                 )}
                 {current === 1 && (
                      <p className="text-center text-xs mt-4 opacity-80 text-white">
                        Swipe left to continue or tap Get Started
                    </p>
                 )}
            </div>
        </div>
    );
}

    