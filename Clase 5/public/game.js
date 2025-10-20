// Variables globales
let canvas, engine, scene, camera, yeti, cameraTargetNode;
let inputMap = {};
let isRunning = false;
let idleAnimation = null;
let walkAnimation = null;
let currentAnimation = null;

// Configuración del juego
const gameConfig = {
    walkSpeed: 0.15,
    runSpeed: 0.3,
    rotationSpeed: 0.03,
    cameraDistance: 9,
    cameraHeight: 8,
    cameraTargetHeight: 1.6,
    cameraAlpha: -Math.PI / 2,
    cameraBeta: 1.3,
    rotationSmoothness: 0.25
};

// Inicializar el juego
window.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('renderCanvas');
    engine = new BABYLON.Engine(canvas, true);
    
    createScene();
    
    engine.runRenderLoop(() => {
        scene.render();
    });
    
    window.addEventListener('resize', () => {
        engine.resize();
    });
});

// Crear la escena principal
function createScene() {
    scene = new BABYLON.Scene(engine);
    // Cielo negro profundo para contraste dramático
    scene.clearColor = new BABYLON.Color3(0, 0, 0.02);
    
    // Niebla muy sutil para profundidad
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogDensity = 0.005;
    scene.fogColor = new BABYLON.Color3(0.02, 0.02, 0.05);
    
    // Crear cielo estrellado
    createStarrySkye();
    // Crear cielo estrellado
    createStarrySkye();
    
    // Cámara en tercera persona - Posicionada DETRÁS del personaje
    camera = new BABYLON.ArcRotateCamera(
        "camera",
        gameConfig.cameraAlpha,
        gameConfig.cameraBeta,
        gameConfig.cameraDistance,
        new BABYLON.Vector3(0, 4, 0),
        scene
    );
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 6;
    camera.upperRadiusLimit = 15;
    camera.lowerBetaLimit = 1.05;
    camera.upperBetaLimit = 1.45;
    
    // Iluminación dramática nocturna
    const ambientLight = new BABYLON.HemisphericLight(
        "ambient",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );
    ambientLight.intensity = 0.08; // Ligeramente mayor para ver las zonas iluminadas
    ambientLight.diffuse = new BABYLON.Color3(0.15, 0.15, 0.25);
    ambientLight.groundColor = new BABYLON.Color3(0.08, 0.08, 0.15);
    
    // Luz direccional de la luna - DRAMÁTICA y fuerte
    const moonLight = new BABYLON.DirectionalLight(
        "moonLight",
        new BABYLON.Vector3(0.5, -1, 0.5),
        scene
    );
    moonLight.intensity = 2.0; // Aumentada para ver mejor el efecto
    moonLight.diffuse = new BABYLON.Color3(1.0, 1.0, 1.2);
    moonLight.specular = new BABYLON.Color3(0.9, 0.9, 1.0);
    
    // Habilitar sombras para efecto dramático
    const shadowGenerator = new BABYLON.ShadowGenerator(1024, moonLight);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurScale = 2;
    shadowGenerator.setDarkness(0.7);
    
    // Guardar el generador de sombras globalmente
    scene.shadowGenerator = shadowGenerator;
    
    // Crear luna visible en el cielo
    createMoon();
    
    // Crear el suelo del bosque
    createForestGround();
    
    // Crear árboles
    createTrees();
    
    // Cargar el personaje Yeti
    loadYeti();
    
    // Input del teclado
    setupInput();
    
    // Ocultar loading
    document.getElementById('loading').style.display = 'none';
    
    return scene;
}

