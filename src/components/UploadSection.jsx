import {
  Camera,
  Images,
  Upload,
  Trash2,
  PencilLine,
  X
} from "lucide-react";

import {
  useRef,
  useState
} from "react";

export default function UploadSection({
  uploads,
  setUploads
}) {

  const cameraRef = useRef(null);
  const galleryRef = useRef(null);

  const [showModal, setShowModal] =
    useState(false);

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [mode, setMode] =
    useState("upload");

  const [manualAddress,
    setManualAddress] =
    useState("");

  const handleFileChange = (e) => {

    const files = Array.from(
      e.target.files || []
    );

    if (!files.length) return;

    const newUploads =
      files.map((file) => ({
        type: "image",
        file,
        preview:
          URL.createObjectURL(file)
      }));

    setUploads((prev) => [
      ...prev,
      ...newUploads
    ]);

    e.target.value = "";
  };

  const addManualAddress = () => {

    if (!manualAddress.trim())
      return;

    setUploads((prev) => [
      ...prev,
      {
        type: "manual",
        text: manualAddress
      }
    ]);

    setManualAddress("");
  };

  const removeItem = (index) => {

    const target =
      uploads[index];

    if (
      target?.preview
    ) {
      URL.revokeObjectURL(
        target.preview
      );
    }

    setUploads((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );
  };

  return (
    <>
      <div
        className="
        bg-white
        rounded-2xl
        shadow-md
        border
        p-5
      "
      >

        <h2
          className="
          text-xl
          font-bold
          mb-4
        "
        >
          📦 Input Paket
        </h2>

        {/* TAB */}
        <div className="flex gap-2 mb-4">

          <button
            onClick={() =>
              setMode("upload")
            }
            className={`
              flex-1
              p-3
              rounded-xl
              font-medium
              transition
              ${
                mode === "upload"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100"
              }
            `}
          >
            Upload
          </button>

          <button
            onClick={() =>
              setMode("manual")
            }
            className={`
              flex-1
              p-3
              rounded-xl
              font-medium
              transition
              ${
                mode === "manual"
                  ? "bg-green-600 text-white"
                  : "bg-slate-100"
              }
            `}
          >
            Manual
          </button>

        </div>

        {/* UPLOAD */}
        {mode === "upload" && (

          <button
            onClick={() =>
              setShowModal(true)
            }
            className="
              w-full
              bg-gradient-to-r
              from-blue-600
              to-indigo-600
              text-white
              rounded-2xl
              p-5
              shadow-lg
              hover:scale-[1.02]
              transition
              flex
              flex-col
              items-center
              gap-2
            "
          >
            <Upload size={28} />

            <span>
              Upload Foto Paket
            </span>

            <span className="text-xs opacity-80">
              Kamera atau Galeri
            </span>

          </button>

        )}

        {/* MANUAL */}
        {mode === "manual" && (

          <div>

            <textarea
              value={
                manualAddress
              }
              onChange={(e) =>
                setManualAddress(
                  e.target.value
                )
              }
              placeholder="
              Contoh:
              RT 22 RW 04
              Desa Pawenang
              Nagrak Sukabumi
              "
              className="
                w-full
                border
                rounded-xl
                p-3
                h-28
              "
            />

            <button
              onClick={
                addManualAddress
              }
              className="
                w-full
                mt-3
                bg-green-600
                text-white
                p-3
                rounded-xl
              "
            >
              Tambahkan Alamat
            </button>

          </div>

        )}

        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          hidden
          onChange={handleFileChange}
        />

        <input
          ref={galleryRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={handleFileChange}
        />

        {/* LIST DATA */}
        {uploads.length > 0 && (

          <div className="mt-5">

            <div
              className="
                bg-green-50
                border
                border-green-200
                text-green-700
                p-3
                rounded-xl
                text-sm
                mb-4
              "
            >
              ✅ {uploads.length}
              {" "}
              data siap diproses
            </div>

            <div className="space-y-3">

              {uploads.map(
                (item, idx) => (

                  <div
                    key={idx}
                    className="
                      relative
                      border
                      rounded-xl
                      overflow-hidden
                      shadow-sm
                    "
                  >

                    {item.type ===
                    "image" ? (

                      <>
                        <img
                          src={
                            item.preview
                          }
                          alt=""
                          onClick={() =>
                            setSelectedImage(
                              item.preview
                            )
                          }
                          className="
                            w-full
                            h-32
                            object-cover
                            cursor-pointer
                          "
                        />

                        <div className="p-2 text-xs truncate">
                          {
                            item.file
                              .name
                          }
                        </div>
                      </>

                    ) : (

                      <div className="p-3 bg-slate-50">

                        <div className="flex items-center gap-2 mb-2">
                          <PencilLine
                            size={16}
                          />
                          <span className="font-medium">
                            Input Manual
                          </span>
                        </div>

                        <p className="text-sm">
                          {item.text}
                        </p>

                      </div>

                    )}

                    <button
                      onClick={() =>
                        removeItem(idx)
                      }
                      className="
                        absolute
                        top-2
                        right-2
                        z-10
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        p-2
                        rounded-full
                        shadow-md
                      "
                    >
                      <Trash2
                        size={14}
                      />
                    </button>

                  </div>

                )
              )}

            </div>

          </div>

        )}

      </div>

      {/* MODAL PILIH SUMBER */}
      {showModal && (

        <div
          className="
          fixed
          inset-0
          bg-black/50
          backdrop-blur-sm
          flex
          items-center
          justify-center
          z-[9999]
        "
        >

          <div
            className="
            bg-white
            rounded-3xl
            p-6
            w-80
          "
          >

            <h3 className="text-xl font-bold text-center mb-5">
              Pilih Sumber Gambar
            </h3>

            <button
              onClick={() => {
                cameraRef.current.click();
                setShowModal(false);
              }}
              className="
                w-full
                bg-blue-600
                text-white
                p-4
                rounded-xl
                mb-3
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <Camera size={20} />
              Ambil Foto
            </button>

            <button
              onClick={() => {
                galleryRef.current.click();
                setShowModal(false);
              }}
              className="
                w-full
                bg-green-600
                text-white
                p-4
                rounded-xl
                mb-3
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <Images size={20} />
              Pilih Galeri
            </button>

            <button
              onClick={() =>
                setShowModal(false)
              }
              className="
                w-full
                border
                p-3
                rounded-xl
              "
            >
              Batal
            </button>

          </div>

        </div>

      )}

      {/* PREVIEW GAMBAR */}
      {selectedImage && (

        <div
          onClick={() =>
            setSelectedImage(null)
          }
          className="
            fixed
            inset-0
            bg-black/90
            flex
            items-center
            justify-center
            z-[10000]
          "
        >

          <button
            className="
            absolute
            top-5
            right-5
            text-white
          "
          >
            <X size={30} />
          </button>

          <img
            src={selectedImage}
            alt=""
            className="
              max-w-[90vw]
              max-h-[90vh]
              rounded-xl
            "
          />
        </div>
      )}
    </>
  );
}