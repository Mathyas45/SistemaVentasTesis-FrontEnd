import { useState, useCallback, useEffect } from 'react';
import { ApiProductRepository } from '../../../infrastructure/repositories/ApiProductRepository';
import { ProductService } from '../../../application/services/ProductService';
import type { Product, CreateProductPayload, UpdateProductPayload } from  '../../../domain/models/Product';
const repository = new ApiProductRepository();
const productService = new ProductService(repository);

export function useProducts() {
  //primero declaramos los estados que vamos a usar en el hook
  const [products, setProducts] = useState<Product[]>([]);//products es un arreglo de productos, setProducts es una funcion que nos permite actualizar el estado de products
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try{
      const data = await productService.getAllProducts();
      setProducts(data);
      setError(null);
    }catch(err: any){
      setError(err.response?.data?.message || 'Error fetching products');
    }finally{
      setLoading(false);
    }
    }, []);

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
  }, [fetchProducts]);//use effect es un hook que nos permite ejecutar una funcion cuando el componente se monta o cuando una variable cambia, en este caso queremos que se ejecute fetchProducts cuando el componente se monta

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    refresh: fetchProducts,
  };//retornamos un objeto con los estados y las funciones que vamos a usar en el componente que use este hook
}
