import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Finance from "./pages/Finance";
import AddFinance from "./pages/AddFinance";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import EditFinance from "./pages/EditFinance";

function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/finance"
          element={
            <ProtectedRoute>
              <Finance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-finance"
          element={
            <ProtectedRoute>
              <AddFinance />
            </ProtectedRoute>
          }
        />
        <Route
    path="/edit-finance/:id"
    element={
        <ProtectedRoute>
            <EditFinance />
        </ProtectedRoute>
    }
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;