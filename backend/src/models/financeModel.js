import pool from "../config/db.js";

export const createFinanceRecord = async (
  amount,
  type,
  category,
  date,
  notes,
  user_id
) => {
  const result = await pool.query(
    `INSERT INTO finance_records
     (amount, type, category, date, notes, user_id)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [amount, type, category, date, notes, user_id]
  );

  return result.rows[0];
};

export const getFinanceRecords = async (
  type,
  category,
  date,
  page,
  limit
) => {

  let query = `SELECT * FROM finance_records WHERE 1=1`;
  let values = [];

  if (type) {
    values.push(type);
    query += ` AND type = $${values.length}`;
  }

  if (category) {
    values.push(category);
    query += ` AND category = $${values.length}`;
  }

  if (date) {
    values.push(date);
    query += ` AND date = $${values.length}`;
  }

  const offset = (page - 1) * limit;

  values.push(limit);
  query += ` LIMIT $${values.length}`;

  values.push(offset);
  query += ` OFFSET $${values.length}`;

  const result = await pool.query(query, values);

  return result.rows;
};

export const updateFinanceRecord = async (
  id,
  amount,
  type,
  category,
  date,
  notes
) => {

  const result = await pool.query(
    `UPDATE finance_records
     SET amount = $1,
         type = $2,
         category = $3,
         date = $4,
         notes = $5
     WHERE id = $6
     RETURNING *`,
    [amount, type, category, date, notes, id]
  );

  return result.rows[0];
};


export const deleteFinanceRecord = async (id) => {

  const result = await pool.query(
    `DELETE FROM finance_records
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};