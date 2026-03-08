import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Bookmark, BookmarkCheck, ExternalLink, Eye } from "lucide-react";
import type { Job } from "@/data/jobs";
import type { JobStatus } from "@/hooks/useJobStatus";
import { getScoreTier } from "@/lib/matchEngine";
import StatusButtonGroup from "./StatusButtonGroup";
import { memo } from "react";

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  matchScore?: number;
  status: JobStatus;
  onView: () => void;
  onSave: () => void;
  onStatusChange: (status: JobStatus) => void;
}

const sourceVariant: Record<string, "default" | "secondary" | "outline"> = {
  LinkedIn: "default",
  Naukri: "secondary",
  Indeed: "outline",
};

const scoreBadgeClass: Record<string, string> = {
  high: "bg-success text-success-foreground",
  medium: "bg-warning text-warning-foreground",
  low: "bg-secondary text-secondary-foreground",
  none: "bg-muted text-muted-foreground",
};

const JobCard = memo(({ job, isSaved, matchScore, status, onView, onSave, onStatusChange }: JobCardProps) => {
  const postedLabel =
    job.postedDaysAgo === 0
      ? "Today"
      : job.postedDaysAgo === 1
        ? "1 day ago"
        : `${job.postedDaysAgo} days ago`;

  const tier = matchScore !== undefined ? getScoreTier(matchScore) : null;

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="pb-1">
        <div className="flex items-start justify-between gap-1">
          <CardTitle className="text-lg leading-snug">{job.title}</CardTitle>
          <div className="flex items-center gap-1 shrink-0">
            {tier !== null && (
              <span
                className={`inline-flex items-center rounded-lg px-2 py-0 text-xs font-medium ${scoreBadgeClass[tier]}`}
              >
                {matchScore}%
              </span>
            )}
            <Badge variant={sourceVariant[job.source] ?? "outline"} className="shrink-0">
              {job.source}
            </Badge>
          </div>
        </div>
        <CardDescription className="text-sm font-medium">{job.company}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-1 pb-1">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-[14px] w-[14px] shrink-0" />
          <span>{job.location}</span>
          <span className="text-border">·</span>
          <span>{job.mode}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-[14px] w-[14px] shrink-0" />
          <span>{postedLabel}</span>
        </div>
        <div className="text-sm text-foreground">
          <span className="text-muted-foreground">Exp:</span> {job.experience} yrs
        </div>
        <div className="text-sm font-medium text-foreground">{job.salaryRange}</div>
        <StatusButtonGroup current={status} onChange={onStatusChange} />
      </CardContent>

      <CardFooter className="gap-1 pt-1 flex-wrap">
        <Button variant="outline" size="sm" onClick={onView}>
          <Eye className="h-[14px] w-[14px]" />
          View
        </Button>
        <Button
          variant={isSaved ? "default" : "outline"}
          size="sm"
          onClick={onSave}
        >
          {isSaved ? (
            <BookmarkCheck className="h-[14px] w-[14px]" />
          ) : (
            <Bookmark className="h-[14px] w-[14px]" />
          )}
          {isSaved ? "Saved" : "Save"}
        </Button>
        <Button variant="outline" size="sm" asChild>
          <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-[14px] w-[14px]" />
            Apply
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
});

JobCard.displayName = "JobCard";

export default JobCard;
