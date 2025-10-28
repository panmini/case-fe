import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { transportationsApi, locationsApi } from '../services/api';
import { Transportation, Location, TransportationType } from '../types';
import TransportationForm from '../components/TransportationForm';
import Modal from '../components/Modal';
import Button from '../components/Button';

const TransportationsPage: React.FC = () => {
	const {
		data: transportations,
		loading: transportationsLoading,
		error: transportationsError,
		refetch: refetchTransportations
	} = useApi(() => transportationsApi.getAll().then(res => res.data));

	const {
		data: locations,
		loading: locationsLoading,
		error: locationsError
	} = useApi(() => locationsApi.getAll().then(res => res.data));

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingTransportation, setEditingTransportation] = useState<Transportation | null>(null);

	const handleCreate = () => {
		setEditingTransportation(null);
		setIsModalOpen(true);
	};

	const handleEdit = (transportation: Transportation) => {
		setEditingTransportation(transportation);
		setIsModalOpen(true);
	};

	const handleDelete = async (id: string) => {
		if (window.confirm('Are you sure you want to delete this transportation?')) {
			try {
				await transportationsApi.delete(id);
				refetchTransportations();
			} catch (err) {
				alert('Error deleting transportation');
			}
		}
	};

	const handleFormSubmit = async (transportationData: Omit<Transportation, 'id'>) => {
		try {
			if (editingTransportation) {
				transportationData.id = editingTransportation.id;
				await transportationsApi.update(editingTransportation.id, transportationData);
			} else {
				await transportationsApi.create(transportationData);
			}
			setIsModalOpen(false);
			setEditingTransportation(null);
			refetchTransportations();
		} catch (err) {
			alert('Error saving transportation');
		}
	};

	const getTransportationIcon = (type: TransportationType) => {
		switch (type) {
			case TransportationType.FLIGHT: return '✈️';
			case TransportationType.BUS: return '🚌';
			case TransportationType.SUBWAY: return '🚇';
			case TransportationType.UBER: return '🚗';
			default: return '➡️';
		}
	};

	if (transportationsLoading) return <div className="flex justify-center p-8">Loading transportations...</div>;
	if (transportationsError) return <div className="text-red-600 p-4">Error: {transportationsError}</div>;

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-900">Transportations</h1>
				<Button
					onClick={handleCreate}
					icon={Plus}
					disabled={locationsLoading || locationsError}
				>
					Add Transportation
				</Button>
			</div>

			{locationsError && (
				<div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
					<p className="text-red-800">Error loading locations: {locationsError}</p>
				</div>
			)}

			<div className="bg-white shadow-sm rounded-lg overflow-hidden">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Type
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Origin
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Destination
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Operating Days
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{transportations?.map((transportation) => (
							<tr key={transportation.id} className="hover:bg-gray-50">
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
									<div className="flex items-center">
										<span className="mr-2">{getTransportationIcon(transportation.transportationType)}</span>
										{transportation.transportationType}
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{transportation.origin.locationCode} - {transportation.origin.name}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{transportation.destination.locationCode} - {transportation.destination.name}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{transportation.operatingDays?.length ?
										`${transportation.operatingDays.length} days` :
										'Every day'
									}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
									<button
										onClick={() => handleEdit(transportation)}
										className="text-blue-600 hover:text-blue-900 mr-4"
									>
										<Edit size={16} />
									</button>
									<button
										onClick={() => handleDelete(transportation.id)}
										className="text-red-600 hover:text-red-900"
									>
										<Trash2 size={16} />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
					setEditingTransportation(null);
				}}
				title={editingTransportation ? 'Edit Transportation' : 'Create Transportation'}
			>
				<TransportationForm
					transportation={editingTransportation || undefined}
					locations={locations || []}
					loading={locationsLoading}
					onSubmit={handleFormSubmit}
					onCancel={() => {
						setIsModalOpen(false);
						setEditingTransportation(null);
					}}
				/>
			</Modal>
		</div>
	);
};

export default TransportationsPage;
