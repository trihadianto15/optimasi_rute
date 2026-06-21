const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/**
 * AMBIL SEMUA LOKASI
 */
app.get("/route_optimization", (req, res) => {

  db.query(
    "SELECT * FROM locations",
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );

});

/**
 * UPDATE STATUS PAKET
 */
app.put(
  "/route_optimization/:id/status",
  (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    db.query(
      "UPDATE locations SET status=? WHERE id=?",
      [status, id],
      (err) => {

        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          success: true,
          message: "Status berhasil diupdate"
        });

      }
    );

  }
);

/**
 * SIMPAN HISTORY
 */
app.post(
  "/route_history",
  (req, res) => {

    const {
      total_titik,
      total_jarak
    } = req.body;

    db.query(
      `
      INSERT INTO route_history
      (
        total_titik,
        total_jarak
      )
      VALUES (?,?)
      `,
      [
        total_titik,
        total_jarak
      ],
      (err) => {

        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          success: true
        });

      }
    );

  }
);

/**
 * LIHAT HISTORY
 */
app.get(
  "/route_history",
  (req, res) => {

    db.query(
      `
      SELECT *
      FROM route_history
      ORDER BY created_at DESC
      `,
      (err, result) => {

        if (err) {
          return res.status(500).json(err);
        }

        res.json(result);

      }
    );

  }
);

app.listen(3001, () => {
  console.log(
    "Server running on port 3001"
  );
});