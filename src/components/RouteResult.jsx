export default function RouteResult({
  route = [],
  totalDistance = 0,
  segmentDistances = [],
  updateStatus
}) {

  return (
    <div className="mt-4">

      {/* Statistik */}
      <div className="grid grid-cols-3 gap-3 mb-4">

        <div className="bg-blue-50 p-3 rounded-xl">
          <div className="text-xs text-slate-500">
            Total Titik
          </div>

          <div className="text-xl font-bold">
            {route.length}
          </div>
        </div>

        <div className="bg-green-50 p-3 rounded-xl">
          <div className="text-xs text-slate-500">
            Total Jarak
          </div>

          <div className="text-xl font-bold">
            {Number(totalDistance).toFixed(2)}
            km
          </div>
        </div>

        <div className="bg-orange-50 p-3 rounded-xl">
          <div className="text-xs text-slate-500">
            Status
          </div>

          <div className="text-lg font-bold text-orange-600">
            Optimal
          </div>
        </div>

      </div>

      <h3 className="font-bold text-lg mb-3">
        🚚 Urutan Rute Pengiriman
      </h3>

      {route.map((r, i) => (

        <div
          key={i}
          className="
            border
            rounded-xl
            p-3
            mb-3
            bg-white
            shadow-sm
          "
        >

          <div className="flex justify-between items-center">

            <div>

            <div className="font-bold">
              {i + 1}. {r.nama}
            </div>

            {r.desa && (
              <div className="text-xs text-blue-600 font-medium">
                Desa {r.desa}
              </div>
            )}

            <div className="text-xs text-slate-500">
              RT {r.rt} RW {r.rw}
            </div>

            </div>

            {r.type !== "gudang" && (

              <>
                {r.status !== "sudah" ? (

                  <button
                    onClick={() => {

                      console.log("DATA ROUTE:");
                      console.log(r);

                      updateStatus(
                        r.uniqueId,
                        "sudah"
                      )


                    }}
                    className="
                      bg-green-500
                      hover:bg-green-600
                      text-white
                      px-3
                      py-1
                      rounded-lg
                      text-sm
                    "
                  >
                    Sudah Diantar
                  </button>

                ) : (

                  <span className="
                    text-green-600
                    font-bold
                  ">
                    ✅ Selesai
                  </span>

                )}
              </>

            )}

          </div>

          {/* Jarak ke titik berikutnya */}

          {segmentDistances[i] && (

            <div
              className="
                mt-2
                bg-blue-50
                text-blue-700
                px-3
                py-2
                rounded-lg
                text-sm
                font-medium
              "
            >
              📍 Jarak ke titik berikutnya:
              {" "}
              {segmentDistances[i]
                .distance
                .toFixed(2)}
              km
            </div>

          )}

          {!segmentDistances[i] &&
            i === route.length - 1 && (

            <div className="
              mt-2
              text-green-600
              text-sm
              font-medium
            ">
              ✓ Tujuan Terakhir
            </div>

          )}

        </div>

      ))}

    </div>
  );
}