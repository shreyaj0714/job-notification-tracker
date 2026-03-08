import { useMemo } from "react";
import { Link } from "react-router-dom";
import { allTestsPassed } from "@/hooks/useTestChecklist";
import { ShieldCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Ship = () => {
  const ready = useMemo(() => allTestsPassed(), []);

  if (!ready) {
    return (
      <section className="py-4">
        <h1 className="font-serif text-4xl font-semibold text-foreground">Ship</h1>
        <div className="mt-4 flex flex-col items-center justify-center rounded-lg border py-8 text-center max-w-prose mx-auto">
          <Lock className="h-8 w-8 text-muted-foreground" />
          <p className="mt-3 text-lg font-medium text-foreground">
            Complete all tests before shipping.
          </p>
          <p className="mt-1 text-sm text-muted-foreground max-w-xs">
            Every item on the test checklist must be checked before you can proceed.
          </p>
          <Button variant="outline" className="mt-4" asChild>
            <Link to="/jt/07-test">Go to Test Checklist</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4">
      <h1 className="font-serif text-4xl font-semibold text-foreground">Ship</h1>
      <div className="mt-4 flex flex-col items-center justify-center rounded-lg border border-[hsl(var(--success))]/40 bg-success/10 py-8 text-center max-w-prose mx-auto">
        <ShieldCheck className="h-8 w-8 text-[hsl(var(--success))]" />
        <p className="mt-3 text-lg font-medium text-foreground">
          All tests passed — ready to ship!
        </p>
        <p className="mt-1 text-sm text-muted-foreground max-w-xs">
          Every checklist item has been verified. The project is production-ready.
        </p>
      </div>
    </section>
  );
};

export default Ship;
