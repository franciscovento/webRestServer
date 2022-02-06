require('dotenv').config();

// Importaciones modules
const express = require('express');

// Establezco puerto a utilizar

const PORT = process.env.PORT;

// construyo aplicación
const app = express();

app.get('/', (req, res) => {
  res.send('Hola mundo');
})

app.listen(PORT, () => {
  console.log('aplicación corriendo en el puerto ' + PORT)
});


