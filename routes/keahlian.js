import express from "express";
import Keahlian from "../models/keahlian.js";
import Mahasiswa from "../models/mahasiswa.js";

let router = express.Router();

router.get("/", async (req, res, next) => {
  let rows = await Keahlian.getAll();
  res.render("keahlian/index", {
    data: rows,
    title: "Keahlian",
  });
});

router.get("/create", (req, res, next) => {
  res.render("keahlian/create", { title: "Keahlian" });
});

router.post("/store", async (req, res, next) => {
  try {
    let { nama_keahlian, tingkat_keahlian, nrp } = req.body;
    let mahasiswa = await Mahasiswa.findWithNrp(nrp);
    const id_mahasiswa = mahasiswa[0].id_mahasiswa;

    let data = {
      nama_keahlian,
      tingkat_keahlian,
      id_mahasiswa,
    };
    await Keahlian.store(data);
    console.log(data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/keahlian");
  } catch (error) {
    req.flash("error", "Terjadi kesalahan");
    res.redirect("/keahlian");
  }
});

router.get("/edit/(:id)", async (req, res, next) => {
  let { id } = req.params;
  let rows = await Keahlian.find(id);
  res.render("keahlian/update", {
    data: rows[0],
    title: "Keahlian",
  });
});

router.post("/update/(:id)", async (req, res, next) => {
  try {
    let { id } = req.params;
    let { nama_keahlian, tingkat_keahlian, nrp } = req.body;
    let mahasiswa = await Mahasiswa.findWithNrp(nrp);
    const id_mahasiswa = mahasiswa[0].id_mahasiswa;

    let data = {
      nama_keahlian,
      tingkat_keahlian,
      id_mahasiswa,
    };
    await Keahlian.update(id, data);
    req.flash("success", "Berhasil mengupdate data");
    res.redirect("/keahlian");
  } catch (error) {
    req.flash("error", "Terjadi kesalahan");
    res.redirect("/keahlian");
  }
});

router.get("/delete/(:id)", async (req, res, next) => {
  let { id } = req.params;

  await Keahlian.delete(id);
  req.flash("success", "Berhasil Menghapus Data");
  res.redirect("/keahlian");
});

export default router;
