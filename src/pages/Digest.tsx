import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { jobs } from "@/data/jobs";
import { loadPreferences } from "@/lib/preferences";
import { computeMatchScore, getScoreTier } from "@/lib/matchEngine";
import { getRecentStatusUpdates } from "@/hooks/useJobStatus";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  Mail,
  Sparkles,
  Copy,
  ExternalLink,
  Settings,
  SearchX,
  Activity,
} from "lucide-react";

/* ---------- types ---------- */
interface DigestJob {
  id: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  matchScore: number;
  applyUrl: string;
}

interface StoredDigest {
  date: string;
  jobs: DigestJob[];
}

/* ---------- helpers ---------- */
function todayKey(): string {
  return `jobTrackerDigest_${format(new Date(), "yyyy-MM-dd")}`;
}

function loadDigest(): StoredDigest | null {
  try {
    const stored = localStorage.getItem(todayKey());
    return stored ? (JSON.parse(stored) as StoredDigest) : null;
  } catch {
    return null;
  }
}

function saveDigest(digest: StoredDigest): void {
  localStorage.setItem(todayKey(), JSON.stringify(digest));
}

const scoreBadgeClass: Record<string, string> = {
  high: "bg-success text-success-foreground",
  medium: "bg-warning text-warning-foreground",
  low: "bg-secondary text-secondary-foreground",
  none: "bg-muted text-muted-foreground",
};

const statusBadgeClass: Record<string, string> = {
  Applied: "bg-blue-600/15 text-blue-700 border-blue-300",
  Rejected: "bg-destructive/15 text-destructive border-destructive/30",
  Selected: "bg-success/15 text-[hsl(var(--success))] border-[hsl(var(--success))]/30",
};

/* ---------- component ---------- */
const Digest = () => {
  const prefs = useMemo(() => loadPreferences(), []);
  const [digest, setDigest] = useState<StoredDigest | null>(() => loadDigest());
  const recentUpdates = useMemo(() => getRecentStatusUpdates(), []);

  const generate = useCallback(() => {
    if (!prefs) return;

    const scored = jobs
      .map((job) => ({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        experience: job.experience,
        matchScore: computeMatchScore(job, prefs),
        applyUrl: job.applyUrl,
        postedDaysAgo: job.postedDaysAgo,
      }))
      .sort((a, b) => {
        if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
        return a.postedDaysAgo - b.postedDaysAgo;
      })
      .slice(0, 10)
      .map(({ postedDaysAgo: _, ...rest }) => rest);

    const result: StoredDigest = {
      date: format(new Date(), "yyyy-MM-dd"),
      jobs: scored,
    };
    saveDigest(result);
    setDigest(result);
    toast({ title: "Digest generated", description: "Your 9AM digest is ready." });
  }, [prefs]);

  const digestText = useMemo(() => {
    if (!digest) return "";
    const lines = digest.jobs.map(
      (j, i) =>
        `${i + 1}. ${j.title} at ${j.company} — ${j.location} — ${j.experience} — Match: ${j.matchScore}%\n   Apply: ${j.applyUrl}`
    );
    return `Top 10 Jobs For You — 9AM Digest (${format(new Date(), "MMMM d, yyyy")})\n\n${lines.join("\n\n")}\n\nThis digest was generated based on your preferences.`;
  }, [digest]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(digestText).then(() => {
      toast({ title: "Copied", description: "Digest copied to clipboard." });
    });
  }, [digestText]);

  const emailDraft = useCallback(() => {
    const subject = encodeURIComponent("My 9AM Job Digest");
    const body = encodeURIComponent(digestText);
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
  }, [digestText]);

  /* ---- No preferences ---- */
  if (!prefs) {
    return (
      <section className="py-4">
        <h1 className="font-serif text-4xl font-semibold text-foreground">Daily Digest</h1>
        <p className="mt-1 text-base text-muted-foreground max-w-prose">
          A curated summary of your top-matched jobs, delivered every morning at 9AM.
        </p>
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-warning bg-warning/10 px-3 py-2 max-w-prose">
          <Settings className="h-[16px] w-[16px] text-warning shrink-0" />
          <p className="text-sm text-foreground">
            Set preferences to generate a personalized digest.{" "}
            <Link to="/settings" className="text-primary underline underline-offset-2">
              Go to Settings
            </Link>
          </p>
        </div>

        {/* Still show recent updates even without prefs */}
        <RecentUpdatesSection updates={recentUpdates} />
      </section>
    );
  }

  return (
    <section className="py-4">
      <h1 className="font-serif text-4xl font-semibold text-foreground">Daily Digest</h1>
      <p className="mt-1 text-base text-muted-foreground max-w-prose">
        A curated summary of your top-matched jobs, delivered every morning at 9AM.
      </p>

      {/* Generate button */}
      {!digest && (
        <div className="mt-3">
          <Button size="lg" onClick={generate}>
            <Sparkles className="h-[16px] w-[16px]" />
            Generate Today's 9AM Digest (Simulated)
          </Button>
        </div>
      )}

      {/* Digest content */}
      {digest && digest.jobs.length === 0 && (
        <div className="mt-4 flex flex-col items-center justify-center rounded-lg border py-5 text-center max-w-prose mx-auto">
          <SearchX className="h-4 w-4 text-muted-foreground" />
          <p className="mt-2 text-base text-muted-foreground">
            No matching roles today. Check again tomorrow.
          </p>
        </div>
      )}

      {digest && digest.jobs.length > 0 && (
        <div className="mt-3 mx-auto max-w-prose">
          {/* Email-style card */}
          <div className="rounded-lg border bg-card p-4">
            <div className="border-b pb-3 mb-3">
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Top 10 Jobs For You — 9AM Digest
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {format(new Date(), "EEEE, MMMM d, yyyy")}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {digest.jobs.map((job, i) => {
                const tier = getScoreTier(job.matchScore);
                return (
                  <div
                    key={job.id}
                    className="flex items-start justify-between gap-2 rounded-lg border p-2"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground font-mono">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-medium text-foreground truncate">
                          {job.title}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0">
                        {job.company} · {job.location} · {job.experience}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <span
                        className={`inline-flex items-center rounded-lg px-2 py-0 text-xs font-medium ${scoreBadgeClass[tier]}`}
                      >
                        {job.matchScore}%
                      </span>
                      <Button variant="outline" size="sm" asChild>
                        <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-[14px] w-[14px]" />
                          Apply
                        </a>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t mt-3 pt-3">
              <p className="text-xs text-muted-foreground">
                This digest was generated based on your preferences.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-2 flex flex-wrap gap-2">
            <Button variant="outline" onClick={copyToClipboard}>
              <Copy className="h-[14px] w-[14px]" />
              Copy Digest to Clipboard
            </Button>
            <Button variant="outline" onClick={emailDraft}>
              <Mail className="h-[14px] w-[14px]" />
              Create Email Draft
            </Button>
            <Button variant="outline" onClick={generate}>
              <Sparkles className="h-[14px] w-[14px]" />
              Regenerate
            </Button>
          </div>

          <p className="mt-3 text-xs text-muted-foreground italic">
            Demo Mode: Daily 9AM trigger simulated manually.
          </p>
        </div>
      )}

      {/* Recent Status Updates */}
      <RecentUpdatesSection updates={recentUpdates} />
    </section>
  );
};

/* ---------- Recent Updates sub-component ---------- */
function RecentUpdatesSection({ updates }: { updates: ReturnType<typeof getRecentStatusUpdates> }) {
  if (updates.length === 0) return null;

  return (
    <div className="mt-4 mx-auto max-w-prose">
      <div className="flex items-center gap-1 mb-2">
        <Activity className="h-[16px] w-[16px] text-muted-foreground" />
        <h2 className="font-serif text-xl font-semibold text-foreground">Recent Status Updates</h2>
      </div>
      <div className="rounded-lg border bg-card divide-y">
        {updates.map((u, i) => (
          <div key={`${u.jobId}-${i}`} className="flex items-center justify-between gap-2 px-3 py-2">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground truncate">{u.jobTitle}</p>
              <p className="text-xs text-muted-foreground">{u.company}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium ${statusBadgeClass[u.status] ?? "bg-muted text-muted-foreground"}`}
              >
                {u.status}
              </span>
              <span className="text-xs text-muted-foreground">
                {format(new Date(u.date), "MMM d")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Digest;
