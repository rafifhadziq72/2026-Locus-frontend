import { useEffect, useState } from 'react';
import apiClient from './api/client';
import type { Room } from './types';
// Import the new component you just created
import RoomCard from './components/RoomCard';

function App() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/rooms')
      .then((response) => {
        setRooms(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Locus Dashboard</h1>
      <p>Select an available room to start your booking request.</p>

      {/* This creates the responsive grid for your cards */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '20px',
        marginTop: '20px'
      }}>
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}

export default App;