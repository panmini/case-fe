import React from 'react';

export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
	const sizes = {
		sm: 'w-4 h-4',
		md: 'w-6 h-6',
		lg: 'w-8 h-8',
	};

	return (
		<div className={`border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin ${sizes[size]}`} />
	);
};

export const LoadingCard: React.FC = () => {
	return (
		<div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm p-6 animate-pulse">
			<div className="flex items-center space-x-4">
				<div className="w-12 h-12 bg-slate-200 rounded-2xl" />
				<div className="flex-1 space-y-2">
					<div className="h-4 bg-slate-200 rounded w-3/4" />
					<div className="h-3 bg-slate-200 rounded w-1/2" />
				</div>
			</div>
		</div>
	);
};

export const LoadingTable: React.FC = () => {
	return (
		<div className="space-y-3">
			{[...Array(5)].map((_, i) => (
				<div key={i} className="flex items-center space-x-4 p-4 bg-white rounded-2xl border border-slate-200/60 animate-pulse">
					<div className="w-10 h-10 bg-slate-200 rounded-xl" />
					<div className="flex-1 space-y-2">
						<div className="h-4 bg-slate-200 rounded w-1/4" />
						<div className="h-3 bg-slate-200 rounded w-1/2" />
					</div>
				</div>
			))}
		</div>
	);
};
