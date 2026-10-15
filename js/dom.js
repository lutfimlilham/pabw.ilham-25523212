import { daftarFilm, kategoriFilm, filterFilm, validasiField } from "./app.js";

function ambil(selector) {
  const elemen = document.querySelector(selector);
  if (!elemen) {
    throw new Error(`Elemen "${selector}" tidak ditemukan. Cocokkan id/class dengan panel Elements.`);
  }
  return elemen;
}

const tabelFilm = ambil("#daftar-film-js");
const barisFilter = ambil("#filter");
const pesanKosong = ambil("#pesan-kosong");
const formTambahFilm = ambil("#form-tambah-film");
const tombolKirim = ambil("#form-tambah-film button[type='submit']");

const NAMA_FIELD = ["judul", "tahun", "kategori", "rating"];

let kategoriAktif = "semua";

function buatSel(tag, teks) {
  const sel = document.createElement(tag);
  sel.textContent = teks; 
  return sel;
}

function buatBaris(film) {
  const baris = document.createElement("tr");

  const judul = buatSel("th", film.judul);
  judul.scope = "row";

  baris.append(
    judul,
    buatSel("td", film.tahun),
    buatSel("td", film.sutradara),
    buatSel("td", kategoriFilm[film.kategori] ?? film.kategori),
    buatSel("td", `${film.rating}/10`)
  );

  return baris;
}

function render(daftar) {
  tabelFilm.textContent = "";                 

  if (daftar.length === 0) {                  
    pesanKosong.hidden = false;
    return;
  }
  pesanKosong.hidden = true;

  const fragmen = document.createDocumentFragment();   
  daftar.forEach((film) => fragmen.append(buatBaris(film)));
  tabelFilm.append(fragmen);
}

function tampilkanDaftar() {
  render(filterFilm(daftarFilm, kategoriAktif));
}

function tandaiTombolAktif(tombolAktif) {
  barisFilter.querySelectorAll("button").forEach((tombol) => {
    const aktif = tombol === tombolAktif;
    tombol.classList.toggle("aktif", aktif);
    tombol.setAttribute("aria-pressed", String(aktif));
  });
}

barisFilter.addEventListener("click", (event) => {
  const tombol = event.target.closest("button");
  if (!tombol || !barisFilter.contains(tombol)) return;   // klik di luar tombol: abaikan

  kategoriAktif = tombol.dataset.kategori;
  tandaiTombolAktif(tombol);
  tampilkanDaftar();
});

function tampilkanGalat(nama, pesan) {
  const input = formTambahFilm.elements[nama];
  const galat = ambil(`#galat-${nama}`);

  galat.textContent = pesan;
  galat.hidden = pesan === "";

  if (pesan) {
    input.setAttribute("aria-invalid", "true");
  } else {
    input.removeAttribute("aria-invalid");
  }
}

function periksaField(nama, tampilkan) {
  const pesan = validasiField(nama, formTambahFilm.elements[nama].value);
  if (tampilkan) tampilkanGalat(nama, pesan);
  return pesan === "";
}

function perbaruiTombol() {
  const semuaValid = NAMA_FIELD.every((nama) => periksaField(nama, false));
  tombolKirim.disabled = !semuaValid;
}

function tanggapiField(event) {
  const nama = event.target.name;
  if (!NAMA_FIELD.includes(nama)) return;

  periksaField(nama, true);
  perbaruiTombol();
}

formTambahFilm.addEventListener("input", tanggapiField);
formTambahFilm.addEventListener("focusout", tanggapiField);

formTambahFilm.addEventListener("submit", (event) => {
  event.preventDefault();                    

  let fieldGagalPertama = null;
  NAMA_FIELD.forEach((nama) => {
    const valid = periksaField(nama, true);
    if (!valid && !fieldGagalPertama) {
      fieldGagalPertama = formTambahFilm.elements[nama];
    }
  });

  if (fieldGagalPertama) {
    fieldGagalPertama.focus();              
    return;
  }

  daftarFilm.push({
    judul: formTambahFilm.elements.judul.value.trim(),
    tahun: Number(formTambahFilm.elements.tahun.value),
    sutradara: "Belum ditentukan",
    kategori: formTambahFilm.elements.kategori.value,
    rating: Number(formTambahFilm.elements.rating.value)
  });

  formTambahFilm.reset();
  NAMA_FIELD.forEach((nama) => tampilkanGalat(nama, ""));
  perbaruiTombol();

  tampilkanDaftar();                          // satu perubahan data = satu render
  console.log("Film berhasil ditambahkan:", daftarFilm.at(-1).judul);
});

tandaiTombolAktif(barisFilter.querySelector('[data-kategori="semua"]'));
perbaruiTombol();
tampilkanDaftar();
