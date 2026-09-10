import type { Category } from './Category';

export interface Product {
    id: string;
    code: string;
    name: string;
    description: string;
    costPrice: number;
    salePrice: number;
    stockMin: number;
    stock: number;
    unit: string;
    image: string;
    isActive: boolean;
    categoryId: string;
    category?: Category; // <--- Traído desde el Backend (LEFT JOIN)
    createdAt: string;
    updatedAt: string;
}

export interface CreateProductPayload{
    name : string;
    code : string;
    description? : string;
    costPrice? : number;
    salePrice : number;
    stockMin? : number;
    stock? : number;
    unit? : string;
    image? : string;
    isActive? : boolean;
    categoryId : string;
}

export interface UpdateProductPayload extends Partial<CreateProductPayload>{}