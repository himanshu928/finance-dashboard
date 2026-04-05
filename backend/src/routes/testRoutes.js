import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/dashboard",
  verifyToken,
  authorizeRoles("viewer", "analyst", "admin"),
  (req, res) => {

    res.json({
      message: "Dashboard Access Granted",
      user: req.user
    });

  }
);

router.get(
  "/admin",
  verifyToken,
  authorizeRoles("admin"),
  (req, res) => {

    res.json({
      message: "Admin Access Granted"
    });

  }
);

export default router;