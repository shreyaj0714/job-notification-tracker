import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { jobs } from "@/data/jobs";

const uniqueLocations = ["All", ...Array.from(new Set(jobs.map((j) => j.location))).sort()];
const modes = ["All", "Remote", "Hybrid", "Onsite"];
const experiences = ["All", "Fresher", "0-1", "1-3", "3-5"];
const sources = ["All", "LinkedIn", "Naukri", "Indeed"];
const sortOptions = ["latest", "oldest", "score", "salary"];
const statusOptions = ["All", "Not Applied", "Applied", "Rejected", "Selected"];

interface FilterBarProps {
  keyword: string;
  onKeywordChange: (v: string) => void;
  location: string;
  onLocationChange: (v: string) => void;
  mode: string;
  onModeChange: (v: string) => void;
  experience: string;
  onExperienceChange: (v: string) => void;
  source: string;
  onSourceChange: (v: string) => void;
  sort: string;
  onSortChange: (v: string) => void;
  status: string;
  onStatusChange: (v: string) => void;
  showOnlyMatches: boolean;
  onShowOnlyMatchesChange: (v: boolean) => void;
  hasPreferences: boolean;
}

const sortLabels: Record<string, string> = {
  latest: "Latest first",
  oldest: "Oldest first",
  score: "Match score",
  salary: "Salary (high)",
};

const FilterBar = ({
  keyword,
  onKeywordChange,
  location,
  onLocationChange,
  mode,
  onModeChange,
  experience,
  onExperienceChange,
  source,
  onSourceChange,
  sort,
  onSortChange,
  status,
  onStatusChange,
  showOnlyMatches,
  onShowOnlyMatchesChange,
  hasPreferences,
}: FilterBarProps) => {
  return (
    <div className="mt-3 flex flex-col gap-2">
      <div className="flex flex-wrap items-end gap-2">
        <div className="w-full sm:w-auto sm:min-w-[200px]">
          <label className="text-xs text-muted-foreground mb-px block">Search</label>
          <Input
            placeholder="Title or company…"
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
          />
        </div>

        <FilterSelect label="Location" value={location} onChange={onLocationChange} options={uniqueLocations} />
        <FilterSelect label="Mode" value={mode} onChange={onModeChange} options={modes} />
        <FilterSelect label="Experience" value={experience} onChange={onExperienceChange} options={experiences} />
        <FilterSelect label="Source" value={source} onChange={onSourceChange} options={sources} />
        <FilterSelect label="Status" value={status} onChange={onStatusChange} options={statusOptions} />
        <FilterSelect
          label="Sort"
          value={sort}
          onChange={onSortChange}
          options={sortOptions}
          labelMap={sortLabels}
        />
      </div>

      {hasPreferences && (
        <div className="flex items-center gap-1">
          <Switch
            id="match-toggle"
            checked={showOnlyMatches}
            onCheckedChange={onShowOnlyMatchesChange}
          />
          <Label htmlFor="match-toggle" className="text-sm text-muted-foreground cursor-pointer">
            Show only jobs above my threshold
          </Label>
        </div>
      )}
    </div>
  );
};

const FilterSelect = ({
  label,
  value,
  onChange,
  options,
  labelMap,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  labelMap?: Record<string, string>;
}) => (
  <div className="min-w-[120px]">
    <label className="text-xs text-muted-foreground mb-px block">{label}</label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-[40px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt} value={opt}>
            {labelMap?.[opt] ?? opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default FilterBar;
