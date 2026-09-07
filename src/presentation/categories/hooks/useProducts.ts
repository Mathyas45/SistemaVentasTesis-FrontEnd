import { useState, useCallback, useEffect } from 'react';
import { ApiProductRepository } from '../../../infrastructure/repositories/ApiProductRepository';
import { ProductService } from '../../../application/services/ProductService';
import type { Product, CreateProductPayload, UpdateProductPayload } from '../../../domain/models/Product';


const repository = new ApiProductRepository();
const productService = new ProductService(repository);

export function useProducts() {
    //primero declaramos los estados que vamos a usar en el hook
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);