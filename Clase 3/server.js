const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Servir archivos estáticos
app.use(express.static(__dirname));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log('🌌 ========================================');
    console.log('🚀 Sistema Solar con Babylon.js');
    console.log('🌍 Servidor ejecutándose en:');
    console.log(`   http://localhost:${PORT}`);
    console.log('🌌 ========================================');
    console.log('');
    console.log('📍 Presiona Ctrl+C para detener el servidor');
});
