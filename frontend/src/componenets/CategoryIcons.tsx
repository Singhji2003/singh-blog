"use client";

interface IconProps {
  color?: string;
  size?: number;
}

export const TechnologyIcon = ({ color = "#6366F1", size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="3" width="20" height="14" rx="2" stroke={color} strokeWidth="2" />
    <path d="M8 21h8M12 17v4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M7 8h2M11 8h6M7 11h4M15 11h2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const AIIcon = ({ color = "#8B5CF6", size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const BusinessIcon = ({ color = "#F59E0B", size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="7" width="20" height="14" rx="2" stroke={color} strokeWidth="2" />
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke={color} strokeWidth="2" />
    <path d="M12 12v3M9 12h6" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const FinanceIcon = ({ color = "#3B82F6", size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="5" width="20" height="14" rx="2" stroke={color} strokeWidth="2" />
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" />
    <path d="M6 12h.01M18 12h.01" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const HealthIcon = ({ color = "#F43F5E", size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 21C12 21 3 15 3 8.5a5 5 0 0110 0 5 5 0 0110 0C23 15 12 21 12 21z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <path d="M9 10h6M12 7v6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const EducationIcon = ({ color = "#22C55E", size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M22 10L12 5 2 10l10 5 10-5z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M22 10v5" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const TravelIcon = ({ color = "#1D4ED8", size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const LifestyleIcon = ({ color = "#A855F7", size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 22C17.523 22 22 17.523 22 12S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke={color} strokeWidth="2" />
    <path d="M12 6v6l4 2" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const FoodIcon = ({ color = "#F97316", size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M18 8h1a4 4 0 010 8h-1" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" stroke={color} strokeWidth="2" />
    <path d="M6 2v4M10 2v4M14 2v4" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const SportsIcon = ({ color = "#3B82F6", size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <path d="M12 2a10 10 0 000 20M2 12h20" stroke={color} strokeWidth="2" />
    <path d="M12 2c-2.4 4-2.4 14 0 20M12 2c2.4 4 2.4 14 0 20" stroke={color} strokeWidth="1.5" />
  </svg>
);

export const EntertainmentIcon = ({ color = "#10B981", size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth="2" />
    <path d="M10 9l5 3-5 3V9z" fill={color} />
  </svg>
);

export const MotivationIcon = ({ color = "#EAB308", size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

export const iconMap: Record<string, React.FC<IconProps>> = {
  technology: TechnologyIcon,
  ai: AIIcon,
  business: BusinessIcon,
  finance: FinanceIcon,
  health: HealthIcon,
  education: EducationIcon,
  travel: TravelIcon,
  lifestyle: LifestyleIcon,
  food: FoodIcon,
  sports: SportsIcon,
  entertainment: EntertainmentIcon,
  motivation: MotivationIcon,
};
