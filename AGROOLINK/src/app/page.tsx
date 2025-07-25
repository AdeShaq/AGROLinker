
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 2000); // 2-second delay before redirecting

    return () => clearTimeout(timer); // Cleanup the timer
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-green-500 to-primary p-6 text-white font-body animate-fade-in">
      <div className="w-full" />
      <div className="flex flex-col items-center text-center">
        <div className="p-4 bg-white/20 rounded-full mb-4 relative flex items-center justify-center h-24 w-24">
           <div className="absolute h-full w-full bg-white/10 rounded-full animate-ping" />
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L12 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 16L12 22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M17.6568 6.34315L13.4142 10.5858" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M10.5858 13.4142L6.34315 17.6569" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8 12L2 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M22 12L16 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M17.6568 17.6569L13.4142 13.4142" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M10.5858 10.5858L6.34315 6.34315" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
        </div>
        <h1 className="text-4xl font-bold animate-fade-in-up [animation-delay:200ms]">AgroLinker</h1>
        <p className="text-lg mt-2 opacity-90 animate-fade-in-up [animation-delay:400ms]">Connecting Agriculture</p>
        <p className="text-sm opacity-70 animate-fade-in-up [animation-delay:600ms]">Farmers • Workers • Growth</p>
      </div>
      <div className="w-full text-center text-xs opacity-60 animate-fade-in [animation-delay:800ms]">
        <p>Version 1.0.0 • Made with ❤️ in Nigeria 🇳🇬</p>
      </div>
    </div>
  );
}
