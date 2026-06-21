import {
  Loader2,
  ScanLine,
  MapPin,
  Route
} from "lucide-react";

export default function ProcessingStatus({
  processingStatus
}) {

  const progressMap = {
    0: 0,
    1: 20,
    2: 50,
    3: 80,
    4: 100
  };

  return (

    <div className="
      mt-6
      bg-white
      rounded-xl
      p-4
      shadow-sm
      border
    ">

      <h3 className="
        font-bold
        text-lg
        mb-4
      ">
        ⚙️ Status Proses
      </h3>

      {/* OCR */}

      <div className="
        flex
        items-center
        gap-3
        mb-3
      ">

        {processingStatus === 2 ? (
          <Loader2
            className="
              animate-spin
              text-blue-500
            "
          />
        ) : processingStatus > 2 ? (
          <span>✅</span>
        ) : (
          <ScanLine />
        )}

        <div>
          <div className="font-medium">
            OCR
          </div>

          <div className="
            text-xs
            text-slate-500
          ">
            Ekstraksi teks dari gambar
          </div>
        </div>

      </div>

      {/* Matching */}

      <div className="
        flex
        items-center
        gap-3
        mb-3
      ">

        {processingStatus === 3 ? (
          <Loader2
            className="
              animate-spin
              text-orange-500
            "
          />
        ) : processingStatus > 3 ? (
          <span>✅</span>
        ) : (
          <MapPin />
        )}

        <div>

          <div className="font-medium">
            Matching Database
          </div>

          <div className="
            text-xs
            text-slate-500
          ">
            Pencocokan alamat
          </div>

        </div>

      </div>

      {/* Optimasi */}

      <div className="
        flex
        items-center
        gap-3
        mb-4
      ">

        {processingStatus === 4 ? (
          <Route
            className="
              animate-pulse
              text-green-500
            "
          />
        ) : (
          <Route />
        )}

        <div>

          <div className="font-medium">
            Optimasi TSP
          </div>

          <div className="
            text-xs
            text-slate-500
          ">
            Menghitung rute terbaik
          </div>

        </div>

      </div>

      {/* Progress */}

      <div>

        <div className="
          flex
          justify-between
          text-sm
          mb-2
        ">

          <span>
            Progress
          </span>

          <span>
            {progressMap[
              processingStatus
            ]}%
          </span>

        </div>

        <div className="
          h-3
          bg-slate-200
          rounded-full
          overflow-hidden
        ">

          <div
            className="
              h-full
              bg-gradient-to-r
              from-blue-500
              to-green-500
              transition-all
              duration-700
            "
            style={{
              width:
                `${progressMap[
                  processingStatus
                ]}%`
            }}
          />

        </div>

      </div>

    </div>

  );
}