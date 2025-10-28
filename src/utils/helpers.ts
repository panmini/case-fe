import clsx, { ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
	return clsx(inputs);
}

export function formatDate(date: Date): string {
	return date.toISOString().split('T')[0];
}

export function getDayName(dayNumber: number): string {
	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	return days[dayNumber - 1] || 'Unknown';
}
