const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route.js");
const ApiError = require("./app/api-error.js");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Wellcome to contact book application." });
});

// Register routes for contacts
app.use("/api/contacts", contactsRouter);

// Handle 404 errors
app.use((req, res, next) => {
  // Gọi next() để chuyển đến middleware xử lý lỗi
  return next(new ApiError(404, "Resource not found"));
});

// Middleware xử lý lỗi tập trung
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal server error",
  });
});

module.exports = app;