// Crear cielo estrellado
function createStarrySkye() {
    // Crear una skybox con estrellas
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
    const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;
    
    // Color negro del cielo
    skyboxMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0.05);
    
    // Crear estrellas como partículas
    const starField = new BABYLON.ParticleSystem("stars", 3000, scene);
    
    // No usar textura, solo puntos blancos
    starField.particleTexture = new BABYLON.Texture(
        "https://playground.babylonjs.com/textures/flare.png",
        scene
    );
    
    // Emisor en el centro
    starField.emitter = BABYLON.Vector3.Zero();
    starField.minEmitBox = new BABYLON.Vector3(-400, 50, -400);
    starField.maxEmitBox = new BABYLON.Vector3(400, 200, 400);
    
    // Estrellas blancas brillantes
    starField.color1 = new BABYLON.Color4(1, 1, 1, 1);
    starField.color2 = new BABYLON.Color4(0.9, 0.9, 1, 1);
    starField.colorDead = new BABYLON.Color4(1, 1, 1, 1);
    
    // Tamaño pequeño para parecer estrellas
    starField.minSize = 0.3;
    starField.maxSize = 1.5;
    
    // Vida infinita
    starField.minLifeTime = 999999;
    starField.maxLifeTime = 999999;
    
    // Emitir todas de una vez
    starField.emitRate = 3000;
    starField.manualEmitCount = 3000;
    
    // Sin movimiento
    starField.minEmitPower = 0;
    starField.maxEmitPower = 0;
    starField.updateSpeed = 0.001;
    
    starField.start();
}

// Crear la luna visible en el cielo
function createMoon() {
    // Luna grande y visible en el cielo
    const moon = BABYLON.MeshBuilder.CreateSphere(
        "moon",
        { diameter: 25, segments: 32 },
        scene
    );
    // Posición visible en el cielo - más cerca y arriba
    moon.position = new BABYLON.Vector3(50, 80, 50);
    
    const moonMaterial = new BABYLON.StandardMaterial("moonMat", scene);
    // La luna brilla con luz propia - más brillante
    moonMaterial.emissiveColor = new BABYLON.Color3(1.2, 1.2, 1);
    moonMaterial.diffuseColor = new BABYLON.Color3(1, 1, 0.95);
    moonMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    moonMaterial.ambientColor = new BABYLON.Color3(1, 1, 1);
    
    // Hacer que no se vea afectada por la niebla
    moon.material = moonMaterial;
    moon.applyFog = false;
    
    // Agregar un brillo alrededor de la luna
    const glowLayer = new BABYLON.GlowLayer("glow", scene);
    glowLayer.intensity = 1.2;
    glowLayer.addIncludedOnlyMesh(moon);
    
    console.log("Luna creada en posición:", moon.position);
}

// Crear el suelo del bosque
function createForestGround() {
    const ground = BABYLON.MeshBuilder.CreateGround(
        "ground",
        { width: 200, height: 200, subdivisions: 32 },
        scene
    );
    
    const groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
    
    // Colores que responden a la iluminación
    groundMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.3, 0.2);
    groundMaterial.specularColor = new BABYLON.Color3(0.4, 0.4, 0.5);
    groundMaterial.ambientColor = new BABYLON.Color3(0.1, 0.15, 0.1);
    
    // Textura de césped
    groundMaterial.diffuseTexture = new BABYLON.Texture(
        "https://playground.babylonjs.com/textures/grass.png",
        scene
    );
    groundMaterial.diffuseTexture.uScale = 25;
    groundMaterial.diffuseTexture.vScale = 25;
    
    ground.material = groundMaterial;
    ground.receiveShadows = true;
}

// Crear árboles en el bosque
function createTrees() {
    const treeCount = 80;
    
    for (let i = 0; i < treeCount; i++) {
        const x = Math.random() * 180 - 90;
        const z = Math.random() * 180 - 90;
        
        // Evitar crear árboles muy cerca del centro
        if (Math.abs(x) < 15 && Math.abs(z) < 15) continue;
        
        createTree(x, z);
    }
}

