import { Router } from 'express';
import axios from 'axios';

const router = Router();
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Get all recipes or filtered recipes
router.get('/', async (req, res) => {
  try {
    const { search, ingredient, country, category } = req.query;
    let url = `${BASE_URL}/search.php?s=`;

    if (ingredient) {
      url = `${BASE_URL}/filter.php?i=${ingredient}`;
    } else if (country) {
      url = `${BASE_URL}/filter.php?a=${country}`;
    } else if (category) {
      url = `${BASE_URL}/filter.php?c=${category}`;
    } else if (search) {
      url = `${BASE_URL}/search.php?s=${search}`;
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

// Get recipe details by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    res.status(500).json({ error: 'Failed to fetch recipe details' });
  }
});

export const recipeRoutes = router; 