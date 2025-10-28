import React, { useState } from 'react';
import { Transportation, Location, TransportationType } from '../types';
import Button from './Button';

interface TransportationFormProps {
	transportation?: Transportation;
	locations: Location[];
	onSubmit: (data: Omit<Transportation, 'id'>) => void;
	onCancel: () => void;
	loading?: boolean;
}

const TransportationForm: React.FC<TransportationFormProps> = ({
	transportation,
	locations = [],
	onSubmit,
	onCancel,
	loading = false
}) => {
	const [formData, setFormData] = useState({
		originId: transportation?.origin.id || '',
		destinationId: transportation?.destination.id || '',
		transportationType: transportation?.transportationType || TransportationType.FLIGHT,
		operatingDays: transportation?.operatingDays || [],
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const origin = locations.find(l => l.id === formData.originId);
		const destination = locations.find(l => l.id === formData.destinationId);

		if (!origin || !destination) {
			alert('Please select both origin and destination');
			return;
		}

		onSubmit({
			origin,
			destination,
			transportationType: formData.transportationType,
			operatingDays: formData.operatingDays,
		});
	};

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleOperatingDayChange = (day: number, checked: boolean) => {
		setFormData(prev => ({
			...prev,
			operatingDays: checked
				? [...prev.operatingDays, day]
				: prev.operatingDays.filter(d => d !== day)
		}));
	};

	const daysOfWeek = [
		{ id: 1, name: 'Monday' },
		{ id: 2, name: 'Tuesday' },
		{ id: 3, name: 'Wednesday' },
		{ id: 4, name: 'Thursday' },
		{ id: 5, name: 'Friday' },
		{ id: 6, name: 'Saturday' },
		{ id: 7, name: 'Sunday' },
	];

	if (loading) {
		return (
			<div className="flex justify-center py-8">
				<div className="text-gray-500">Loading locations...</div>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label htmlFor="originId" className="block text-sm font-medium text-gray-700">
					Origin
				</label>
				<select
					id="originId"
					name="originId"
					value={formData.originId}
					onChange={handleChange}
					required
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
				>
					<option value="">Select Origin</option>
					{locations.map(location => (
						<option key={location.id} value={location.id}>
							{location.locationCode} - {location.name}
						</option>
					))}
				</select>
			</div>

			{/* Rest of the form remains the same */}
			<div>
				<label htmlFor="destinationId" className="block text-sm font-medium text-gray-700">
					Destination
				</label>
				<select
					id="destinationId"
					name="destinationId"
					value={formData.destinationId}
					onChange={handleChange}
					required
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
				>
					<option value="">Select Destination</option>
					{locations.map(location => (
						<option key={location.id} value={location.id}>
							{location.locationCode} - {location.name}
						</option>
					))}
				</select>
			</div>

			<div>
				<label htmlFor="transportationType" className="block text-sm font-medium text-gray-700">
					Transportation Type
				</label>
				<select
					id="transportationType"
					name="transportationType"
					value={formData.transportationType}
					onChange={handleChange}
					required
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
				>
					{Object.values(TransportationType).map(type => (
						<option key={type} value={type}>
							{type}
						</option>
					))}
				</select>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-2">
					Operating Days (Leave empty for every day)
				</label>
				<div className="grid grid-cols-2 gap-2">
					{daysOfWeek.map(day => (
						<label key={day.id} className="flex items-center">
							<input
								type="checkbox"
								checked={formData.operatingDays.includes(day.id)}
								onChange={(e) => handleOperatingDayChange(day.id, e.target.checked)}
								className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
							/>
							<span className="ml-2 text-sm text-gray-700">{day.name}</span>
						</label>
					))}
				</div>
			</div>

			<div className="flex justify-end space-x-3 pt-4">
				<Button type="button" variant="secondary" onClick={onCancel}>
					Cancel
				</Button>
				<Button type="submit">
					{transportation ? 'Update' : 'Create'}
				</Button>
			</div>
		</form>
	);
};

export default TransportationForm;
