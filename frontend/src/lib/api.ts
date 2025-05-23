import { RecipeResponse, RecipeListResponse } from '@/types/recipe';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000';

export async function fetchRecipes(params?: {
  s?: string;
  i?: string;
  c?: string;
  a?: string;
}): Promise<RecipeListResponse> {
  const searchParams = new URLSearchParams();
  if (params?.s) searchParams.append('s', params.s);
  if (params?.i) searchParams.append('i', params.i);
  if (params?.c) searchParams.append('c', params.c);
  if (params?.a) searchParams.append('a', params.a);

  const response = await fetch(`${API_BASE_URL}/recipes?${searchParams.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }
  return response.json();
}

export async function fetchRecipeById(id: string): Promise<RecipeResponse> {
  const response = await fetch(`${API_BASE_URL}/recipes/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch recipe details');
  }
  return response.json();
} 