import app from "./app.js";
import "./config/db.js";
import cors from "cors";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://finance-dashboard-frontend-p2mb.onrender.com'
    ],
  credentials: true
}));
