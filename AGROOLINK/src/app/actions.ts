
"use server";

import { z } from "zod";
import { improveMatching } from "@/ai/flows/improve-matching";
import type { HelpRequest, Skill } from "@/lib/types";

const requestSchema = z.object({
  taskType: z.string(),
  description: z.string().min(10, "Description must be at least 10 characters."),
  lga: z.string().min(1, "Location is required."),
  rewardType: z.enum(["Airtime", "Mobile Money"]),
  budget: z.coerce.number().min(1, "Budget must be greater than 0."),
  tags: z.array(z.string()).optional(),
});

export type FormState = {
    type: 'success' | 'error';
    message: string | null;
    errors?: Record<string, string[] | undefined>;
    request?: HelpRequest;
}

export async function createHelpRequest(prevState: any, formData: FormData): Promise<FormState> {
  const validatedFields = requestSchema.safeParse({
    taskType: formData.get("taskType"),
    description: formData.get("description"),
    lga: formData.get("lga"),
    rewardType: formData.get("rewardType"),
    budget: formData.get("budget"),
    tags: formData.getAll("tags"),
  });

  if (!validatedFields.success) {
    return {
      type: "error",
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors in the form.",
    };
  }

  const { taskType, description, lga, rewardType, budget, tags } = validatedFields.data;

  // In a real app, you would get the farmerId from the authenticated user session
  const farmerId = "user-1"; 
  const requestId = `req-${Date.now()}`;
  
  // Create a mock request object
  const newRequest: HelpRequest = {
    id: requestId,
    farmerId,
    taskType: taskType as Skill,
    description,
    lga,
    rewardType,
    budget,
    status: 'open',
    tags: tags || [],
    createdAt: new Date(),
  };

  try {
    const aiSuggestion = await improveMatching({
      requestId: newRequest.id,
      taskType: newRequest.taskType,
      location: newRequest.lga,
      description: newRequest.description,
    });
    
    // In a real app, you would save the request and suggestion to your database
    console.log("New request created:", newRequest);
    console.log("AI Suggestion:", aiSuggestion);

    // Add AI suggestion to the request object for demonstration
    newRequest.aiSuggestion = aiSuggestion;

    return {
      type: "success",
      message: `Request created! AI suggests ${aiSuggestion.suggestedHelperIds.length} helpers.`,
      request: newRequest,
    };
  } catch (error) {
    console.error("AI matching failed:", error);
    return {
      type: "error",
      message: "Failed to get AI matching suggestions. Request created without them.",
      request: newRequest,
    };
  }
}
