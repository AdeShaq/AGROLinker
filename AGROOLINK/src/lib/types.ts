
export type UserRole = "farmer" | "helper" | "admin";

export type Skill = "Transport" | "Labor" | "Repairs" | "Rentals" | "Harvesting" | "Planting" | "Weeding";

export type RequestStatus = "open" | "accepted" | "completed" | "flagged";

export type RewardType = "Airtime" | "Mobile Money";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  lga: string;
  skills?: Skill[];
  isAvailable?: boolean;
  rating?: number;
  avatar?: string;
}

export interface HelpRequest {
  id: string;
  farmerId: string;
  taskType: Skill;
  description: string;
  lga: string;
  rewardType: RewardType;
  budget: number;
  status: RequestStatus;
  tags?: string[];
  assignedHelperId?: string;
  createdAt: Date;
  aiSuggestion?: {
    suggestedHelperIds: string[];
    reasoning: string;
  }
}

export interface Transaction {
    id: string;
    helperId: string;
    requestId: string;
    amount: number;
    method: RewardType;
    status: 'success' | 'failed';
    timestamp: Date;
}
