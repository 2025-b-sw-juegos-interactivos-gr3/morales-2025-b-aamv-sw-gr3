const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Servir archivos estáticos de public
app.use(express.static(path.join(__dirname, 'public')));

// Servir archivos estáticos de assets (modelos 3D)
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🎮 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`👻 Juego de terror en el bosque listo para jugar!`);
});
