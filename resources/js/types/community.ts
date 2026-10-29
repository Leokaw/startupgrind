// resources/js/types/community.ts

export type CommunityUserType = 'company' | 'user' | 'freelancer' | 'employee';

export type CommunityUserService = {
    id: string;
    name: string;
    description: string | null;
    price: number | string;
    category: string | null;
};

export type CommunityUserTicket = {
    id: string;
    name: string;
    description: string | null;
    /** Only present when the ticket relation is eager-loaded with event info. */
    event_url?: string | null;
    discount_percentage: number | string | null;
    discount_amount: number | string | null;
};

export type CommunityUserEmployee = {
    id: string;
    name: string;
    email: string;
    profile_photo_url: string;
    has_custom_profile_photo: boolean;
    email_verified_at: string | null;
    created_at: string | null;
};

export type CommunityUser = {
    id: string;
    name: string;
    email: string;
    user_type: CommunityUserType;
    profile_photo_url: string;
    has_custom_profile_photo: boolean;
    company: { id: string; name: string } | null;
    email_verified_at: string | null;
    approved_at: string | null;
    services: CommunityUserService[];
    tickets: CommunityUserTicket[];
    /** Not loaded on the community listing page — required only where the relation is eager-loaded. */
    employees?: CommunityUserEmployee[];
};

export type PaginatedUsers = {
    data: CommunityUser[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
};

export type CommunityFilters = {
    search?: string;
    user_type?: string;
};