'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { ArrowLeft, User, Phone, MapPin, Camera } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import type { Skill } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { uploadProfileImage } from "@/lib/uploadProfileImage";

export default function EditProfilePage() {
    const { currentUser, updateUser, setCurrentUser } = useUser();
    const router = useRouter();

    const [name, setName] = useState(currentUser.name);
    const [phone, setPhone] = useState(currentUser.phone);
    const [lga, setLga] = useState(currentUser.lga);
    const [isAvailable, setIsAvailable] = useState(currentUser.isAvailable);
    const [skills, setSkills] = useState(currentUser.skills || []);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setName(currentUser.name);
        setPhone(currentUser.phone);
        setLga(currentUser.lga);
        setIsAvailable(currentUser.isAvailable);
        setSkills(currentUser.skills || []);
    }, [currentUser]);

    const handleSkillToggle = (skill: Skill) => {
        setSkills(prevSkills => 
            prevSkills.includes(skill) 
            ? prevSkills.filter(s => s !== skill)
            : [...prevSkills, skill]
        );
    }

    const handleSaveChanges = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser(currentUser.id, {
            name,
            phone,
            lga,
            isAvailable,
            skills
        });
        router.push('/profile');
    }

    // Profile image upload handler
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/heic',
            'image/jpg',
            'image/webp',
            'image/gif'
        ];
        if (!allowedTypes.includes(file.type)) {
            alert("Unsupported file type. Please upload a JPG, PNG, HEIC, WEBP, or GIF image.");
            return;
        }
        setLoading(true);
        try {
            const url = await uploadProfileImage(file);
            alert("Profile image updated!");
            setCurrentUser((prev: any) => ({ ...prev, avatar: url }));
            updateUser(currentUser.id, { avatar: url });
        } catch (err) {
            alert("Error uploading image");
        }
        setLoading(false);
    };

    return (
    <div className="flex min-h-screen flex-col bg-[#111814] text-white">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-[#1A2D27] p-4">
        <Link href="/profile">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full h-10 w-10">
                <ArrowLeft className="h-5 w-5" />
            </Button>
        </Link>
        <h1 className="text-lg font-semibold">Edit Profile</h1>
        <div className="w-10"></div>
      </header>
      <main className="flex-1 p-4 space-y-6">
        <div className="flex flex-col items-center space-y-4">
            <div className="relative">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={currentUser.avatar || "https://placehold.co/80x80"} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <input
                  type="file"
                  accept="image/*,.heic,.jpg,.jpeg,.png,.webp,.gif"
                  capture="environment"
                  onChange={handleFileChange}
                  disabled={loading}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    opacity: 0,
                    width: "2rem",
                    height: "2rem",
                    cursor: "pointer"
                  }}
                  title="Upload profile image"
                />
                <Button
                  size="icon"
                  className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-green-600 hover:bg-green-700 shadow-lg"
                  asChild
                >
                  <label style={{ cursor: "pointer" }}>
                    <Camera className="h-4 w-4 text-white"/>
                  </label>
                </Button>
            </div>
        </div>
        
        <form className="space-y-4" onSubmit={handleSaveChanges}>
            <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-400">Full Name</Label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-[#1A2D27] border-gray-700 pl-10 rounded-lg text-white"/>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-400">Phone Number</Label>
                 <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-[#1A2D27] border-gray-700 pl-10 rounded-lg text-white"/>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="lga" className="text-gray-400">LGA (Location)</Label>
                 <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input id="lga" value={lga} onChange={(e) => setLga(e.target.value)} className="bg-[#1A2D27] border-gray-700 pl-10 rounded-lg text-white"/>
                </div>
            </div>

            {currentUser?.role === 'helper' && (
                <div className="space-y-4 rounded-2xl bg-[#1A2D27] p-4">
                    <h3 className="font-semibold">Helper Settings</h3>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="availability" className="font-medium">Available for work</Label>
                        <Switch id="availability" checked={isAvailable} onCheckedChange={setIsAvailable} />
                    </div>
                     <div className="space-y-2">
                        <Label className="font-medium">Skills</Label>
                        <div className="flex flex-wrap gap-2">
                            {(['Transport', 'Labor', 'Repairs', 'Rentals'] as Skill[]).map(skill => (
                                <Button key={skill} type="button" onClick={() => handleSkillToggle(skill)} variant={skills.includes(skill) ? "default" : "outline"} className={`rounded-full text-sm h-8 px-4 ${skills.includes(skill) ? 'bg-green-600 text-white' : 'border-gray-600 bg-transparent text-gray-300'}`}>
                                    {skill}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="pt-4">
                <Button type="submit" size="lg" className="w-full bg-green-600 hover:bg-green-700 font-bold">Save Changes</Button>
            </div>
        </form>

      </main>
    </div>
  );
}