// Crear un árbol individual
function createTree(x, z) {
    const height = 5 + Math.random() * 3;
    
    // Tronco
    const trunk = BABYLON.MeshBuilder.CreateCylinder(
        "trunk",
        { height: height, diameter: 0.5 + Math.random() * 0.3 },
        scene
    );
    trunk.position = new BABYLON.Vector3(x, height / 2, z);
    
    const trunkMat = new BABYLON.StandardMaterial("trunkMat" + Math.random(), scene);
    // Colores que responden bien a la luz
    trunkMat.diffuseColor = new BABYLON.Color3(0.4, 0.3, 0.2);
    trunkMat.specularColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    trunkMat.ambientColor = new BABYLON.Color3(0.2, 0.15, 0.1);
    trunk.material = trunkMat;
    
    // Agregar sombras al tronco
    if (scene.shadowGenerator) {
        scene.shadowGenerator.addShadowCaster(trunk);
    }
    
    // Copa del árbol - configurada para recibir luz
    const foliage = BABYLON.MeshBuilder.CreateSphere(
        "foliage",
        { diameter: 3 + Math.random() * 2, segments: 16 },
        scene
    );
    foliage.position = new BABYLON.Vector3(x, height + 2, z);
    foliage.scaling.y = 1.2;
    
    const foliageMat = new BABYLON.StandardMaterial("foliageMat" + Math.random(), scene);
    // Color base oscuro pero que responde a la luz
    foliageMat.diffuseColor = new BABYLON.Color3(0.15, 0.3, 0.15);
    foliageMat.specularColor = new BABYLON.Color3(0.2, 0.3, 0.2);
    foliageMat.ambientColor = new BABYLON.Color3(0.08, 0.15, 0.08);
    foliage.material = foliageMat;
    
    // Agregar sombras a la copa
    if (scene.shadowGenerator) {
        scene.shadowGenerator.addShadowCaster(foliage);
    }
}

// Cargar el modelo Yeti
function loadYeti() {
    console.log("Cargando modelo del personaje desde assets...");
    
    // Cargar el modelo Medieval desde la carpeta assets
    BABYLON.SceneLoader.ImportMesh(
        "",
        "./assets/",
        "Medieval.gltf",
        scene,
        function (meshes) {
            console.log("Modelo cargado exitosamente!", meshes);
            console.log("Lista de meshes:", meshes.map(m => m.name));
            
            if (meshes.length === 0) {
                console.error("No se cargaron meshes");
                createPlaceholder();
                return;
            }
            
            // Buscar el nodo raíz del modelo (usualmente el primero o el __root__)
            yeti = meshes[0];
            
            // Buscar el transform node raíz si existe
            for (let i = 0; i < meshes.length; i++) {
                if (meshes[i].name === "__root__" || meshes[i].name.includes("root") || 
                    meshes[i].name.includes("Root") || meshes[i].name.includes("Armature")) {
                    yeti = meshes[i];
                    console.log("Nodo raíz encontrado:", meshes[i].name);
                    break;
                }
            }
            
            console.log("Usando mesh raíz:", yeti.name);
            console.log("Tipo de nodo:", yeti.constructor.name);
            
            yeti.position = new BABYLON.Vector3(0, 0, 0);
            yeti.rotation = new BABYLON.Vector3(0, 0, 0);
            
            // Calcular el tamaño del modelo y ajustar escala
            const boundingVectors = yeti.getHierarchyBoundingVectors(true);
            const sizeVec = boundingVectors.max.subtract(boundingVectors.min);
            const maxDimension = Math.max(sizeVec.x, sizeVec.y, sizeVec.z);
            
            // Escalar para que tenga aproximadamente 3 unidades de altura
            const targetSize = 3;
            const scale = targetSize / maxDimension;
            yeti.scaling = new BABYLON.Vector3(scale, scale, scale);
            
            console.log("Escala aplicada:", scale);
            console.log("Posición inicial:", yeti.position);
            console.log("Rotación inicial:", yeti.rotation);
            
            // Configurar animaciones
            setupAnimations();
            
            // Agregar sombras a todos los meshes del modelo
            if (scene.shadowGenerator) {
                meshes.forEach(mesh => {
                    if (mesh.getTotalVertices && mesh.getTotalVertices() > 0) {
                        scene.shadowGenerator.addShadowCaster(mesh);
                    }
                });
            }
            
            attachCameraToYeti();
        },
        function (evt) {
            // Progreso de carga
            if (evt.lengthComputable) {
                const percent = (evt.loaded * 100 / evt.total).toFixed();
                console.log("Cargando modelo: " + percent + "%");
            }
        },
        function (scene, message, exception) {
            console.error("Error al cargar el modelo:", message, exception);
            createPlaceholder();
        }
    );
}

