import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import recipeRoutes from "./routes/recipes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/recipes", recipeRoutes);

// Root endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
