import { Badge } from "@/components/ui/badge";

interface TopBarProps {
  currentStep?: number;
  totalSteps?: number;
  status?: "not-started" | "in-progress" | "shipped";
}

const statusLabels: Record<string, string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  shipped: "Shipped",
};

const statusVariants: Record<string, "outline" | "warning" | "success"> = {
  "not-started": "outline",
  "in-progress": "warning",
  shipped: "success",
};

const TopBar = ({ currentStep = 1, totalSteps = 5, status = "not-started" }: TopBarProps) => {
  return (
    <header className="flex items-center justify-between border-b px-3 py-2">
      <span className="font-serif text-lg font-semibold text-foreground">
        Job Notification App
      </span>
      <span className="font-sans text-sm text-muted-foreground">
        Step {currentStep} / {totalSteps}
      </span>
      <Badge variant={statusVariants[status]}>
        {statusLabels[status]}
      </Badge>
    </header>
  );
};

export default TopBar;
