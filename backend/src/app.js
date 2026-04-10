import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import financeRoutes from "./routes/financeRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Finance Dashboard API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api", testRoutes);
app.use("/api/finance", financeRoutes);

export default app;