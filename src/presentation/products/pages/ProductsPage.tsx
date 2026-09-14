import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../../categories/hooks/useCategories";
import { ProductList } from "../components/ProductList";
import { ProductFormDialog } from "../components/ProductFormDialog";
import { Pagination } from "../../../components/ui/Pagination";
import type { Product } from "../../../domain/models/Product";
import { Plus, Search } from "lucide-react";
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog';
import { useToast } from '../../../components/ui/Toast';

export default function ProductsPage() {
  const {
    products,
    total,
    totalPages,
    page,
    setPage,
    search,
    setSearch,
    categoryId,
    setCategoryId,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const { categories } = useCategories();
  const [localSearch, setLocalSearch] = useState("");

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
  
  const { showToast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleOpenDialog = (product?: Product) => {
    setEditingProduct(product || null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (data: any) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, data);
    } else {
      await createProduct(data);
    }
  };

  const handleToggleStatusRequest = (product: Product) => {
      const isDeactivating = product.isActive;
      setConfirmConfig({
        isOpen: true,
        title: isDeactivating ? "Inactivar Producto" : "Activar Producto",
        message: isDeactivating
          ? "¿Estás seguro de inactivar '" + product.name + "'? Los productos no la mostrarán."
          : "¿Deseas volver a activar '" + product.name + "'?",
        type: "warning",
        onConfirm: async () => {
          try {
            await updateProduct(product.id, { isActive: !product.isActive });
            showToast("Producto actualizado", "success");
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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
          Productos |
          <span className="text-sm font-semibold text-primary bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 px-3 py-1 rounded-full">
            {total}
          </span>
        </h1>
        <button
          onClick={() => handleOpenDialog()}
          className="flex items-center space-x-2 bg-primary text-primary-foreground text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} />
          <span>Nuevo Producto</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-slate-900 p-4 rounded-lg border dark:border-slate-800 shadow-sm">
        <div className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o código..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setSearch(localSearch);
                  setPage(1);
                }
              }}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-slate-100"
            />
          </div>
          <button 
            onClick={() => { setSearch(localSearch); setPage(1); }}
            className="px-4 py-2 bg-primary text-primary-foreground text-white rounded-md hover:bg-primary/90 transition-colors font-medium whitespace-nowrap"
          >
            Buscar
          </button>
        </div>
        <select
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
            setPage(1);
          }}
          className="sm:w-64 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-slate-100"
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-4 rounded-md border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}
      
      <div className="flex flex-col gap-0">
        <ProductList
          products={products}
          loading={loading}
          onEdit={handleOpenDialog}
          onDelete={deleteProduct}
          onToggleStatus={handleToggleStatusRequest}
        />
        {!loading && totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            totalItems={total}
            onPageChange={setPage}
          />
        )}
      </div>

      <ProductFormDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        initialData={editingProduct || undefined}
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
