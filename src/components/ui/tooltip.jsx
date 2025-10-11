"use client";

import React from "react";
import { cn } from "@/lib/utils";

const TooltipProvider = ({ children }) => {
  return <>{children}</>;
};

const Tooltip = React.forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("tooltip", className)} {...props} />;
});

Tooltip.displayName = "Tooltip";

const TooltipTrigger = React.forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("tooltip-trigger", className)} {...props} />;
});

TooltipTrigger.displayName = "TooltipTrigger";

const TooltipContent = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        className
      )}
      {...props}
    />
  );
});

TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };