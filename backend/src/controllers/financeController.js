import {
  createFinanceRecord,
  getFinanceRecords,
  updateFinanceRecord,
  deleteFinanceRecord
} from "../models/financeModel.js";

// CREATE FINANCE
export const createFinance = async (req, res) => {
  try {

    const {
      amount,
      type,
      category,
      date,
      notes
    } = req.body;

    if (!amount || !type) {
      return res.status(400).json({
        message: "Amount and type required"
      });
    }

    const finance = await createFinanceRecord(
      amount,
      type,
      category,
      date,
      notes,
      req.user.id
    );

    res.status(201).json({
      message: "Finance record created",
      finance
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// GET FINANCE
export const getFinance = async (req, res) => {
  try {

    const { type, category, date } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const records = await getFinanceRecords(
      type,
      category,
      date,
      page,
      limit
    );

    res.json({
      page,
      limit,
      total: records.length,
      records
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Update FInance

export const updateFinance = async (req, res) => {
  try {

    const id = req.params.id;

    const {
      amount,
      type,
      category,
      date,
      notes
    } = req.body;

    const updated = await updateFinanceRecord(
      id,
      amount,
      type,
      category,
      date,
      notes
    );

    if (!updated) {
      return res.status(404).json({
        message: "Finance record not found"
      });
    }

    res.json({
      message: "Finance updated",
      updated
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


export const deleteFinance = async (req, res) => {
  try {

    const id = req.params.id;

    const deleted = await deleteFinanceRecord(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Finance record not found"
      });
    }

    res.json({
      message: "Finance deleted successfully",
      deleted
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};