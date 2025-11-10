// Define toast types
export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'default';

// Define toast position
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

// Define toast options
export interface ToastOptions {
  type?: ToastType;
  title?: string;
  description?: string;
  duration?: number;
  position?: ToastPosition;
  isClosable?: boolean;
  showProgress?: boolean;
  style?: React.CSSProperties;
  className?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}
