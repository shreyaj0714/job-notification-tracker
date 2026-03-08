import PageLayout from "@/components/layout/PageLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  return (
    <PageLayout
      headline="Design System"
      subtext="Foundation components for the Job Notification App. Every element follows a strict spacing, color, and typography system."
      currentStep={1}
      totalSteps={5}
      status="in-progress"
      primary={
        <div className="flex flex-col gap-3">
          {/* Typography */}
          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
              <CardDescription>Serif headings, sans-serif body, intentional hierarchy.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <h1>Heading One</h1>
                <h2>Heading Two</h2>
                <h3>Heading Three</h3>
                <p className="text-base">
                  Body text at 16px with 1.7 line-height. Comfortable reading rhythm. Maximum width constrained to 720px for optimal readability across all viewport sizes.
                </p>
                <p className="text-sm text-muted-foreground">
                  Muted secondary text for supporting information.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>Consistent sizing and interaction states.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-2">
                <Button>Primary Action</Button>
                <Button variant="outline">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link Style</Button>
                <Button size="sm">Small</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
              </div>
            </CardContent>
          </Card>

          {/* Inputs */}
          <Card>
            <CardHeader>
              <CardTitle>Inputs</CardTitle>
              <CardDescription>Clean borders with clear focus states.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2 max-w-prose">
                <Input placeholder="Enter your email address" />
                <Input placeholder="Disabled input" disabled />
              </div>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>Status indicators across the system.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="destructive">Error</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Colors */}
          <Card>
            <CardHeader>
              <CardTitle>Color Palette</CardTitle>
              <CardDescription>Four-color maximum. Calm, intentional, cohesive.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <div className="flex flex-col items-center gap-1">
                  <div className="h-5 w-5 rounded-lg bg-background border" />
                  <span className="text-xs text-muted-foreground">Background</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="h-5 w-5 rounded-lg bg-foreground" />
                  <span className="text-xs text-muted-foreground">Text</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="h-5 w-5 rounded-lg bg-primary" />
                  <span className="text-xs text-muted-foreground">Accent</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="h-5 w-5 rounded-lg bg-border" />
                  <span className="text-xs text-muted-foreground">Border</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      }
      secondary={
        <div className="flex flex-col gap-3">
          <Card>
            <CardHeader>
              <CardTitle>About This System</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">
                  This design system provides the foundational layer for the Job Notification App. No product features are included yet.
                </p>
                <div className="rounded-lg border bg-muted p-2">
                  <p className="font-mono text-xs text-muted-foreground">
                    Spacing: 8 · 16 · 24 · 40 · 64
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Spacing Scale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-1">
                {[
                  { label: "space-1", value: "8px" },
                  { label: "space-2", value: "16px" },
                  { label: "space-3", value: "24px" },
                  { label: "space-4", value: "40px" },
                  { label: "space-5", value: "64px" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <div className="bg-primary/20 rounded-sm" style={{ width: s.value, height: "8px" }} />
                    <span className="text-xs text-muted-foreground">{s.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Empty State</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-2 py-3 text-center">
                <p className="text-sm text-muted-foreground">No notifications configured yet.</p>
                <Button variant="outline" size="sm">Add your first notification</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      }
      checklist={[
        { label: "UI Built", done: true },
        { label: "Logic Working", done: false },
        { label: "Test Passed", done: false },
        { label: "Deployed", done: false },
      ]}
    />
  );
};

export default Index;
