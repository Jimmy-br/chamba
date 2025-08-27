const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pingRoutes = require('./routes/pingRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares (funcionan como puente)
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/ping', pingRoutes);
app.use('/api/users', userRoutes);


// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
