import express from "express";
import cors from "cors";
import eventRoutes from "./routes/eventRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import speakerRoutes from "./routes/speakerRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/events", eventRoutes);
app.use("/categories", categoryRoutes);
app.use("/speakers", speakerRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
