import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductList } from "../components/ProductList";
import { ProductFormDialog } from "../components/ProductFormDialog";
import type { Product } from "../../../domain/models/Product";
import { Plus } from "lucide-react";
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog';
import { useToast } from '../../../components/ui/Toast';
export default function ProductsPage() {
  // Utilizamos nuestro Hook. La vista se vuelve muy limpia.
  const {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  
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
  
  // IMPORTAMOS EL HOOK DE TOAST PARA MOSTRAR MENSAJES
  const { showToast } = useToast();
  // ESTADO LOCAL: Maneja si el modal está abierto o cerrado, y qué producto se está editando
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleOpenDialog = (product?: Product) => {
    setEditingProduct(product || null); // Si mandan producto, se guarda para editar. Si no, nulo para crear nuevo.
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
  };

  // Función que se ejecuta al enviar el formulario del modal
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
          ? `¿Estás seguro de inactivar "${product.name}"? Los productos no la mostrarán.`
          : `¿Deseas volver a activar "${product.name}"?`,
        type: "warning",
        onConfirm: async () => {
          try {
            await updateProduct(product.id, { isActive: !product.isActive });
            showToast(`Producto ${isDeactivating ? "inactivado" : "activado"}`, "success");
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
        <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
          Productos |
          <span className="text-sm font-semibold text-primary bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 px-3 py-1 rounded-full">
            {products.length}
          </span>
        </h1>
        <button
          onClick={() => handleOpenDialog()}
          className="flex items-center space-x-2 bg-primary text-primary-foreground text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} />
          Nuevo Producto
        </button>
      </div>
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-4 rounded-md border border-red-200 dark:border-red-800">
          {error}
        </div>
      )}
      {/* Le pasamos (props) los datos y funciones al componente hijo */}
      <ProductList
        products={products}
        loading={loading}
        onEdit={handleOpenDialog}
        onDelete={deleteProduct}
        onToggleStatus={handleToggleStatusRequest}
      />
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
