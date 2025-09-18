"use client";

import * as React from "react";
import { Check, Search } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { languages, type Language } from "~/config/languages";
import { cn } from "~/lib/utils";

interface LanguageSwitcherProps {
  value: Language["code"];
  onChange: (code: Language["code"]) => void;
}

export default function LanguageSwitcher({ value, onChange }: LanguageSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState("");

  const filtered = React.useMemo(
    () =>
      languages.filter((l) =>
        l.name.toLowerCase().includes(q.trim().toLowerCase())
      ),
    [q]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="secondary"
          size="icon"
          className="rounded-full gap-2 hover:bg-white/20 backdrop-blur-sm transition-all duration-200">
          <span className="text-base">{languages.find((l) => l.code === value)?.flag}</span>
          {/*{languages.find((l) => l.code === value)?.name}*/}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-140 p-0" side="bottom" align="end">
        {/* 搜索框 */}
{/*        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search language..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>*/}

        {/* 网格列表 */}
        <div className="max-h-[90vh] overflow-y-auto px-3 pb-3">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((lang) => (
              <Button
                key={lang.code}
                variant="ghost"
                className={cn(
                  "h-16 flex-col gap-1 px-1 py-2 relative",
                  lang.code === value && "ring-primary"
                )}
                onClick={() => {
                  onChange(lang.code);
                  setOpen(false);
                }}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="text-xs text-center leading-tight">{lang.name}</span>
                {lang.code === value && (
                  <Check className="absolute top-1 right-1 h-3 w-3 text-primary" />
                )}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
