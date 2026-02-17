import { useState } from "react";
import apiClient from "../api/client";
import type { Room, CreateBookingRequest } from "../types";

interface Props {
  room: Room;
  onClose: () => void;
  onSuccess: () => void;
}

const BookingModal: React.FC<Props> = ({ room, onClose, onSuccess }) => {
  const [formData, setFormData] = useState<Omit<CreateBookingRequest, "roomId">>({
    bookerName: "",
    bookerEmail: "",
    startTime: "",
    endTime: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await apiClient.post("/bookings", {
        ...formData,
        roomId: room.id,
      });

      onSuccess();
      onClose();
    } catch (err: any) {
      const apiErrorMessage = err.response?.data?.message || err.response?.data;
      setError(
        apiErrorMessage || "Failed to create booking. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        overflow: 'hidden' // Prevents the outer overlay from scrolling
      }}
    >
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          width: '90%',
          maxWidth: '600px',
          maxHeight: '90vh', // Keeps the modal within the screen height
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden', // Clips the children to the border radius
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="modal-header" style={{ padding: 'var(--space-6) var(--space-6) 0 var(--space-6)' }}>
          <div>
            <h2 className="modal-title" style={{ margin: 0 }}>Book {room.name}</h2>
            <p style={{ 
              color: 'var(--gray-600)', 
              fontSize: 'var(--text-sm)', 
              marginTop: '8px',
              margin: '8px 0 0 0'
            }}>
              Complete the form below to request this room
            </p>
          </div>
        </div>

        {/* This wrapper ensures the scrollbar stays inside the white box */}
        <div style={{ 
          overflowY: 'auto', 
          padding: 'var(--space-6)',
          flex: 1 
        }}>
          <form id="booking-form" onSubmit={handleSubmit}>
            <div className="modal-body" style={{ padding: 0 }}>
              {error && (
                <div className="error-message" style={{ marginBottom: 'var(--space-4)' }}>
                  <strong>⚠ Error:</strong> {error}
                </div>
              )}

              <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                <label className="form-label" htmlFor="bookerName">
                  Full Name <span style={{ color: 'var(--error-500)' }}>*</span>
                </label>
                <input
                  id="bookerName"
                  type="text"
                  className="form-input"
                  placeholder="Enter your full name"
                  required
                  value={formData.bookerName}
                  onChange={(e) =>
                    setFormData({ ...formData, bookerName: e.target.value })
                  }
                />
              </div>

              <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                <label className="form-label" htmlFor="bookerEmail">
                  Email Address <span style={{ color: 'var(--error-500)' }}>*</span>
                </label>
                <input
                  id="bookerEmail"
                  type="email"
                  className="form-input"
                  placeholder="your.email@example.com"
                  required
                  value={formData.bookerEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, bookerEmail: e.target.value })
                  }
                />
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: 'var(--space-4)',
                marginBottom: 'var(--space-4)'
              }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="startTime">
                    Start Time <span style={{ color: 'var(--error-500)' }}>*</span>
                  </label>
                  <input
                    id="startTime"
                    type="datetime-local"
                    className="form-input"
                    required
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData({ ...formData, startTime: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="endTime">
                    End Time <span style={{ color: 'var(--error-500)' }}>*</span>
                  </label>
                  <input
                    id="endTime"
                    type="datetime-local"
                    className="form-input"
                    required
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData({ ...formData, endTime: e.target.value })
                    }
                  />
                </div>
              </div>

              <div style={{
                background: 'var(--primary-50)',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-base)',
                fontSize: 'var(--text-sm)',
                color: 'var(--primary-700)',
                display: 'flex',
                gap: 'var(--space-3)',
                alignItems: 'flex-start'
              }}>
                <span style={{ fontSize: 'var(--text-lg)' }}>ℹ️</span>
                <div>
                  <strong>Note:</strong> Your booking request will be sent to the administrator for approval. 
                  You'll receive a confirmation email once approved.
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="modal-footer" style={{ 
          padding: 'var(--space-4) var(--space-6)', 
          borderTop: '1px solid var(--gray-200)',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 'var(--space-3)'
        }}>
          <button 
            type="button" 
            onClick={onClose} 
            disabled={loading}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button 
            form="booking-form" // Link button to form since it's now outside the scroll div
            type="submit" 
            disabled={loading}
            className="btn btn-primary"
            style={{ minWidth: '140px' }}
          >
            {loading ? (
              <>
                <span className="spinner" style={{ width: '16px', height: '16px' }}></span>
                Submitting...
              </>
            ) : (
              <>
                ✓ Confirm Booking
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;