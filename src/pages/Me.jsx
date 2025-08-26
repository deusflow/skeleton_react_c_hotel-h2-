import { useEffect, useState } from "react";
import { request } from "../api/apiClient";

export default function MePage() {
    // Состояния для данных пользователя
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            // Загружаем профиль пользователя
            const userProfile = await request('/auth/me', { auth: true });
            setUser(userProfile);

            // Загружаем последние бронирования
            const bookingsData = await request('/bookings', {
                auth: true,
                params: { page: 1, pageSize: 5 } // Последние 5 бронирований
            });
            setBookings(bookingsData.data || bookingsData);
        } catch (err) {
            setError('Error loading data: ' + err.message);
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
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Профиль пользователя */}
            <div className="bg-white shadow rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">My Profile</h1>
                {user && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <p className="mt-1 text-sm text-gray-900">{user.name || 'Not specified'}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Roles</label>
                            <p className="mt-1 text-sm text-gray-900">
                                {user.roles ? user.roles.join(', ') : 'User'}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Последние бронирования */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">My Recent Bookings</h2>
                {bookings.length > 0 ? (
                    <div className="space-y-3">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="border-l-4 border-indigo-500 pl-4 py-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium">Booking #{booking.id}</p>
                                        <p className="text-sm text-gray-600">
                                            {booking.checkInDate} - {booking.checkOutDate}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Room: {booking.roomNumber || 'Not specified'}
                                        </p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                        booking.status === 'Confirmed' 
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {booking.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">You have no bookings yet</p>
                )}
            </div>
        </div>
    );
}
