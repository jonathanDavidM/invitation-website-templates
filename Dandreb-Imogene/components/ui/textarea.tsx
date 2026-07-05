import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => (
  <textarea
    data-slot="textarea"
    className={cn(
      "flex min-h-24 w-full rounded-lg border border-input bg-card px-4 py-3 text-body text-foreground shadow-sm transition-colors duration-200",
      "placeholder:text-muted-foreground",
      "focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      "aria-[invalid=true]:border-destructive",
      "disabled:cursor-not-allowed disabled:opacity-60",
      className,
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
