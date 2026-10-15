const profil = {
  nama: "Muhammad Lutfi Ilham",
  peran: "Mahasiswa PABW",
  keahlian: ["HTML", "CSS", "JavaScript"],
  jumlahProyek: 0
};

console.log("Data profil:", profil);

function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

console.log(buatPerkenalan(profil));

const formatKeahlian = (daftar) => daftar.join(" · ");

console.log("Keahlian:", formatKeahlian(profil.keahlian));

const profilTambahan = {
  kontak: {
    email: "mahasiswa@example.com"
  }
};

const email = profilTambahan.kontak?.email ?? "Email belum diisi";
const telepon = profilTambahan.kontak?.telepon ?? "Telepon belum diisi";

console.log("Email:", email);
console.log("Telepon:", telepon);

const daftarProyek = [
  {
    nama: "Website Profil",
    teknologi: "HTML, CSS",
    selesai: true
  },
  {
    nama: "Kalkulator",
    teknologi: "JavaScript",
    selesai: true
  },
  {
    nama: "Aplikasi",
    teknologi: "JavaScript",
    selesai: false
  }
];

console.table(daftarProyek);

const namaProyek = daftarProyek.map((proyek) => proyek.nama);

console.log("Nama semua proyek:", namaProyek);

const proyekSelesai = daftarProyek.filter((proyek) => proyek.selesai);

console.log("Proyek yang sudah selesai:", proyekSelesai);
console.table(proyekSelesai);

const proyekDicari = daftarProyek.find(
  (proyek) => proyek.nama === "Kalkulator"
);

console.log("Proyek yang ditemukan:", proyekDicari);

const profilSalinan = { ...profil };

profilSalinan.peran = "Frontend Developer";

console.log("Profil asli:", profil);
console.log("Profil salinan:", profilSalinan);

const salinanProyek = [...daftarProyek];

salinanProyek.push({
  nama: "Portfolio Pribadi",
  teknologi: "HTML, CSS, JavaScript",
  selesai: false
});

console.log("Jumlah proyek asli:", daftarProyek.length);
console.log("Jumlah proyek salinan:", salinanProyek.length);

console.table(salinanProyek);

export const kategoriFilm = {
  "aksi": "Aksi",
  "fiksi-ilmiah": "Fiksi Ilmiah",
  "petualangan": "Petualangan",
  "horor": "Horor"
};

export const daftarFilm = [
  {
    judul: "Avengers: Endgame",
    tahun: 2019,
    sutradara: "Anthony Russo & Joe Russo",
    kategori: "aksi",
    rating: 10
  },
  {
    judul: "X-Men",
    tahun: 2000,
    sutradara: "Bryan Singer",
    kategori: "fiksi-ilmiah",
    rating: 8
  },
  {
    judul: "Spider-Man: Brand New Day",
    tahun: "Belum ditentukan",
    sutradara: "Belum ditentukan",
    kategori: "petualangan",
    rating: 7.5
  }
];

console.table(daftarFilm);

export function filterFilm(daftar, kategori) {
  return daftar.filter(
    (film) => kategori === "semua" || film.kategori === kategori
  );
}

export function validasiField(nama, nilai) {
  const teks = String(nilai).trim();

  switch (nama) {
    case "judul":
      return teks === ""
        ? "Judul film wajib diisi. Tulis minimal satu huruf, bukan hanya spasi."
        : "";

    case "tahun": {
      const tahun = Number(teks);
      const valid = teks !== "" && Number.isInteger(tahun) && tahun >= 1900 && tahun <= 2100;
      return valid
        ? ""
        : "Isi tahun dengan angka bulat antara 1900 dan 2100, contoh 2019.";
    }

    case "kategori":
      return Object.hasOwn(kategoriFilm, teks)
        ? ""
        : "Pilih salah satu kategori dari daftar.";

    case "rating": {
      const rating = Number(teks);
      const valid = teks !== "" && rating >= 0 && rating <= 10 && (rating * 2) % 1 === 0;
      return valid
        ? ""
        : "Isi rating 0 sampai 10 dengan kelipatan 0,5, contoh 8 atau 7,5.";
    }

    default:
      return "";
  }
}
