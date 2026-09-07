import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { LayoutDashboard, Tags, Package, ArrowDownUp, ShoppingCart, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const isSidebarOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Categorías', path: '/categories', icon: Tags },
    { name: 'Productos', path: '/products', icon: Package },
    { name: 'Inventario (Entradas)', path: '/inventory', icon: ArrowDownUp },
    { name: 'Ventas', path: '/sales', icon: ShoppingCart },
    { name: 'Reportes', path: '/reports', icon: BarChart },
  ];

  return (
    <aside
      className={cn(
        'bg-slate-900 text-slate-100 flex-shrink-0 transition-all duration-300',
        isSidebarOpen ? 'w-64' : 'w-20'
      )}
    >
      <div className="h-16 flex items-center justify-center border-b border-slate-700 font-bold text-xl">
        {isSidebarOpen ? 'Sisventas' : 'SV'}
      </div>
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center space-x-3 p-3 rounded-lg transition-colors',
                isActive ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'
              )
            }
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {isSidebarOpen && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
