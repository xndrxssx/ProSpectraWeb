import * as React from "react";
import { cn } from "../../lib/utils";

// Define the label prop and forward it to the Textarea component
const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea"> & { label?: string }>(
  ({ className = "", label, ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && <label className="block text-sm font-medium">{label}</label>} {/* Show label if provided */}
        <textarea
          className={cn(
            "flex h-24 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
