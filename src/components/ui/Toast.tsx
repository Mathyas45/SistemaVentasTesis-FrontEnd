import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-eliminar después de 3 segundos
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <div className="fixed top-4 right-4 z-[9999] flex flex-col space-y-2 pointer-events-none">
            {toasts.map((toast) => (
              <div
                key={toast.id}
                className={`pointer-events-auto flex items-center w-full max-w-xs p-4 rounded-lg shadow-lg animate-in slide-in-from-right-8 fade-in duration-300 text-white ${
                  toast.type === "success"
                    ? "bg-emerald-600"
                    : toast.type === "error"
                    ? "bg-red-600"
                    : "bg-blue-600"
                }`}
              >
                <div className="flex-shrink-0">
                  {toast.type === "success" && <CheckCircle2 className="w-5 h-5" />}
                  {toast.type === "error" && <AlertCircle className="w-5 h-5" />}
                </div>
                <div className="ml-3 text-sm font-medium">{toast.message}</div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 hover:bg-white/20 inline-flex h-8 w-8 focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast debe usarse dentro de un ToastProvider");
  return context;
}
