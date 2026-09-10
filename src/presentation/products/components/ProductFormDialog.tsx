import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Product } from "../../../domain/models/Product";
import {
  productSchema,
  type ProductFormValues,
} from "../schemas/productSchema";

// IMPORTAMOS LO DE CATEGORÍAS PARA REUTILIZARLO
import { useCategories } from "../../categories/hooks/useCategories";
import { CategoryFormDialog } from "../../categories/components/CategoryFormDialog";
import type { CategoryFormValues } from "../../categories/schemas/categorySchema";

interface ProductFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormValues) => Promise<void>;
  initialData?: Product | null;
}

export function ProductFormDialog({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: ProductFormDialogProps) {
  const { categories, createCategory, refresh: refreshCategories } = useCategories();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
      costPrice: 0,
      salePrice: 0,
      stock: 0,
      stockMin: 0,
      categoryId: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        code: initialData.code,
        description: initialData.description || "",
        salePrice: initialData.salePrice,
        costPrice: initialData.costPrice || 0,
        stock: initialData.stock || 0,
        stockMin: initialData.stockMin || 0,
        categoryId: initialData.categoryId || "",
        isActive: initialData.isActive,
      });
    } else {
      reset({
        name: "",
        code: "",
        description: "",
        costPrice: 0,
        salePrice: 0,
        stock: 0,
        categoryId: "",
        isActive: true,
      });
    }
  }, [initialData, reset, isOpen]);

  const onFormSubmit = async (data: ProductFormValues) => {
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateCategory = async (data: CategoryFormValues) => {
    await createCategory(data);
    await refreshCategories();
    setIsCategoryModalOpen(false);
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg border dark:border-slate-800 w-full max-w-md p-6 my-8">
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-slate-100">
            {initialData ? "Editar Producto" : "Nuevo Producto"}
          </h2>
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
            
            {/* INICIO SELECT DE CATEGORÍAS */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Categoría
                </label>
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(true)}
                  className="text-xs text-primary hover:text-primary/80 font-medium flex items-center bg-primary/10 px-2 py-1 rounded-md transition-colors"
                >
                  + Nueva Categoría
                </button>
              </div>
              <select
                {...register("categoryId")}
                className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Seleccione una categoría...</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <span className="text-xs text-red-500">
                  {errors.categoryId.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Nombre</label>
              <input
                {...register("name")}
                className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Código</label>
              <input
                {...register("code")}
                className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.code && <span className="text-xs text-red-500">{errors.code.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Descripción</label>
              <textarea
                {...register("description")}
                rows={2}
                className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm focus:ring-primary focus:border-primary px-3 py-2 text-sm focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Precio Compra</label>
                <input
                  type="decimal"
                  {...register("costPrice", { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Precio Venta</label>
                <input
                  type="decimal"
                  {...register("salePrice", { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Stock</label>
                <input
                  type="number"
                  {...register("stock", { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Stock de Seguridad</label>
                <input
                  type="number"
                  {...register("stockMin", { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* TOGGLE SWITCH PARA ACTIVO/INACTIVO */}
            <div className="flex items-center pt-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  {...register("isActive")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary text-primary-foreground"></div>
                <span className="ml-3 text-sm font-medium text-slate-700 dark:text-slate-300">Activo (Visible)</span>
              </label>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
              >
                {isSubmitting ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <CategoryFormDialog
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSubmit={handleCreateCategory}
      />
    </>,
    document.body
  );
}
