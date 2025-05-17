"use strict";
// backend/src/routes/recipes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
const API_BASE = "https://www.themealdb.com/api/json/v1/1";
// GET /recipes?s=Arrabiata&i=chicken_breast&c=Seafood&a=Canadian
router.get("/", async (req, res) => {
    try {
        const { s, i, c, a } = req.query;
        let apiUrl = "";
        if (s) {
            apiUrl = `${API_BASE}/search.php?s=${s}`;
        }
        else if (i) {
            apiUrl = `${API_BASE}/filter.php?i=${i}`;
        }
        else if (c) {
            apiUrl = `${API_BASE}/filter.php?c=${c}`;
        }
        else if (a) {
            apiUrl = `${API_BASE}/filter.php?a=${a}`;
        }
        else {
            apiUrl = `${API_BASE}/search.php?s=`;
        }
        const response = await axios_1.default.get(apiUrl);
        res.json(response.data);
    }
    catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ error: "Failed to fetch recipes" });
    }
});
// GET /recipes/:id
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const apiUrl = `${API_BASE}/lookup.php?i=${id}`;
        const response = await axios_1.default.get(apiUrl);
        res.json(response.data);
    }
    catch (error) {
        console.error("Error fetching recipe details:", error);
        res.status(500).json({ error: "Failed to fetch recipe details" });
    }
});
exports.default = router;
