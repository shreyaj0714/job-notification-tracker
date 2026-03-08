import { useState } from "react";
import { jobs } from "@/data/jobs";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import JobCard from "@/components/jobs/JobCard";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import { Bookmark } from "lucide-react";
import type { Job } from "@/data/jobs";

const Saved = () => {
  const { savedIds, toggleSave } = useSavedJobs();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const savedJobs = jobs.filter((j) => savedIds.has(j.id));

  return (
    <section className="py-4">
      <h1 className="font-serif text-4xl font-semibold text-foreground">Saved Jobs</h1>
      <p className="mt-1 text-base text-muted-foreground max-w-prose">
        {savedJobs.length > 0
          ? `${savedJobs.length} job${savedJobs.length !== 1 ? "s" : ""} saved`
          : "Jobs you bookmark will be collected here for easy reference."}
      </p>

      {savedJobs.length === 0 ? (
        <div className="mt-4 flex flex-col items-center justify-center rounded-lg border py-5 text-center">
          <Bookmark className="h-4 w-4 text-muted-foreground" />
          <p className="mt-2 text-base text-muted-foreground max-w-prose">
            No saved jobs yet. Browse the dashboard and bookmark jobs you're interested in.
          </p>
        </div>
      ) : (
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {savedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={true}
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

export default Saved;
