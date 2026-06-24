import {
  normalizeText,
  extractRTRW,
  extractVillage
} from "./ocr";

/**
 * TITIK GUDANG
 */
export const GUDANG_LOCATION = {
  nama: "Gudang Utama",
  rt: 0,
  rw: 0,
  latitude: -6.884519202186728,
  longitude: 106.7981627309036,
  type: "gudang"
};

/**
 * MATCHING OCR → DATABASE MYSQL
 */
export function matchAddressToDatabase(
  extractedText,
  database
) {

  if (!extractedText) return null;

  const extractedRTRW =
    extractRTRW(extractedText);

  if (
    extractedRTRW.rt == null ||
    extractedRTRW.rw == null
  ) {
    return null;
  }

  /**
   * Tahap 1
   * Cari RT RW yang sama
   */
  const candidates =
    database.filter((record) => {

      const rtDB =
        Number(record.rt);

      const rwDB =
        Number(record.rw);

      return (
        rtDB === extractedRTRW.rt &&
        rwDB === extractedRTRW.rw
      );

    });

  console.log(
    "Candidate:",
    candidates
  );

  /**
   * Tidak ditemukan
   */
  if (candidates.length === 0) {
    return null;
  }

  /**
   * Hanya satu data
   */
  if (candidates.length === 1) {

    return {
      ...candidates[0],
      originalText:
        extractedText
    };

  }

  /**
   * Lebih dari satu data
   * cek desa
   */
  const lowerText =
    extractedText.toLowerCase();

  for (const candidate of candidates) {

    const desaDB =
      (
        candidate.desa ||
        candidate.nama ||
        ""
      )
        .toLowerCase()
        .trim();

    if (
      desaDB &&
      lowerText.includes(desaDB)
    ) {

      console.log(
        "MATCH DESA:",
        desaDB
      );

      return {
        ...candidate,
        originalText:
          extractedText
      };

    }

  }

  /**
   * Fallback
   * Ambil kandidat pertama
   */
  console.log(
    "RT/RW sama, desa tidak ditemukan"
  );

  return {
    ...candidates[0],
    originalText:
      extractedText
  };

}