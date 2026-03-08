import { useState, useCallback } from "react";

const STORAGE_KEY = "jobTrackerTestStatus";

export interface TestItem {
  id: string;
  label: string;
  hint: string;
}

export const TEST_ITEMS: TestItem[] = [
  { id: "t1", label: "Preferences persist after refresh", hint: "Go to Settings, save preferences, refresh the page, and confirm they're still there." },
  { id: "t2", label: "Match score calculates correctly", hint: "Set preferences, go to Dashboard, and verify score badges appear on cards." },
  { id: "t3", label: '"Show only matches" toggle works', hint: "Enable the toggle on Dashboard and confirm only jobs above your threshold appear." },
  { id: "t4", label: "Save job persists after refresh", hint: "Save a job on Dashboard, refresh, then check the Saved page." },
  { id: "t5", label: "Apply opens in new tab", hint: "Click Apply on any job card and confirm it opens the URL in a new browser tab." },
  { id: "t6", label: "Status update persists after refresh", hint: "Change a job's status, refresh the page, and confirm the status is retained." },
  { id: "t7", label: "Status filter works correctly", hint: "Set a job to 'Applied', then use the Status filter on Dashboard to show only Applied jobs." },
  { id: "t8", label: "Digest generates top 10 by score", hint: "Generate a digest and verify the top 10 jobs are ordered by match score." },
  { id: "t9", label: "Digest persists for the day", hint: "Generate a digest, refresh the page, and confirm the same digest is displayed." },
  { id: "t10", label: "No console errors on main pages", hint: "Open browser DevTools, navigate all pages, and confirm no errors in the console." },
];

function loadChecked(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function allTestsPassed(): boolean {
  const checked = loadChecked();
  return TEST_ITEMS.every((t) => checked[t.id] === true);
}

export function useTestChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>(loadChecked);

  const toggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setChecked({});
  }, []);

  const passedCount = TEST_ITEMS.filter((t) => checked[t.id]).length;

  return { checked, toggle, reset, passedCount, total: TEST_ITEMS.length };
}
