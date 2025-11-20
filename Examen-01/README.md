# 🤖 Robot de Fábrica - Juego 3D con Babylon.js

Juego 3D industrial donde controlas un robot que recoge componentes de una línea de ensamblaje y los entrega en otra. Con dificultad progresiva que aumenta cada entrega.

## 🎮 Controles

- **W, A, S, D** - Mover robot
- **ESPACIO / E** - Recoger/Entregar componente
- **Mouse** - Rotar cámara

## ✨ Características

### 🎨 Visuales
- **Modelos 3D GLTF reales** con animaciones
- **Robot animado** con animación de caminar realista
- **Componente 3D** cargado desde archivo GLTF
- Texturas (suelo industrial, materiales PBR)
- Materiales metálicos con reflexiones
- Líneas de ensamblaje con rodillos rotatorios
- Animaciones suaves (caminar, recogida, entrega, respiración)

### 🔊 Audio
- Sistema de sonidos procedurales (Web Audio API)
- Beep al recoger, doble beep al entregar
- Sonido de error en colisiones

### 🎯 Dificultad Progresiva (CADA ENTREGA = NIVEL NUEVO)
- **Nivel 1**: Velocidad normal, sin obstáculos
- **Nivel 2+**: 
  - Velocidad reduce 2% por nivel (mínimo 50%)
  - 2-3 obstáculos nuevos por nivel
  - Zonas cambian a 8 posiciones aleatorias
  - Componente aparece en zona de recogida actual

### ⚠️ Sistema de Colisiones
- Colisión física real (no atraviesas obstáculos)
- Efecto shake visual en UI
- Sonido de error al chocar
- Radio de colisión: 0.8 unidades

### 📍 Zonas Dinámicas
- 8 posiciones posibles en el mapa
- Cambio animado cada nivel
- Componente sigue a zona de recogida

## 🚀 Instalación

```bash
npm install
npm start
```

Abrir http://localhost:3000

## 📁 Estructura

```
Examen-01/
├── server.js             # Servidor Express
├── package.json          # Dependencias
├── .gitignore
├── public/
│   ├── index.html        # UI del juego
│   └── js/
│       ├── game.js       # Lógica principal con carga GLTF
│       └── sounds.js     # Generador de audio
└── assets/
    ├── models/           # Modelos GLTF
    │   ├── robot.glb     # Robot animado (490KB)
    │   └── component.glb # Componente 3D (1.6KB)
    └── textures/         # Texturas (floor.jpg, checker.png)
```

## 📝 Requisitos Cumplidos

✅ Jugador controlable (WASD)  
✅ Paquete recogible  
✅ Zonas de recogida/entrega  
✅ Mecánica pickup/delivery (ESPACIO/E)  
✅ Estado del juego  
✅ Node.js estructurado  
✅ .gitignore  
✅ Texturas y modelos  
✅ Sonidos  
✅ Dificultad progresiva cada entrega  
✅ Colisiones reales  
✅ Zonas dinámicas que cambian ubicación  

## 🎯 Progresión del Juego

| Entrega | Nivel | Velocidad | Obstáculos | Zonas |
|---------|-------|-----------|------------|-------|
| 0       | 1     | 100%      | 0          | Fijas |
| 1       | 2     | 98%       | 2          | Móviles |
| 2       | 3     | 96%       | 5          | Móviles |
| 3       | 4     | 94%       | 8          | Móviles |
| 5+      | 6+    | ~50%      | 15+        | Móviles |

## 🛠️ Tecnologías

- **Babylon.js 5+** - Motor 3D WebGL con carga GLTF
- **GLTF/GLB** - Modelos 3D con animaciones
- **Node.js + Express** - Servidor
- **Web Audio API** - Sonidos procedurales
- **Vanilla JS** - Sin frameworks adicionales

## 🎬 Animaciones

- **Caminar**: El robot tiene animación realista que se activa al moverse
- **Velocidad dinámica**: La animación se ajusta a la velocidad actual del robot
- **Rotación suave**: El robot rota hacia la dirección del movimiento
- **Efectos de componente**: Respiración cuando está en mano, rotación cuando está en suelo

## 👤 Autor

Alexander Morales - 2025

---

**¡Cada entrega aumenta la dificultad!** 🎯
