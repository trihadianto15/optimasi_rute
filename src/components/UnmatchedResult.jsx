import {
  AlertTriangle
} from "lucide-react";

export default function UnmatchedResult({
  unmatchedData = []
}) {

  if (unmatchedData.length === 0)
    return null;

  return (

    <div className="
      mt-4
      bg-red-50
      border
      border-red-200
      rounded-xl
      p-4
    ">

      <div className="
        flex
        items-center
        gap-2
        mb-3
      ">
        <AlertTriangle
          className="text-red-500"
        />

        <h3 className="
          font-bold
          text-red-700
        ">
          Paket Tidak Cocok
        </h3>
      </div>

      {unmatchedData.map(
        (item, index) => (

          <div
            key={index}
            className="
              bg-white
              border
              rounded-lg
              p-3
              mb-2
            "
          >

            <div className="
              font-semibold
              text-red-600
            ">
              ❌ {item.imageName}
            </div>

            <div className="
              text-xs
              text-slate-500
              mt-1
            ">
              Tidak ditemukan
              pada database
            </div>

            <div className="
              text-xs
              mt-2
              bg-slate-50
              p-2
              rounded
            ">
              {item.ocrText}
            </div>

          </div>

        )
      )}

    </div>

  );
}