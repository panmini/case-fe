import React from 'react';
import { cn } from '../utils/helpers';

interface CardProps {
	children: React.ReactNode;
	className?: string;
	hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hover = false }) => {
	return (
		<div className={cn(
			"bg-white rounded-3xl border border-slate-200/60 shadow-sm",
			hover && "hover:shadow-card-hover transition-shadow duration-200",
			className
		)}>
			{children}
		</div>
	);
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
	children,
	className
}) => {
	return (
		<div className={cn("px-6 py-5 border-b border-slate-100", className)}>
			{children}
		</div>
	);
};

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
	children,
	className
}) => {
	return (
		<div className={cn("px-6 py-5", className)}>
			{children}
		</div>
	);
};
