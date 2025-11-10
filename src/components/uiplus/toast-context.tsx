"use client"

import { createContext, useContext, useState, ReactNode } from 'react';
import { ToastOptions, ToastType, ToastPosition } from '~/components/types/toast';

interface ToastContextType {
  show: (options: ToastOptions) => string;
  success: (options: Omit<ToastOptions, 'type'>) => string;
  error: (options: Omit<ToastOptions, 'type'>) => string;
  info: (options: Omit<ToastOptions, 'type'>) => string;
  warning: (options: Omit<ToastOptions, 'type'>) => string;
  dismiss: (id?: string) => void;
  dismissAll: () => void;
  toasts: (ToastOptions & { id: string })[];
  setToasts: (toasts: (ToastOptions & { id: string })[]) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<(ToastOptions & { id: string })[]>([]);
  
  const addToast = (options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...options, id }]);
    
    // Auto remove toast after duration
    if (options.duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, options.duration || 3000);
    }
    
    return id;
  };
  
  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  const show = (options: ToastOptions) => {
    return addToast(options);
  };
  
  const success = (options: Omit<ToastOptions, 'type'>) => {
    return addToast({ type: 'success', ...options });
  };
  
  const error = (options: Omit<ToastOptions, 'type'>) => {
    return addToast({ type: 'error', ...options });
  };
  
  const info = (options: Omit<ToastOptions, 'type'>) => {
    return addToast({ type: 'info', ...options });
  };
  
  const warning = (options: Omit<ToastOptions, 'type'>) => {
    return addToast({ type: 'warning', ...options });
  };
  
  const dismiss = (id?: string) => {
    if (id) {
      removeToast(id);
    }
  };
  
  const dismissAll = () => {
    setToasts([]);
  };
  
  return (
    <ToastContext.Provider value={{
      show,
      success,
      error,
      info,
      warning,
      dismiss,
      dismissAll,
      toasts,
      setToasts,
    }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}