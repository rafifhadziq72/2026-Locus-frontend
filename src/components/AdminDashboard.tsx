// 2026-Locus-frontend/src/components/AdminDashboard.tsx

import React, { useEffect, useState } from 'react';
import apiClient from '../api/client';
import type { Booking } from '../types';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const fetchBookings = async () => {
    try {
      const response = await apiClient.get('/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleStatusUpdate = async (id: number, status: 'Approved' | 'Rejected') => {
    try {
      await apiClient.patch(`/bookings/${id}/status`, { status });
      fetchBookings();
    } catch (error: any) {
      alert(error.response?.data || "Status update failed.");
    }
  };

  const handleSaveEdit = async (booking: Booking) => {
  try {
    // Ensure all fields match the CreateBookingRequest DTO exactly
    const updateData = {
      roomId: booking.roomId,
      bookerName: editName,
      // Fallback to a default if email is missing to satisfy [Required]
      bookerEmail: booking.bookerEmail || "admin@locus.com", 
      startTime: booking.startTime,
      endTime: booking.endTime
    };

    await apiClient.put(`/bookings/${booking.id}`, updateData);
    
    setEditingId(null);
    fetchBookings();
    alert("Saved successfully!");
  } catch (error: any) {
    // This will now show the specific error (e.g., "The updated time slot overlaps...")
    const serverMessage = error.response?.data;
    alert(typeof serverMessage === 'string' ? serverMessage : "Validation Error: Check your inputs.");
  }
};

  const handleDelete = async (id: number) => {
    if (window.confirm("Remove this booking from the system?")) {
      try {
        await apiClient.delete(`/bookings/${id}`);
        fetchBookings();
      } catch (error) {
        alert("Delete failed.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Management</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead style={{ background: '#f8f9fa' }}>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Room</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Booker</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Time</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{b.roomName}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {editingId === b.id ? (
                  <input value={editName} onChange={(e) => setEditName(e.target.value)} />
                ) : b.bookerName}
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {new Date(b.startTime).toLocaleString()}
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{b.status}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {b.status === 'Pending' && (
                    <button onClick={() => handleStatusUpdate(b.id, 'Approved')}>Approve</button>
                  )}
                  {editingId === b.id ? (
                    <button onClick={() => handleSaveEdit(b)} style={{ fontWeight: 'bold' }}>Save</button>
                  ) : (
                    <button onClick={() => { setEditingId(b.id); setEditName(b.bookerName); }}>Edit</button>
                  )}
                  <button onClick={() => handleDelete(b.id)} style={{ color: 'red' }}>Remove</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;