import * as React from "react";
import { Button, ButtonProps } from "~/components/ui/button";
import { cn } from "~/lib/utils";

// 🔧 扩展 Props：添加你想要的自定义属性
export interface MyButtonProps extends ButtonProps {
  // 自定义属性
  // variant?: ButtonProps['variant'] | 'brand' | 'outline-primary';
  // size?: ButtonProps['size'] | 'xl';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function MyButton({
  children,
  className,
  variant,
  size,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  disabled,
  ...props
}: MyButtonProps) {
  // ✅ 基于 ShadCN Button 扩展样式
  const baseClasses = cn(
    // 自定义尺寸
    // size === 'xl' && 'h-12 px-8 text-base',

    // // 自定义变体
    // variant === 'brand' && 'bg-blue-600 hover:bg-blue-700 text-white',
    // variant === 'outline-primary' && 'border border-primary text-primary hover:bg-primary/10',

    // 图标支持
    icon && !children && 'px-3', // 图标按钮
    icon && children && 'gap-2',

    // 宽度
    fullWidth && 'w-full',

    // 加载状态
    loading && 'opacity-75 cursor-not-allowed',

    // 合并传入的 className
    className
  );

  // ✅ 保留所有原始 Button 的功能
  return (
    <Button
      className={baseClasses}
      variant={variant as ButtonProps['variant']} // 类型断言
      size={size as ButtonProps['size']}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center">
          <LoadingSpinner />
          {children && <span>{children}</span>}
        </span>
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </Button>
  );
}

// 简单的加载动画
function LoadingSpinner() {
  return (
    <svg
      className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}