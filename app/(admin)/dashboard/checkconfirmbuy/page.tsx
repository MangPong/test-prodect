export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <a
                href="#dashboard"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-lg"
              >
                🏠 Dashboard
              </a>
            </li>
            <li>
              <a
                href="#users"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-lg"
              >
                👥 Manage Users
              </a>
            </li>
            <li>
              <a
                href="#orders"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-lg"
              >
                📦 Manage Orders
              </a>
            </li>
            <li>
              <a
                href="#reports"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-lg"
              >
                📊 Reports
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Welcome, Admin</h2>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </header>

        {/* Dashboard Content */}
        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-800">Total Users</h3>
            <p className="text-2xl text-green-500 font-bold">1,024</p>


          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-800">Orders Today</h3>
            <p className="text-2xl text-blue-500 font-bold">245</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-bold text-gray-800">Pending Shipments</h3>
            <p className="text-2xl text-yellow-500 font-bold">87</p>
          </div>
        </section>
      </main>
    </div>
  );
}
