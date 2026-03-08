import { memo } from "react";
import { Button } from "@/components/ui/button";
import type { JobStatus } from "@/hooks/useJobStatus";

const allStatuses: JobStatus[] = ["Not Applied", "Applied", "Rejected", "Selected"];

const statusStyles: Record<JobStatus, { active: string; idle: string }> = {
  "Not Applied": {
    active: "bg-muted text-muted-foreground border-border",
    idle: "text-muted-foreground",
  },
  Applied: {
    active: "bg-blue-600/15 text-blue-700 border-blue-300 dark:text-blue-300 dark:border-blue-700",
    idle: "text-muted-foreground",
  },
  Rejected: {
    active: "bg-destructive/15 text-destructive border-destructive/30",
    idle: "text-muted-foreground",
  },
  Selected: {
    active: "bg-success/15 text-[hsl(var(--success))] border-[hsl(var(--success))]/30",
    idle: "text-muted-foreground",
  },
};

interface StatusButtonGroupProps {
  current: JobStatus;
  onChange: (status: JobStatus) => void;
}

const StatusButtonGroup = memo(({ current, onChange }: StatusButtonGroupProps) => (
  <div className="flex flex-wrap gap-1">
    {allStatuses.map((s) => {
      const isActive = current === s;
      const styles = statusStyles[s];
      return (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium transition-colors ${
            isActive ? styles.active : `border-transparent ${styles.idle} hover:bg-muted`
          }`}
        >
          {s}
        </button>
      );
    })}
  </div>
));

StatusButtonGroup.displayName = "StatusButtonGroup";

export default StatusButtonGroup;
