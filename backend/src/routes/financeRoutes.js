import express from "express";
import {
  createFinance,
  getFinance,
  updateFinance,
  deleteFinance
} from "../controllers/financeController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();


// CREATE (Admin only)
router.post(
  "/finance",
  verifyToken,
  authorizeRoles("admin"),
  createFinance
);


// GET (Admin + Analyst)
router.get(
  "/finance",
  verifyToken,
  authorizeRoles("admin", "analyst"),
  getFinance
);

// PUT

router.put(
  "/finance/:id",
  verifyToken,
  authorizeRoles("admin"),
  updateFinance
);

// DELETE

router.delete(
  "/finance/:id",
  verifyToken,
  authorizeRoles("admin"),
  deleteFinance
);
export default router;