import { useState, useCallback, useEffect } from 'react';
import { CategoryService } from '../../../application/services/CategoryService';
import { ApiCategoryRepository } from '../../../infrastructure/repositories/ApiCategoryRepository';
import type { Category, CreateCategoryPayload, UpdateCategoryPayload } from '../../../domain/models/Category';

// Instanciamos nuestro servicio inyectándole el adaptador de Axios.
// (En una app hexagonal más grande se usa un contenedor de Inyección de Dependencias como Inversify)
const repository = new ApiCategoryRepository();
const categoryService = new CategoryService(repository);

// CUSTOM HOOK DE PRESENTACIÓN: 
// Conecta el estado de React con la capa de Aplicación/Casos de Uso.
export function useCategories() {
  //primero declaramos los estados que vamos a usar en el hook, queremos decir que vamos a tener un estado de categorias, un estado de loading y un estado de error
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error fetching categories');
    } finally {
      setLoading(false);
    }
  }, []);

  const createCategory = async (data: CreateCategoryPayload) => {
    try {
      await categoryService.createCategory(data);
      await fetchCategories();
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Error creating category');
    }
  };

  const updateCategory = async (id: string, data: UpdateCategoryPayload) => {
    try {
      await categoryService.updateCategory(id, data);
      await fetchCategories();
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Error updating category');
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await categoryService.deleteCategory(id);
      await fetchCategories();
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Error deleting category');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    refresh: fetchCategories,
  };
}
