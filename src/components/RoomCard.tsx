// src/components/RoomCard.tsx
import type { Room } from '../types';

interface RoomCardProps {
  room: Room;
}

const RoomCard = ({ room }: RoomCardProps) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      backgroundColor: room.isAvailable ? '#f0fff4' : '#fff5f5',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      width: '300px'
    }}>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{room.name}</h2>
      <div style={{ fontSize: '0.9rem', color: '#666' }}>
        <p><strong>Capacity:</strong> {room.capacity} People</p>
        <p>
          <strong>Status:</strong> 
          <span style={{ 
            color: room.isAvailable ? '#2f855a' : '#c53030',
            fontWeight: 'bold',
            marginLeft: '4px'
          }}>
            {room.isAvailable ? 'Available' : 'Currently Booked'}
          </span>
        </p>
      </div>
      <button 
        disabled={!room.isAvailable}
        style={{
          marginTop: '15px',
          width: '100%',
          padding: '10px',
          backgroundColor: room.isAvailable ? '#3182ce' : '#cbd5e0',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: room.isAvailable ? 'pointer' : 'not-allowed'
        }}
      >
        {room.isAvailable ? 'Request Booking' : 'Unavailable'}
      </button>
    </div>
  );
};

export default RoomCard;