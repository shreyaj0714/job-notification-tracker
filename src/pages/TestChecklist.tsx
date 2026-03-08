import { useTestChecklist, TEST_ITEMS } from "@/hooks/useTestChecklist";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RotateCcw, CircleHelp, CheckCircle2, AlertTriangle } from "lucide-react";

const TestChecklist = () => {
  const { checked, toggle, reset, passedCount, total } = useTestChecklist();
  const allPassed = passedCount === total;

  return (
    <section className="py-4">
      <h1 className="font-serif text-4xl font-semibold text-foreground">Test Checklist</h1>
      <p className="mt-1 text-base text-muted-foreground max-w-prose">
        Verify every feature before shipping. Check each item after manual testing.
      </p>

      {/* Summary */}
      <div
        className={`mt-3 flex items-center gap-2 rounded-lg border px-3 py-2 max-w-prose ${
          allPassed
            ? "border-[hsl(var(--success))]/40 bg-success/10"
            : "border-warning bg-warning/10"
        }`}
      >
        {allPassed ? (
          <CheckCircle2 className="h-[16px] w-[16px] text-[hsl(var(--success))] shrink-0" />
        ) : (
          <AlertTriangle className="h-[16px] w-[16px] text-warning shrink-0" />
        )}
        <p className="text-sm font-medium text-foreground">
          Tests Passed: {passedCount} / {total}
        </p>
        {!allPassed && (
          <span className="text-xs text-muted-foreground ml-1">
            — Resolve all issues before shipping.
          </span>
        )}
      </div>

      {/* Checklist */}
      <div className="mt-3 max-w-prose rounded-lg border bg-card divide-y">
        {TEST_ITEMS.map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-accent/50 transition-colors"
          >
            <Checkbox
              checked={!!checked[item.id]}
              onCheckedChange={() => toggle(item.id)}
            />
            <span
              className={`flex-1 text-sm ${
                checked[item.id]
                  ? "text-muted-foreground line-through"
                  : "text-foreground"
              }`}
            >
              {item.label}
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  <CircleHelp className="h-[14px] w-[14px]" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-[260px] text-xs">
                {item.hint}
              </TooltipContent>
            </Tooltip>
          </label>
        ))}
      </div>

      {/* Reset */}
      <div className="mt-3">
        <Button variant="outline" size="sm" onClick={reset}>
          <RotateCcw className="h-[14px] w-[14px]" />
          Reset Test Status
        </Button>
      </div>
    </section>
  );
};

export default TestChecklist;
