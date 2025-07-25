
'use client';

import { ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const reviewsData = {
    average: 4.2,
    total: 89,
    breakdown: [
        { stars: 5, count: 60 },
        { stars: 4, count: 15 },
        { stars: 3, count: 8 },
        { stars: 2, count: 4 },
        { stars: 1, count: 2 },
    ],
    comments: [
        {
            author: 'Amaka F.',
            avatar: 'https://placehold.co/40x40',
            rating: 5,
            date: '2 days ago',
            text: 'Excellent farmer, very clear instructions and prompt payment. Highly recommended!',
        },
        {
            author: 'Yusuf Alabi',
            avatar: 'https://placehold.co/40x40',
            rating: 4,
            date: '1 week ago',
            text: 'Good experience. The job was exactly as described. Would work with again.',
        },
    ]
}


export default function ReviewsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#111814] text-white">
      <header className="sticky top-0 z-10 flex items-center gap-3 bg-[#1A2D27] p-4">
        <Link href="/profile">
            <Button variant="ghost" size="icon" className="text-white">
                <ArrowLeft className="h-6 w-6" />
            </Button>
        </Link>
        <h1 className="text-xl font-bold">Reviews</h1>
      </header>
      <main className="flex-1 p-4 space-y-6">
        <div className="rounded-2xl bg-[#1A2D27] p-4 text-center">
            <p className="text-sm text-gray-400">Average Rating</p>
            <p className="text-5xl font-bold text-yellow-400 my-2">{reviewsData.average.toFixed(1)}</p>
            <div className="flex justify-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-6 w-6 ${i < Math.floor(reviewsData.average) ? 'fill-current' : ''}`} />
                ))}
            </div>
            <p className="text-sm text-gray-400 mt-2">Based on {reviewsData.total} reviews</p>
        </div>
        
        <div className="rounded-2xl bg-[#1A2D27] p-4 space-y-3">
            {reviewsData.breakdown.map(item => (
                <div key={item.stars} className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">{item.stars} star</span>
                    <Progress value={(item.count / reviewsData.total) * 100} className="h-2 bg-[#2C3E38] [&>*]:bg-yellow-400" />
                    <span className="text-sm text-gray-400 w-8 text-right">{item.count}</span>
                </div>
            ))}
        </div>

        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Comments</h2>
            {reviewsData.comments.map((comment, i) => (
                <div key={i} className="rounded-2xl bg-[#1A2D27] p-4">
                    <div className="flex items-center gap-3">
                         <Avatar className="h-10 w-10">
                            <AvatarImage src={comment.avatar} alt={comment.author} data-ai-hint="user avatar" />
                            <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                            <div className="flex justify-between">
                                <p className="font-bold">{comment.author}</p>
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-4 w-4 ${i < comment.rating ? 'fill-current' : ''}`} />
                                    ))}
                                </div>
                            </div>
                            <p className="text-xs text-gray-500">{comment.date}</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-300 mt-3">{comment.text}</p>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
}
