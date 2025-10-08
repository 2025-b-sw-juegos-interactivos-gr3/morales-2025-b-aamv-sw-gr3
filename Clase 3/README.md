# 🌌 Sistema Solar con Babylon.js

Una visualización interactiva en 3D de nuestro sistema solar creada con Babylon.js.

## 🚀 Características

- ☀️ Sol con efecto de brillo
- 🪐 Los 8 planetas con movimiento orbital realista
- 💫 Anillos de Saturno
- ⭐ Campo de estrellas de fondo (2000 estrellas)
- 🎮 Controles de cámara interactivos
- 🎨 Colores y tamaños representativos de cada planeta

## 📦 Estructura del Proyecto

```
babylon js/
├── index.html    # Página principal con canvas
├── app.js        # Lógica del sistema solar
└── README.md     # Este archivo
```

## 🎮 Controles

- **Click izquierdo + arrastrar**: Rotar la cámara
- **Rueda del mouse**: Zoom in/out
- **Click derecho + arrastrar**: Mover la cámara (pan)

## 🌍 Planetas Incluidos

1. ☀️ Sol (centro, con brillo)
2. ☿️ Mercurio
3. ♀️ Venus
4. 🌍 Tierra
5. ♂️ Marte
6. ♃ Júpiter
7. ♄ Saturno (con anillos)
8. ♅ Urano
9. ♆ Neptuno

## 🚀 Cómo Ejecutar Localmente

### Opción 1: Usando un Servidor HTTP Simple

#### Con Python (si lo tienes instalado):
```bash
# Python 3
python -m http.server 8000
```

Luego abre tu navegador en: `http://localhost:8000`

#### Con Node.js (si lo tienes instalado):
```bash
# Instala http-server globalmente (solo una vez)
npm install -g http-server

# Ejecuta el servidor
http-server
```

Luego abre tu navegador en: `http://localhost:8080`

#### Con PowerShell (Windows):
```powershell
# Navega a la carpeta del proyecto
cd "c:\Users\ariel.morales\Downloads\babylon js"

# Si tienes Python instalado
python -m http.server 8000

# O puedes usar la extensión Live Server de VS Code
```

### Opción 2: Usando VS Code Live Server

1. Instala la extensión "Live Server" en VS Code
2. Haz click derecho en `index.html`
3. Selecciona "Open with Live Server"

### Opción 3: Abrir directamente en el navegador

En algunos navegadores modernos, puedes abrir directamente el archivo `index.html`, pero puede tener restricciones de CORS. Se recomienda usar un servidor local.

## 🎨 Personalización

Puedes modificar los parámetros en `app.js`:

```javascript
const planetData = {
    // Ajusta: size, distance, speed, color
    tierra: { 
        size: 1,              // Tamaño del planeta
        distance: 15,         // Distancia del sol
        speed: 2.98,          // Velocidad orbital
        color: new BABYLON.Color3(0.2, 0.4, 0.8) // Color RGB
    },
    // ...
};
```

## 📚 Tecnologías Utilizadas

- **Babylon.js**: Motor de renderizado 3D
- **JavaScript**: Lógica de la aplicación
- **HTML5 Canvas**: Renderizado gráfico
- **CSS3**: Estilos de la interfaz

## 🌟 Características Avanzadas

- **Sistema de partículas**: Campo de estrellas procedurales
- **Iluminación dinámica**: Luz puntual desde el Sol
- **Efectos de brillo**: GlowLayer para el Sol
- **Cámara ArcRotate**: Controles intuitivos de órbita
- **Animación en tiempo real**: 60 FPS

## 📝 Notas

- Las distancias y tamaños están escalados para mejor visualización
- Las velocidades orbitales son proporcionales a las reales pero aceleradas
- Los planetas rotan sobre su propio eje mientras orbitan el Sol

## 🐛 Solución de Problemas

**Problema**: La página no carga correctamente
- **Solución**: Asegúrate de usar un servidor local (no abrir el archivo directamente)

**Problema**: No veo los planetas
- **Solución**: Usa la rueda del mouse para hacer zoom out

**Problema**: Rendimiento lento
- **Solución**: Reduce el número de estrellas en `createStarField()` (línea `const starCount = 2000;`)

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.

---

¡Disfruta explorando el sistema solar! 🚀✨
