import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Bookmark, BookmarkCheck, ExternalLink, Eye } from "lucide-react";
import type { Job } from "@/data/jobs";

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onView: () => void;
  onSave: () => void;
}

const sourceVariant: Record<string, "default" | "secondary" | "outline"> = {
  LinkedIn: "default",
  Naukri: "secondary",
  Indeed: "outline",
};

const JobCard = ({ job, isSaved, onView, onSave }: JobCardProps) => {
  const postedLabel =
    job.postedDaysAgo === 0
      ? "Today"
      : job.postedDaysAgo === 1
        ? "1 day ago"
        : `${job.postedDaysAgo} days ago`;

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="pb-1">
        <div className="flex items-start justify-between gap-1">
          <CardTitle className="text-lg leading-snug">{job.title}</CardTitle>
          <Badge variant={sourceVariant[job.source] ?? "outline"} className="shrink-0">
            {job.source}
          </Badge>
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
};

export default JobCard;
