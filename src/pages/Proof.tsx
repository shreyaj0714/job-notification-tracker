import { FileCheck } from "lucide-react";

const Proof = () => {
  return (
    <section className="py-4">
      <h1 className="font-serif text-4xl font-semibold text-foreground">Proof of Work</h1>
      <p className="mt-1 text-base text-muted-foreground max-w-prose">
        Artifacts and evidence of completed milestones will be collected here.
      </p>

      <div className="mt-4 flex flex-col items-center justify-center rounded-lg border py-5 text-center">
        <FileCheck className="h-4 w-4 text-muted-foreground" />
        <p className="mt-2 text-base text-muted-foreground max-w-prose">
          No artifacts yet. As features are built and verified, proof items will appear in this section.
        </p>
      </div>
    </section>
  );
};

export default Proof;
