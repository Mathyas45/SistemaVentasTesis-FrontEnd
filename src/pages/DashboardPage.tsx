export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-slate-500 font-medium">Ventas de Hoy</h3>
          <p className="text-3xl font-bold mt-2">S/ 0.00</p>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-slate-500 font-medium">Productos Activos</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-slate-500 font-medium">Alertas de Stock</h3>
          <p className="text-3xl font-bold mt-2 text-amber-600">0</p>
        </div>
      </div>
    </div>
  );
}
