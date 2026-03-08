interface ContextHeaderProps {
  headline: string;
  subtext: string;
}

const ContextHeader = ({ headline, subtext }: ContextHeaderProps) => {
  return (
    <section className="px-3 py-4">
      <h1 className="font-serif text-4xl font-semibold text-foreground">{headline}</h1>
      <p className="mt-1 text-base text-muted-foreground max-w-prose">{subtext}</p>
    </section>
  );
};

export default ContextHeader;
