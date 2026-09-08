import type { Product, CreateProductPayload, UpdateProductPayload } from '../models/Product';

// PUERTO (Port): Esto define un "contrato" o interfaz pura de negocio.
export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: string): Promise<Product>;
  create(product: CreateProductPayload): Promise<Product>;
  update(id: string, product: UpdateProductPayload): Promise<Product>;
  delete(id: string): Promise<void>;
}