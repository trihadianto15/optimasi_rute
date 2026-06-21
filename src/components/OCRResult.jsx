export default function OCRResult({
  extractedAddresses = []
}) {

  if (
    extractedAddresses.length === 0
  ) {
    return (
      <div className="
        text-center
        text-slate-500
        mt-5
      ">
        Belum ada hasil OCR
      </div>
    );
  }

  return (

    <div className="space-y-3">

      {extractedAddresses.map(
        (item, index) => (

          <div
            key={index}
            className="
              border
              rounded-xl
              p-3
              bg-white
            "
          >

            <div className="
              font-semibold
              mb-2
            ">
              {item.source ===
              "manual"
                ? "✍️ Input Manual"
                : "📷 Hasil OCR"}
            </div>

            <div className="
              text-sm
              text-slate-700
            ">
              {item.text}
            </div>

          </div>

        )
      )}

    </div>

  );
}