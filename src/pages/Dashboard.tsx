import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { jobs } from "@/data/jobs";
import JobCard from "@/components/jobs/JobCard";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import FilterBar from "@/components/jobs/FilterBar";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import { loadPreferences } from "@/lib/preferences";
import { computeMatchScore } from "@/lib/matchEngine";
import type { Job } from "@/data/jobs";
import { Briefcase, Settings } from "lucide-react";

function extractSalaryNumber(salary: string): number {
  const match = salary.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

const Dashboard = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const { savedIds, toggleSave } = useSavedJobs();
  const prefs = useMemo(() => loadPreferences(), []);
  const prefsExist = prefs !== null;

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("All");
  const [mode, setMode] = useState("All");
  const [experience, setExperience] = useState("All");
  const [source, setSource] = useState("All");
  const [sort, setSort] = useState("latest");
  const [showOnlyMatches, setShowOnlyMatches] = useState(false);

  const scoredJobs = useMemo(() => {
    return jobs.map((job) => ({
      job,
      matchScore: prefs ? computeMatchScore(job, prefs) : 0,
    }));
  }, [prefs]);

  const filtered = useMemo(() => {
    let result = [...scoredJobs];

    if (keyword) {
      const q = keyword.toLowerCase();
      result = result.filter(
        (r) =>
          r.job.title.toLowerCase().includes(q) ||
          r.job.company.toLowerCase().includes(q)
      );
    }
    if (location !== "All") result = result.filter((r) => r.job.location === location);
    if (mode !== "All") result = result.filter((r) => r.job.mode === mode);
    if (experience !== "All") result = result.filter((r) => r.job.experience === experience);
    if (source !== "All") result = result.filter((r) => r.job.source === source);

    if (showOnlyMatches && prefs) {
      result = result.filter((r) => r.matchScore >= prefs.minMatchScore);
    }

    switch (sort) {
      case "latest":
        result.sort((a, b) => a.job.postedDaysAgo - b.job.postedDaysAgo);
        break;
      case "oldest":
        result.sort((a, b) => b.job.postedDaysAgo - a.job.postedDaysAgo);
        break;
      case "score":
        result.sort((a, b) => b.matchScore - a.matchScore);
        break;
      case "salary":
        result.sort(
          (a, b) => extractSalaryNumber(b.job.salaryRange) - extractSalaryNumber(a.job.salaryRange)
        );
        break;
    }

    return result;
  }, [scoredJobs, keyword, location, mode, experience, source, sort, showOnlyMatches, prefs]);

  return (
    <section className="py-4">
      <h1 className="font-serif text-4xl font-semibold text-foreground">Dashboard</h1>
      <p className="mt-1 text-base text-muted-foreground max-w-prose">
        {filtered.length} job{filtered.length !== 1 ? "s" : ""} available
      </p>

      {!prefsExist && (
        <div className="mt-2 flex items-center gap-2 rounded-lg border border-warning bg-warning/10 px-3 py-2">
          <Settings className="h-[16px] w-[16px] text-warning shrink-0" />
          <p className="text-sm text-foreground">
            Set your preferences to activate intelligent matching.{" "}
            <Link to="/settings" className="text-primary underline underline-offset-2">
              Go to Settings
            </Link>
          </p>
        </div>
      )}

      <FilterBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        location={location}
        onLocationChange={setLocation}
        mode={mode}
        onModeChange={setMode}
        experience={experience}
        onExperienceChange={setExperience}
        source={source}
        onSourceChange={setSource}
        sort={sort}
        onSortChange={setSort}
        showOnlyMatches={showOnlyMatches}
        onShowOnlyMatchesChange={setShowOnlyMatches}
        hasPreferences={prefsExist}
      />

      {filtered.length === 0 ? (
        <div className="mt-4 flex flex-col items-center justify-center rounded-lg border py-5 text-center">
          <Briefcase className="h-4 w-4 text-muted-foreground" />
          <p className="mt-2 text-base text-muted-foreground max-w-prose">
            No roles match your criteria. Adjust filters or lower threshold.
          </p>
        </div>
      ) : (
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(({ job, matchScore }) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedIds.has(job.id)}
              matchScore={prefsExist ? matchScore : undefined}
              onView={() => setSelectedJob(job)}
              onSave={() => toggleSave(job.id)}
            />
          ))}
        </div>
      )}

      <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </section>
  );
};

export default Dashboard;
