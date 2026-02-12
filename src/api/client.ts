// src/api/client.ts
import axios from 'axios';
import type { Booking } from '../types';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to automatically attach the JWT token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('locus_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Booking API Calls
 */

// Fetches all bookings for the Admin Dashboard
export const getBookings = () => apiClient.get<Booking[]>('/bookings');

// Updates a booking status (Approved/Rejected)
// Matches the [HttpPatch("{id}/status")] endpoint in your backend
export const updateBookingStatus = (id: number, status: 'Approved' | 'Rejected') => 
  apiClient.patch(`/bookings/${id}/status`, { status });

export default apiClient;