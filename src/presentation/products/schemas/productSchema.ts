import { z } from "zod";

// ZOD SCHEMA: Reglas de validación para el formulario en la UI.
export const productSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(100, "Máximo 100 caracteres"),
  code: z
    .string()
    .min(1, "El código es requerido")
    .max(100, "Máximo 100 caracteres"),
  description: z.string().optional(),
  costPrice: z.number().optional(),
  salePrice: z.number().min(0, "El precio de venta es requerido"),
  stockMin: z.number().optional(),
  stock: z.number().optional(),
  unit: z.string().optional(),
  image: z.string().optional(),
  categoryId: z.string().min(1, "La categoría es requerida"),
  isActive: z.boolean().default(true),
});

export type ProductFormValues = z.infer<typeof productSchema>;
