import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center py-5 text-center" style={{ minHeight: "calc(100vh - 200px)" }}>
      <h1 className="font-serif text-5xl font-semibold text-foreground">
        Stop Missing The Right Jobs.
      </h1>
      <p className="mt-3 text-lg text-muted-foreground max-w-prose">
        Precision-matched job discovery delivered daily at 9AM.
      </p>
      <Button size="lg" className="mt-4" onClick={() => navigate("/settings")}>
        Start Tracking
      </Button>
    </section>
  );
};

export default Index;
