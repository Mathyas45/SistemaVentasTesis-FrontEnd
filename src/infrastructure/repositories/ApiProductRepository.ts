import type { ProductRepository } from "@/domain/repositories/ProductRepository";
import type { Product, CreateProductPayload, UpdateProductPayload } from "@/domain/models/Product";
import type { PaginatedResult } from "@/domain/models/PaginatedResult";
import { apiClient } from "@/infrastructure/http/apiClient";

// ADAPTADOR (Adapter): Esta clase "implementa" el contrato del puerto de dominio.
// Aquí es donde introducimos Axios. Si mañana pasamos a GraphQL, 
// solo hacemos otra clase "GraphqlCategoryRepository" que implemente la misma interface.
export class ApiProductRepository implements ProductRepository {
  async getAll(params?: { page?: number; limit?: number; search?: string; categoryId?: string }): Promise<PaginatedResult<Product>> {
    return apiClient.get('/products', { params });
  }

  async getById(id: string): Promise<Product> {
    return apiClient.get(`/products/${id}`);
  }

  async create(product: CreateProductPayload): Promise<Product> {
    return apiClient.post('/products', product);
  }

  async update(id: string, product: UpdateProductPayload): Promise<Product> {
    return apiClient.patch(`/products/${id}`, product);
  }

  async delete(id: string): Promise<void> {
    return apiClient.delete(`/products/${id}`);
  }
}