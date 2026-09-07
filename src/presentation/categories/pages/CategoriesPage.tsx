import { useState } from 'react';
import { useCategories } from '../hooks/useCategories';
import { CategoryList } from '../components/CategoryList';
import { CategoryFormDialog } from '../components/CategoryFormDialog';
import type { Category } from '../../../domain/models/Category';
import { Plus } from 'lucide-react';

export default function CategoriesPage() {
  // Utilizamos nuestro Hook. La vista se vuelve muy limpia.
  const { categories, loading, error, createCategory, updateCategory, deleteCategory } = useCategories();
  
  // ESTADO LOCAL: Maneja si el modal está abierto o cerrado, y qué categoría se está editando
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleOpenDialog = (category?: Category) => {
    setEditingCategory(category || null); // Si mandan categoría, se guarda para editar. Si no, nulo para crear nueva.
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCategory(null);
  };

  const handleSubmit = async (data: any) => {
    if (editingCategory) {
      await updateCategory(editingCategory.id, data);
    } else {
      await createCategory(data);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Categorías</h1>
        <button
          onClick={() => handleOpenDialog()}
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Categoría</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md border border-red-200">
          {error}
        </div>
      )}

      {/* Le pasamos (props) los datos y funciones al componente hijo */}
      <CategoryList
        categories={categories}
        loading={loading}
        onEdit={handleOpenDialog}
        onDelete={deleteCategory}
      />

      <CategoryFormDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        initialData={editingCategory}
      />
    </div>
  );
}
