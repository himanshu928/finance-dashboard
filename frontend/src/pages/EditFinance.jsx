import { useState, useEffect, useContext } from "react";
import { updateFinanceRecord, getFinanceRecords } from "../api/financeApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

function EditFinance() {

    const { id } = useParams();
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        amount: "",
        type: "",
        date: "",
        description: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const fetchSingleRecord = async () => {

        const res = await getFinanceRecords(token);

        const record = res.data.records.find(
            item => item.id == id
        );

        if (record) {
            setForm(record);
        }
    };

    useEffect(() => {
        fetchSingleRecord();
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        await updateFinanceRecord(id, form, token);

        alert("Record Updated");

        navigate("/finance");
    };

    return (

        <div className="p-10">

            <h1 className="text-2xl font-bold mb-5">
                Edit Finance Record
            </h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-1/3"
            >

                <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    className="border p-2"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="type"
                    value={form.type}
                    className="border p-2"
                    onChange={handleChange}
                />

                <input
                    type="date"
                    name="date"
                    value={form.date?.split("T")[0]}
                    className="border p-2"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="description"
                    value={form.description || ""}
                    className="border p-2"
                    onChange={handleChange}
                />

                <button className="bg-blue-600 text-white p-2 rounded">
                    Update Record
                </button>

            </form>

        </div>
    );
}

export default EditFinance;