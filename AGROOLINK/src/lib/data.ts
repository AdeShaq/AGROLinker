
import { User, HelpRequest } from './types';

export const mockUsers: User[] = [
  { id: 'user-1', name: 'Musa Adebayo', email: 'musa@test.com', phone: '08012345671', role: 'farmer', lga: 'Ilorin West' },
  { id: 'user-2', name: 'Chidinma Okoro', email: 'chidinma@test.com', phone: '08012345672', role: 'farmer', lga: 'Asa' },
  { id: 'user-3', name: 'Yusuf Alabi', email: 'yusuf@test.com', phone: '08012345673', role: 'helper', lga: 'Ilorin West', skills: ['Transport', 'Labor'], isAvailable: true, rating: 4.5 },
  { id: 'user-4', name: 'Fatima Bello', email: 'fatima@test.com', phone: '08012345674', role: 'helper', lga: 'Ilorin West', skills: ['Repairs', 'Harvesting'], isAvailable: true, rating: 5 },
  { id: 'user-5', name: 'Emeka Nwosu', email: 'emeka@test.com', phone: '08012345675', role: 'helper', lga: 'Asa', skills: ['Labor', 'Rentals'], isAvailable: false, rating: 3 },
  { id: 'user-6', name: 'Admin User', email: 'admin@test.com', phone: '08012345678', role: 'admin', lga: 'HQ' },
  { id: 'user-7', name: 'Sade Ajayi', email: 'sade@test.com', phone: '08012345679', role: 'helper', lga: 'Ilorin West', skills: ['Transport'], isAvailable: true, rating: 4.8 },
  { id: 'user-8', name: 'Amaka F.', email: 'amaka@test.com', phone: '08012345680', role: 'farmer', lga: 'Owerri', rating: 4, avatar: 'https://placehold.co/40x40' },
  { id: 'user-9', name: 'Emeka O.', email: 'emeka.o@test.com', phone: '08012345681', role: 'farmer', lga: 'Owerri', rating: 4, avatar: 'https://placehold.co/40x40' },
  { id: 'user-10', name: 'Ngozi A.', email: 'ngozi@test.com', phone: '08012345682', role: 'farmer', lga: 'Owerri', rating: 5, avatar: 'https://placehold.co/40x40' },
  { id: 'user-11', name: 'kvngshaggy', email: 'kvngshaggy@test.com', phone: '08012345683', role: 'helper', lga: 'Lagos', skills: ['Rentals', 'Transport'], isAvailable: true, rating: 4.9, avatar: 'https://placehold.co/40x40' },
  { id: 'user-12', name: 'xeno', email: 'xeno@test.com', phone: '08012345684', role: 'farmer', lga: 'Ikeja', rating: 4.2, avatar: 'https://placehold.co/40x40' },
  { id: 'user-13', name: 'Jane Doe', email: 'jane@test.com', phone: '08012345685', role: 'helper', lga: 'Port Harcourt', skills: ['Harvesting'], isAvailable: false, rating: 4.0, avatar: 'https://placehold.co/40x40' },
];

export const initialRequests: HelpRequest[] = [
    {
        id: 'req-1',
        farmerId: 'user-1',
        taskType: 'Transport',
        description: 'Need to transport 10 bags of maize from my farm to Oja-Oba market.',
        lga: 'Ilorin West',
        rewardType: 'Mobile Money',
        budget: 5000,
        status: 'open',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
        id: 'req-2',
        farmerId: 'user-2',
        taskType: 'Labor',
        description: 'Need 2 people for weeding a 1-acre cassava farm.',
        lga: 'Asa',
        rewardType: 'Airtime',
        budget: 8000,
        status: 'open',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
        id: 'req-3',
        farmerId: 'user-1',
        taskType: 'Repairs',
        description: 'My water pump is broken and needs urgent repair.',
        lga: 'Ilorin West',
        rewardType: 'Mobile Money',
        budget: 3500,
        status: 'accepted',
        assignedHelperId: 'user-4',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
     {
        id: 'req-4',
        farmerId: 'user-1',
        taskType: 'Transport',
        description: 'Urgent need to move seedlings to the new plot.',
        lga: 'Ilorin West',
        rewardType: 'Mobile Money',
        budget: 2500,
        status: 'completed',
        assignedHelperId: 'user-3',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    }
];
