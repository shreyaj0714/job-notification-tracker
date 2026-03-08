import type { Job } from "@/data/jobs";
import type { UserPreferences } from "@/lib/preferences";

export function computeMatchScore(job: Job, prefs: UserPreferences): number {
  let score = 0;

  const titleLower = job.title.toLowerCase();
  const descLower = job.description.toLowerCase();

  // +25 if any roleKeyword appears in job.title
  const titleMatch = prefs.roleKeywords.some(
    (kw) => kw && titleLower.includes(kw.toLowerCase())
  );
  if (titleMatch) score += 25;

  // +15 if any roleKeyword appears in job.description
  const descMatch = prefs.roleKeywords.some(
    (kw) => kw && descLower.includes(kw.toLowerCase())
  );
  if (descMatch) score += 15;

  // +15 if job.location matches preferredLocations
  if (
    prefs.preferredLocations.some(
      (loc) => loc.toLowerCase() === job.location.toLowerCase()
    )
  ) {
    score += 15;
  }

  // +10 if job.mode matches preferredMode
  if (prefs.preferredModes.includes(job.mode)) {
    score += 10;
  }

  // +10 if job.experience matches experienceLevel
  if (prefs.experienceLevel && job.experience === prefs.experienceLevel) {
    score += 10;
  }

  // +15 if overlap between job.skills and user.skills (any match)
  const userSkillsLower = prefs.skills.map((s) => s.toLowerCase());
  const skillOverlap = job.skills.some((s) =>
    userSkillsLower.includes(s.toLowerCase())
  );
  if (skillOverlap) score += 15;

  // +5 if postedDaysAgo <= 2
  if (job.postedDaysAgo <= 2) score += 5;

  // +5 if source is LinkedIn
  if (job.source === "LinkedIn") score += 5;

  return Math.min(score, 100);
}

export function getScoreTier(score: number): "high" | "medium" | "low" | "none" {
  if (score >= 80) return "high";
  if (score >= 60) return "medium";
  if (score >= 40) return "low";
  return "none";
}
