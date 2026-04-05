import { useEffect, useState, useContext, use } from "react";
import { getFinanceRecords, deleteFinanceRecord } from "../api/financeApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Finance() {
  const { token } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      const res = await getFinanceRecords(token, type, page);
      console.log(res.data);
      setRecords(res.data.records);
      const records = res.data.records;

      let income = 0;
      let expense = 0;

      records.forEach((item) => {
        if (item.type === "income") {
          income += Number(item.amount);
        } else {
          expense += Number(item.amount);
        }
      });

      setTotalIncome(income);
      setTotalExpense(expense);
      setBalance(income - expense);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFinanceRecord(id, token);

      alert("Record Deleted");

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [type, page]);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Finance Records</h1>
      
      <div className="mb-4 justify-end flex">
        <input
    type="text"
    placeholder="Search description..."
    className="border p-2 mr-2"
    onChange={(e) => setSearch(e.target.value)}
/>
        <select
          className="border p-2"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <button
          onClick={fetchData}
          className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
        >
          Filter
        </button>
      </div>

      <div className="gap-2 p-2 grid grid-cols-1 md:grid-cols-3">

    <div className="bg-green-500 text-white p-5 rounded shadow">
        <h2 className="text-lg">Total Income</h2>
        <p className="text-2xl font-bold">₹ {totalIncome}</p>
    </div>

    <div className="bg-red-500 text-white p-5 rounded shadow">
        <h2 className="text-lg">Total Expense</h2>
        <p className="text-2xl font-bold">₹ {totalExpense}</p>
    </div>

    <div className="bg-blue-500 text-white p-5 rounded shadow">
        <h2 className="text-lg">Balance</h2>
        <p className="text-2xl font-bold">₹ {balance}</p>
    </div>

</div>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Amount</th>
            <th className="p-2">Type</th>
            <th className="p-2">Date</th>
            <th className="p-2">Category</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(records) &&
            records.map((item) => (
              <tr key={item.id} className="text-center border">
                <td className="p-2">₹{item.amount}</td>

                <td className="p-2">{item.type}</td>

                <td className="p-2">{item.date}</td>

                <td className="p-2">{item.category || "No Category"}</td>

                <td className="p-2">
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => navigate(`/edit-finance/${item.id}`)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex justify-center gap-4 mt-5">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>

        <span className="font-bold">Page {page}</span>

        <button
          onClick={() => setPage(page + 1)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Finance;
