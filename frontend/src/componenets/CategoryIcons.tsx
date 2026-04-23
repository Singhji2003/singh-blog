"use client";

interface IconProps {
  color?: string;
  size?: number;
}
import PhonelinkSharpIcon from "@mui/icons-material/PhonelinkSharp";
import FavoriteSharpIcon from "@mui/icons-material/FavoriteSharp";
import LightModeSharpIcon from "@mui/icons-material/LightModeSharp";
import SchoolSharpIcon from "@mui/icons-material/SchoolSharp";
import TravelExploreSharpIcon from "@mui/icons-material/TravelExploreSharp";
import BusinessCenterSharpIcon from "@mui/icons-material/BusinessCenterSharp";
import MonetizationOnSharpIcon from "@mui/icons-material/MonetizationOnSharp";
import AccessTimeSharpIcon from "@mui/icons-material/AccessTimeSharp";
import FastfoodSharpIcon from "@mui/icons-material/FastfoodSharp";
import SportsBasketballSharpIcon from "@mui/icons-material/SportsBasketballSharp";
import OndemandVideoSharpIcon from "@mui/icons-material/OndemandVideoSharp";
import BoltSharpIcon from "@mui/icons-material/BoltSharp";
export const TechnologyIcon = ({ color = "#6366F1", size = 20 }: IconProps) => (
  <PhonelinkSharpIcon sx={{ fontSize: size }} htmlColor={color} />
);

export const AIIcon = ({ color = "#8B5CF6", size = 20 }: IconProps) => (
  <LightModeSharpIcon sx={{ fontSize: size }} htmlColor={color} />
);

export const BusinessIcon = ({ color = "#F59E0B", size = 20 }: IconProps) => (
  <BusinessCenterSharpIcon sx={{ fontSize: size }} htmlColor={color} />
);

export const FinanceIcon = ({ color = "#3B82F6", size = 20 }: IconProps) => (
  <MonetizationOnSharpIcon sx={{ fontSize: size }} htmlColor={color} />
);

export const HealthIcon = ({ color = "#F43F5E", size = 20 }: IconProps) => (
  <FavoriteSharpIcon sx={{ fontSize: size }} htmlColor={color} />
);

export const EducationIcon = ({ color = "#22C55E", size = 20 }: IconProps) => (
  <SchoolSharpIcon sx={{ fontSize: size }} htmlColor={color} />
);

export const TravelIcon = ({ color = "#1D4ED8", size = 20 }: IconProps) => (
  <TravelExploreSharpIcon sx={{ fontSize: size }} htmlColor={color} />
);

export const LifestyleIcon = ({ color = "#A855F7", size = 20 }: IconProps) => (
  <AccessTimeSharpIcon sx={{ fontSize: size }} htmlColor={color} />
);

export const FoodIcon = ({ color = "#F97316", size = 20 }: IconProps) => (
  <FastfoodSharpIcon sx={{ fontSize: size }} htmlColor={color} />
);

export const SportsIcon = ({ color = "#3B82F6", size = 20 }: IconProps) => (
  <SportsBasketballSharpIcon sx={{ fontSize: size }} htmlColor={color} />
);

export const EntertainmentIcon = ({
  color = "#10B981",
  size = 20,
}: IconProps) => (
  <OndemandVideoSharpIcon sx={{ fontSize: size }} htmlColor={color} />
);

export const MotivationIcon = ({ color = "#EAB308", size = 20 }: IconProps) => (
  <BoltSharpIcon sx={{ fontSize: size }} htmlColor={color} />
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
