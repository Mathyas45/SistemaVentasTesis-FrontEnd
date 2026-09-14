import type { Product, CreateProductPayload, UpdateProductPayload } from '../models/Product';
import type { PaginatedResult } from '../models/PaginatedResult';

export interface ProductRepository {
  getAll(params?: { page?: number; limit?: number; search?: string; categoryId?: string }): Promise<PaginatedResult<Product>>;
  getById(id: string): Promise<Product>;
  create(product: CreateProductPayload): Promise<Product>;
  update(id: string, product: UpdateProductPayload): Promise<Product>;
  delete(id: string): Promise<void>;
}