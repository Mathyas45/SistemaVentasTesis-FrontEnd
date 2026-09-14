import { useState, useCallback, useEffect } from 'react';
import { CategoryService } from '../../../application/services/CategoryService';
import { ApiCategoryRepository } from '../../../infrastructure/repositories/ApiCategoryRepository';
import type { Category, CreateCategoryPayload, UpdateCategoryPayload } from '../../../domain/models/Category';

const repository = new ApiCategoryRepository();
const categoryService = new CategoryService(repository);

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const result = await categoryService.getAllCategories({ page, limit: 10, search });
      // axios extrae la 'data' de la respuesta, así que 'result' es nuestro PaginatedResult
      setCategories(result.data || []);
      setTotal(result.total || 0);
      setTotalPages(result.totalPages || 1);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error fetching categories');
    } finally {
      setLoading(false);
    }
  }, [page, search]);

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
    total,
    totalPages,
    page,
    setPage,
    search,
    setSearch,
    loading,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    refresh: fetchCategories,
  };
}
