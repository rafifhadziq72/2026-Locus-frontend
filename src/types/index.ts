// src/types/index.ts

export type BookingStatus = 'Pending' | 'Approved' | 'Rejected';

export interface Room {
  id: string;
  name: string;
  capacity: number;
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  roomId: string;
  room?: Room;
  startTime: string; // ISO String from backend
  endTime: string;
  status: BookingStatus;
  requesterName: string;
}