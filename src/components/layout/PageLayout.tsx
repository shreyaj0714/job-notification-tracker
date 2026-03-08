import React from "react";
import TopBar from "./TopBar";
import ContextHeader from "./ContextHeader";
import ProofFooter from "./ProofFooter";

interface PageLayoutProps {
  headline: string;
  subtext: string;
  currentStep?: number;
  totalSteps?: number;
  status?: "not-started" | "in-progress" | "shipped";
  primary: React.ReactNode;
  secondary: React.ReactNode;
  checklist?: { label: string; done: boolean }[];
}

const PageLayout = ({
  headline,
  subtext,
  currentStep,
  totalSteps,
  status,
  primary,
  secondary,
  checklist,
}: PageLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBar currentStep={currentStep} totalSteps={totalSteps} status={status} />
      <ContextHeader headline={headline} subtext={subtext} />
      <main className="flex flex-1 gap-3 px-3 pb-3">
        <div className="w-[70%]">{primary}</div>
        <aside className="w-[30%]">{secondary}</aside>
      </main>
      <ProofFooter items={checklist} />
    </div>
  );
};

export default PageLayout;
