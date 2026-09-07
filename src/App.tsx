import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppLayout } from './components/layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import CategoriesPage from './presentation/categories/pages/CategoriesPage';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            {/* Rutas futuras */}
            <Route path="products" element={<div className="p-4">Módulo de Productos (En construcción)</div>} />
            <Route path="inventory" element={<div className="p-4">Módulo de Inventario (En construcción)</div>} />
            <Route path="sales" element={<div className="p-4">Módulo de Ventas (En construcción)</div>} />
            <Route path="reports" element={<div className="p-4">Módulo de Reportes (En construcción)</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
