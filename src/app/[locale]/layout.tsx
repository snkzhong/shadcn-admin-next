import {NextIntlClientProvider, hasLocale} from 'next-intl';
import { setRequestLocale, getMessages } from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '~/i18n/routing';

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
import { TopNotification } from "~/components/top-notification";
import AdminLayout from "~/components/custom/layout/admin-layout";
import  NotificationData from "~/mock/notification-data";

 
type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};
 
export default async function LocaleLayout({children, params}: Props) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>

    <AdminLayout>
      {children}
    </AdminLayout>

    </NextIntlClientProvider>
  );
}