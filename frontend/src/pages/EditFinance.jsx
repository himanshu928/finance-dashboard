import { useState, useEffect, useContext } from "react";
import { updateFinanceRecord, getFinanceRecords } from "../api/financeApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function EditFinance() {
    const { id } = useParams();
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [form, setForm] = useState({
        amount: "",
        type: "",
        date: "",
        category: "",
        notes: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const fetchSingleRecord = async () => {
        try {
            setLoading(true);
            const res = await getFinanceRecords(token, "", 1, "");
            const record = res.data.records.find(
                item => item.id == id
            );

            if (record) {
                setForm({
                    amount: record.amount,
                    type: record.type,
                    date: record.date ? new Date(record.date).toISOString().split('T')[0] : "",
                    category: record.category || "",
                    notes: record.notes || ""
                });
            } else {
                alert("Record not found");
                navigate("/finance");
            }
        } catch (error) {
            console.log("Error fetching record:", error);
            alert("Error loading record");
            navigate("/finance");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        fetchSingleRecord();
    }, [token, id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.amount || !form.type) {
            alert("Amount and type are required");
            return;
        }

        try {
            setSubmitting(true);
            await updateFinanceRecord(id, form, token);
            alert("Record Updated Successfully!");
            navigate("/finance");
        } catch (error) {
            console.log("Error updating record:", error);
            alert(error.response?.data?.message || "Error updating record");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <Navbar />
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />

            <div className="container mx-auto px-6 py-8">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Edit Finance Record</h1>
                        <p className="text-gray-600">Update your financial record details</p>
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Amount */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Amount *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-gray-500">₹</span>
                                    <input
                                        type="number"
                                        name="amount"
                                        placeholder="0.00"
                                        value={form.amount}
                                        onChange={handleChange}
                                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Type *
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition duration-200 ${
                                        form.type === 'income'
                                            ? 'border-green-500 bg-green-50 text-green-700'
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}>
                                        <input
                                            type="radio"
                                            name="type"
                                            value="income"
                                            checked={form.type === 'income'}
                                            onChange={handleChange}
                                            className="mr-3"
                                            required
                                        />
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                            </svg>
                                            <span className="font-medium">Income</span>
                                        </div>
                                    </label>

                                    <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition duration-200 ${
                                        form.type === 'expense'
                                            ? 'border-red-500 bg-red-50 text-red-700'
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}>
                                        <input
                                            type="radio"
                                            name="type"
                                            value="expense"
                                            checked={form.type === 'expense'}
                                            onChange={handleChange}
                                            className="mr-3"
                                            required
                                        />
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                                            </svg>
                                            <span className="font-medium">Expense</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                >
                                    <option value="">Select Category</option>
                                    <option value="Salary">Salary</option>
                                    <option value="Freelance">Freelance</option>
                                    <option value="Business">Business</option>
                                    <option value="Investment">Investment</option>
                                    <option value="Food">Food</option>
                                    <option value="Transportation">Transportation</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Shopping">Shopping</option>
                                    <option value="Bills">Bills</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Education">Education</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Notes
                                </label>
                                <textarea
                                    name="notes"
                                    placeholder="Add any additional notes..."
                                    value={form.notes}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => navigate("/finance")}
                                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition duration-200 font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg transition duration-200 font-medium flex items-center justify-center"
                                >
                                    {submitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Update Record
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditFinance;