import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
    const { logout, token, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const navItems = [
        { path: "/dashboard", label: "Dashboard", icon: "🏠" },
        { path: "/finance", label: "Finance", icon: "💰" },
        { path: "/add-finance", label: "Add Record", icon: "➕" },
    ];

    if (!token) return null;

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                        <h1 className="text-white font-bold text-xl">FinanceTracker</h1>

                    
                    <div className="hidden md:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition duration-200 font-medium ${
                                    isActive(item.path)
                                        ? 'bg-red-500 bg-opacity-20 text-white shadow-lg'
                                        : 'text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
                                }`}
                            >
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* User Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user && (
                            <div className="text-white text-sm">
                                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                                    Welcome, {user.name || 'User'}
                                </span>
                            </div>
                        )}

                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center space-x-2 font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Logout</span>
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white hover:bg-white hover:bg-opacity-10 p-2 rounded-lg transition duration-200"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-blue-500 border-opacity-30">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => {
                                        navigate(item.path);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition duration-200 font-medium ${
                                        isActive(item.path)
                                            ? 'bg-white bg-opacity-20 text-white'
                                            : 'text-blue-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
                                    }`}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span>{item.label}</span>
                                </button>
                            ))}

                            <div className="border-t border-blue-500 border-opacity-30 mt-4 pt-4">
                                {user && (
                                    <div className="text-blue-100 text-sm mb-3 px-3">
                                        Welcome, {user.name || 'User'}
                                    </div>
                                )}
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-3 rounded-lg transition duration-200 flex items-center space-x-3 font-medium"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
