import { useState, useContext } from "react";
import { addFinanceRecord } from "../api/financeApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AddFinance() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    amount: "",
    type: "",
    date: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addFinanceRecord(form, token);

      alert("Finance Record Added");

      navigate("/finance");
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Error adding record");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Add Finance Record</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-1/3">
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          className="border p-2"
          onChange={handleChange}
        />

        <select
          name="type"
          className="border p-2"
          onChange={handleChange}
        >
          <option value="">Select Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="date"
          name="date"
          className="border p-2"
        
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category (e.g. Salary, Food, etc.)"
          className="border p-2"
          onChange={handleChange}
        />

        <button className="bg-blue-600 text-white p-2 rounded">
          Add Record
        </button>
      </form>
    </div>
  );
}

export default AddFinance;
