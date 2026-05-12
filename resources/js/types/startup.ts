export type FundingRound = {
    id: number;
    startup_id: number;
    round_name: string;
    amount: string;
    lead_investor: string;
    date: string;
};

export type TeamMember = {
    id: number;
    startup_id: number;
    is_founder: boolean;
    name: string;
    role: string;
    bio: string | null;
    photo_url: string | null;
    twitter_url: string | null;
    linkedin_url: string | null;
    github_url: string | null;
};

export type Startup = {
    id: number;
    name: string;
    slug: string;
    description: string;
    mission: string | null;
    logo_url: string | null;
    funding_amount: string;
    funding_stage: string;
    funding_label: string | null;
    sector: string;
    hq_location: string;
    founding_date: string | null;
    burn_rate: string | null;
    website_url: string | null;
    total_funding: string;
    is_featured: boolean;
    is_bookmarked?: boolean;
    week_number: number;
    year: number;
    funding_rounds?: FundingRound[];
    team_members?: TeamMember[];
};

export type NewsArticle = {
    id: number;
    title: string;
    excerpt: string;
    category: 'funding' | 'acquisition' | 'regulation' | 'top-story';
    source: string;
    source_time: string;
    thumbnail_url: string | null;
    url: string | null;
    read_time: string | null;
    is_featured: boolean;
    week_number: number;
    year: number;
};

export type Sector = {
    id: number;
    name: string;
    icon: string;
    percentage: string;
};
