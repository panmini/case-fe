import React, { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Navigation, Building } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { locationsApi } from '../services/api';
import { Location, LocationType } from '../types';
import LocationForm from '../components/LocationForm';
import Modal from '../components/Modal';
import Button from '../components/Button';
import { Card, CardContent } from '../components/Card';

const LocationsPage: React.FC = () => {
	const { data: locations, loading, error, refetch } = useApi(() =>
		locationsApi.getAll().then(res => res.data)
	);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingLocation, setEditingLocation] = useState<Location | null>(null);

	const handleCreate = () => {
		setEditingLocation(null);
		setIsModalOpen(true);
	};

	const handleEdit = (location: Location) => {
		setEditingLocation(location);
		setIsModalOpen(true);
	};

	const handleDelete = async (id: string) => {
		if (window.confirm('Are you sure you want to delete this location?')) {
			try {
				await locationsApi.delete(id);
				refetch();
			} catch (err) {
				alert('Error deleting location');
			}
		}
	};

	const handleFormSubmit = async (locationData: Omit<Location, 'id'>) => {
		try {
			if (editingLocation) {
				locationData.id = editingLocation.id;
				await locationsApi.update(editingLocation.id, locationData);
			} else {
				await locationsApi.create(locationData);
			}
			setIsModalOpen(false);
			setEditingLocation(null);
			refetch();
		} catch (err) {
			alert('Error saving location');
		}
	};

	if (loading) return <div className="flex justify-center p-8">Loading...</div>;
	if (error) return <div className="text-red-600 p-4">Error: {error}</div>;

	return (
		<div className="max-w-7xl mx-auto space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
				<div className="space-y-1">
					<h1 className="text-3xl font-bold text-slate-900">Locations</h1>
					<p className="text-slate-600 text-sm sm:text-base">
						Manage airports and other transportation hubs
					</p>
				</div>
				<Button onClick={handleCreate} icon={Plus} size="lg" className="w-full sm:w-auto">
					Add Location
				</Button>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
				<Card hover>
					<CardContent className="flex items-center space-x-4">
						<div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
							<MapPin className="w-6 h-6 text-blue-600" />
						</div>
						<div>
							<p className="text-2xl font-bold text-slate-900">{locations?.length || 0}</p>
							<p className="text-sm text-slate-600">Total Locations</p>
						</div>
					</CardContent>
				</Card>

				<Card hover>
					<CardContent className="flex items-center space-x-4">
						<div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
							<Navigation className="w-6 h-6 text-green-600" />
						</div>
						<div>
							<p className="text-2xl font-bold text-slate-900">
								{locations?.filter(l => l.locationType === 'AIRPORT').length || 0}
							</p>
							<p className="text-sm text-slate-600">Airports</p>
						</div>
					</CardContent>
				</Card>

				<Card hover>
					<CardContent className="flex items-center space-x-4">
						<div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
							<Building className="w-6 h-6 text-purple-600" />
						</div>
						<div>
							<p className="text-2xl font-bold text-slate-900">
								{new Set(locations?.map(l => l.country)).size || 0}
							</p>
							<p className="text-sm text-slate-600">Countries</p>
						</div>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardContent className="p-0">
					<div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full min-w-[600px]">
								<thead className="bg-slate-50 border-b border-slate-200">
									<tr>
										<th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
											Code
										</th>
										<th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
											Name
										</th>
										<th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
											City
										</th>
										<th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
											Country
										</th>
										<th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
											Type
										</th>
										<th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-slate-200">
									{locations?.map(location => (
										<tr
											key={location.id}
											className="hover:bg-slate-50 transition-colors"
										>
											<td className="px-6 py-4">
												<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
													{location.locationCode}
												</span>
											</td>
											<td className="px-6 py-4 font-medium text-slate-900">
												{location.name}
											</td>
											<td className="px-6 py-4 text-slate-600">
												{location.city}
											</td>
											<td className="px-6 py-4 text-slate-600">
												{location.country}
											</td>
											<td className="px-6 py-4 text-slate-700 font-medium">
												{location.locationType === LocationType.AIRPORT ? 'Airport' : 'Other'}
											</td>
											<td className="px-6 py-4">
												<div className="flex items-center space-x-2">
													<button
														onClick={() => handleEdit(location)}
														className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
													>
														<Edit size={16} />
													</button>
													<button
														onClick={() => handleDelete(location.id)}
														className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
													>
														<Trash2 size={16} />
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</CardContent>
			</Card>

			<Modal
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
					setEditingLocation(null);
				}}
				title={editingLocation ? 'Edit Location' : 'Create Location'}
			>
				<LocationForm
					location={editingLocation || undefined}
					onSubmit={handleFormSubmit}
					onCancel={() => {
						setIsModalOpen(false);
						setEditingLocation(null);
					}}
				/>
			</Modal>
		</div>
	);
};

export default LocationsPage;
