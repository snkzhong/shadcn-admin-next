import type { Metadata } from 'next';
import { ToastProvider } from '~/components/uiplus/toast-context';
import { Toaster } from '~/components/uiplus/toast';

export const metadata: Metadata = {
  title: 'Toast Example',
  description: 'Toast notification examples using custom implementation with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <ToastProvider>
          {children}
          <Toaster />
        </ToastProvider>
  );
}
