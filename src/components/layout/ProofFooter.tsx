import { Check } from "lucide-react";

interface ChecklistItem {
  label: string;
  done: boolean;
}

interface ProofFooterProps {
  items?: ChecklistItem[];
}

const defaultItems: ChecklistItem[] = [
  { label: "UI Built", done: false },
  { label: "Logic Working", done: false },
  { label: "Test Passed", done: false },
  { label: "Deployed", done: false },
];

const ProofFooter = ({ items = defaultItems }: ProofFooterProps) => {
  return (
    <footer className="border-t px-3 py-2">
      <div className="flex items-center gap-3 flex-wrap">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-1 text-sm text-muted-foreground">
            <span className="flex h-[20px] w-[20px] items-center justify-center rounded-sm border border-border">
              {item.done && <Check className="h-[14px] w-[14px] text-success" />}
            </span>
            <span className={item.done ? "text-foreground" : ""}>{item.label}</span>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default ProofFooter;
