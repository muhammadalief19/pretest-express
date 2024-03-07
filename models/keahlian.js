import connection from "../config/db.js";

class Keahlian {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT keahlian.*, mahasiswa.nama_depan as nama_depan_mahasiswa,mahasiswa.nama_belakang as nama_belakang_mahasiswa, mahasiswa.nrp FROM keahlian INNER JOIN mahasiswa ON keahlian.id_mahasiswa = mahasiswa.id_mahasiswa",
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  static async store(data) {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO keahlian set ? ", data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async find(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT keahlian.*, mahasiswa.nama_depan as nama_depan_mahasiswa,mahasiswa.nama_belakang as nama_belakang_mahasiswa, mahasiswa.nrp FROM keahlian INNER JOIN mahasiswa ON keahlian.id_mahasiswa = mahasiswa.id_mahasiswa WHERE id_keahlian= " +
          id,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  static async update(id, data) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE keahlian set ? WHERE id_keahlian= " + id,
        data,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM keahlian WHERE id_keahlian= " + id,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }
}

export default Keahlian;
