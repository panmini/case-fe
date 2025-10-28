export interface Location {
	id: string;
	name: string;
	country: string;
	city: string;
	locationCode: string;
}

export interface Transportation {
	id: string;
	origin: Location;
	destination: Location;
	transportationType: TransportationType;
	operatingDays?: number[];
}

export enum TransportationType {
	FLIGHT = 'FLIGHT',
	BUS = 'BUS',
	SUBWAY = 'SUBWAY',
	UBER = 'UBER'
}

export enum LocationType {
	AIRPORT = 'AIRPORT',
	OTHER = 'OTHER'
}

export interface RouteDTO {
	transportations: Transportation[];
	totalDuration?: string;
	totalCost?: number;
}

export interface ApiResponse<T> {
	data: T;
	message?: string;
}
