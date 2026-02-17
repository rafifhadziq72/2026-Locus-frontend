import { useEffect, useState } from 'react';
import apiClient from './api/client';
import type { Room } from './types';
import RoomCard from './components/RoomCard';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'user' | 'admin'>('user');
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available' | 'occupied'>('all');

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    filterRooms();
  }, [searchQuery, availabilityFilter, rooms]);

  const loadRooms = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/rooms');
      setRooms(response.data);
    } catch (err) {
      console.error("Failed to load rooms", err);
    } finally {
      setLoading(false);
    }
  };

  const filterRooms = () => {
    let filtered = rooms;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(room =>
        room.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by availability
    if (availabilityFilter === 'available') {
      filtered = filtered.filter(room => room.isAvailable);
    } else if (availabilityFilter === 'occupied') {
      filtered = filtered.filter(room => !room.isAvailable);
    }

    setFilteredRooms(filtered);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="app-logo">
            <div className="logo-icon">L</div>
            <h1 className="app-title">Locus</h1>
          </div>

          <div className="view-tabs">
            <button
              className={`tab-btn ${view === 'user' ? 'active' : ''}`}
              onClick={() => setView('user')}
            >
              🏢 Book a Room
            </button>
            <button
              className={`tab-btn ${view === 'admin' ? 'active' : ''}`}
              onClick={() => setView('admin')}
            >
              ✓ Manage Requests
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {view === 'admin' ? (
          <AdminDashboard />
        ) : (
          <>
            <div className="search-section">
              <div className="search-bar">
                <div className="search-input-wrapper">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search rooms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <select
                  className="filter-select"
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value as any)}
                >
                  <option value="all">All Rooms</option>
                  <option value="available">Available Only</option>
                  <option value="occupied">Occupied Only</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="loading-container">
                <div className="spinner loading-spinner"></div>
                <p>Loading rooms...</p>
              </div>
            ) : filteredRooms.length === 0 ? (
              <div className="empty-state">
                <p>No rooms found matching your criteria</p>
              </div>
            ) : (
              <div className="rooms-grid">
                {filteredRooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;