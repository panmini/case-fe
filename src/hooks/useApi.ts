import { useState, useEffect } from 'react';

interface UseApiResult<T> {
	data: T | null;
	loading: boolean;
	error: string | null;
	refetch: () => void;
}

export function useApi<T>(apiCall: () => Promise<T>, dependencies: any[] = []): UseApiResult<T> {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async () => {
		try {
			setLoading(true);
			setError(null);
			const result = await apiCall();
			setData(result);
		} catch (err: any) {
			setError(err.response?.data?.message || 'An error occurred');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, dependencies);

	return { data, loading, error, refetch: fetchData };
}
