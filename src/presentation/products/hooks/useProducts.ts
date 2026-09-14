import { useState, useCallback, useEffect } from 'react';
import { ApiProductRepository } from '../../../infrastructure/repositories/ApiProductRepository';
import { ProductService } from '../../../application/services/ProductService';
import type { Product, CreateProductPayload, UpdateProductPayload } from  '../../../domain/models/Product';
const repository = new ApiProductRepository();
const productService = new ProductService(repository);

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const result = await productService.getAllProducts({ page, limit: 10, search, categoryId });
      setProducts(result.data || []);
      setTotal(result.total || 0);
      setTotalPages(result.totalPages || 1);
      setError(null);
    } catch(err: any) {
      setError(err.response?.data?.message || 'Error fetching products');
    } finally {
      setLoading(false);
    }
  }, [page, search, categoryId]);

  const createProduct = async (data: CreateProductPayload) => {
      try {
          await productService.createProduct(data);
          await fetchProducts();
      } catch (err: any) {
          throw new Error(err.response?.data?.message || 'Error creating product');
      }
  };
  const updateProduct = async (id: string, data: UpdateProductPayload) => {
      try {
          await productService.updateProduct(id, data);
          await fetchProducts();
      } catch (err: any) {
          throw new Error(err.response?.data?.message || 'Error updating product');
      }
  };
  const deleteProduct = async (id: string) => {
      try {
          await productService.deleteProduct(id);
          await fetchProducts();
      } catch (err: any) {
          throw new Error(err.response?.data?.message || 'Error deleting product');
      }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    total,
    totalPages,
    page,
    setPage,
    search,
    setSearch,
    categoryId,
    setCategoryId,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    refresh: fetchProducts,
  };
}
