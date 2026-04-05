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


// CREATE (All authenticated users can add their own records)
router.post(
  "/finance",
  verifyToken,
  createFinance
);


// GET (Admin + Analyst)
router.get(
  "/finance",
  verifyToken,
  authorizeRoles("admin", "analyst"),
  getFinance
);

// PUT (Users can update their own records, admins can update any)
router.put(
  "/finance/:id",
  verifyToken,
  updateFinance
);

// DELETE (Users can delete their own records, admins can delete any)
router.delete(
  "/finance/:id",
  verifyToken,
  deleteFinance
);
export default router;