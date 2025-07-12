const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// [REGISTER]
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Cek user sudah terdaftar
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email sudah terdaftar' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Pendaftaran berhasil', user });
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: err.message });
  }
};

// [LOGIN]
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi awal
    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password harus diisi' });
    }

    const user = await User.findOne({ email });
    if (!user || user.deleted) return res.status(404).json({ message: 'User tidak ditemukan' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Password salah' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ message: 'Login berhasil', token, user });
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan', error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || user.deleted) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Gagal ambil data user', detail: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!user || user.deleted) {
      return res.status(404).json({ message: 'User tidak ditemukan untuk diperbarui' });
    }

    res.status(200).json({ message: 'User berhasil diperbarui', user });
  } catch (err) {
    res.status(500).json({ error: 'Gagal update user', detail: err.message });
  }
};

exports.setUserStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({ message: 'Status tidak valid. Gunakan active/inactive' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!user || user.deleted) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    res.status(200).json({ message: `Status user diubah ke ${status}`, user });
  } catch (err) {
    res.status(500).json({ error: 'Gagal ubah status user', detail: err.message });
  }
};

exports.softDeleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan untuk dihapus' });
    }

    res.status(200).json({ message: 'User berhasil dihapus (soft delete)', user });
  } catch (err) {
    res.status(500).json({ error: 'Gagal soft delete user', detail: err.message });
  }
};
