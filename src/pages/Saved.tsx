import { Bookmark } from "lucide-react";

const Saved = () => {
  return (
    <section className="py-4">
      <h1 className="font-serif text-4xl font-semibold text-foreground">Saved Jobs</h1>
      <p className="mt-1 text-base text-muted-foreground max-w-prose">
        Jobs you bookmark will be collected here for easy reference.
      </p>

      <div className="mt-4 flex flex-col items-center justify-center rounded-lg border py-5 text-center">
        <Bookmark className="h-4 w-4 text-muted-foreground" />
        <p className="mt-2 text-base text-muted-foreground max-w-prose">
          No saved jobs yet. Browse the dashboard and bookmark jobs you're interested in.
        </p>
      </div>
    </section>
  );
};

export default Saved;
