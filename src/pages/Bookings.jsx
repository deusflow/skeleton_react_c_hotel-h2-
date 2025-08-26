/**
 * 
 * @returns {JSX.Element}
 * @description Placeholder component for Bookings page.
 */

import { useEffect, useState } from "react";
import { request } from "../api/apiClient";
import { useSearchParams, Link } from "react-router-dom";


export default function Bookings() {
    // Состояния для списка бронирований
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    
    // URL параметры для поиска и пагинации
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page')) || 1;
    const searchQuery = searchParams.get('q') || '';

    // Состояние для поля поиска
    const [searchInput, setSearchInput] = useState(searchQuery);

    useEffect(() => {
        loadBookings();
    }, [page, searchQuery]);

    const loadBookings = async () => {
        setLoading(true);
        try {
            // GET request to /bookings endpoint with search and pagination params
            const response = await request('/bookings', {
                auth: true,
                params: {
                    page: page,
                    pageSize: 10,
                    search: searchQuery || undefined
                }
            });
            
            setBookings(response.data || response);
            setTotalPages(response.totalPages || 1);
        } catch (err) {
            setError('Error loading bookings: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Обработка поиска
    const handleSearch = (e) => {
        e.preventDefault();
        const newParams = new URLSearchParams();
        if (searchInput.trim()) {
            newParams.set('q', searchInput.trim());
        }
        newParams.set('page', '1'); // Сбрасываем на первую страницу при поиске
        setSearchParams(newParams);
    };

    // Смена страницы
    const handlePageChange = (newPage) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', newPage.toString());
        setSearchParams(newParams);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
            </div>

            {/* Поиск */}
            <div className="bg-white shadow rounded-lg p-4">
                <form onSubmit={handleSearch} className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Search by booking number, room, guest..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Search
                    </button>
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearchInput('');
                                setSearchParams({});
                            }}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                            Clear
                        </button>
                    )}
                </form>
            </div>

            {/* Состояния загрузки и ошибки */}
            {loading && (
                <div className="flex justify-center items-center py-8">
                    <div className="text-lg">Loading...</div>
                </div>
            )}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {/* Список бронирований */}
            {!loading && !error && (
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    {bookings.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Guest
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Room
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Dates
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {bookings.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                #{booking.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {booking.guestName || booking.customerName || 'Not specified'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {booking.roomNumber || 'Not specified'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {booking.checkInDate} - {booking.checkOutDate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    booking.status === 'Confirmed' 
                                                        ? 'bg-green-100 text-green-800'
                                                        : booking.status === 'Pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <Link
                                                    to={`/bookings/${booking.id}`}
                                                    className="text-indigo-600 hover:text-indigo-900 underline"
                                                >
                                                    View Details
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-6 text-center text-gray-500">
                            {searchQuery ? 'No results found for your search' : 'No bookings yet'}
                        </div>
                    )}
                </div>
            )}

            {/* Пагинация */}
            {!loading && !error && totalPages > 1 && (
                <div className="flex justify-center space-x-2">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page <= 1}
                        className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    
                    <span className="px-3 py-2 text-sm bg-indigo-600 text-white rounded-md">
                        {page} of {totalPages}
                    </span>
                    
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page >= totalPages}
                        className="px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}