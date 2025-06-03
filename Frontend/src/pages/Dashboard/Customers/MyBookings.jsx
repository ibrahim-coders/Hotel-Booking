import React, { useState } from 'react';

const initialBookings = [
  {
    id: 1,
    name: 'Hotel Paradise',
    checkIn: '2025-06-10',
    checkOut: '2025-06-15',
    roomType: 'Suite',
  },
  {
    id: 2,
    name: 'Green View Resort',
    checkIn: '2025-07-01',
    checkOut: '2025-07-05',
    roomType: 'Double',
  },
];

const MyBookings = () => {
  const [bookings, setBookings] = useState(initialBookings);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ checkIn: '', checkOut: '' });

  const handleCancel = id => {
    const confirmed = window.confirm(
      'Are you sure you want to cancel this booking?'
    );
    if (confirmed) {
      setBookings(bookings.filter(b => b.id !== id));
    }
  };

  const handleEdit = booking => {
    setEditingId(booking.id);
    setEditForm({ checkIn: booking.checkIn, checkOut: booking.checkOut });
  };

  const handleSave = id => {
    setBookings(prev =>
      prev.map(b =>
        b.id === id
          ? { ...b, checkIn: editForm.checkIn, checkOut: editForm.checkOut }
          : b
      )
    );
    setEditingId(null);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-6">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">You have no bookings.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => (
            <div
              key={booking.id}
              className="p-4 border rounded flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div className="flex-1 space-y-1">
                <h3 className="text-lg font-semibold">{booking.name}</h3>

                {editingId === booking.id ? (
                  <div className="flex gap-2">
                    <div>
                      <label className="block text-sm">Check-In</label>
                      <input
                        type="date"
                        name="checkIn"
                        value={editForm.checkIn}
                        onChange={handleChange}
                        className="border p-1 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm">Check-Out</label>
                      <input
                        type="date"
                        name="checkOut"
                        value={editForm.checkOut}
                        onChange={handleChange}
                        className="border p-1 rounded"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <p>Room: {booking.roomType}</p>
                    <p>
                      Dates: {booking.checkIn} → {booking.checkOut}
                    </p>
                  </>
                )}
              </div>

              <div className="flex gap-3 mt-4 md:mt-0">
                {editingId === booking.id ? (
                  <button
                    onClick={() => handleSave(booking.id)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(booking)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Modify
                  </button>
                )}
                <button
                  onClick={() => handleCancel(booking.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
