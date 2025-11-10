"use client"

import { useState, useEffect } from 'react';
import { useToast } from './toast-context';
import { ToastOptions, ToastType, ToastPosition } from '~/components/types/toast';
import { InfoIcon, CheckIcon, XIcon, AlertTriangleIcon, type LucideIcon } from 'lucide-react';

type ToastIconTypeMap = Record<ToastType, LucideIcon>;
// 确保类型覆盖所有可能的ToastType
type ToastTypeMap = Record<ToastType, string>;
// 定义Toast对象的完整类型
type ToastItem = ToastOptions & { id: string };

// Custom toast component
export function Toast({
  id,
  type = 'default',
  title,
  description,
  duration = 3000,
  isClosable = true,
  showProgress = true,
  style,
  className,
  action,
  onDismiss,
  position,
}: ToastOptions & { id: string; onDismiss?: () => void }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    setTimeLeft(duration);
    setIsVisible(true);
    
    if (duration === Infinity) return;
    
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 100) {
          clearInterval(interval);
          setIsVisible(false);
          setTimeout(() => {
            onDismiss?.();
          }, 300);
          return 0;
        }
        return prev - 100;
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [duration, onDismiss]);
  
  const progress = duration === Infinity ? 100 : (timeLeft / duration) * 100;
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onDismiss?.();
    }, 300);
  };
  
  if (!isVisible) return null;
  
  const baseClasses = `flex items-start p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out ${
    isClosable ? 'pr-10' : 'pr-4'
  } ${className || ''} ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-2'}`;
  
  const typeClasses: ToastTypeMap = {
    success: 'bg-green-50 border-l-4 border-green-500 text-green-800',
    error: 'bg-red-50 border-l-4 border-red-500 text-red-800',
    info: 'bg-blue-50 border-l-4 border-blue-500 text-blue-800',
    warning: 'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800',
    default: 'bg-gray-50 border-l-4 border-gray-400 text-gray-800',
  };
  
  const iconClasses: ToastTypeMap = {
    success: 'text-green-500',
    error: 'text-red-500',
    info: 'text-blue-500',
    warning: 'text-yellow-500',
    default: 'text-gray-500',
  };
  
  const icons: ToastIconTypeMap = {
    success: CheckIcon,
    error: XIcon,
    info: InfoIcon,
    warning: AlertTriangleIcon,
    default: InfoIcon,
  };
  
  const defaultColors: ToastTypeMap = {
    success: '#16a34a',
    error: '#dc2626',
    info: '#2563eb',
    warning: '#d97706',
    default: '#4b5563',
  };
  
  const IconToast = icons[type];
  
  return (
    <div 
      className={`${baseClasses} ${typeClasses[type]}`} 
      style={style} 
      role="alert" 
      aria-live="polite"
      data-toast-id={id}
      data-toast-type={type}
    >
      <div className="flex items-center">
        <div className={`mr-3 text-xl ${iconClasses[type]}`}><IconToast /></div>
        <div className="flex-1">
          {title && <h4 className="font-bold">{title}</h4>}
          {description && <p className="text-sm mt-1">{description}</p>}
        </div>
        {action && (
          <button
            onClick={action.onClick}
            className="ml-4 px-3 py-1 text-sm font-medium rounded hover:bg-opacity-20 transition-colors"
            style={{
              color: defaultColors[type],
              backgroundColor: 'transparent',
            }}
          >
            {action.label}
          </button>
        )}
        {isClosable && (
          <button
            onClick={handleClose}
            className="ml-2 text-gray-400 hover:text-gray-600"
            aria-label="Close toast"
          >
            ✕
          </button>
        )}
      </div>
      {showProgress && duration !== Infinity && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200 overflow-hidden mt-2">
          <div
            className={`h-full ${
              type === 'success' ? 'bg-green-500' :
              type === 'error' ? 'bg-red-500' :
              type === 'info' ? 'bg-blue-500' :
              type === 'warning' ? 'bg-yellow-500' : 'bg-gray-400'
            }`}
            style={{
              width: `${progress}%`,
              transition: 'width 0.1s linear',
            }}
          />
        </div>
      )}
    </div>
  );
}

export const ToastSuccess = (options: Omit<ToastOptions, 'type'> & { id: string; onDismiss?: () => void }) => (
  <Toast type="success" {...options} />
);

export const ToastError = (options: Omit<ToastOptions, 'type'> & { id: string; onDismiss?: () => void }) => (
  <Toast type="error" {...options} />
);

export const ToastInfo = (options: Omit<ToastOptions, 'type'> & { id: string; onDismiss?: () => void }) => (
  <Toast type="info" {...options} />
);

export const ToastWarning = (options: Omit<ToastOptions, 'type'> & { id: string; onDismiss?: () => void }) => (
  <Toast type="warning" {...options} />
);

export function Toaster() {
  const { toasts, setToasts } = useToast();
  
  // 修复：为prev参数添加类型注解
  const removeToast = (id: string) => {
     setToasts(toasts.filter(toast => toast.id !== id));
  };
  
  const getToastComponent = (toast: ToastItem) => {
    switch (toast.type) {
      case 'success':
        return <ToastSuccess key={toast.id} {...toast} onDismiss={() => removeToast(toast.id)} />;
      case 'error':
        return <ToastError key={toast.id} {...toast} onDismiss={() => removeToast(toast.id)} />;
      case 'info':
        return <ToastInfo key={toast.id} {...toast} onDismiss={() => removeToast(toast.id)} />;
      case 'warning':
        return <ToastWarning key={toast.id} {...toast} onDismiss={() => removeToast(toast.id)} />;
      default:
        return <Toast key={toast.id} {...toast} onDismiss={() => removeToast(toast.id)} />;
    }
  };
  
  const toastsByPosition = toasts.reduce((acc, toast) => {
    const position = toast.position || 'top-right';
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position].push(toast);
    return acc;
  }, {} as Record<ToastPosition, ToastItem[]>);
  
  const positionClasses: Record<ToastPosition, string> = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
  };
  
  return (
    <>
      {Object.entries(toastsByPosition).map(([position, toasts]) => (
        <div
          key={position}
          className={`fixed z-50 flex flex-col space-y-2 ${positionClasses[position as ToastPosition]}`}
          style={{
            maxWidth: '350px',
          }}
        >
          {toasts.map(toast => getToastComponent(toast))}
        </div>
      ))}
    </>
  );
}