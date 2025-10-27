const pool = require('../config/db');
const User = require('../models/userModel');

// Crear usuario
exports.createUser = async (req, res) => {
  try {
    const { role } = req.body;
    const uid = req.uid;
    const email = req.email;

    if (!uid || !email || !role) {
      return res.status(400).json({ message: 'Datos incompletos' });
    }

    const [result] = await pool.query(
      "INSERT INTO users (uid, email, role, createdAt) VALUES (?, ?, ?, NOW())",
      [uid, email, role]
    );

    return res.status(201).json({
      message: 'Usuario creado correctamente',
      userId: result.insertId,
      uid_firebase: uid,
      email,
      role
    });
  } catch (error) {
    console.error('Error creando usuario:', error);
    return res.status(500).json({ message: 'Error creando usuario en la base de datos' });
  }
};

// GET Obtener usuario por uid
exports.getUserByUid = async (req, res) => {
  const { uid } = req;
  try {
    const [rows] = await pool.query(
      "SELECT id, uid, email, role, firstName, lastName FROM users WHERE uid = ?",
      [uid]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    res.status(500).json({ message: "Error obteniendo usuario" });
  }
};

// PUT Actualizar usuario por uid
exports.updateUser = async (req, res) => {
  const { uid } = req;
  const {
    firstName,
    lastName,
    secondLastName,
    idType,
    idNumber,
    phone,
    birthDate,
    isOver18
  } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE users
       SET firstName = ?, 
           lastName = ?, 
           secondLastName = ?, 
           idType = ?, 
           idNumber = ?, 
           phone = ?, 
           birthDate = ?, 
           isOver18 = ?, 
           updatedAt = NOW()
       WHERE uid = ?`,
      [
        firstName || null,
        lastName || null,
        secondLastName || null,
        idType || null,
        idNumber || null,
        phone || null,
        birthDate || null,
        isOver18 ? 1 : 0,
        uid
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    res.status(500).json({ message: "Error actualizando usuario" });
  }
};

// PUT /api/users/:uid/location
exports.updateUserLocation = async (req, res) => {
  const { uid } = req;
  const { province, canton, district, exactAddress } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE users
       SET province = ?, canton = ?, district = ?, exactAddress = ?, updatedAt = NOW()
       WHERE uid = ?`,
      [province, canton, district, exactAddress, uid]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Ubicación actualizada correctamente' });
  } catch (error) {
    console.error('Error actualizando ubicación:', error);
    res.status(500).json({ message: 'Error actualizando ubicación' });
  }
};
