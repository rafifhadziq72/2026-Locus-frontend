// src/App.tsx
import { useEffect, useState } from 'react';
import apiClient from './api/client';
import type { Room } from './types';
import RoomCard from './components/RoomCard';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard'; // Import the new component

function App() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(localStorage.getItem('locus_token'));
  
  // New state to toggle between 'user' and 'admin' views for testing
  const [view, setView] = useState<'user' | 'admin'>('user');

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

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottom: '1px solid #eee', 
        paddingBottom: '20px', 
        marginBottom: '20px' 
      }}>
        <div>
          <h1 style={{ margin: 0 }}>Locus Dashboard</h1>
          <div style={{ marginTop: '10px' }}>
            <button 
              onClick={() => setView('user')}
              style={{ 
                marginRight: '10px', 
                padding: '8px 16px', 
                cursor: 'pointer',
                backgroundColor: view === 'user' ? '#3182ce' : '#edf2f7',
                color: view === 'user' ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px'
              }}
            >
              User View
            </button>
            <button 
              onClick={() => setView('admin')}
              style={{ 
                padding: '8px 16px', 
                cursor: 'pointer',
                backgroundColor: view === 'admin' ? '#3182ce' : '#edf2f7',
                color: view === 'admin' ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px'
              }}
            >
              Admin View
            </button>
          </div>
        </div>
        <button 
           onClick={() => { localStorage.removeItem('locus_token'); setToken(null); }}
           style={{ 
             padding: '8px 16px', 
             cursor: 'pointer', 
             backgroundColor: 'transparent', 
             border: '1px solid #e53e3e', 
             color: '#e53e3e',
             borderRadius: '4px'
           }}
        >
          Logout
        </button>
      </header>

      {/* Conditionally render the selected view */}
      {view === 'admin' ? (
        <AdminDashboard />
      ) : (
        <>
          <p>Select an available room to start your booking request.</p>
          {loading ? (
            <p>Loading secure data...</p>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
              {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;