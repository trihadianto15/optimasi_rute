export default function DashboardStats({
  uploads,
  allPoints,
  totalDistance
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">

      <div className="bg-white rounded-2xl shadow-md p-4">
        <p className="text-gray-500">
          Total Paket
        </p>

        <h2 className="text-3xl font-bold text-blue-600">
          {uploads.length}
        </h2>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4">
        <p className="text-gray-500">
          Titik Pengiriman
        </p>

        <h2 className="text-3xl font-bold text-green-600">
          {allPoints.length}
        </h2>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4">
        <p className="text-gray-500">
          Total Jarak
        </p>

        <h2 className="text-3xl font-bold text-orange-600">
          {totalDistance.toFixed(2)} km
        </h2>
      </div>

    </div>
  );
}