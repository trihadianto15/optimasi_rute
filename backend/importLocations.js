const XLSX = require("xlsx");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "route_optimization"
});

const workbook = XLSX.readFile("data_pengiriman.xlsx");

for (const sheetName of workbook.SheetNames) {

  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet);

  console.log(`Import ${sheetName}`);

  rows.forEach(row => {

    db.query(
      `INSERT INTO locations
      (nama, desa, rt, rw, latitude, longitude, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        row.nama,
        row.desa || sheetName,
        row.rt,
        row.rw,
        row.latitude,
        row.longitude,
        "belum"
      ]
    );

  });

}

console.log("Import selesai");