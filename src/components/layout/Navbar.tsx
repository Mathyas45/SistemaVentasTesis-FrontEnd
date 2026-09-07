import { useDispatch } from 'react-redux';
import { toggleSidebar } from '@/store/slices/uiSlice';
import { Menu, UserCircle } from 'lucide-react';

export function Navbar() {
  const dispatch = useDispatch();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4">
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="p-2 rounded-md hover:bg-slate-100"
      >
        <Menu className="h-5 w-5" />
      </button>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <UserCircle className="h-6 w-6 text-slate-500" />
          <span className="font-medium text-sm text-slate-700">Admin User</span>
        </div>
      </div>
    </header>
  );
}
