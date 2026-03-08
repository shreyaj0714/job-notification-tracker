import { Briefcase } from "lucide-react";

const Dashboard = () => {
  return (
    <section className="py-4">
      <h1 className="font-serif text-4xl font-semibold text-foreground">Dashboard</h1>
      <p className="mt-1 text-base text-muted-foreground max-w-prose">
        Your matched jobs appear here.
      </p>

      <div className="mt-4 flex flex-col items-center justify-center rounded-lg border py-5 text-center">
        <Briefcase className="h-4 w-4 text-muted-foreground" />
        <p className="mt-2 text-base text-muted-foreground max-w-prose">
          No jobs yet. In the next step, you will load a realistic dataset.
        </p>
      </div>
    </section>
  );
};

export default Dashboard;
