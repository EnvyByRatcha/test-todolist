import db from "../db/db.js";
import { validStatus, validPriority } from "../constants/todolist.js";
import { validateId } from "../utils/validator.js";
import { mapError } from "../utils/error.js";

const getAllToDoLists = async (req, res, next) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    status = "all",
    priority = "all",
  } = req.query;

  const pageNum = parseInt(page) > 0 ? parseInt(page) : 1;
  const pageSize = parseInt(limit) > 0 ? parseInt(limit) : 10;
  const offset = (pageNum - 1) * pageSize;

  try {
    const checkSearch = search.trim();
    const params = [];

    let sql = "WHERE delete_at IS NULL";

    if (checkSearch && checkSearch !== "") {
      sql += " AND title LIKE ?";
      const searchTerm = `%${checkSearch}%`;
      params.push(searchTerm);
    }

    if (status !== "all") {
      sql += " AND status = ?";
      params.push(status);
    }

    if (priority !== "all") {
      sql += " AND priority = ?";
      params.push(priority);
    }

    params.push(pageSize, offset);

    const [rows] = await db.query(
      `
        SELECT SQL_CALC_FOUND_ROWS *
        FROM todolists
        ${sql}
        ORDER BY id DESC
        LIMIT ? OFFSET ?
      `,
      params
    );

    const [[{ "FOUND_ROWS()": total }]] = await db.query("SELECT FOUND_ROWS()");

    res.json({
      success: true,
      data: {
        todolists: rows,
      },
      pagination: {
        total,
        page: pageNum,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (err) {
    mapError(err, 500, "Internal Server Error", next);
  }
};

const getToDoList = async (req, res, next) => {
  const { id } = req.params;

  const checkId = validateId(id);

  if (!checkId.valid) {
    return res.status(400).json({
      success: false,
      message: checkId.message,
    });
  }

  try {
    const query = `
  SELECT * FROM todolists 
  WHERE id=?
  `;

    const [rows] = await db.execute(query, [checkId.value]);
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Todolist not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: { todolist: rows[0] },
    });
  } catch (err) {
    mapError(err, 500, "Internal Server Error", next);
  }
};

const createToDoList = async (req, res, next) => {
  const { status = "pending", priority = "medium" } = req.body;

  const title = req.body.title?.trim() || "";
  const due = req.body.due?.trim() || null;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Title is required and cannot be empty",
    });
  }

  if (!validPriority.includes(priority)) {
    return res.status(400).json({
      success: false,
      message: `Priority must be one of: ${validPriority.join()}`,
    });
  }

  if (!validStatus.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Priority must be one of: ${validStatus.join()}`,
    });
  }

  if (due) {
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!isoDateRegex.test(due)) {
      return res.status(400).json({
        success: false,
        message: "Due date must be in YYYY-MM-DD format",
      });
    }

    const dateObj = new Date(due);
    const isValid = !isNaN(dateObj.getTime());
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Due date is invalid",
      });
    }
  }

  try {
    const query = `
  INSERT INTO todolists (title,status,priority,due) 
  VALUES (?,?,?,?)
  `;

    const params = [title, status, priority, due];

    const [result] = await db.execute(query, params);

    if (result.affectedRows === 0) {
      return res.status(500).json({
        success: false,
        message: "Failed to create todolist",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Todolist created successfully",
      data: {
        todolist: {
          title,
          status,
          priority,
          due,
        },
      },
    });
  } catch (err) {
    mapError(err, 500, "Internal Server Error", next);
  }
};

const updateToDoLists = async (req, res, next) => {
  const { id } = req.params;
  const { status = "pending", priority = "medium" } = req.body;

  const title = req.body.title?.trim() || "";
  const due = req.body.due?.trim() || null;

  const checkId = validateId(id);

  if (!checkId.valid) {
    return res.status(400).json({
      success: false,
      message: checkId.message,
    });
  }

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Title is required and cannot be empty",
    });
  }

  if (!validPriority.includes(priority)) {
    return res.status(400).json({
      success: false,
      message: `Priority must be one of: ${validPriority.join()}`,
    });
  }

  if (!validStatus.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Priority must be one of: ${validStatus.join()}`,
    });
  }

  if (due) {
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!isoDateRegex.test(due)) {
      return res.status(400).json({
        success: false,
        message: "Due date must be in YYYY-MM-DD format",
      });
    }

    const dateObj = new Date(due);
    const isValid = !isNaN(dateObj.getTime());
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Due date is invalid",
      });
    }
  }

  try {
    const query = `
      UPDATE todolists
      SET title = ?,
          status = ?,
          priority = ?,
          due = ?
      WHERE id = ?
    `;

    const params = [title, status, priority, due, checkId.value];
    const [result] = await db.execute(query, params);

    if (result.affectedRows === 0) {
      return res.status(500).json({
        success: false,
        message: "Failed to create todolist",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Todolist updated successfully",
      data: {
        todolist: {
          title,
          status,
          priority,
          due,
        },
      },
    });
  } catch (err) {
    mapError(err, 500, "Internal Server Error", next);
  }
};

const deleteToDoLists = async (req, res, next) => {
  const { id } = req.params;

  const checkId = validateId(id);
  if (!checkId.valid) {
    return res.status(400).json({
      success: false,
      message: checkId.message,
    });
  }

  try {
    const query = "UPDATE todolists SET delete_at = NOW() WHERE id = ?";
    const [result] = await db.execute(query, [checkId.value]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Todolist not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todolist deleted successfully",
    });
  } catch (err) {
    mapError(err, 500, "Internal Server Error", next);
  }
};

export default {
  getAllToDoLists,
  getToDoList,
  createToDoList,
  updateToDoLists,
  deleteToDoLists,
};
