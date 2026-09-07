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
}

// COMPONENTE FUNCIONAL: 
// Solo se encarga de mostrar la UI (Capa de Presentación). No sabe cómo ni de dónde vienen los datos.
export function CategoryList({ categories, loading, onEdit, onDelete }: CategoryListProps) {
  if (loading) {
    return <div className="text-center py-4">Cargando categorías...</div>;
  }

  if (categories.length === 0) {
    return <div className="text-center py-4 text-slate-500">No hay categorías registradas.</div>;
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-500">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Descripción</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="bg-white border-b hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{category.name}</td>
                <td className="px-6 py-4">{category.description || '-'}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      category.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {category.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => onEdit(category)} // Emitimos el evento hacia el padre
                    className="text-blue-600 hover:text-blue-800 p-1"
                    title="Editar"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('¿Está seguro de eliminar esta categoría?')) {
                        onDelete(category.id); // Emitimos el evento hacia el padre
                      }
                    }}
                    className="text-red-600 hover:text-red-800 p-1"
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
