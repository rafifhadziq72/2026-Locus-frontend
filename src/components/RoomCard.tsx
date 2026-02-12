// src/components/RoomCard.tsx
import React, { useState } from 'react';
import type { Room } from '../types';
import BookingModal from './BookingModal';

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="room-card">
      <h3>{room.name}</h3>
      <p>Capacity: {room.capacity}</p>
      <button 
        onClick={() => setIsModalOpen(true)}
        disabled={!room.isAvailable}
      >
        {room.isAvailable ? 'Book Now' : 'Occupied'}
      </button>

      {isModalOpen && (
        <BookingModal 
          room={room} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={() => alert('Booking request submitted!')}
        />
      )}
    </div>
  );
};

export default RoomCard;