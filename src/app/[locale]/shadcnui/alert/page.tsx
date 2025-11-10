"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import {
  CheckCircle2,
  Info,
  AlertTriangle,
  XCircle,
  X,
  Terminal,
} from "lucide-react";

export default function AlertShowcase() {
  const [open, setOpen] = useState<Record<string, boolean>>({ dismissible: true });

  return (
    <main className="max-w-4xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">shadcn/ui Alert Examples</h1>

      {/* 1. Success */}
      <Alert className="border-green-200 bg-green-50 text-green-900">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your data has been saved successfully.</AlertDescription>
      </Alert>

      {/* 2. Info */}
      <Alert className="border-blue-200 bg-blue-50 text-blue-900">
        <Info className="h-5 w-5 text-blue-600" />
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>The update will go live at 22:00 tonight.</AlertDescription>
      </Alert>

      {/* 3. Warning */}
      <Alert className="border-yellow-200 bg-yellow-50 text-yellow-900">
        <AlertTriangle className="h-5 w-5 text-yellow-600" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Slow network detected—some features may be limited.</AlertDescription>
      </Alert>

      {/* 4. Danger / Error */}
      <Alert className="border-red-200 bg-red-50 text-red-900">
        <XCircle className="h-5 w-5 text-red-600" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Server returned 500. Please try again later.</AlertDescription>
      </Alert>

      {/* 5. Icon-only, no title */}
      <Alert className="border-slate-200 bg-slate-50">
        <Terminal className="h-5 w-5 text-slate-600" />
        <AlertDescription>
          Minimal alert without a title—perfect for one-liners.
        </AlertDescription>
      </Alert>

      {/* 6. Dismissible */}
      {open.dismissible && (
        <Alert className="relative border-purple-200 bg-purple-50 text-purple-900">
          <Info className="h-5 w-5 text-purple-600" />
          <div className="flex-1">
            <AlertTitle>Dismissible Alert</AlertTitle>
            <AlertDescription>
              Click the × to close. State is managed by React.
            </AlertDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 ml-4 h-6 w-6 text-purple-600 hover:text-purple-800"
            onClick={() => setOpen((p) => ({ ...p, dismissible: false }))}
          >
            <X className="h-4 w-4" />
          </Button>
        </Alert>
      )}
    </main>
  );
}
