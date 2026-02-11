// src/App.tsx
import { useEffect, useState } from 'react';
import apiClient from './api/client';
import type { Room } from './types';
import RoomCard from './components/RoomCard';
import Login from './components/login'; // Make sure to create this file next

function App() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(localStorage.getItem('locus_token'));

  useEffect(() => {
    if (token) {
      setLoading(true);
      apiClient.get('/rooms')
        .then((response) => {
          setRooms(response.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          // If the token is invalid or expired, clear it
          localStorage.removeItem('locus_token');
          setToken(null);
        });
    }
  }, [token]);

  // If there is no token, stay on the Login page
  if (!token) {
    return <Login onLoginSuccess={(newToken) => setToken(newToken)} />;
  }

  if (loading) return <p>Loading secure data...</p>;

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Locus Dashboard</h1>
        <button 
           onClick={() => { localStorage.removeItem('locus_token'); setToken(null); }}
           style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          Logout
        </button>
      </header>
      <p>Select an available room to start your booking request.</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
}

export default App;