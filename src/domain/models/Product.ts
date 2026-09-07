export interface Product{
    id: string;
    name : string;
    description : string;
    costPrice : number;
    salePrice : number;
    stockMin : number;
    stock : number;
    unit : string;
    image : string;
    isActive : boolean;
    categoryId : string;
    createdAt : string;
    updatedAt : string;
}

export interface CreateProductPayload{
    name : string;
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