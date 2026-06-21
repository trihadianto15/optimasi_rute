import {
  normalizeText,
  extractRTRW
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
  if (!extractedText) {
    console.log("OCR kosong");
    return null;
  }

  if (!Array.isArray(database)) {
    console.log("Database bukan array");
    return null;
  }

  console.log("DATABASE:", database);

  const extractedRTRW =
    extractRTRW(extractedText);

  console.log("OCR:", extractedText);
  console.log("RT/RW OCR:", extractedRTRW);

  if (
    extractedRTRW.rt == null ||
    extractedRTRW.rw == null
  ) {
    console.log("RT/RW tidak ditemukan");
    return null;
  }

  for (const record of database) {

    console.log("RECORD:", record);

    const rtDB = Number(record.rt);
    const rwDB = Number(record.rw);

    console.log({
      rtOCR: extractedRTRW.rt,
      rwOCR: extractedRTRW.rw,
      rtDB,
      rwDB
    });

    const rtMatch =
      extractedRTRW.rt === rtDB;

    const rwMatch =
      extractedRTRW.rw === rwDB;

    if (rtMatch && rwMatch) {

      console.log(
        "MATCH DITEMUKAN:",
        record
      );

      return {
        ...record,
        originalText: extractedText
      };
    }
  }

  console.log(
    "TIDAK ADA YANG COCOK"
  );

  return null;
} null;
