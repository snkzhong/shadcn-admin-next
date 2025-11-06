"use client";

import { useState } from "react";
import { AppSidebar } from "~/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "~/components/ui/sidebar";
import {
  SidebarTrigger
} from "~/components/uiplus/sidebar-trigger";

import DarkModeSwitcher from "~/components/uiplus/dark-mode-switcher";
import ProfileDropdown from "~/components/profile-dropdown";
import TopAppDock from "~/components/top-app-dock";
import TopLanguageSwitcher from "~/components/custom/top-language-switcher";
import CustomizerSetting from "~/components/custom/customizer-setting";
import QuickSearch from "~/components/custom/quick-search";
import { TopNotification } from "~/components/top-notification";
import  NotificationData from "~/mock/notification-data";
 
type Props = {
  params?: Promise<{locale: string}>;
  children: React.ReactNode;
};
 
export default function AdminLayout({children, params}: Props) {
  const [lang, setLang] = useState("en");
  const [notificationDataList, setNotificationDataList] = useState(NotificationData);
  const [settings, setSettings] = useState<Record<string, string>>({
    color: "default",
    layout: "vertical",
    mode: "light",
    width: "fluid",
    position: "fixed",
    sidebar: "default",
    direction: "ltr",
  });

  const handleRead = (id: string) => {
    setNotificationDataList((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m))
    );
  };

  const handleViewMore = () => {
    alert("跳转到消息中心");
  };

  const handleSettingChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    // 这里可同步到全局 store / next-themes / css 变量
  };


  return (

    <SidebarProvider>
      <AppSidebar />
      
      <SidebarInset>
        <SidebarTrigger/>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">

          <div className="w-full flex items-center gap-0 md:gap-4">
            <div className="hidden sm:block pl-4">
              <QuickSearch />
            </div>
            <div className='ms-auto flex items-center space-x-4 pr-4'>
              <DarkModeSwitcher />
              <TopLanguageSwitcher value={lang} onChange={setLang} />
              <TopAppDock />
              <TopNotification 
                data={notificationDataList}
                onRead={handleRead}
                onViewMore={handleViewMore}
              />
              <CustomizerSetting values={settings} onChange={handleSettingChange} />
              <ProfileDropdown />
            </div>
          </div>

        </header>

        {/* Inject main content */}
        <div className="w-full p-4">
          {children}
        </div>

      </SidebarInset>
    </SidebarProvider>
  );
}