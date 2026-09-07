import type { ProductRepository } from "@/domain/repositories/ProductRepository";
import type { CreateProductPayload, UpdateProductPayload } from "@/domain/models/Product";
export class ProductService {

    constructor(private readonly repository: ProductRepository) {}

    async getAllProducts() {
        return this.repository.getAll();
    }

    async getProductById(id: string) {
        return this.repository.getById(id);
    }

    async createProduct(product: CreateProductPayload) {
        return this.repository.create(product);
    }

    async updateProduct(id: string, product: UpdateProductPayload) {
        return this.repository.update(id, product);
    }

    async deleteProduct(id: string) {
        return this.repository.delete(id);
    }
}