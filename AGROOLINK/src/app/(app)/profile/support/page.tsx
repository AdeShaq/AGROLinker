
'use client';

import { ArrowLeft, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
    {
        question: "How do I post a job?",
        answer: "To post a job, go to the Home screen and tap on the 'Post New Request' button. Fill in the required details such as task type, description, location, and budget. Once you submit, your request will be visible to nearby helpers."
    },
    {
        question: "How do I get paid?",
        answer: "You can choose to be paid via Mobile Money or Airtime. When a farmer creates a job, they select the payment method. Once the job is completed and marked as such by the farmer, the payment is processed to your linked account or phone number."
    },
    {
        question: "How do I accept a job?",
        answer: "As a helper, you can browse available jobs on the Helper Dashboard. When you find a job you're interested in, simply tap the 'Accept Job' button. The farmer will be notified that you have accepted."
    },
     {
        question: "What if there is a dispute?",
        answer: "If you have a dispute with a farmer or helper, you can flag the job or user. Our support team will review the case and mediate to find a resolution. You can contact support through the 'Contact Us' section on this page."
    }
]

export default function HelpAndSupportPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#111814] text-white">
      <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#1A2D27] p-4">
        <Link href="/profile">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full h-10 w-10">
                <ArrowLeft className="h-6 w-6" />
            </Button>
        </Link>
        <h1 className="text-xl font-bold">Help & Support</h1>
      </header>
      <main className="flex-1 p-4 space-y-6">
        <div>
            <h2 className="text-lg font-semibold mb-2">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full rounded-2xl bg-[#1A2D27] px-4">
                {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className={index === faqItems.length - 1 ? 'border-b-0' : 'border-gray-700'}>
                        <AccordionTrigger className="hover:no-underline text-left text-white">{item.question}</AccordionTrigger>
                        <AccordionContent className="text-gray-400">
                           {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>

        <div className="rounded-2xl bg-[#1A2D27] p-4 text-center">
             <h2 className="text-lg font-semibold mb-2">Still Need Help?</h2>
             <p className="text-sm text-gray-400 mb-4">Our support team is available 24/7 to assist you.</p>
             <Button className="w-full bg-green-600 hover:bg-green-700">Contact Support</Button>
        </div>
      </main>
    </div>
  );
}
