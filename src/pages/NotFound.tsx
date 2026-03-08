import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <section className="py-5">
      <h1 className="font-serif text-4xl font-semibold text-foreground">Page Not Found</h1>
      <p className="mt-2 text-base text-muted-foreground max-w-prose">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        Return home
      </Link>
    </section>
  );
};

export default NotFound;
