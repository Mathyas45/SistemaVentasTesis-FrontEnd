import type { Category } from '../../../domain/models/Category';
import { Edit2, Trash2 } from 'lucide-react';

// PROPS (Propiedades): 
// Es la forma en que los componentes React reciben datos de su "padre" (la página).
// Aquí definimos qué espera recibir este componente para poder renderizarse.
interface CategoryListProps {
  categories: Category[];
  loading: boolean;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
  onToggleStatus?: (category: Category) => void;// Función opcional para cambiar el estado de la categoría
}

// COMPONENTE FUNCIONAL: 
// Solo se encarga de mostrar la UI (Capa de Presentación). No sabe cómo ni de dónde vienen los datos.
export function CategoryList({ categories, loading, onEdit, onDelete, onToggleStatus }: CategoryListProps) {
  if (loading) {
    return <div className="text-center py-4">Cargando categorías...</div>;
  }

  if (categories.length === 0) {
    return <div className="text-center py-4 text-slate-500">No hay categorías registradas.</div>;
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border dark:border-slate-800 shadow-sm transition-colors">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
          <thead className="text-xs text-primary-foreground uppercase bg-primary border-b border-primary/20">
            <tr>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Descripción</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="bg-white dark:bg-slate-900 border-b dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{category.name}</td>
                <td className="px-6 py-4">{category.description || '-'}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onToggleStatus && onToggleStatus(category)}
                    className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors border ${
                      category.isActive 
                        ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                    title="Click para cambiar estado"
                  >
                    {category.isActive ? 'Activo' : 'Inactivo'}
                  </button>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => onEdit(category)} // Emitimos el evento hacia el padre
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-1 transition-colors"
                    title="Editar"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(category.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-1 transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

