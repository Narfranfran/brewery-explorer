// app/dashboard/layout.js
export default function DashboardLayout({ children }) {
  return (
    <div>
      <div className="text-sm breadcrumbs container mx-auto p-4">
        <ul>
          <li><a href="/">Inicio</a></li>
          <li>Dashboard</li>
        </ul>
      </div>
      {children}
    </div>
  );
}
