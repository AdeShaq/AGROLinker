
"use client";

import React from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createHelpRequest, FormState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { Skill, RewardType } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { useRequest } from "@/context/RequestContext";
import { useRouter } from "next/navigation";

const skills: Skill[] = ["Transport", "Labor", "Repairs", "Rentals"];
const rewardTypes: RewardType[] = ["Airtime", "Mobile Money"];
const jobTags = ["Urgent", "High Paying", "Wages"];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-green-600 hover:bg-green-700 text-white">
      {pending ? "Submitting..." : "Submit Request"}
    </Button>
  );
}

export default function PostRequestForm({ setDialogOpen }: { setDialogOpen: (open: boolean) => void }) {
  const { toast } = useToast();
  const { addRequest } = useRequest();
  const router = useRouter();

  const initialState: FormState = { message: null, type: 'error', errors: {} };
  const [state, dispatch] = useActionState(createHelpRequest, initialState);

  React.useEffect(() => {
    if (state.type === 'success' && state.request) {
        addRequest(state.request);
        toast({
            title: "Success!",
            description: state.message,
        });
        setDialogOpen(false);
        router.push('/dashboard');
    } else if (state.type === 'error' && state.message) {
        toast({
            title: "Error",
            description: state.message,
            variant: "destructive",
        });
    }
  }, [state, toast, setDialogOpen, addRequest, router]);

  return (
    <form action={dispatch} className="grid gap-4 py-4">
      <div className="space-y-1">
        <Label htmlFor="taskType">Task Type</Label>
        <Select name="taskType" required>
          <SelectTrigger id="taskType" className="bg-[#2C3E38] border-gray-600 text-white">
            <SelectValue placeholder="Select a task type" />
          </SelectTrigger>
          <SelectContent className="bg-[#2C3E38] text-white border-gray-600">
            {skills.map((skill) => (
              <SelectItem key={skill} value={skill} className="focus:bg-green-800">{skill}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label htmlFor="description">Short Description</Label>
        <Textarea id="description" name="description" placeholder="e.g., Need to transport maize from Ilorin to Oja-Oba" required className="bg-[#2C3E38] border-gray-600 text-white"/>
         {state.errors?.description && <p className="text-sm text-destructive">{state.errors.description[0]}</p>}
      </div>
      <div className="space-y-1">
        <Label htmlFor="lga">LGA (Location)</Label>
        <Input id="lga" name="lga" placeholder="e.g., Ilorin West" required className="bg-[#2C3E38] border-gray-600 text-white"/>
        {state.errors?.lga && <p className="text-sm text-destructive">{state.errors.lga[0]}</p>}
      </div>
       <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
                <Label htmlFor="rewardType">Reward Type</Label>
                <Select name="rewardType" required>
                    <SelectTrigger id="rewardType" className="bg-[#2C3E38] border-gray-600 text-white">
                        <SelectValue placeholder="Select reward" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2C3E38] text-white border-gray-600">
                        {rewardTypes.map((type) => (
                        <SelectItem key={type} value={type} className="focus:bg-green-800">{type}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-1">
                <Label htmlFor="budget">Budget (₦)</Label>
                <Input id="budget" name="budget" type="number" placeholder="5000" required className="bg-[#2C3E38] border-gray-600 text-white"/>
                {state.errors?.budget && <p className="text-sm text-destructive">{state.errors.budget[0]}</p>}
            </div>
       </div>
       <div className="space-y-2">
            <Label>Job Tags</Label>
            <div className="flex gap-4">
                {jobTags.map(tag => (
                    <div key={tag} className="flex items-center space-x-2">
                        <Checkbox id={`tag-${tag}`} name="tags" value={tag} className="border-gray-500"/>
                        <Label htmlFor={`tag-${tag}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{tag}</Label>
                    </div>
                ))}
            </div>
            {state.errors?.tags && <p className="text-sm text-destructive">{state.errors.tags[0]}</p>}
       </div>
      <SubmitButton />
    </form>
  );
}
