"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { LayoutGrid, Chrome, Github, Mail, FileText, Settings, User, Twitter, Youtube, Slack, Figma, Facebook, Linkedin, type LucideIcon } from "lucide-react";
import { cn } from "~/lib/utils";

const apps = [
  { name: "Twitter", icon: Twitter },
  { name: "Youtube", icon: Youtube },
  { name: "Slack", icon: Slack },
  { name: "Figma", icon: Figma },
  { name: "Facebook", icon: Facebook },
  { name: "Linkedin", icon: Linkedin },
  { name: "Browser", icon: Chrome },
  { name: "GitHub", icon: Github },
  { name: "Mail", icon: Mail },
  { name: "Documents", icon: FileText },
  { name: "Settings", icon: Settings },
  { name: "Profile", icon: User },
  { name: "Twitter", icon: Twitter },
  { name: "Youtube", icon: Youtube },
  { name: "Slack", icon: Slack },
  { name: "Figma", icon: Figma },
  { name: "Facebook", icon: Facebook },
  { name: "Linkedin", icon: Linkedin },
  { name: "Browser", icon: Chrome },
  { name: "GitHub", icon: Github },
  { name: "Mail", icon: Mail },
  { name: "Documents", icon: FileText },
  { name: "Settings", icon: Settings },
  { name: "Profile", icon: User },
  { name: "Twitter", icon: Twitter },
  { name: "Twitter", icon: Twitter },
  { name: "Youtube", icon: Youtube },
  { name: "Slack", icon: Slack },
  { name: "Figma", icon: Figma },
  { name: "Facebook", icon: Facebook },
  { name: "Linkedin", icon: Linkedin },
  { name: "Browser", icon: Chrome },
  { name: "GitHub", icon: Github },
  { name: "Mail", icon: Mail },
  { name: "Documents", icon: FileText },
  { name: "Settings", icon: Settings },
  { name: "Profile", icon: User },
  { name: "Twitter", icon: Twitter },
  { name: "Youtube", icon: Youtube },
  { name: "Slack", icon: Slack },
  { name: "Figma", icon: Figma },
  { name: "Facebook", icon: Facebook },
  { name: "Linkedin", icon: Linkedin },
  { name: "Browser", icon: Chrome },
  { name: "GitHub", icon: Github },
  { name: "Mail", icon: Mail },
  { name: "Documents", icon: FileText },
  { name: "Settings", icon: Settings },
  { name: "Profile", icon: User },
  { name: "Twitter", icon: Twitter },
];

const colorPool = [
  'bg-red-100 text-red-600',
  'bg-blue-100 text-blue-600',
  'bg-green-100 text-green-600',
  'bg-yellow-100 text-yellow-600',
  'bg-purple-100 text-purple-600',
  'bg-pink-100 text-pink-600',
  'bg-indigo-100 text-indigo-600',
  'bg-cyan-100 text-cyan-600',
  'bg-orange-100 text-orange-600',
  'bg-teal-100 text-teal-600',
];

const getRandomColor = () =>
  colorPool[Math.floor(Math.random() * colorPool.length)];

export default function TopAppDock() {
  
  const [open, setOpen] = useState(false);

  const handleAppClick = (appName: string) => {
    console.log(`Clicked: ${appName}`);
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="rounded-full gap-2 hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
        >
          <LayoutGrid />
        </Button>
        

      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-[90vh] w-120 p-4" align="end">
        <div className="grid grid-cols-5 gap-4">
          {apps.map((app, idx) => {
            const Icon = app.icon;
            const color = getRandomColor();
            return (
              <div
                key={idx} 
                onClick={() => handleAppClick(app.name)}
                className={cn("flex flex-col items-center justify-center space-y-2 hover:bg-accent rounded-lg p-2 cursor-pointer")}
              >
                <Icon className={cn("w-8 h-8 rounded", color)} />
                <span className="text-xs text-center">{app.name}</span>
              </div>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
