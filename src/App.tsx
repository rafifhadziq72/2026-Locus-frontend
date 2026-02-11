import { useEffect, useState } from 'react';
import apiClient from './api/client';
import type { Room } from './types';

function App() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Attempting to fetch rooms from the Locus Backend
    apiClient.get('/rooms')
      .then((response) => {
        setRooms(response.data);
        console.log('Connection Successful:', response.data);
      })
      .catch((err) => {
        setError(err.message);
        console.error('Connection Failed:', err);
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Locus System Connection Test</h1>
      
      {error ? (
        <div style={{ color: 'red' }}>
          <p>❌ Error connecting to backend: {error}</p>
          <p>Check if your Backend is running and CORS is configured.</p>
        </div>
      ) : (
        <div>
          <p>✅ Backend connection status: {rooms.length >= 0 ? 'Connected' : 'Connecting...'}</p>
          <h3>Available Rooms: {rooms.length}</h3>
          <ul>
            {rooms.map((room) => (
              <li key={room.id}>{room.name} (Capacity: {room.capacity})</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;