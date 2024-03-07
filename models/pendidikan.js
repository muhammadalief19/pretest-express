import connection from "../config/db.js";

class Pendidikan {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT pendidikan.*, mahasiswa.nama_depan as nama_depan_mahasiswa,mahasiswa.nama_belakang as nama_belakang_mahasiswa, mahasiswa.nrp FROM pendidikan INNER JOIN mahasiswa ON pendidikan.id_mahasiswa = mahasiswa.id_mahasiswa",
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
      connection.query("INSERT INTO pendidikan set ? ", data, (err, result) => {
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
        "SELECT pendidikan.*, mahasiswa.nama_depan as nama_depan_mahasiswa,mahasiswa.nama_belakang as nama_belakang_mahasiswa, mahasiswa.nrp FROM pendidikan INNER JOIN mahasiswa ON pendidikan.id_mahasiswa = mahasiswa.id_mahasiswa WHERE id_pendidikan= " +
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
        "UPDATE pendidikan set ? WHERE id_pendidikan= " + id,
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
        "DELETE FROM pendidikan WHERE id_pendidikan= " + id,
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

export default Pendidikan;
