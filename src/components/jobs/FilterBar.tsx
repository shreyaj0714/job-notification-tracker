import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { jobs } from "@/data/jobs";

const uniqueLocations = ["All", ...Array.from(new Set(jobs.map((j) => j.location))).sort()];
const modes = ["All", "Remote", "Hybrid", "Onsite"];
const experiences = ["All", "Fresher", "0-1", "1-3", "3-5"];
const sources = ["All", "LinkedIn", "Naukri", "Indeed"];

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
}

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
}: FilterBarProps) => {
  return (
    <div className="mt-3 flex flex-wrap items-end gap-2">
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
      <FilterSelect label="Sort" value={sort} onChange={onSortChange} options={["latest", "oldest"]} />
    </div>
  );
};

const FilterSelect = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
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
            {opt === "latest" ? "Latest first" : opt === "oldest" ? "Oldest first" : opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default FilterBar;
