import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import fs from "fs";
import useragent from "express-useragent";
import multer from "multer";

import dotenv from 'dotenv'
import { diskStorage, fileFilter } from "./server/middleware/imageStorage";
import { server_start, mongoose_start } from "./server/middleware/colorCLI";

dotenv.config()

const app = express();

// Middleware
app.use(cors());
app.use(useragent.express());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/server/images", express.static(path.join(__dirname, "images")));
app.use(multer({ storage: diskStorage, fileFilter }).single("image"));

const stream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

app.use(morgan("common", { stream }));

// Mongoose
mongoose.connect(process.env.MONGO_URI, () =>
  console.log(mongoose_start("MongoDB Connected"))
);

// Routes
app.use("/", require("./server/routes/user.routes"));
app.use("/", require("./server/routes/service.routes"));

// Production Ready
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname + "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build", "index.html"));
  });
}

// Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(server_start(`Server running on port ${PORT}`))
);
