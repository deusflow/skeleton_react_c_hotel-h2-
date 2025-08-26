import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getToken, clearToken } from '../api/apiClient';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const isLoggedIn = !!getToken(); // Проверяем есть ли токен

    // Функция выхода из системы
    const handleLogout = () => {
        clearToken(); // Удаляем токен из localStorage
        navigate('/login'); // Перенаправляем на страницу входа
    };

    // Если пользователь не авторизован - не показываем navbar
    if (!isLoggedIn) {
        return null;
    }

    return (
        <nav className="bg-white shadow-lg border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Логотип и основное меню */}
                    <div className="flex items-center space-x-8">
                        <div className="flex-shrink-0">
                            <h1 className="text-xl font-bold text-indigo-600">Hotel Manager</h1>
                        </div>
                        
                        {/* Меню навигации */}
                        <div className="hidden md:flex space-x-4">
                            <Link
                                to="/bookings"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    location.pathname.startsWith('/bookings')
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                            >
                                Bookings
                            </Link>
                            <Link
                                to="/me"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    location.pathname === '/me'
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                            >
                                My Profile
                            </Link>
                        </div>
                    </div>

                    {/* Кнопка выхода */}
                    <div className="flex items-center">
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Logout
                        </button>
                    </div>

                    {/* Мобильное меню (упрощенное) */}
                    <div className="md:hidden flex items-center space-x-2">
                        <Link
                            to="/bookings"
                            className="text-gray-600 hover:text-gray-900 px-2 py-1 text-sm"
                        >
                            Bookings
                        </Link>
                        <Link
                            to="/me"
                            className="text-gray-600 hover:text-gray-900 px-2 py-1 text-sm"
                        >
                            Profile
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
