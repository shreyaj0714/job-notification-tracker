import { useState, useMemo } from "react";
import { jobs } from "@/data/jobs";
import JobCard from "@/components/jobs/JobCard";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import FilterBar from "@/components/jobs/FilterBar";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import type { Job } from "@/data/jobs";
import { Briefcase } from "lucide-react";

const Dashboard = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const { savedIds, toggleSave } = useSavedJobs();

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("All");
  const [mode, setMode] = useState("All");
  const [experience, setExperience] = useState("All");
  const [source, setSource] = useState("All");
  const [sort, setSort] = useState("latest");

  const filtered = useMemo(() => {
    let result = [...jobs];

    if (keyword) {
      const q = keyword.toLowerCase();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q)
      );
    }
    if (location !== "All") result = result.filter((j) => j.location === location);
    if (mode !== "All") result = result.filter((j) => j.mode === mode);
    if (experience !== "All") result = result.filter((j) => j.experience === experience);
    if (source !== "All") result = result.filter((j) => j.source === source);

    if (sort === "latest") {
      result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    } else {
      result.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
    }

    return result;
  }, [keyword, location, mode, experience, source, sort]);

  return (
    <section className="py-4">
      <h1 className="font-serif text-4xl font-semibold text-foreground">Dashboard</h1>
      <p className="mt-1 text-base text-muted-foreground max-w-prose">
        {filtered.length} job{filtered.length !== 1 ? "s" : ""} available
      </p>

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
      />

      {filtered.length === 0 ? (
        <div className="mt-4 flex flex-col items-center justify-center rounded-lg border py-5 text-center">
          <Briefcase className="h-4 w-4 text-muted-foreground" />
          <p className="mt-2 text-base text-muted-foreground">
            No jobs match your search.
          </p>
        </div>
      ) : (
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedIds.has(job.id)}
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
