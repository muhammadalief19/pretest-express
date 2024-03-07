import connection from "../config/db.js";

class Mahasiswa {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM mahasiswa", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async store(data) {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO mahasiswa set ? ", data, (err, result) => {
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
        "SELECT * FROM mahasiswa WHERE id_mahasiswa = " + id,
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

  static async findWithNrp(nrp) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM mahasiswa WHERE nrp = " + nrp,
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
        "UPDATE mahasiswa set ? WHERE id_mahasiswa = " + id,
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
        "DELETE FROM mahasiswa WHERE id_mahasiswa = " + id,
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

export default Mahasiswa;
