import { Edit2, Trash2 } from 'lucide-react';
import type { Product } from '../../../domain/models/Product';

// PROPS (Propiedades): 
// Es la forma en que los componentes React reciben datos de su "padre" (la página).
// Aquí definimos qué espera recibir este componente para poder renderizarse.
interface ProductListProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onToggleStatus?: (product: Product) => void;
}


// COMPONENTE FUNCIONAL: 
// Solo se encarga de mostrar la UI (Capa de Presentación). No sabe cómo ni de dónde vienen los datos.
export function ProductList({ products, loading, onEdit, onDelete, onToggleStatus }: ProductListProps) {
  if (loading) {
    return <div className="text-center py-4">Cargando productos...</div>;
  }
 
     return (
    <div className="bg-white dark:bg-slate-900 rounded-lg border dark:border-slate-800 shadow-sm transition-colors">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
          <thead className="text-xs text-slate-700 dark:text-slate-300 uppercase bg-slate-50 dark:bg-slate-800/50 border-b dark:border-slate-800">
            <tr>
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Código</th>
                <th className="px-6 py-3">Precio.V</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Categoría</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3 text-right">Acciones</th>
            </tr>
          </thead>
        <tbody> 
            {products.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-slate-500">
                  No hay productos registrados.
                </td>
              </tr>
            )}
            {products.map((product) => (
              <tr key={product.id} className="bg-white dark:bg-slate-900 border-b dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{product.name}</td>
                <td className="px-6 py-4">{product.code || '-'}</td>
                <td className="px-6 py-4">{product.salePrice}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">{product.category?.name || '-'}</td>
                <td className="px-6 py-4">
                 <button
                    onClick={() => onToggleStatus && onToggleStatus(product)}
                    className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors border ${
                      product.isActive 
                        ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                    title="Click para cambiar estado"
                  >
                    {product.isActive ? 'Activo' : 'Inactivo'}
                  </button>
                 </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-1"
                    title="Editar"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('¿Está seguro de eliminar este producto?')) {
                        onDelete(product.id);
                      }
                    }}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-1"
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

