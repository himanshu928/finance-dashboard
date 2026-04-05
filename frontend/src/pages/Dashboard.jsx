import { useEffect, useState, useContext } from "react";
import { getFinanceRecords } from "../api/financeApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        totalTransactions: 0
    });
    const [recentRecords, setRecentRecords] = useState([]);
    const [categoryBreakdown, setCategoryBreakdown] = useState({});

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        fetchDashboardData();
    }, [token, navigate]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const res = await getFinanceRecords(token, "", 1, "");
            const records = res.data.records;

            setRecords(records);

            // Calculate stats
            let income = 0;
            let expense = 0;
            const categories = {};

            records.forEach((item) => {
                if (item.type === "income") {
                    income += Number(item.amount);
                } else {
                    expense += Number(item.amount);
                }

                // Category breakdown
                const category = item.category || "Uncategorized";
                if (!categories[category]) {
                    categories[category] = { income: 0, expense: 0 };
                }
                if (item.type === "income") {
                    categories[category].income += Number(item.amount);
                } else {
                    categories[category].expense += Number(item.amount);
                }
            });

            setStats({
                totalIncome: income,
                totalExpense: expense,
                balance: income - expense,
                totalTransactions: records.length
            });

            setCategoryBreakdown(categories);

            // Get recent 5 records
            const sortedRecords = records.sort((a, b) =>
                new Date(b.created_at || b.date) - new Date(a.created_at || a.date)
            );
            setRecentRecords(sortedRecords.slice(0, 5));

        } catch (error) {
            console.log("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

            <div className="container mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
                    <p className="text-gray-600">Welcome back! Here's your financial overview.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Income</p>
                                <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalIncome)}</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-full">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                                <p className="text-2xl font-bold text-red-600">{formatCurrency(stats.totalExpense)}</p>
                            </div>
                            <div className="bg-red-100 p-3 rounded-full">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${stats.balance >= 0 ? 'border-blue-500' : 'border-red-500'}`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Net Balance</p>
                                <p className={`text-2xl font-bold ${stats.balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                                    {formatCurrency(stats.balance)}
                                </p>
                            </div>
                            <div className={`p-3 rounded-full ${stats.balance >= 0 ? 'bg-blue-100' : 'bg-red-100'}`}>
                                <svg className={`w-6 h-6 ${stats.balance >= 0 ? 'text-blue-600' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                                <p className="text-2xl font-bold text-purple-600">{stats.totalTransactions}</p>
                            </div>
                            <div className="bg-purple-100 p-3 rounded-full">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Transactions */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
                            <button
                                onClick={() => navigate("/finance")}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                View All →
                            </button>
                        </div>

                        <div className="space-y-4">
                            {recentRecords.length > 0 ? (
                                recentRecords.map((record) => (
                                    <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                                record.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                                            }`}>
                                                {record.type === 'income' ? (
                                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">{record.category || 'Uncategorized'}</p>
                                                <p className="text-sm text-gray-500">{formatDate(record.created_at || record.date)}</p>
                                            </div>
                                        </div>
                                        <div className={`font-bold ${
                                            record.type === 'income' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            {record.type === 'income' ? '+' : '-'}{formatCurrency(record.amount)}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    <p className="text-gray-500">No transactions yet</p>
                                    <button
                                        onClick={() => navigate("/add-finance")}
                                        className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                        Add your first transaction
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Category Breakdown */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Category Breakdown</h2>
                            <button
                                onClick={() => navigate("/finance")}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                View Details →
                            </button>
                        </div>

                        <div className="space-y-4">
                            {Object.entries(categoryBreakdown).length > 0 ? (
                                Object.entries(categoryBreakdown).map(([category, amounts]) => (
                                    <div key={category} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium text-gray-700">{category}</span>
                                        </div>
                                        <div className="space-y-1">
                                            {amounts.income > 0 && (
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-green-600">Income</span>
                                                    <span className="text-xs font-medium text-green-600">{formatCurrency(amounts.income)}</span>
                                                </div>
                                            )}
                                            {amounts.expense > 0 && (
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-red-600">Expense</span>
                                                    <span className="text-xs font-medium text-red-600">{formatCurrency(amounts.expense)}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-green-400 to-red-400 h-2 rounded-full"
                                                style={{
                                                    width: `${Math.min(((amounts.income + amounts.expense) / Math.max(stats.totalIncome + stats.totalExpense, 1)) * 100, 100)}%`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                    </svg>
                                    <p className="text-gray-500">No category data available</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <button
                            onClick={() => navigate("/add-finance")}
                            className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            <span>Add Income</span>
                        </button>

                        <button
                            onClick={() => navigate("/add-finance")}
                            className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                            <span>Add Expense</span>
                        </button>

                        <button
                            onClick={() => navigate("/finance")}
                            className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <span>View Reports</span>
                        </button>

                        <button
                            onClick={() => navigate("/finance")}
                            className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Settings</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;