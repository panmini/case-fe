import React, { useState } from 'react';
import { Search, MapPin, Navigation, Clock, DollarSign } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { routesApi, locationsApi } from '../services/api';
import { RouteDTO, Location, TransportationType } from '../types';
import Button from '../components/Button';
import { Card, CardContent, CardHeader } from '../components/Card';
import { LoadingSpinner, LoadingCard } from '../components/Loading';
import { formatDate, getDayName } from '../utils/helpers';

const RoutesPage: React.FC = () => {
	const { data: locations, loading: locationsLoading } = useApi(() =>
		locationsApi.getAll().then(res => res.data)
	);
	const [selectedOrigin, setSelectedOrigin] = useState('');
	const [selectedDestination, setSelectedDestination] = useState('');
	const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
	const [routes, setRoutes] = useState<RouteDTO[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSearch = async () => {
		if (!selectedOrigin || !selectedDestination) {
			setError('Please select both origin and destination locations');
			return;
		}

		if (selectedOrigin === selectedDestination) {
			setError('Origin and destination cannot be the same');
			return;
		}

		setLoading(true);
		setError(null);
		try {
			const response = await routesApi.findRoutes(selectedOrigin, selectedDestination, selectedDate);
			setRoutes(response.data);
		} catch (err: any) {
			setError(err.response?.data?.message || 'Failed to find routes. Please try again.');
		} finally {
			setLoading(false);
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

	const getTransportationColor = (type: TransportationType) => {
		switch (type) {
			case TransportationType.FLIGHT: return 'from-blue-500 to-blue-600';
			case TransportationType.BUS: return 'from-green-500 to-green-600';
			case TransportationType.SUBWAY: return 'from-purple-500 to-purple-600';
			case TransportationType.UBER: return 'from-black to-gray-800';
			default: return 'from-slate-500 to-slate-600';
		}
	};

	return (
		<div className="max-w-7xl mx-auto space-y-6">
			{/* Header */}
			<div className="text-center space-y-2">
				<h1 className="text-4xl font-bold text-slate-900">Find Your Route</h1>
				<p className="text-lg text-slate-600">Discover optimal travel routes with multiple transportation options</p>
			</div>

			{/* Search Card */}
			<Card hover>
				<CardContent>
					<div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-end">
						<div className="lg:col-span-2">
							<label htmlFor="origin" className="block text-sm font-medium text-slate-700 mb-2">
								<MapPin className="w-4 h-4 inline mr-1" />
								From
							</label>
							<select
								id="origin"
								value={selectedOrigin}
								onChange={(e) => setSelectedOrigin(e.target.value)}
								className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors text-sm lg:text-base"
							>
								<option value="">Select departure location</option>
								{locations?.map(location => (
									<option key={location.id} value={location.locationCode}>
										{location.locationCode} - {location.name}, {location.city}
									</option>
								))}
							</select>
						</div>

						<div className="lg:col-span-2">
							<label htmlFor="destination" className="block text-sm font-medium text-slate-700 mb-2">
								<Navigation className="w-4 h-4 inline mr-1" />
								To
							</label>
							<select
								id="destination"
								value={selectedDestination}
								onChange={(e) => setSelectedDestination(e.target.value)}
								className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors text-sm lg:text-base"
							>
								<option value="">Select destination location</option>
								{locations?.map(location => (
									<option key={location.id} value={location.locationCode}>
										{location.locationCode} - {location.name}, {location.city}
									</option>
								))}
							</select>
						</div>

						<div className="flex flex-col sm:flex-row gap-3 lg:block">
							<div className="flex-1">
								<label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-2">
									<Clock className="w-4 h-4 inline mr-1" />
									Date
								</label>
								<input
									type="date"
									id="date"
									value={selectedDate}
									onChange={(e) => setSelectedDate(e.target.value)}
									className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors text-sm lg:text-base"
								/>
							</div>
							<Button
								onClick={handleSearch}
								disabled={loading || !selectedOrigin || !selectedDestination}
								loading={loading}
								icon={Search}
								size="lg"
								className="w-full sm:w-auto lg:w-full h-[52px] mt-2 lg:mt-0"
							>
								{'Find Routes'}
							</Button>
						</div>
					</div>

					{error && (
						<div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl">
							<p className="text-red-800 text-sm">{error}</p>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Results */}
			{loading && (
				<div className="grid gap-4 md:grid-cols-2">
					{[...Array(4)].map((_, i) => (
						<LoadingCard key={i} />
					))}
				</div>
			)}

			{routes.length > 0 && (
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h2 className="text-2xl font-bold text-slate-900">
							Found {routes.length} Route{routes.length > 1 ? 's' : ''}
						</h2>
						<div className="text-sm text-slate-500">
							Showing routes for {selectedDate}
						</div>
					</div>

					<div className="grid gap-6 md:grid-cols-2">
						{routes.map((route, index) => (
							<Card key={index} hover className="transform hover:scale-[1.02] transition-transform duration-200">
								<CardContent>
									<div className="space-y-4">
										{/* Route Header */}
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-3">
												<div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
													<span className="text-white font-semibold text-sm">
														{index + 1}
													</span>
												</div>
												<div>
													<h3 className="font-semibold text-slate-900">
														Route Option {index + 1}
													</h3>
													<div className="flex items-center space-x-4 text-sm text-slate-500">
														{route.totalDuration && (
															<div className="flex items-center space-x-1">
																<Clock size={14} />
																<span>{route.totalDuration}</span>
															</div>
														)}
														{route.totalCost && (
															<div className="flex items-center space-x-1">
																<DollarSign size={14} />
																<span>${route.totalCost}</span>
															</div>
														)}
													</div>
												</div>
											</div>
											<div className="text-right">
												<div className="text-sm font-medium text-slate-900">
													{route.transportations.length} Leg{route.transportations.length > 1 ? 's' : ''}
												</div>
												<div className="text-xs text-slate-500">
													{route.transportations.filter(t => t.transportationType === TransportationType.FLIGHT).length} Flight{route.transportations.filter(t => t.transportationType === TransportationType.FLIGHT).length > 1 ? 's' : ''}
												</div>
											</div>
										</div>

										{/* Route Steps */}
										<div className="space-y-3">
											{route.transportations.map((transportation, idx) => (
												<div key={transportation.id} className="flex items-start space-x-3">
													{/* Connection line */}
													{idx > 0 && (
														<div className="w-0.5 h-6 bg-slate-200 ml-5 -mt-1" />
													)}

													<div className="flex items-center space-x-3 flex-1 min-w-0">
														<div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${getTransportationColor(transportation.transportationType)} flex items-center justify-center text-white font-semibold text-sm`}>
															{getTransportationIcon(transportation.transportationType)}
														</div>

														<div className="flex-1 min-w-0">
															<div className="flex items-center space-x-2">
																<span className="font-semibold text-slate-900">
																	{transportation.origin.locationCode}
																</span>
																<div className="flex-1 h-px bg-slate-200" />
																<span className="font-semibold text-slate-900">
																	{transportation.destination.locationCode}
																</span>
															</div>
															<div className="flex items-center justify-between text-sm text-slate-600 mt-1">
																<span className="truncate">
																	{transportation.origin.name}
																</span>
																<span className="mx-2">→</span>
																<span className="truncate">
																	{transportation.destination.name}
																</span>
															</div>
															<div className="flex items-center space-x-2 mt-1">
																<span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-700 rounded-full capitalize">
																	{transportation.transportationType.toLowerCase()}
																</span>
																{transportation.operatingDays && transportation.operatingDays.length > 0 && (
																	<span className="text-xs text-slate-500">
																		{transportation.operatingDays.length === 7 ? 'Daily' :
																			`${transportation.operatingDays.length} days/wk`}
																	</span>
																)}
															</div>
														</div>
													</div>
												</div>
											))}
										</div>

										{/* Operating Days Info */}
										{route.transportations.some(t => t.operatingDays && t.operatingDays.length > 0) && (
											<div className="pt-3 border-t border-slate-100">
												<div className="text-xs text-slate-500">
													<strong>Operating days:</strong>{' '}
													{Array.from(new Set(
														route.transportations.flatMap(t => t.operatingDays || [])
													)).map(day => getDayName(day)).join(', ')}
												</div>
											</div>
										)}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			)}

			{!loading && routes.length === 0 && selectedOrigin && selectedDestination && (
				<Card>
					<CardContent>
						<div className="text-center py-12">
							<div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
								<Search className="w-8 h-8 text-slate-400" />
							</div>
							<h3 className="text-lg font-semibold text-slate-900 mb-2">No routes found</h3>
							<p className="text-slate-600 max-w-md mx-auto">
								We couldn't find any routes matching your criteria. Try adjusting your search parameters or select different locations.
							</p>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default RoutesPage;
