import { useState, useCallback } from "react";

export type JobStatus = "Not Applied" | "Applied" | "Rejected" | "Selected";

export interface StatusUpdate {
  jobId: string;
  jobTitle: string;
  company: string;
  status: JobStatus;
  date: string;
}

const STORAGE_KEY = "jobTrackerStatus";
const UPDATES_KEY = "jobTrackerStatusUpdates";

function loadStatuses(): Record<string, JobStatus> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function loadUpdates(): StatusUpdate[] {
  try {
    const raw = localStorage.getItem(UPDATES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getRecentStatusUpdates(): StatusUpdate[] {
  return loadUpdates().slice(-20).reverse();
}

export function useJobStatus() {
  const [statuses, setStatuses] = useState<Record<string, JobStatus>>(loadStatuses);

  const getStatus = useCallback(
    (jobId: string): JobStatus => statuses[jobId] ?? "Not Applied",
    [statuses]
  );

  const setStatus = useCallback(
    (jobId: string, jobTitle: string, company: string, status: JobStatus) => {
      setStatuses((prev) => {
        const next = { ...prev, [jobId]: status };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });

      // Track update history
      if (status !== "Not Applied") {
        const updates = loadUpdates();
        updates.push({
          jobId,
          jobTitle,
          company,
          status,
          date: new Date().toISOString(),
        });
        // Keep last 50
        const trimmed = updates.slice(-50);
        localStorage.setItem(UPDATES_KEY, JSON.stringify(trimmed));
      }
    },
    []
  );

  return { statuses, getStatus, setStatus };
}
