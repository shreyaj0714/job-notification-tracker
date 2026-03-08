export interface UserPreferences {
  roleKeywords: string[];
  preferredLocations: string[];
  preferredModes: string[];
  experienceLevel: string;
  skills: string[];
  minMatchScore: number;
}

const STORAGE_KEY = "jobTrackerPreferences";

const defaultPreferences: UserPreferences = {
  roleKeywords: [],
  preferredLocations: [],
  preferredModes: [],
  experienceLevel: "",
  skills: [],
  minMatchScore: 40,
};

export function loadPreferences(): UserPreferences | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as UserPreferences;
  } catch {
    return null;
  }
}

export function savePreferences(prefs: UserPreferences): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export function hasPreferences(): boolean {
  return loadPreferences() !== null;
}

export { defaultPreferences };
