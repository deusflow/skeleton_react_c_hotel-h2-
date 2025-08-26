import { useEffect, useState} from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { request } from "../api/apiClient";

export default function BookingDetailsPage() {
    // Get booking ID from URL
    const { id } = useParams();
    const navigate = useNavigate();
    
    // States for booking data
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadBookingDetails();
    }, [id]);

    const loadBookingDetails = async () => {
        try {
            // GET request to load specific booking details by ID
            const bookingData = await request(`/bookings/${id}`, { auth: true });
            setBooking(bookingData);
        } catch (err) {
            setError('Error loading booking details: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-64">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
                <Link 
                    to="/bookings" 
                    className="inline-block px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Back to List
                </Link>
            </div>
        );
    }

    if (!booking) {
        return (
            <div className="text-center space-y-4">
                <p className="text-gray-500">Booking not found</p>
                <Link 
                    to="/bookings" 
                    className="inline-block px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Back to List
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header and navigation */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                    Booking Details #{booking.id}
                </h1>
                <Link 
                    to="/bookings" 
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Back to List
                </Link>
            </div>

            {/* Booking status */}
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">Status</h2>
                        <span className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
                            booking.status === 'Confirmed' 
                                ? 'bg-green-100 text-green-800'
                                : booking.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                        }`}>
                            {booking.status}
                        </span>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-600">Created Date</p>
                        <p className="font-medium">{booking.createdAt || 'Not specified'}</p>
                    </div>
                </div>
            </div>

            {/* Guest information */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Guest Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Guest Name</label>
                        <p className="mt-1 text-sm text-gray-900">{booking.guestName || booking.customerName || 'Not specified'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="mt-1 text-sm text-gray-900">{booking.guestEmail || booking.email || 'Not specified'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <p className="mt-1 text-sm text-gray-900">{booking.guestPhone || booking.phone || 'Not specified'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
                        <p className="mt-1 text-sm text-gray-900">{booking.guestCount || booking.guests || 'Not specified'}</p>
                    </div>
                </div>
            </div>

            {/* Accommodation details */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Accommodation Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Room Number</label>
                        <p className="mt-1 text-sm text-gray-900">{booking.roomNumber || 'Not specified'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Room Type</label>
                        <p className="mt-1 text-sm text-gray-900">{booking.roomType || 'Not specified'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Check-in Date</label>
                        <p className="mt-1 text-sm text-gray-900">{booking.checkInDate || 'Not specified'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Check-out Date</label>
                        <p className="mt-1 text-sm text-gray-900">{booking.checkOutDate || 'Not specified'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Number of Nights</label>
                        <p className="mt-1 text-sm text-gray-900">{booking.nights || 'Not specified'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Total Price</label>
                        <p className="mt-1 text-sm text-gray-900">
                            {booking.totalPrice ? `$${booking.totalPrice}` : 'Not specified'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Additional information */}
            {booking.notes && (
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Notes</h2>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{booking.notes}</p>
                </div>
            )}

            {/* Actions */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
                <div className="flex space-x-4">
                    <button 
                        onClick={() => window.print()}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Print
                    </button>
                    <button 
                        onClick={() => navigate(`/bookings/${booking.id}/edit`)}
                        className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                        disabled
                        title="Edit functionality will be added later"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}