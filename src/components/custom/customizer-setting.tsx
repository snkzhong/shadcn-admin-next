"use client";

import * as React from "react";
import { Settings, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Separator } from "~/components/ui/separator";
import {
  colorOptions,
  layoutOptions,
  modeOptions,
  widthOptions,
  positionOptions,
  sidebarOptions,
  dirOptions,
} from "~/config/customizer";
import { cn } from "~/lib/utils";

type ValueOf<T> = T extends readonly (infer U)[] ? U : never;

interface CustomizerDrawerProps {
  onChange: (key: string, value: string) => void;
  values: Record<string, string>;
}

export default function CustomizerSetting({ onChange, values }: CustomizerDrawerProps) {
  const renderGroup = (
    title: string,
    name: string,
    opts: readonly string[]
  ) => (
    <div className="mb-4">
      <Label className="text-sm font-semibold mb-2 block">{title}</Label>
      <RadioGroup
        value={values[name] || opts[0]}
        onValueChange={(v) => onChange(name, v)}
        className="flex flex-wrap gap-3"
      >
        {opts.map((opt) => (
          <div key={opt} className="flex items-center space-x-2">
            <RadioGroupItem value={opt} id={`${name}-${opt}`} />
            <Label htmlFor={`${name}-${opt}`} className="capitalize text-sm">
              {opt}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <Settings className="h-5 w-5" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="w-full max-w-sm">
        <DrawerHeader className="flex items-center justify-between">
          <DrawerTitle className="w-full">
            <div className="flex justify-between items-center w-full">
              <div className="text-left">Customizer</div>
              <div className="text-right">
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-5 w-5" />
                  </Button>
                </DrawerClose>
              </div>
            </div>
          </DrawerTitle>
        </DrawerHeader>

        <Separator />

        <div className="p-4 overflow-y-auto">
          {renderGroup("Select Colors", "color", colorOptions)}
          {renderGroup("Layout", "layout", layoutOptions)}
          {renderGroup("Layout Mode", "mode", modeOptions)}
          {renderGroup("Layout Width", "width", widthOptions)}
          {renderGroup("Layout Position", "position", positionOptions)}
          {renderGroup("Sidebar Size", "sidebar", sidebarOptions)}
          {renderGroup("Direction", "direction", dirOptions)}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
