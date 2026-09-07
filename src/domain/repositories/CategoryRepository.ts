import type { Category, CreateCategoryPayload, UpdateCategoryPayload } from '../models/Category';

// PUERTO (Port): Esto define un "contrato" o interfaz pura de negocio. 
// El dominio no sabe de Axios, fetch, ni REST. Solo sabe que existe 
// un lugar donde puede guardar o traer categorías.
export interface CategoryRepository {
  getAll(): Promise<Category[]>;
  getById(id: string): Promise<Category>;
  create(category: CreateCategoryPayload): Promise<Category>;
  update(id: string, category: UpdateCategoryPayload): Promise<Category>;
  delete(id: string): Promise<void>;
}
