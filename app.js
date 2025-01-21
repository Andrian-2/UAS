const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'DBUAS'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Koneksi ke database berhasil!');
});

// Get all mata kuliah
app.get('/api/matakuliah', (req, res) => {
  connection.query('SELECT * FROM Matakuliah', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Create a new mata kuliah
app.post('/api/matakuliah', (req, res) => {
  const { nama_mk, semester_mk, sks_mk, keterangan_mk } = req.body;
  connection.query('INSERT INTO Matakuliah (nama_mk, semester_mk, sks_mk, keterangan_mk) VALUES (?, ?, ?, ?)', [nama_mk, semester_mk, sks_mk, keterangan_mk], (error, results) => {
    if (error) throw error;
    res.status(201).send('Mata kuliah berhasil ditambahkan');
  });
});

// Update a mata kuliah
app.put('/api/matakuliah/:id', (req, res) => {
  const { id } = req.params;
  const { nama_mk, semester_mk, sks_mk, keterangan_mk } = req.body;
  connection.query('UPDATE Matakuliah SET nama_mk = ?, semester_mk = ?, sks_mk = ?, keterangan_mk = ? WHERE id = ?', [nama_mk, semester_mk, sks_mk, keterangan_mk, id], (error, results) => {
    if (error) throw error;
    res.send('Mata kuliah berhasil diperbarui');
  });
});

// Delete a mata kuliah
app.delete('/api/matakuliah/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM Matakuliah WHERE id = ?', [id], (error, results) => {
    if (error) throw error;
    res.send('Mata kuliah berhasil dihapus');
  });
});

// Render index.ejs
app.get('/', (req, res) => {
  connection.query('SELECT * FROM Matakuliah', (error, results) => {
    if (error) throw error;
    res.render('index', { mataKuliah: results });
  });
});

app.set('view engine', 'ejs');
app.listen(3000, () => {
  console.log('Server berjalan di port 3000');
});
