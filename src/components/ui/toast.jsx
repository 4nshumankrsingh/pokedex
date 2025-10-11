"use client";

import React from "react";
import { cn } from "@/lib/utils";

const Toast = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
        className
      )}
      {...props}
    />
  );
});

Toast.displayName = "Toast";

export { Toast };