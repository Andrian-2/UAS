const mysql = require('mysql');

// Membuat koneksi ke database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // ganti dengan password MySQL Anda
  database: 'DBUAS' // nama database yang ingin Anda buat
});

connection.connect((err) => {
  if (err) {
    console.error('Koneksi ke database gagal: ' + err.stack);
    return;
  }
  console.log('Terhubung ke database sebagai id ' + connection.threadId);
});

// Membuat database jika belum ada
connection.query('CREATE DATABASE IF NOT EXISTS DBUAS', (err, result) => {
  if (err) throw err;
  console.log('Database DBUAS dibuat atau sudah ada.');
});

// Memilih database yang baru dibuat
connection.changeUser({database : 'DBUAS'}, (err) => {
  if (err) throw err;
  console.log('Database DBUAS dipilih.');
});

// Membuat tabel Matakuliah
const createTableQuery = `
CREATE TABLE IF NOT EXISTS Matakuliah (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama_mk VARCHAR(90),
  semester_mk INT,
  sks_mk INT,
  keterangan_mk VARCHAR(200)
)`;

connection.query(createTableQuery, (err, result) => {
  if (err) throw err;
  console.log('Tabel Matakuliah dibuat atau sudah ada.');
});

// Menambahkan dua record ke dalam tabel Matakuliah
const insertRecordsQuery = `
INSERT INTO Matakuliah (nama_mk, semester_mk, sks_mk, keterangan_mk)
VALUES ('Matematika Diskrit', 1, 3, 'Matakuliah dasar'),
       ('Pemrograman Web', 3, 4, 'Matakuliah lanjutan')`;

connection.query(insertRecordsQuery, (err, result) => {
  if (err) throw err;
  console.log('Dua record ditambahkan ke dalam tabel Matakuliah.');
});

connection.end();
