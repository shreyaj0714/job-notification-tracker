interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
  return (
    <section className="py-5">
      <h1 className="font-serif text-4xl font-semibold text-foreground">{title}</h1>
      <p className="mt-2 text-base text-muted-foreground max-w-prose">
        This section will be built in the next step.
      </p>
    </section>
  );
};

export default PlaceholderPage;
