"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;
const DialogTitle = DialogPrimitive.Title;
const DialogDescription = DialogPrimitive.Description;

const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    data-slot="dialog-overlay"
    className={cn(
      "fixed inset-0 z-50 bg-forest/90 backdrop-blur-sm",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

/**
 * Bare content container — intentionally unstyled beyond positioning so the
 * lightbox can fill the viewport. Always include a DialogTitle (sr-only is
 * fine) for screen readers.
 */
const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      data-slot="dialog-content"
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 focus:outline-none",
        className,
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = "DialogContent";

/** Standard close button for overlays. */
const DialogCloseButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Close
    ref={ref}
    aria-label="Close"
    className={cn(
      "absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-forest-foreground/10 text-forest-foreground transition-colors duration-200 hover:bg-forest-foreground/20",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-foreground",
      className,
    )}
    {...props}
  >
    <X aria-hidden="true" className="size-5" />
  </DialogPrimitive.Close>
));
DialogCloseButton.displayName = "DialogCloseButton";

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogCloseButton,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
};
