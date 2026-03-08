import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin } from "lucide-react";
import type { Job } from "@/data/jobs";

interface JobDetailModalProps {
  job: Job | null;
  onClose: () => void;
}

const JobDetailModal = ({ job, onClose }: JobDetailModalProps) => {
  if (!job) return null;

  return (
    <Dialog open={!!job} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-prose">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">{job.title}</DialogTitle>
          <DialogDescription className="text-base font-medium text-foreground">
            {job.company}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-[14px] w-[14px]" />
            {job.location} · {job.mode}
          </div>

          <div className="flex flex-wrap gap-1 text-sm">
            <span className="text-muted-foreground">Experience:</span>
            <span>{job.experience} yrs</span>
            <span className="text-muted-foreground ml-2">Salary:</span>
            <span className="font-medium">{job.salaryRange}</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {job.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>

          <p className="text-sm leading-relaxed text-foreground mt-1">{job.description}</p>

          <Button className="mt-2 self-start" asChild>
            <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-[14px] w-[14px]" />
              Apply Now
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailModal;
