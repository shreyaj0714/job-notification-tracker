import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { jobs } from "@/data/jobs";
import {
  loadPreferences,
  savePreferences,
  type UserPreferences,
} from "@/lib/preferences";
import { toast } from "@/hooks/use-toast";

const allLocations = Array.from(new Set(jobs.map((j) => j.location))).sort();
const experienceLevels = ["Fresher", "0-1", "1-3", "3-5"];
const modeOptions = ["Remote", "Hybrid", "Onsite"] as const;

const Settings = () => {
  const [roleKeywords, setRoleKeywords] = useState("");
  const [preferredLocations, setPreferredLocations] = useState<string[]>([]);
  const [preferredModes, setPreferredModes] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState("");
  const [skills, setSkills] = useState("");
  const [minMatchScore, setMinMatchScore] = useState(40);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const prefs = loadPreferences();
    if (prefs) {
      setRoleKeywords(prefs.roleKeywords.join(", "));
      setPreferredLocations(prefs.preferredLocations);
      setPreferredModes(prefs.preferredModes);
      setExperienceLevel(prefs.experienceLevel);
      setSkills(prefs.skills.join(", "));
      setMinMatchScore(prefs.minMatchScore);
    }
  }, []);

  const handleSave = useCallback(() => {
    const prefs: UserPreferences = {
      roleKeywords: roleKeywords
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      preferredLocations,
      preferredModes,
      experienceLevel,
      skills: skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      minMatchScore,
    };
    savePreferences(prefs);
    setSaved(true);
    toast({ title: "Preferences saved", description: "Your matching criteria have been updated." });
    setTimeout(() => setSaved(false), 2000);
  }, [roleKeywords, preferredLocations, preferredModes, experienceLevel, skills, minMatchScore]);

  const toggleLocation = (loc: string) => {
    setPreferredLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  const toggleMode = (mode: string) => {
    setPreferredModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  };

  return (
    <section className="py-4">
      <h1 className="font-serif text-4xl font-semibold text-foreground">Preferences</h1>
      <p className="mt-1 text-base text-muted-foreground max-w-prose">
        Configure your job matching criteria. These preferences drive the match score on the dashboard.
      </p>

      <div className="mt-3 grid gap-3 max-w-prose">
        {/* Role Keywords */}
        <Card>
          <CardHeader>
            <CardTitle>Role Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="keywords" className="text-sm text-muted-foreground">
              Comma-separated titles or keywords
            </Label>
            <Input
              id="keywords"
              placeholder="e.g. React Developer, SDE Intern, Backend"
              className="mt-1"
              value={roleKeywords}
              onChange={(e) => setRoleKeywords(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Preferred Locations */}
        <Card>
          <CardHeader>
            <CardTitle>Preferred Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <Label className="text-sm text-muted-foreground">
              Select cities you'd like to work in
            </Label>
            <div className="mt-1 flex flex-wrap gap-1">
              {allLocations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => toggleLocation(loc)}
                  className={`rounded-lg border px-2 py-1 text-sm transition-colors duration-fast ease-standard ${
                    preferredLocations.includes(loc)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Work Mode */}
        <Card>
          <CardHeader>
            <CardTitle>Work Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              {modeOptions.map((mode) => (
                <label key={mode} className="flex items-center gap-1 text-sm cursor-pointer">
                  <Checkbox
                    checked={preferredModes.includes(mode)}
                    onCheckedChange={() => toggleMode(mode)}
                  />
                  {mode}
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Experience Level */}
        <Card>
          <CardHeader>
            <CardTitle>Experience Level</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={experienceLevel} onValueChange={setExperienceLevel}>
              <SelectTrigger className="h-[40px]">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                {experienceLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level === "Fresher" ? "Fresher" : `${level} years`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="skills" className="text-sm text-muted-foreground">
              Comma-separated technical skills
            </Label>
            <Input
              id="skills"
              placeholder="e.g. React, Python, SQL, Docker"
              className="mt-1"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Min Match Score */}
        <Card>
          <CardHeader>
            <CardTitle>Minimum Match Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Slider
                value={[minMatchScore]}
                onValueChange={(v) => setMinMatchScore(v[0])}
                min={0}
                max={100}
                step={5}
                className="flex-1"
              />
              <Badge variant="outline" className="shrink-0 min-w-[48px] justify-center">
                {minMatchScore}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Jobs below this score can be hidden on the dashboard.
            </p>
          </CardContent>
        </Card>

        {/* Save */}
        <Button onClick={handleSave} size="lg" className="mt-1">
          {saved ? (
            <>
              <Check className="h-[14px] w-[14px]" />
              Saved
            </>
          ) : (
            "Save Preferences"
          )}
        </Button>
      </div>
    </section>
  );
};

export default Settings;
