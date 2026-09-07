import type { CategoryRepository } from '../../domain/repositories/CategoryRepository';
import type { CreateCategoryPayload, UpdateCategoryPayload } from '../../domain/models/Category';

// CASO DE USO / SERVICIO DE APLICACIÓN: 
// Orquesta las reglas de negocio usando el repositorio (abstracción).
// No sabe si los datos vienen de Axios, LocalStorage, etc. Solo usa la interface.
export class CategoryService {
  constructor(private readonly repository: CategoryRepository) {}

  async getAllCategories() {
    return this.repository.getAll();
  }

  async getCategory(id: string) {
    return this.repository.getById(id);
  }

  async createCategory(data: CreateCategoryPayload) {
    // Aquí podríamos agregar lógica pura de negocio, ej. limpiar strings, validar con lógica de frontend.
    return this.repository.create(data);
  }

  async updateCategory(id: string, data: UpdateCategoryPayload) {
    return this.repository.update(id, data);
  }

  async deleteCategory(id: string) {
    return this.repository.delete(id);
  }
}
