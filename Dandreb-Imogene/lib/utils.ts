import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge doesn't know about our custom type presets (text-display /
 * title / body / caption from @theme). Without this, it mistakes them for
 * text-color utilities and drops a real color when both appear in one cn()
 * call (e.g. `cn("text-forest-foreground", "text-title")` → color stripped).
 * Register them as font-size classes so size and color coexist.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "title", "body", "caption"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
