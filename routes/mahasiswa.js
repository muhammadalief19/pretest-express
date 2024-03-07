import express from "express";
import Mahasiswa from "../models/mahasiswa.js";

let router = express.Router();

router.get("/", async (req, res, next) => {
  let rows = await Mahasiswa.getAll();
  res.render("mahasiswa/index", {
    data: rows,
    title: "Mahasiswa",
  });
});

router.get("/create", (req, res, next) => {
  res.render("mahasiswa/create", { title: "Mahasiswa" });
});

router.post("/store", async (req, res, next) => {
  try {
    let {
      nrp,
      nama_depan,
      nama_belakang,
      jenis_kelamin,
      agama,
      umur,
      tinggi_badan,
      gol_darah,
      alamat,
      hobi,
      email,
      no_telp,
    } = req.body;

    let data = {
      nrp,
      nama_depan,
      nama_belakang,
      jenis_kelamin,
      agama,
      umur,
      tinggi_badan,
      gol_darah,
      alamat,
      hobi,
      email,
      no_telp,
    };
    await Mahasiswa.store(data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/mahasiswa");
  } catch (error) {
    req.flash("error", "Terjadi kesalahan");
    res.redirect("/mahasiswa");
  }
});

router.get("/edit/(:id)", async (req, res, next) => {
  let { id } = req.params;
  let rows = await Mahasiswa.find(id);
  res.render("mahasiswa/update", {
    data: rows[0],
    title: "Mahasiswa",
  });
});

router.post("/update/(:id)", async (req, res, next) => {
  try {
    let { id } = req.params;
    let {
      nrp,
      nama_depan,
      nama_belakang,
      jenis_kelamin,
      agama,
      umur,
      tinggi_badan,
      gol_darah,
      alamat,
      hobi,
      email,
      no_telp,
    } = req.body;

    let data = {
      nrp,
      nama_depan,
      nama_belakang,
      jenis_kelamin,
      agama,
      umur,
      tinggi_badan,
      gol_darah,
      alamat,
      hobi,
      email,
      no_telp,
    };
    await Mahasiswa.update(id, data);
    req.flash("success", "Berhasil mengupdate data");
    res.redirect("/mahasiswa");
  } catch (error) {
    req.flash("error", "Terjadi kesalahan");
    res.redirect("/mahasiswa");
  }
});

router.get("/delete/(:id)", async (req, res, next) => {
  let { id } = req.params;

  await Mahasiswa.delete(id);
  req.flash("success", "Berhasil Menghapus Data");
  res.redirect("/mahasiswa");
});

export default router;
