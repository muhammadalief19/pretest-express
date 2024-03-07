import express from "express";
import Mahasiswa from "../models/mahasiswa.js";
import Pendidikan from "../models/pendidikan.js";

let router = express.Router();

router.get("/", async (req, res, next) => {
  let rows = await Pendidikan.getAll();
  res.render("pendidikan/index", {
    data: rows,
    title: "Pendidikan",
  });
});

router.get("/create", (req, res, next) => {
  res.render("pendidikan/create", { title: "Pendidikan" });
});

router.post("/store", async (req, res, next) => {
  try {
    let {
      nama_instansi,
      jurusan,
      tahun_masuk,
      tahun_lulus,
      nomor_ijazah,
      nrp,
    } = req.body;
    let mahasiswa = await Mahasiswa.findWithNrp(nrp);
    const id_mahasiswa = mahasiswa[0].id_mahasiswa;

    let data = {
      nama_instansi,
      jurusan,
      tahun_masuk,
      tahun_lulus,
      nomor_ijazah,
      id_mahasiswa,
    };
    await Pendidikan.store(data);
    console.log(data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/pendidikan");
  } catch (error) {
    req.flash("error", "Terjadi kesalahan");
    // res.redirect("/pendidikan");
    res.send(error);
  }
});

router.get("/edit/(:id)", async (req, res, next) => {
  let { id } = req.params;
  let rows = await Pendidikan.find(id);
  res.render("pendidikan/update", {
    data: rows[0],
    title: "Pendidikan",
  });
});

router.post("/update/(:id)", async (req, res, next) => {
  try {
    let { id } = req.params;
    let {
      nama_instansi,
      jurusan,
      tahun_masuk,
      tahun_lulus,
      nomor_ijazah,
      nrp,
    } = req.body;
    let mahasiswa = await Mahasiswa.findWithNrp(nrp);
    const id_mahasiswa = mahasiswa[0].id_mahasiswa;

    let data = {
      nama_instansi,
      jurusan,
      tahun_masuk,
      tahun_lulus,
      nomor_ijazah,
      id_mahasiswa,
    };
    await Pendidikan.update(id, data);
    req.flash("success", "Berhasil mengupdate data");
    res.redirect("/pendidikan");
  } catch (error) {
    req.flash("error", "Terjadi kesalahan");
    res.redirect("/pendidikan");
  }
});

router.get("/delete/(:id)", async (req, res, next) => {
  let { id } = req.params;

  await Pendidikan.delete(id);
  req.flash("success", "Berhasil Menghapus Data");
  res.redirect("/pendidikan");
});

export default router;
