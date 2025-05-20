// backend/src/routes/recipes.ts

import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();
const API_BASE = "https://www.themealdb.com/api/json/v1/1";

router.get("/", async (req: Request, res: Response) => {
  try {
    const { s, i, c, a } = req.query;

    let apiUrl = "";

    if (s) {
      apiUrl = `${API_BASE}/search.php?s=${s}`;
    } else if (i) {
      apiUrl = `${API_BASE}/filter.php?i=${i}`;
    } else if (c) {
      apiUrl = `${API_BASE}/filter.php?c=${c}`;
    } else if (a) {
      apiUrl = `${API_BASE}/filter.php?a=${a}`;
    } else {
      apiUrl = `${API_BASE}/search.php?s=`;
    }

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

// GET /recipes/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const apiUrl = `${API_BASE}/lookup.php?i=${id}`;
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    res.status(500).json({ error: "Failed to fetch recipe details" });
  }
});

export default router;