// Crear personaje placeholder
function createPlaceholder() {
    console.log("Creando personaje placeholder");
    
    yeti = BABYLON.MeshBuilder.CreateCapsule(
        "character",
        { height: 3, radius: 0.8 },
        scene
    );
    yeti.position = new BABYLON.Vector3(0, 1.5, 0);
    
    const characterMat = new BABYLON.StandardMaterial("characterMat", scene);
    characterMat.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.85);
    characterMat.specularColor = new BABYLON.Color3(0.3, 0.3, 0.4);
    characterMat.emissiveColor = new BABYLON.Color3(0.05, 0.05, 0.08);
    yeti.material = characterMat;
    
    // Agregar sombras al placeholder
    if (scene.shadowGenerator) {
        scene.shadowGenerator.addShadowCaster(yeti);
    }
    
    attachCameraToYeti();
}

// Alinear la cámara para que siga al personaje sin lag
function attachCameraToYeti() {
    if (!camera || !yeti) return;

    if (cameraTargetNode) {
        cameraTargetNode.dispose();
    }

    cameraTargetNode = new BABYLON.TransformNode("cameraTarget", scene);
    cameraTargetNode.parent = yeti;
    cameraTargetNode.position = new BABYLON.Vector3(0, gameConfig.cameraTargetHeight, 0);

    camera.lockedTarget = cameraTargetNode;
    camera.radius = gameConfig.cameraDistance;
}

// Configurar animaciones del personaje
function setupAnimations() {
    if (!scene.animationGroups || scene.animationGroups.length === 0) {
        console.log("No se encontraron animaciones en el modelo");
        return;
    }
    
    console.log("Animaciones disponibles:", scene.animationGroups.map(ag => ag.name));
    
    // Buscar animaciones por nombre común
    scene.animationGroups.forEach(animGroup => {
        const name = animGroup.name.toLowerCase();
        
        // Identificar animación de idle/parado
        if (name.includes('idle') || name.includes('stand') || name.includes('pose')) {
            idleAnimation = animGroup;
            console.log("Animación idle encontrada:", animGroup.name);
        }
        
        // Identificar animación de caminar
        if (name.includes('walk') || name.includes('run') || name.includes('jog')) {
            walkAnimation = animGroup;
            console.log("Animación walk encontrada:", animGroup.name);
        }
    });
    
    // Si no se encontraron animaciones específicas, usar las primeras disponibles
    if (!idleAnimation && scene.animationGroups.length > 0) {
        idleAnimation = scene.animationGroups[0];
        console.log("Usando primera animación como idle:", idleAnimation.name);
    }
    
    if (!walkAnimation && scene.animationGroups.length > 1) {
        walkAnimation = scene.animationGroups[1];
        console.log("Usando segunda animación como walk:", walkAnimation.name);
    }
    
    // Si solo hay una animación, usarla para ambas
    if (!walkAnimation && idleAnimation) {
        walkAnimation = idleAnimation;
    }
    
    // Iniciar con animación idle
    playIdleAnimation();
}

// Reproducir animación idle
function playIdleAnimation() {
    if (!idleAnimation) return;
    
    if (currentAnimation === 'idle') return; // Ya está en idle
    
    // Detener animación actual
    if (walkAnimation) {
        walkAnimation.stop();
    }
    
    // Iniciar idle en loop
    idleAnimation.start(true, 1.0, idleAnimation.from, idleAnimation.to, false);
    currentAnimation = 'idle';
}

// Reproducir animación de caminar
function playWalkAnimation() {
    if (!walkAnimation) return;
    
    if (currentAnimation === 'walk') return; // Ya está caminando
    
    // Detener animación actual
    if (idleAnimation) {
        idleAnimation.stop();
    }
    
    // Iniciar walk en loop
    const speed = isRunning ? 1.5 : 1.0; // Más rápido si está corriendo
    walkAnimation.start(true, speed, walkAnimation.from, walkAnimation.to, false);
    currentAnimation = 'walk';
}

