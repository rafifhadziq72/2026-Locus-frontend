import { useState } from 'react';
import type { Room } from '../types';
import BookingModal from './BookingModal';

interface RoomCardProps {
  room: Room;
  onBookingSuccess?: () => void;
}

// src/components/RoomCard.tsx

const RoomCard: React.FC<RoomCardProps> = ({ room, onBookingSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Parse facilities string from database into an array
  // We split by comma and trim whitespace to ensure clean tags
  const features = room.facilities 
    ? room.facilities.split(',').map(f => f.trim()) 
    : [];

  const handleBookingSuccess = () => {
    setIsModalOpen(false);
    onBookingSuccess?.();
  };

  return (
    <>
      <div className="room-card">
        {/* ... header remains the same ... */}
        <div className="room-card-header">
          <h3 className="room-card-title">{room.name}</h3>
          <div className="room-card-meta">
            <div className="meta-item">
              <span>👥</span>
              <span>Up to {room.capacity} people</span>
            </div>
            <div className="meta-item">
              {room.isAvailable ? (
                <span className="badge badge-success">✓ Available</span>
              ) : (
                <span className="badge badge-error">Occupied</span>
              )}
            </div>
          </div>
        </div>

        <div className="room-card-body">
          <div className="room-features">
            {/* Displaying actual database facilities */}
            {features.length > 0 ? (
              features.map((feature, index) => (
                <span key={index} className="feature-tag">{feature}</span>
              ))
            ) : (
              <span style={{ color: 'var(--gray-400)', fontSize: 'var(--text-xs)' }}>
                No facilities listed
              </span>
            )}
          </div>
        </div>

        <div className="room-card-footer">
          <button 
            className="book-btn btn btn-primary"
            onClick={() => setIsModalOpen(true)}
            disabled={!room.isAvailable}
          >
            {room.isAvailable ? '📅 Book This Room' : 'Currently Unavailable'}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <BookingModal 
          room={room} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={handleBookingSuccess}
        />
      )}
    </>
  );
};

export default RoomCard;