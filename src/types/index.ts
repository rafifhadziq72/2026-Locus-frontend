// src/types/index.ts

export type BookingStatus = 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';

export interface Room {
  id: number;
  name: string;
  capacity: number;
  isAvailable: boolean;
}

export interface CreateBookingRequest {
  roomId: number;
  bookerName: string;
  bookerEmail: string;
  startTime: string; 
  endTime: string;
}

export interface Booking {
  id: number;
  roomId: number;
  roomName: string;    
  bookerName: string;
  bookerEmail: string; // Ensure this is present
  startTime: string;   
  endTime: string;     
  status: 'Pending' | 'Approved' | 'Rejected';
  rejectionReason?: string;
}