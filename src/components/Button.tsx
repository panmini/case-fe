import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	icon?: LucideIcon;
	loading?: boolean;
	children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
	variant = 'primary',
	size = 'md',
	icon: Icon,
	loading = false,
	children,
	className,
	disabled,
	...props
}) => {
	const baseStyles = 'inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed mobile-tap-target whitespace-nowrap';

	const variants = {
		primary: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:from-blue-600 hover:to-blue-700 active:scale-95',
		secondary: 'bg-slate-100 text-slate-700 shadow-sm hover:bg-slate-200 active:scale-95',
		outline: 'border border-slate-300 text-slate-700 bg-white shadow-sm hover:bg-slate-50 active:scale-95',
		ghost: 'text-slate-600 hover:bg-slate-100 active:scale-95',
	};

	const sizes = {
		sm: 'px-3 py-2 text-xs sm:text-sm',
		md: 'px-4 py-2.5 text-sm sm:text-base',
		lg: 'px-6 py-3 text-base sm:text-lg',
	};

	return (
		<button
			className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]}
        ${className || ''}
      `}
			disabled={disabled || loading}
			{...props}
		>
			{loading && (
				<div className="mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
			)}
			{Icon && !loading && <Icon size={16} className="mr-2" />}
			{children}
		</button>
	);
};

export default Button;
