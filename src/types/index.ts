// src/types/index.ts

export type BookingStatus = 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';

export interface Room {
  id: number; // Changed from string to number to match backend int
  name: string;
  capacity: number;
  isAvailable: boolean;
}

export interface CreateBookingRequest {
  roomId: number;
  bookerName: string;
  bookerEmail: string;
  startTime: string; // ISO string
  endTime: string;
}

export interface Booking {
  id: number;
  roomId: number;
  room?: Room;
  startTime: string; 
  endTime: string;
  status: BookingStatus;
  bookerName: string; // Aligned with backend BookerName
  bookerEmail: string; // Added to match backend
}