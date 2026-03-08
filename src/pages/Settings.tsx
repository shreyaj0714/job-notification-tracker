import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Settings = () => {
  return (
    <section className="py-4">
      <h1 className="font-serif text-4xl font-semibold text-foreground">Preferences</h1>
      <p className="mt-1 text-base text-muted-foreground max-w-prose">
        Configure what kinds of jobs you want to track. Saving will be enabled in a future step.
      </p>

      <div className="mt-3 grid gap-3 max-w-prose">
        <Card>
          <CardHeader>
            <CardTitle>Role Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="keywords" className="text-sm text-muted-foreground">
              Enter job titles or keywords you're interested in
            </Label>
            <Input id="keywords" placeholder="e.g. Product Manager, Staff Engineer" className="mt-1" readOnly />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferred Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="locations" className="text-sm text-muted-foreground">
              Cities or regions you'd like to work in
            </Label>
            <Input id="locations" placeholder="e.g. San Francisco, London, Berlin" className="mt-1" readOnly />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Work Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              {["Remote", "Hybrid", "Onsite"].map((mode) => (
                <div
                  key={mode}
                  className="rounded-lg border px-3 py-2 text-sm text-muted-foreground cursor-default"
                >
                  {mode}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Experience Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              {["Junior", "Mid-Level", "Senior", "Staff", "Principal"].map((level) => (
                <div
                  key={level}
                  className="rounded-lg border px-3 py-2 text-sm text-muted-foreground cursor-default"
                >
                  {level}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Settings;
