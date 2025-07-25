
"use client";

import React from "react";
import PostRequestForm from "@/app/(app)/dashboard/post-request-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PostRequestPage() {
    const [isDialogOpen, setIsDialogOpen] = React.useState(true);
    const router = useRouter();

    // This is a bit of a hack. Since the form now navigates on success,
    // we need a way to handle the case where the user closes the "dialog" (which is now the whole page)
    // without submitting. We'll just navigate back.
    const handleSetDialogOpen = (open: boolean) => {
        if (!open) {
            router.back();
        }
        setIsDialogOpen(open);
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#111814] text-white">
             <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#1A2D27] p-4 animate-fade-in-down">
                <Link href="/dashboard">
                    <Button variant="ghost" size="icon" className="text-white">
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                </Link>
                <h1 className="text-xl font-bold">Create a new help request</h1>
            </header>
            <main className="p-4 animate-fade-in-up">
                 <div className="bg-[#1A2D27] text-white border-gray-700 rounded-2xl p-6">
                    <p className="text-gray-400 mb-6">
                        Fill out the details below and we'll find a helper for you.
                    </p>
                    <PostRequestForm setDialogOpen={handleSetDialogOpen} />
                </div>
            </main>
        </div>
    );
}
