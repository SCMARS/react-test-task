"use strict";
// backend/src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const recipes_1 = __importDefault(require("./routes/recipes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use(express_1.default.json());
app.use("/recipes", recipes_1.default);
// Root endpoint
app.get("/", (req, res) => {
    res.send("API is running");
});
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});
