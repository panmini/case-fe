import axios from 'axios';
import { Location, Transportation, RouteDTO } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Locations API
export const locationsApi = {
	getAll: () => api.get<Location[]>('/locations'),
	getById: (id: string) => api.get<Location>(`/locations/${id}`),
	create: (location: Omit<Location, 'id'>) => api.post<Location>('/locations', location),
	update: (id: string, location: Omit<Location, 'id'>) => api.put<Location>(`/locations/${id}`, location),
	delete: (id: string) => api.delete(`/locations/${id}`),
};

// Transportations API
export const transportationsApi = {
	getAll: () => api.get<Transportation[]>('/transportations'),
	getById: (id: string) => api.get<Transportation>(`/transportations/${id}`),
	create: (transportation: Omit<Transportation, 'id'>) =>
		api.post<Transportation>('/transportations', transportation),
	update: (id: string, transportation: Omit<Transportation, 'id'>) =>
		api.put<Transportation>(`/transportations/${id}`, transportation),
	delete: (id: string) => api.delete(`/transportations/${id}`),
};

// Routes API
export const routesApi = {
	findRoutes: (origin: string, destination: string, date?: string) =>
		api.get<RouteDTO[]>('/routes', {
			params: { origin, destination, date }
		}),
};

export default api;
