import { useState } from 'react';
import { useCategories } from '../hooks/useCategories';
import { CategoryList } from '../components/CategoryList';
import { CategoryFormDialog } from '../components/CategoryFormDialog';
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog';
import { useToast } from '../../../components/ui/Toast';
import type { Category } from '../../../domain/models/Category';
import { Plus } from 'lucide-react';

export default function CategoriesPage() {
  const { categories, loading, error, createCategory, updateCategory, deleteCategory } = useCategories();
  const { showToast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // ESTADO PARA MODAL DE CONFIRMACIÓN (Eliminar / Cambiar Estado)
  const [confirmConfig, setConfirmConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "danger" | "warning";
    onConfirm: () => Promise<void>;
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "danger",
    onConfirm: async () => {},
  });

  const handleOpenDialog = (category?: Category) => {
    setEditingCategory(category || null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCategory(null);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, data);
        showToast("Categoría actualizada correctamente", "success");
      } else {
        await createCategory(data);
        showToast("Categoría creada exitosamente", "success");
      }
    } catch (error) {
      showToast("Ocurrió un error al guardar", "error");
    }
  };

  const handleDeleteRequest = (id: string) => {
    setConfirmConfig({
      isOpen: true,
      title: "Eliminar Categoría",
      message: "¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer.",
      type: "danger",
      onConfirm: async () => {
        try {
          await deleteCategory(id);
          showToast("Categoría eliminada", "success");
        } catch (error) {
          showToast("No se pudo eliminar la categoría", "error");
        } finally {
          setConfirmConfig((prev) => ({ ...prev, isOpen: false }));
        }
      },
    });
  };

  const handleToggleStatusRequest = (category: Category) => {
    const isDeactivating = category.isActive;
    setConfirmConfig({
      isOpen: true,
      title: isDeactivating ? "Inactivar Categoría" : "Activar Categoría",
      message: isDeactivating
        ? `¿Estás seguro de inactivar "${category.name}"? Los productos no la mostrarán.`
        : `¿Deseas volver a activar "${category.name}"?`,
      type: "warning",
      onConfirm: async () => {
        try {
          await updateCategory(category.id, { isActive: !category.isActive });
          showToast(`Categoría ${isDeactivating ? "inactivada" : "activada"}`, "success");
        } catch (error) {
          showToast("Error al cambiar estado", "error");
        } finally {
          setConfirmConfig((prev) => ({ ...prev, isOpen: false }));
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-slate-100">Categorías | 
            <span className="text-sm font-semibold text-primary bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 px-4 py-2 rounded-full">
             {categories.length}
          </span>

        </h1>
        <button
          onClick={() => handleOpenDialog()}
          className="flex items-center space-x-2 bg-primary text-primary-foreground text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Categoría</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-4 rounded-md border border-red-200 dark:border-red-800 flex items-center">
          {error}
        </div>
      )}

      <CategoryList
        categories={categories}
        loading={loading}
        onEdit={handleOpenDialog}
        onDelete={handleDeleteRequest}
        onToggleStatus={handleToggleStatusRequest}
      />

      <CategoryFormDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        initialData={editingCategory}
      />

      <ConfirmDialog
        isOpen={confirmConfig.isOpen}
        title={confirmConfig.title}
        message={confirmConfig.message}
        type={confirmConfig.type}
        onConfirm={confirmConfig.onConfirm}
        onCancel={() => setConfirmConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
