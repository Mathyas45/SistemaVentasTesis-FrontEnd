import type { Category, CreateCategoryPayload, UpdateCategoryPayload } from '../models/Category';
import type { PaginatedResult } from '../models/PaginatedResult';

// PUERTO (Port): Esto define un "contrato" o interfaz pura de negocio. 
// El dominio no sabe de Axios, fetch, ni REST. Solo sabe que existe 
// un lugar donde puede guardar o traer categorías.
export interface CategoryRepository {
  getAll(params?: { page?: number; limit?: number; search?: string }): Promise<PaginatedResult<Category>>;
  getById(id: string): Promise<Category>;
  create(category: CreateCategoryPayload): Promise<Category>;
  update(id: string, category: UpdateCategoryPayload): Promise<Category>;
  delete(id: string): Promise<void>;
}
