require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const db = require("./models");
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
const bookmarkRoutes = require("./routes/bookmarks");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(errorHandler);

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/bookmarks", bookmarkRoutes);

db.sequelize.sync().then(() => {
  console.log("Database connected");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});