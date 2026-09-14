import type { CategoryRepository } from '../../domain/repositories/CategoryRepository';
import type { Category, CreateCategoryPayload, UpdateCategoryPayload } from '../../domain/models/Category';
import type { PaginatedResult } from '../../domain/models/PaginatedResult';
import { apiClient } from '../http/apiClient';

// ADAPTADOR (Adapter): Esta clase "implementa" el contrato del puerto de dominio.
// Aquí es donde introducimos Axios. Si mañana pasamos a GraphQL, 
// solo hacemos otra clase "GraphqlCategoryRepository" que implemente la misma interface.
export class ApiCategoryRepository implements CategoryRepository {
  async getAll(params?: { page?: number; limit?: number; search?: string }): Promise<PaginatedResult<Category>> {
    return apiClient.get('/categories', { params });
  }

  async getById(id: string): Promise<Category> {
    return apiClient.get(`/categories/${id}`);
  }

  async create(data: CreateCategoryPayload): Promise<Category> {
    return apiClient.post('/categories', data);
  }

  async update(id: string, data: UpdateCategoryPayload): Promise<Category> {
    return apiClient.patch(`/categories/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return apiClient.delete(`/categories/${id}`);
  }
}
