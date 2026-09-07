import { z } from 'zod';

// ZOD SCHEMA: Reglas de validación para el formulario en la UI.
export const categorySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100, 'Máximo 100 caracteres'),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
