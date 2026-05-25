import {
  Brain,
  Code2,
  Layers,
  Palette,
  Rocket,
  Zap,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  Layers,
  Code2,
  Palette,
  Rocket,
  Brain,
};

const ACCENT_MAP: Record<string, string> = {
  Zap: "#6ee7b7",
  Layers: "#93c5fd",
  Code2: "#c4b5fd",
  Palette: "#fca5a5",
  Rocket: "#f9a8d4",
  Brain: "#a78bfa",
};

export function resolveCourseIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Zap;
}

export function resolveCourseAccent(name: string): string {
  return ACCENT_MAP[name] ?? "#6ee7b7";
}
