import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const { logout, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    if (!token) return null;

    return (
        <div className="bg-blue-600 text-white p-4 flex justify-between">

            <h1 className="font-bold text-lg">
                Finance Dashboard
            </h1>

            <div className="flex gap-4">

                <button
                    onClick={() => navigate("/dashboard")}
                >
                    Dashboard
                </button>

                <button
                    onClick={() => navigate("/finance")}
                >
                    Finance
                </button>

                <button
                    onClick={() => navigate("/add-finance")}
                >
                    Add Record
                </button>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-3 rounded"
                >
                    Logout
                </button>

            </div>
        </div>
    );
}

export default Navbar;