
'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#111814] text-white">
      <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#1A2D27] p-4">
        <Link href="/profile">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full h-10 w-10">
                <ArrowLeft className="h-6 w-6" />
            </Button>
        </Link>
        <h1 className="text-xl font-bold">Privacy Policy</h1>
      </header>
      <main className="flex-1 p-4 space-y-4 text-gray-300 leading-relaxed">
        <p className="text-xs text-gray-500">Last updated: July 26, 2024</p>
        
        <p>
            Welcome to AgroLinker. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
        </p>

        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">1. Information We Collect</h2>
            <p>We collect personal information that you voluntarily provide to us when you register on the app, express an interest in obtaining information about us or our products and services, when you participate in activities on the app or otherwise when you contact us.</p>
            <p>The personal information that we collect depends on the context of your interactions with us and the app, the choices you make and the products and features you use. The personal information we collect may include the following: Name, Phone Number, Location (LGA), and Skills.</p>
        </div>

         <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">2. How We Use Your Information</h2>
            <p>We use personal information collected via our app for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li>To facilitate account creation and logon process.</li>
                <li>To match farmers with appropriate helpers based on skills and location.</li>
                <li>To process payments and transactions.</li>
                <li>To send you administrative information.</li>
                <li>To protect our Services.</li>
            </ul>
        </div>
        
        <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">3. Will Your Information Be Shared?</h2>
            <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. Your name and skills may be visible to other users for the purpose of job matching.</p>
        </div>

      </main>
    </div>
  );
}
