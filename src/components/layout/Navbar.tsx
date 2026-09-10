import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, toggleTheme } from '@/store/slices/uiSlice';
import { Menu, UserCircle, Sun, Moon } from 'lucide-react';
import type { RootState } from '@/store';

//en este componente se encuentra la barra de navegación superior, que incluye un botón para abrir/cerrar el sidebar, un botón para cambiar entre modo oscuro y claro, y un área que muestra el nombre del usuario con un icono.
export function Navbar() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.ui.theme);

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b dark:border-slate-800 flex items-center justify-between px-4 transition-colors duration-200">
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
      >
        <Menu className="h-5 w-5" />
      </button>
      <div className="flex items-center space-x-4">
        
        {/* BOTÓN PARA CAMBIAR TEMA (MODO OSCURO/CLARO) */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
          title="Cambiar tema"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <div className="flex items-center space-x-2">
          <UserCircle className="h-6 w-6 text-slate-500 dark:text-slate-400" />
          <span className="font-medium text-sm text-slate-700 dark:text-slate-200">Admin User</span>
        </div>
      </div>
    </header>
  );
}
