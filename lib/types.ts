export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  streak_days: number;
  focus_score: number;
  active_courses_count: number;
  tagline: string | null;
}

export interface ActivityStats {
  id: string;
  week_total: number;
  consistency_percent: number;
  cells: number[];
  summary: string | null;
}

export interface Win {
  id: string;
  title: string;
  description: string | null;
  achieved_at: string;
}

export interface DashboardData {
  profile: StudentProfile;
  courses: Course[];
  activity: ActivityStats;
  wins: Win[];
}

export type NavItemId = "overview" | "courses" | "activity" | "wins";
