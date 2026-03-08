import { Mail } from "lucide-react";

const Digest = () => {
  return (
    <section className="py-4">
      <h1 className="font-serif text-4xl font-semibold text-foreground">Daily Digest</h1>
      <p className="mt-1 text-base text-muted-foreground max-w-prose">
        A curated summary of your top-matched jobs, delivered every morning at 9AM.
      </p>

      <div className="mt-4 flex flex-col items-center justify-center rounded-lg border py-5 text-center">
        <Mail className="h-4 w-4 text-muted-foreground" />
        <p className="mt-2 text-base text-muted-foreground max-w-prose">
          No digests available yet. Once your preferences are configured and jobs are loaded, daily summaries will appear here.
        </p>
      </div>
    </section>
  );
};

export default Digest;
