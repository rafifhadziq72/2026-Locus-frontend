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

  useEffect(() => {
    fetchBookings();
  }, []);

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
      const updateData = {
        roomId: booking.roomId,
        bookerName: editName,
        bookerEmail: "updated@example.com", // Keeping schema consistency
        startTime: booking.startTime,
        endTime: booking.endTime
      };
      await apiClient.put(`/bookings/${booking.id}`, updateData);
      setEditingId(null);
      fetchBookings();
    } catch (error: any) {
      alert(error.response?.data || "Update failed.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to remove this request?")) return;
    try {
      await apiClient.delete(`/bookings/${id}`);
      fetchBookings();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#2d3748', marginBottom: '20px' }}>Approval Page</h1>

      {loading ? (
        <p style={{ color: '#2d3748' }}>Loading requests...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <thead style={{ backgroundColor: '#edf2f7', borderBottom: '2px solid #cbd5e0' }}>
              <tr>
                <th style={tableHeaderStyle}>Room</th>
                <th style={tableHeaderStyle}>Booker</th>
                <th style={tableHeaderStyle}>Time Slot</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                  <td style={tableCellStyle}>{b.roomName}</td>
                  <td style={tableCellStyle}>
                    {editingId === b.id ? (
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        style={{ padding: '4px', borderRadius: '4px', border: '1px solid #cbd5e0', width: '100%' }}
                      />
                    ) : (
                      b.bookerName
                    )}
                  </td>
                  <td style={tableCellStyle}>
                    <small>{new Date(b.startTime).toLocaleString()} - {new Date(b.endTime).toLocaleTimeString()}</small>
                  </td>
                  <td style={tableCellStyle}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      backgroundColor: b.status === 'Approved' ? '#c6f6d5' : b.status === 'Pending' ? '#feebc8' : '#fed7d7',
                      color: b.status === 'Approved' ? '#22543d' : b.status === 'Pending' ? '#744210' : '#822727'
                    }}>
                      {b.status}
                    </span>
                  </td>
                  <td style={tableCellStyle}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {b.status === 'Pending' && (
                        <button
                          onClick={() => handleStatusUpdate(b.id, 'Approved')}
                          style={{ backgroundColor: '#48bb78', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          Approve
                        </button>
                      )}
                      {editingId === b.id ? (
                        <button
                          onClick={() => handleSaveEdit(b)}
                          style={{ backgroundColor: '#3182ce', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => { setEditingId(b.id); setEditName(b.bookerName); }}
                          style={{ backgroundColor: '#edf2f7', border: '1px solid #cbd5e0', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(b.id)}
                        style={{ color: '#e53e3e', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const tableHeaderStyle: React.CSSProperties = {
  padding: '12px 15px',
  textAlign: 'left',
  color: '#4a5568',
  fontWeight: '600',
  fontSize: '0.9rem'
};

const tableCellStyle: React.CSSProperties = {
  padding: '12px 15px',
  color: '#2d3748',
  fontSize: '0.95rem'
};

export default AdminDashboard;