const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const BlogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const commentRouter = require("./controllers/comment");

const {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
} = require("./utils/middleware");
const loginRouter = require("./controllers/login");

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => logger.info("db connected"))
  .catch((error) =>
    logger.error("error connection to MongoDB:", error.message),
  );

const app = express();
app.use(express.json());
app.use(express.static("dist"));
app.use(tokenExtractor);
app.use(userExtractor);

app.use("/api/blogs", BlogRouter);
app.use("/api/blogs/:id/comment", commentRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

// if (config.NODE_ENV === "test") {
const testRouter = require("./controllers/test");
app.use("/api/testing", testRouter);
// }
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
