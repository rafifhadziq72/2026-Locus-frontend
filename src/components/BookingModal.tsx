// src/components/BookingModal.tsx
import React, { useState } from 'react';
import apiClient from '../api/client';
import type { Room, CreateBookingRequest } from '../types';

interface Props {
  room: Room;
  onClose: () => void;
  onSuccess: () => void;
}

const BookingModal: React.FC<Props> = ({ room, onClose, onSuccess }) => {
  const [formData, setFormData] = useState<Omit<CreateBookingRequest, 'roomId'>>({
    bookerName: '',
    bookerEmail: '',
    startTime: '',
    endTime: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await apiClient.post('/bookings', {
        ...formData,
        roomId: room.id,
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      // Handles the 'Collision Prevention' error from backend
      setError(err.response?.data || 'Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Book {room.name}</h2>
        {error && <p className="error-message">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            required
            value={formData.bookerName}
            onChange={(e) => setFormData({ ...formData, bookerName: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            value={formData.bookerEmail}
            onChange={(e) => setFormData({ ...formData, bookerEmail: e.target.value })}
          />
          <label>Start Time</label>
          <input
            type="datetime-local"
            required
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
          />
          <label>End Time</label>
          <input
            type="datetime-local"
            required
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
          />
          
          <div className="modal-actions">
            <button type="button" onClick={onClose} disabled={loading}>Cancel</button>
            <button type="submit" disabled={loading}>
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;