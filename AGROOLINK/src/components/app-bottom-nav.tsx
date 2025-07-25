
'use client';
import { Home, Search, Plus, MessageSquare, User } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { name: 'Home', icon: Home, href: '/dashboard' },
  { name: 'Search', icon: Search, href: '/search' },
  { name: 'Post', icon: Plus, href: '/post' },
  { name: 'Messages', icon: MessageSquare, href: '/chat' },
  { name: 'Profile', icon: User, href: '/profile' },
];

export default function AppBottomNav({ active }: { active: string }) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t border-gray-700 bg-[#1A2D27] p-2">
      <div className="mx-auto flex max-w-md justify-around">
        {navItems.map((item) => (
          <Link
            href={item.href || '#'}
            key={item.name}
            className={`flex w-16 flex-col items-center gap-1 p-2 ${
              active === item.name ? 'text-green-400' : 'text-gray-400'
            }`}
          >
            <div className="p-1">
              <item.icon className="h-6 w-6" />
            </div>
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
      </div>
    </footer>
  );
}