// Configurar input del teclado
function setupInput() {
    scene.actionManager = new BABYLON.ActionManager(scene);
    
    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyDownTrigger,
            function (evt) {
                inputMap[evt.sourceEvent.key.toLowerCase()] = true;
                if (evt.sourceEvent.key.toLowerCase() === 'shift') {
                    isRunning = true;
                }
            }
        )
    );
    
    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyUpTrigger,
            function (evt) {
                inputMap[evt.sourceEvent.key.toLowerCase()] = false;
                if (evt.sourceEvent.key.toLowerCase() === 'shift') {
                    isRunning = false;
                }
            }
        )
    );
    
    // Update loop para movimiento
    scene.onBeforeRenderObservable.add(() => {
        if (yeti) {
            updateYetiMovement();
            updateCamera();
        }
    });
}

// Actualizar movimiento del Yeti
function updateYetiMovement() {
    if (!yeti) return;
    
    const speed = isRunning ? gameConfig.runSpeed : gameConfig.walkSpeed;

    // Calcular direcciones basadas en la posición real de la cámara
    const cameraForward = camera.getDirection(BABYLON.Axis.Z);
    cameraForward.y = 0;
    const forwardLength = cameraForward.lengthSquared();
    if (forwardLength < 0.0001) {
        cameraForward.copyFromFloats(0, 0, 1);
    } else {
        cameraForward.normalize();
    }

    const cameraRight = camera.getDirection(BABYLON.Axis.X);
    cameraRight.y = 0;
    const rightLength = cameraRight.lengthSquared();
    if (rightLength < 0.0001) {
        cameraRight.copyFromFloats(1, 0, 0);
    } else {
        cameraRight.normalize();
    }
    
    let moveDirection = BABYLON.Vector3.Zero();
    let isMoving = false;
    
    // W: avanzar en la dirección de la cámara
    if (inputMap['w']) {
        moveDirection.addInPlace(cameraForward);
        isMoving = true;
    }
    // S: retroceder en la dirección opuesta a la cámara
    if (inputMap['s']) {
        moveDirection.addInPlace(cameraForward.scale(-1));
        isMoving = true;
    }
    // A: moverse a la izquierda de la cámara
    if (inputMap['a']) {
        moveDirection.addInPlace(cameraRight.scale(-1));
        isMoving = true;
    }
    // D: moverse a la derecha de la cámara
    if (inputMap['d']) {
        moveDirection.addInPlace(cameraRight);
        isMoving = true;
    }
    
    // Controlar animaciones y movimiento
    if (isMoving) {
        const moveStrength = moveDirection.lengthSquared();
        if (moveStrength < 0.0001) {
            playIdleAnimation();
            return;
        }

        playWalkAnimation();

        moveDirection.normalize();

        yeti.position.x += moveDirection.x * speed;
        yeti.position.z += moveDirection.z * speed;
        
        // Calcular el ángulo de rotación basado en la dirección del movimiento
        const targetRotation = Math.atan2(moveDirection.x, moveDirection.z);
        
        // Aplicar la rotación con interpolación suave
        const currentRotation = yeti.rotation.y;
        let rotationDiff = targetRotation - currentRotation;
        
        // Normalizar la diferencia para que esté entre -PI y PI
        while (rotationDiff > Math.PI) rotationDiff -= 2 * Math.PI;
        while (rotationDiff < -Math.PI) rotationDiff += 2 * Math.PI;
        
        // Aplicar rotación suave
        yeti.rotation.y += rotationDiff * gameConfig.rotationSmoothness;
        
        // Ajustar velocidad de animación si está corriendo
        if (walkAnimation) {
            walkAnimation.speedRatio = isRunning ? 1.5 : 1.0;
        }
    } else {
        // Si no se mueve, reproducir animación idle
        playIdleAnimation();
    }
    
    // Limitar el área de movimiento
    yeti.position.x = Math.max(-95, Math.min(95, yeti.position.x));
    yeti.position.z = Math.max(-95, Math.min(95, yeti.position.z));
}

// Actualizar posición de la cámara para seguir al Yeti
function updateCamera() {
    if (!camera) return;

    // Rotar la cámara con las flechas para ángulos predecibles
    if (inputMap['arrowleft']) {
        camera.alpha -= gameConfig.rotationSpeed;
    }
    if (inputMap['arrowright']) {
        camera.alpha += gameConfig.rotationSpeed;
    }
}
