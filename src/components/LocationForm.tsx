import React, { useState } from 'react';
import { Location, LocationType } from '../types';
import Button from './Button';

interface LocationFormProps {
	location?: Location;
	onSubmit: (data: Omit<Location, 'id'>) => void;
	onCancel: () => void;
}


const LocationForm: React.FC<LocationFormProps> = ({ location, onSubmit, onCancel }) => {
	const [formData, setFormData] = useState({
		name: location?.name || '',
		country: location?.country || '',
		city: location?.city || '',
		locationCode: location?.locationCode || '',
		locationType: location?.locationType || LocationType.OTHER,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			{/* Existing fields */}
			<div>
				<label className="block text-sm font-medium text-gray-700">Name</label>
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
					required
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700">Country</label>
				<input
					type="text"
					name="country"
					value={formData.country}
					onChange={handleChange}
					required
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700">City</label>
				<input
					type="text"
					name="city"
					value={formData.city}
					onChange={handleChange}
					required
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700">Location Code</label>
				<input
					type="text"
					name="locationCode"
					value={formData.locationCode}
					onChange={handleChange}
					required
					maxLength={5}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm uppercase"
				/>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700">Location Type</label>
				<select
					name="locationType"
					value={formData.locationType}
					onChange={handleChange}
					className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
				>
					<option value="AIRPORT">Airport</option>
					<option value="OTHER">Other</option>
				</select>
			</div>

			<div className="flex justify-end space-x-3 pt-4">
				<Button type="button" variant="secondary" onClick={onCancel}>
					Cancel
				</Button>
				<Button type="submit">
					{location ? 'Update' : 'Create'}
				</Button>
			</div>
		</form>
	);
};

export default LocationForm;
