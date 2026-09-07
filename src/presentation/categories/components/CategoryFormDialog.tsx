import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Category } from '../../../domain/models/Category';
import { categorySchema, type CategoryFormValues } from '../schemas/categorySchema';

interface CategoryFormDialogProps {
  isOpen: boolean; // Controla si el Modal está visible
  onClose: () => void;
  onSubmit: (data: CategoryFormValues) => Promise<void>;
  initialData?: Category | null; // Si tiene datos, es Edición. Si es nulo, es Creación.
}

export function CategoryFormDialog({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: CategoryFormDialogProps) {
  // HOOK DE FORMULARIOS: react-hook-form maneja el estado de los inputs (errores, touched, values) sin renderizar todo a cada tecla.
  const {
    register, // Conecta un input con react-hook-form
    handleSubmit, // Intercepta el onSubmit del form
    reset, // Reinicia los valores del formulario
    formState: { errors, isSubmitting }, // Extrae estado útil (si hay errores o si está cargando)
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema), // Usa Zod para validar
    defaultValues: {
      name: '',
      description: '',
      isActive: true,
    },
  });

  // USE EFFECT: Se ejecuta cada vez que 'initialData' o 'isOpen' cambian.
  // Lo usamos para pre-llenar el formulario cuando le damos al botón de "Editar".
  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description: initialData.description || '',
        isActive: initialData.isActive,
      });
    } else {
      reset({ name: '', description: '', isActive: true });
    }
  }, [initialData, reset, isOpen]);

  const onFormSubmit = async (data: CategoryFormValues) => {
    try {
      await onSubmit(data);
      onClose(); // Cierra el modal al terminar de guardar
    } catch (error) {
      console.error(error);
      alert('Hubo un error al guardar');
    }
  };

  // Si no está abierto, no renderiza nada en la pantalla
  if (!isOpen) return null;

  // PORTAL DE REACT: Renderiza este HTML directamente en la etiqueta <body> (fuera del layout normal).
  // Esto soluciona problemas visuales donde otras barras (como Navbar) se sobreponen por culpa de estilos de contenedores.
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? 'Editar Categoría' : 'Nueva Categoría'}
        </h2>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Nombre</label>
            <input
              {...register('name')}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Descripción</label>
            <textarea
              {...register('description')}
              rows={3}
              className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            {errors.description && (
              <span className="text-xs text-red-500">{errors.description.message}</span>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('isActive')}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label className="ml-2 block text-sm text-slate-700">Activo</label>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
