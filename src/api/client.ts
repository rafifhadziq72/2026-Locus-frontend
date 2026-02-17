import axios from 'axios';
import type { Booking } from '../types';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor removed as login session is no longer required.

export const getBookings = () => apiClient.get<Booking[]>('/bookings');

export const updateBookingStatus = (id: number, status: 'Approved' | 'Rejected') => 
  apiClient.patch(`/bookings/${id}/status`, { status });

export default apiClient;