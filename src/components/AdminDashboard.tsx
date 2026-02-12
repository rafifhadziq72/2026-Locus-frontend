import React, { useEffect, useState } from 'react';
import apiClient from '../api/client';
import type { Booking } from '../types';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const response = await apiClient.get('/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 2026-Locus-frontend/src/components/AdminDashboard.tsx

const handleStatusUpdate = async (id: number, status: 'Approved' | 'Rejected') => {
  try {
    await apiClient.patch(`/bookings/${id}/status`, { status });
    // Refresh the list after update
    fetchBookings();
  } catch (error: any) {
    // This will display the actual error message from the backend response
    const errorMessage = error.response?.data || "Failed to update status";
    alert(typeof errorMessage === 'string' ? errorMessage : "An unexpected error occurred.");
    console.error("Status update error:", error);
  }
};

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Management: Room Bookings</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Room</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Booker</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Time Slot</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{booking.room?.name}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{booking.bookerName}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {new Date(booking.startTime).toLocaleString()} - {new Date(booking.endTime).toLocaleString()}
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '4px',
                  backgroundColor: booking.status === 'Approved' ? '#c6f6d5' : booking.status === 'Pending' ? '#feebc8' : '#fed7d7'
                }}>
                  {booking.status}
                </span>
              </td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {booking.status === 'Pending' && (
                  <>
                    <button 
                      onClick={() => handleStatusUpdate(booking.id, 'Approved')}
                      style={{ marginRight: '10px', backgroundColor: '#38a169', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(booking.id, 'Rejected')}
                      style={{ backgroundColor: '#e53e3e', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;