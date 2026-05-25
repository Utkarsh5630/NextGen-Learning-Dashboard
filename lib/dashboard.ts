import { createClient } from "@/lib/supabase/server";
import type {
  ActivityStats,
  Course,
  DashboardData,
  StudentProfile,
  Win,
} from "@/lib/types";

const DEFAULT_ACTIVITY_CELLS = [
  0.2, 0.35, 0.5, 0.7, 0.4, 0.55, 0.8, 0.3, 0.45, 0.6, 0.75, 0.5, 0.65, 0.85,
  0.25, 0.4, 0.55, 0.7, 0.35, 0.5, 0.65, 0.8, 0.45, 0.6, 0.75, 0.9, 0.3, 0.5,
  0.7, 0.85, 0.4, 0.55, 0.7, 0.8, 0.6,
];

function isMissingTableError(message: string) {
  return message.includes("Could not find the table");
}

function buildFallbackProfile(courses: Course[]): StudentProfile {
  const avgProgress =
    courses.length > 0
      ? Math.round(
          courses.reduce((sum, c) => sum + c.progress, 0) / courses.length
        )
      : 0;

  return {
    id: "local",
    name: process.env.NEXT_PUBLIC_STUDENT_NAME ?? "Utkarsh",
    streak_days: 18,
    focus_score: avgProgress || 92,
    active_courses_count: courses.length,
    tagline: "Continue your learning journey and complete your next milestone today.",
  };
}

function buildFallbackActivity(): ActivityStats {
  return {
    id: "local",
    week_total: 24,
    consistency_percent: 92,
    cells: DEFAULT_ACTIVITY_CELLS,
    summary: "Consistent sessions are pushing your baseline higher every day.",
  };
}

export async function getDashboardData(): Promise<DashboardData> {
  const supabase = createClient();

  const { data: courses, error: coursesError } = await supabase
    .from("courses")
    .select("id, title, progress, icon_name, created_at")
    .order("created_at", { ascending: true });

  if (coursesError) {
    throw new Error(coursesError.message);
  }

  const courseList = (courses ?? []).map((course) => ({
    ...course,
    id: String(course.id),
  }));

  let profile: StudentProfile | null = null;
  const profileResult = await supabase
    .from("student_profile")
    .select("id, name, streak_days, focus_score, active_courses_count, tagline")
    .limit(1)
    .maybeSingle();

  if (!profileResult.error) {
    profile = profileResult.data;
  } else if (!isMissingTableError(profileResult.error.message)) {
    throw new Error(profileResult.error.message);
  }

  let activity: ActivityStats | null = null;
  const activityResult = await supabase
    .from("activity_stats")
    .select("id, week_total, consistency_percent, cells, summary")
    .limit(1)
    .maybeSingle();

  if (!activityResult.error) {
    activity = activityResult.data as ActivityStats | null;
  } else if (!isMissingTableError(activityResult.error.message)) {
    throw new Error(activityResult.error.message);
  }

  let wins: Win[] = [];
  const winsResult = await supabase
    .from("wins")
    .select("id, title, description, achieved_at")
    .order("achieved_at", { ascending: false });

  if (!winsResult.error) {
    wins = winsResult.data ?? [];
  } else if (!isMissingTableError(winsResult.error.message)) {
    throw new Error(winsResult.error.message);
  }

  const resolvedProfile = profile ?? buildFallbackProfile(courseList);

  if (!profile && courseList.length > 0) {
    resolvedProfile.active_courses_count = courseList.length;
    resolvedProfile.focus_score = Math.round(
      courseList.reduce((sum, c) => sum + c.progress, 0) / courseList.length
    );
  }

  const resolvedActivity = activity ?? buildFallbackActivity();
  const cells =
    Array.isArray(resolvedActivity.cells) && resolvedActivity.cells.length >= 35
      ? resolvedActivity.cells.slice(0, 35)
      : DEFAULT_ACTIVITY_CELLS;

  return {
    profile: resolvedProfile,
    courses: courseList,
    activity: { ...resolvedActivity, cells },
    wins,
  };
}
