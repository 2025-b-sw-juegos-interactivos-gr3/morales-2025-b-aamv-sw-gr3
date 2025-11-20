// ===== CONFIGURACIÓN DEL JUEGO =====
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

// Variables de estado del juego
let componenteEnMano = false;
let componentesEntregados = 0;
let inputMap = {};
let robot = null;
let componente = null;
let soundGenerator = null;

// Referencias a elementos UI
const statusElement = document.getElementById("status");
const scoreElement = document.getElementById("score");
const nivelElement = document.getElementById("nivel");

// Constantes de juego
const VELOCIDAD_ROBOT_BASE = 0.1;
const DISTANCIA_INTERACCION = 2.5;
const OFFSET_COMPONENTE = new BABYLON.Vector3(0.6, 0.8, 0); // Al lado del robot Mech

// Variables de dificultad
let velocidadRobot = VELOCIDAD_ROBOT_BASE;
let nivelDificultad = 1;
let componentesParaNivel = 1; // Componentes necesarios para subir nivel
let obstaculos = [];
let zonaRecogida = null;
let zonaEntrega = null;
let lineaA = null;
let lineaB = null;

// ===== FUNCIÓN PRINCIPAL: CREAR ESCENA =====
const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    scene.collisionsEnabled = true;
    scene.clearColor = new BABYLON.Color3(0.1, 0.1, 0.15);
    
    // Inicializar sonidos
    soundGenerator = new SoundGenerator();
    console.log("🔊 Sistema de sonidos inicializado");

    // ===== CÁMARA =====
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        -Math.PI / 2,
        Math.PI / 3,
        20,
        new BABYLON.Vector3(0, 0, 0),
        scene
    );
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 10;
    camera.upperRadiusLimit = 40;

    // ===== ILUMINACIÓN =====
    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );
    light.intensity = 0.8;

    // Luz direccional para sombras
    const dirLight = new BABYLON.DirectionalLight(
        "dirLight",
        new BABYLON.Vector3(-1, -2, -1),
        scene
    );
    dirLight.position = new BABYLON.Vector3(20, 40, 20);
    dirLight.intensity = 0.5;

    // ===== MATERIALES =====
    
    // Material del robot (azul metálico con textura procedural)
    const matRobot = new BABYLON.StandardMaterial("matRobot", scene);
    matRobot.diffuseColor = new BABYLON.Color3(0.2, 0.4, 0.8);
    matRobot.specularColor = new BABYLON.Color3(0.7, 0.7, 0.7);
    matRobot.specularPower = 64;
    matRobot.emissiveColor = new BABYLON.Color3(0.05, 0.05, 0.1);
    
    // Agregar textura checker al robot con callbacks
    const robotTexture = new BABYLON.Texture("/assets/textures/checker.png", scene, 
        false, // noMipmap
        false, // invertY
        BABYLON.Texture.NEAREST_SAMPLINGMODE,
        () => console.log("✅ Textura del robot cargada: checker.png"),
        () => console.error("❌ Error cargando textura del robot")
    );
    robotTexture.uScale = 3;
    robotTexture.vScale = 3;
    matRobot.diffuseTexture = robotTexture;

    // Material del componente (rojo brillante metálico)
    const matComponente = new BABYLON.StandardMaterial("matComponente", scene);
    matComponente.diffuseColor = new BABYLON.Color3(0.9, 0.1, 0.1);
    matComponente.specularColor = new BABYLON.Color3(0.9, 0.9, 0.9);
    matComponente.specularPower = 128;
    matComponente.emissiveColor = new BABYLON.Color3(0.2, 0, 0);

    // Material del suelo (gris industrial)
    const matSuelo = new BABYLON.StandardMaterial("matSuelo", scene);
    matSuelo.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.35);
    matSuelo.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);

    // Material zona de recogida (amarillo)
    const matZonaRecogida = new BABYLON.StandardMaterial("matZonaRecogida", scene);
    matZonaRecogida.diffuseColor = new BABYLON.Color3(1, 0.8, 0);
    matZonaRecogida.alpha = 0.6;
    matZonaRecogida.emissiveColor = new BABYLON.Color3(0.2, 0.15, 0);

    // Material zona de entrega (verde)
    const matZonaEntrega = new BABYLON.StandardMaterial("matZonaEntrega", scene);
    matZonaEntrega.diffuseColor = new BABYLON.Color3(0, 0.8, 0.2);
    matZonaEntrega.alpha = 0.6;
    matZonaEntrega.emissiveColor = new BABYLON.Color3(0, 0.2, 0.05);

    // Material líneas de ensamblaje (metal oscuro)
    const matLinea = new BABYLON.StandardMaterial("matLinea", scene);
    matLinea.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.35);
    matLinea.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    matLinea.specularPower = 32;
    matLinea.emissiveColor = new BABYLON.Color3(0.02, 0.02, 0.02);

    // ===== SUELO DE LA FÁBRICA =====
    const suelo = BABYLON.MeshBuilder.CreateGround(
        "suelo",
        { width: 30, height: 30 },
        scene
    );
    
    // Material del suelo con textura
    const matSueloGrid = new BABYLON.StandardMaterial("matSueloGrid", scene);
    const floorTexture = new BABYLON.Texture("/assets/textures/floor.jpg", scene,
        false, // noMipmap
        false, // invertY  
        BABYLON.Texture.TRILINEAR_SAMPLINGMODE,
        () => console.log("✅ Textura de suelo cargada: floor.jpg"),
        () => console.error("❌ Error cargando textura del suelo")
    );
    floorTexture.uScale = 5;
    floorTexture.vScale = 5;
    matSueloGrid.diffuseTexture = floorTexture;
    matSueloGrid.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    
    suelo.material = matSueloGrid;

    // ===== CARGAR ROBOT MECH.GLB =====
    console.log("🤖 Cargando robot Mech.glb...");
    BABYLON.SceneLoader.ImportMesh("", "/assets/models/", "Mech.glb", scene, function(meshes, particleSystems, skeletons, animationGroups) {
        // Unificamos todos los meshes del modelo bajo un nodo visual y lo movemos mediante un contenedor.
        const rootMesh = meshes.find(mesh => mesh.name === "__root__") || meshes[0];

        rootMesh.computeWorldMatrix(true);
        let initialRotation = BABYLON.Vector3.Zero();
        if (rootMesh.rotationQuaternion) {
            initialRotation = rootMesh.rotationQuaternion.toEulerAngles();
            rootMesh.rotationQuaternion = null;
        } else if (rootMesh.rotation) {
            initialRotation = rootMesh.rotation.clone();
        }

        const forwardVec = BABYLON.Vector3.TransformNormal(
            BABYLON.Axis.Z,
            rootMesh.getWorldMatrix()
        ).normalize();
        const forwardAngle = (() => {
            const angle = Math.atan2(forwardVec.x, forwardVec.z);
            return Number.isFinite(angle) ? angle : 0;
        })();
        const walkDirectionMultiplier = BABYLON.Vector3.Dot(forwardVec, BABYLON.Axis.Z) >= 0 ? 1 : -1;

        const initialPosition = rootMesh.position ? rootMesh.position.clone() : BABYLON.Vector3.Zero();

        const robotVisualRoot = new BABYLON.TransformNode("robotVisualRoot", scene);
        robotVisualRoot.rotationQuaternion = null;
        robotVisualRoot.position = BABYLON.Vector3.Zero();
        robotVisualRoot.rotation = initialRotation.clone();
        // No ajustar rotacion del modelo, dejar su orientacion original

        meshes.forEach(mesh => {
            mesh.setParent(robotVisualRoot, true); // true = mantener transform local
        });

        const robotContainer = new BABYLON.TransformNode("robotPlayer", scene);
        robotContainer.rotationQuaternion = null;
        robotContainer.position = initialPosition;
        robotContainer.rotation = BABYLON.Vector3.Zero();

        robotVisualRoot.parent = robotContainer;

        robot = robotContainer;
        robot.scaling = new BABYLON.Vector3(0.65, 0.65, 0.65);
        robot.position.y = 0.0; // Ajustar altura para que toque el suelo
        robot.rotation.y = 0; // Rotación inicial
        robot.metadata = robot.metadata || {};
        robot.metadata.visualRoot = robotVisualRoot;
        robot.metadata.walkDirectionMultiplier = walkDirectionMultiplier;
        
        console.log("🎬 Animaciones disponibles:", animationGroups.length);
        animationGroups.forEach((anim, index) => {
            console.log(`  ${index}: ${anim.name}`);
        });
        
        const esNodoRaizMovimiento = (target) => {
            if (!target || !target.name) return false;
            const nombre = target.name.toLowerCase();
            return ["root", "hips", "pelvis", "armature", "base"].some(tag => nombre.includes(tag));
        };

        // Buscar animación de caminar
        let walkAnim = animationGroups.find(ag => 
            ag.name.toLowerCase().includes('walk')
        );
        
        // Buscar animación de bailar
        let danceAnim = animationGroups.find(ag => 
            ag.name.toLowerCase().includes('dance')
        );
        
        if (walkAnim) {
            neutralizarTraslacionRaiz(walkAnim);

            // Detección automática: si el root/hips tiene una pista de posición Z y
            // el primer delta de Z (entre los primeros dos frames distintos) es positivo,
            // asumimos que el ciclo fue creado mirando -Z (piernas se mueven inversas) y necesitamos invertir.
            let invertirWalk = false;
            for (const ta of walkAnim.targetedAnimations) {
                const prop = (ta.targetProperty || '').toLowerCase();
                if (!esNodoRaizMovimiento(ta.target)) continue;
                const anim = ta.animation;
                if (!anim) continue;
                const keys = anim.getKeys();
                if (!keys || keys.length < 2) continue;
                // Buscar dos frames con valores diferentes en Z
                let first = null, second = null;
                for (let i = 0; i < keys.length; i++) {
                    const val = keys[i].value;
                    if (val && typeof val === 'object') {
                        if (first === null) {
                            first = val;
                        } else if (second === null && (val.z !== first.z)) {
                            second = val;
                            break;
                        }
                    }
                }
                if (first && second) {
                    const deltaZ = second.z - first.z;
                    // Si deltaZ > 0 el root se mueve +Z; nuestro movimiento hacia adelante es +Z,
                    // pero la mayoría de ciclos Mixamo con frente -Z generan deltaZ < 0. Si deltaZ < 0 no invertimos.
                    // Si al visualizar las piernas se ven invertidas, normalmente deltaZ tendrá el signo contrario.
                    // Decidimos invertir si el signo no coincide con desplazamiento esperado de piernas (deltaZ > 0).
                    if (deltaZ > 0) invertirWalk = true;
                }
            }

            robot.walkAnimation = walkAnim;
            robot.walkAnimation.stop();
            robot.metadata.invertWalk = invertirWalk;
            console.log("Animación caminar:", walkAnim.name, "invertirWalk=", invertirWalk);
        }
        
        if (danceAnim) {
            neutralizarTraslacionRaiz(danceAnim);
            robot.danceAnimation = danceAnim;
            robot.danceAnimation.stop();
            // Calcular duración aproximada (frames / frameRate)
            // Asumimos 60fps si no está definido
            const duration = (danceAnim.to - danceAnim.from) / 60; 
            robot.metadata = robot.metadata || {};
            robot.metadata.danceDuration = duration || 2.0; // Default 2s
            console.log("✅ Animación bailar:", danceAnim.name, "Duración:", robot.metadata.danceDuration);
        }
        
        console.log("✅ Robot Mech cargado exitosamente");
    });
    
    // ===== LÍNEAS DE ENSAMBLAJE =====
    // Línea A (zona de recogida)
    lineaA = crearLineaEnsamblaje(scene, new BABYLON.Vector3(-8, 0.15, 0), "A", matLinea);

    // Línea B (zona de entrega)
    lineaB = crearLineaEnsamblaje(scene, new BABYLON.Vector3(8, 0.15, 0), "B", matLinea);

    // ===== ZONAS =====
    // Zona de recogida (sobre línea A)
    zonaRecogida = BABYLON.MeshBuilder.CreateGround(
        "zonaRecogida",
        { width: 4, height: 4 },
        scene
    );
    zonaRecogida.position = new BABYLON.Vector3(-8, 0.31, 0);
    zonaRecogida.material = matZonaRecogida;
    
    // Crear componente (Cargar box.glb)
    BABYLON.SceneLoader.ImportMesh("", "/assets/models/", "box.glb", scene, function(meshes) {
        componente = meshes[0];
        componente.scaling = new BABYLON.Vector3(1.5, 1.5, 1.5); // Ajustar escala según sea necesario
        componente.rotationQuaternion = null; // Usar rotación Euler
        componente.position = new BABYLON.Vector3(
            zonaRecogida.position.x,
            0.6,
            zonaRecogida.position.z
        );
        console.log("✅ Componente box.glb cargado");
    });

    // Zona de entrega (sobre línea B)
    zonaEntrega = BABYLON.MeshBuilder.CreateGround(
        "zonaEntrega",
        { width: 4, height: 4 },
        scene
    );
    zonaEntrega.position = new BABYLON.Vector3(8, 0.31, 0);
    zonaEntrega.material = matZonaEntrega;

    // ===== DECORACIÓN: PAREDES DE FÁBRICA =====
    const matPared = new BABYLON.StandardMaterial("matPared", scene);
    matPared.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.45);
    matPared.alpha = 0.3;

    // Paredes
    const paredNorte = BABYLON.MeshBuilder.CreateBox(
        "paredNorte",
        { width: 30, height: 5, depth: 0.5 },
        scene
    );
    paredNorte.position = new BABYLON.Vector3(0, 2.5, 15);
    paredNorte.material = matPared;

    const paredSur = BABYLON.MeshBuilder.CreateBox(
        "paredSur",
        { width: 30, height: 5, depth: 0.5 },
        scene
    );
    paredSur.position = new BABYLON.Vector3(0, 2.5, -15);
    paredSur.material = matPared;

    // ===== ELEMENTOS DECORATIVOS =====
    console.log("📦 Creando cajas industriales...");
    agregarCajasIndustriales(scene, matLinea);

    // ===== LÓGICA DE INPUT =====
    scene.actionManager = new BABYLON.ActionManager(scene);

    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyDownTrigger,
            function (evt) {
                inputMap[evt.sourceEvent.key.toLowerCase()] = true;
            }
        )
    );

    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnKeyUpTrigger,
            function (evt) {
                inputMap[evt.sourceEvent.key.toLowerCase()] = false;
            }
        )
    );

    // ===== MECÁNICA DE RECOGER/ENTREGAR =====
    scene.onKeyboardObservable.add((kbInfo) => {
        if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN) {
            if (kbInfo.event.key === " " || kbInfo.event.key === "e" || kbInfo.event.key === "E") {
                // Verificar que robot y componente estén cargados
                if (!robot || !componente) return;
                
                if (!componenteEnMano) {
                    // Intentar recoger
                    let dist = BABYLON.Vector3.Distance(
                        robot.position,
                        componente.position
                    );
                    if (dist < DISTANCIA_INTERACCION) {
                        console.log("🔧 Componente recogido!");
                        soundGenerator.playPickup();
                        
                        componente.parent = robot;
                        // Colocar al lado del robot (no encima)
                        componente.position = OFFSET_COMPONENTE.clone();
                        componenteEnMano = true;
                        actualizarUI("⚡ Llevar a Línea B");
                        
                        // Animación de recogida
                        animarRecogida(componente);
                    } else {
                        console.log("⚠️ Muy lejos del componente");
                        soundGenerator.playError();
                    }
                } else {
                    // Intentar entregar
                    let dist = BABYLON.Vector3.Distance(
                        robot.position,
                        zonaEntrega.position
                    );
                    if (dist < DISTANCIA_INTERACCION) {
                        console.log("✅ Componente entregado!");
                        soundGenerator.playDelivery();
                        
                        // Animación de baile del robot (repetir 2 veces)
                        if (robot && robot.danceAnimation) {
                            robot.danceAnimation.play(true); // Loop activado
                            
                            // Calcular tiempo para 2 repeticiones
                            const duration = (robot.metadata && robot.metadata.danceDuration) ? robot.metadata.danceDuration : 2.0;
                            const totalTime = duration * 2 * 1000; // ms
                            
                            setTimeout(() => {
                                robot.danceAnimation.stop();
                                // Asegurar que vuelva a idle/walk si es necesario
                            }, totalTime);
                        }
                        
                        componente.parent = null;
                        componente.position = zonaEntrega.position.clone();
                        componente.position.y = 0.6;
                        componenteEnMano = false;
                        componentesEntregados++;
                        scoreElement.textContent = componentesEntregados;
                        
                        // Verificar subida de nivel
                        verificarSubidaNivel(scene);
                        
                        actualizarUI(`✨ ¡Entrega ${componentesEntregados}! Nivel ${nivelDificultad}`);

                        // Animación de entrega y respawn en zona de recogida actual
                        animarEntrega(componente, () => {
                            setTimeout(() => {
                                componente.position = new BABYLON.Vector3(
                                    zonaRecogida.position.x,
                                    0.6,
                                    zonaRecogida.position.z
                                );
                                actualizarUI(`🔍 Buscar componente - Nivel ${nivelDificultad}`);
                            }, 1500);
                        });
                    } else {
                        console.log("⚠️ Muy lejos de la zona de entrega");
                        soundGenerator.playError();
                    }
                }
            }
        }
    });

    // ===== GAME LOOP (MOVIMIENTO) =====
    // Vector reutilizable que evita crear objetos por frame.
    const movimiento = new BABYLON.Vector3();
    scene.onBeforeRenderObservable.add(() => {
        if (!robot) return; // Esperar a que el robot cargue

        movimiento.set(
            (inputMap["d"] ? 1 : 0) - (inputMap["a"] ? 1 : 0),
            0,
            (inputMap["w"] ? 1 : 0) - (inputMap["s"] ? 1 : 0)
        );
        const moviendo = movimiento.lengthSquared() > 0;
        if (moviendo) {
            movimiento.normalize().scaleInPlace(velocidadRobot);
        }

        // Guardar posición anterior para colisiones
        const posicionAnterior = robot.position.clone();
        
        // Aplicar movimiento
        if (moviendo) {
            robot.position.addInPlace(movimiento);
        }
        
        // Verificar colisiones con obstáculos
        let hayColision = false;
        obstaculos.forEach(obs => {
            if (obs.mesh) {
                const dist = BABYLON.Vector3.Distance(
                    new BABYLON.Vector3(robot.position.x, 0, robot.position.z),
                    new BABYLON.Vector3(obs.mesh.position.x, 0, obs.mesh.position.z)
                );
                if (dist < 0.8) { // Radio de colisión
                    hayColision = true;
                }
            }
        });
        
        // Si hay colisión, revertir movimiento
        if (hayColision) {
            robot.position = posicionAnterior;
            // Efecto visual y sonoro de colisión
            if (!robot.metadata || !robot.metadata.colisionReciente) {
                soundGenerator.playError();
                robot.metadata = robot.metadata || {};
                robot.metadata.colisionReciente = true;
                
                // Efecto visual en UI
                const overlay = document.getElementById('ui-overlay');
                if (overlay) {
                    overlay.classList.add('colision-warning');
                    setTimeout(() => overlay.classList.remove('colision-warning'), 300);
                }
                
                // Reset después de 500ms
                setTimeout(() => {
                    if (robot.metadata) robot.metadata.colisionReciente = false;
                }, 500);
            }
        }
        
        // Rotar robot hacia la dirección del movimiento (invertido 180° para que animacion coincida)
        if (moviendo && !hayColision) {
            const targetRotation = Math.atan2(movimiento.x, movimiento.z) + Math.PI;
            // Interpolación suave
            robot.rotation.y = BABYLON.Scalar.Lerp(robot.rotation.y, targetRotation, 0.15);
        }
        
        // Control de animación de caminar
        if (robot.walkAnimation) {
            if (moviendo && !hayColision) {
                if (!robot.walkAnimation.isPlaying) {
                    robot.walkAnimation.play(true);
                }
                const invert = robot.metadata?.invertWalk ? -1 : 1;
                robot.walkAnimation.speedRatio = invert * (velocidadRobot / VELOCIDAD_ROBOT_BASE);
            } else {
                if (robot.walkAnimation.isPlaying) {
                    robot.walkAnimation.stop();
                }
            }
        }

        // Mantener robot dentro de los límites
        robot.position.x = Math.max(-14, Math.min(14, robot.position.x));
        robot.position.z = Math.max(-14, Math.min(14, robot.position.z));

        // Animación de rotación del componente cuando está en el suelo
        if (componente && !componente.parent) {
            componente.rotation.y += 0.02;
        }
        
        // Animación sutil de "respiración" del componente en mano
        if (componente && componenteEnMano && componente.parent === robot) {
            const time = Date.now() * 0.001;
            const offset = componente.metadata?.originalOffset || OFFSET_COMPONENTE;
            componente.position.y = offset.y + Math.sin(time * 2) * 0.05;
        }
        
        // Animar rodillos de las líneas de ensamblaje
        scene.meshes.forEach(mesh => {
            if (mesh.metadata && mesh.metadata.rotationSpeed) {
                mesh.rotation.z += mesh.metadata.rotationSpeed;
            }
        });
        
        if (robot.metadata && robot.metadata.visualRoot) {
            const visualRoot = robot.metadata.visualRoot;
            visualRoot.position.x = 0;
            visualRoot.position.z = 0;
        }

        // Animar bandas de obstáculos (parpadeo)
        obstaculos.forEach((obs, index) => {
            const time = Date.now() * 0.003;
            const pulse = (Math.sin(time + index) + 1) * 0.5;
            if (obs.banda && obs.banda.material) {
                obs.banda.material.emissiveColor = new BABYLON.Color3(0.3 * pulse, 0.3 * pulse, 0);
            }
        });
    });

    console.log("✅ Escena creada exitosamente");
    return scene;
};

// ===== UTILIDADES DE ANIMACIÓN =====
const ROOT_NODE_KEYWORDS = ["root", "hips", "pelvis", "armature", "base"];

function esNodoRaizMovimiento(target) {
    if (!target || !target.name) return false;
    const lowerName = target.name.toLowerCase();
    return ROOT_NODE_KEYWORDS.some(keyword => lowerName.includes(keyword));
}

function neutralizarTraslacionRaiz(animGroup) {
    if (!animGroup) return;
    animGroup.targetedAnimations.forEach(targetAnim => {
        if (!esNodoRaizMovimiento(targetAnim.target)) {
            return;
        }

        const anim = targetAnim.animation;
        if (!anim) return;

        const property = (targetAnim.targetProperty || "").toLowerCase();
        if (
            property === "position" &&
            anim.dataType === BABYLON.Animation.ANIMATIONTYPE_VECTOR3
        ) {
            const sanitizedKeys = anim.getKeys().map(key => {
                const valor = key.value;
                const y = valor && typeof valor === "object" && "y" in valor ? valor.y : 0;
                return {
                    frame: key.frame,
                    value: new BABYLON.Vector3(0, y, 0)
                };
            });
            anim.setKeys(sanitizedKeys);
        } else if (property === "position.x" || property === "position.z") {
            const sanitizedKeys = anim.getKeys().map(key => ({
                frame: key.frame,
                value: 0
            }));
            anim.setKeys(sanitizedKeys);
        }
    });
}

// ===== FUNCIÓN: CREAR LÍNEA DE ENSAMBLAJE =====
function crearLineaEnsamblaje(scene, posicion, letra, material) {
    const lineaContainer = new BABYLON.TransformNode(`linea${letra}Container`);
    lineaContainer.position = posicion;
    
    // Base principal
    const base = BABYLON.MeshBuilder.CreateBox(
        `linea${letra}Base`,
        { width: 6, height: 0.3, depth: 2 },
        scene
    );
    base.material = material;
    base.parent = lineaContainer;
    
    // Material para detalles metálicos
    const matDetalle = new BABYLON.StandardMaterial(`matDetalle${letra}`, scene);
    matDetalle.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.55);
    matDetalle.specularColor = new BABYLON.Color3(0.7, 0.7, 0.7);
    matDetalle.specularPower = 64;
    
    // Rieles laterales
    for (let i = 0; i < 2; i++) {
        const riel = BABYLON.MeshBuilder.CreateBox(
            `riel${letra}${i}`,
            { width: 6.2, height: 0.15, depth: 0.1 },
            scene
        );
        riel.material = matDetalle;
        riel.parent = lineaContainer;
        riel.position.z = (i === 0 ? -1 : 1);
        riel.position.y = 0.23;
    }
    
    // Rodillos (cilindros transversales)
    for (let i = 0; i < 6; i++) {
        const rodillo = BABYLON.MeshBuilder.CreateCylinder(
            `rodillo${letra}${i}`,
            { height: 1.8, diameter: 0.12 },
            scene
        );
        const matRodillo = new BABYLON.StandardMaterial(`matRodillo${letra}${i}`, scene);
        matRodillo.diffuseColor = new BABYLON.Color3(0.6, 0.6, 0.65);
        matRodillo.specularColor = new BABYLON.Color3(0.8, 0.8, 0.8);
        matRodillo.specularPower = 128;
        rodillo.material = matRodillo;
        rodillo.parent = lineaContainer;
        rodillo.position.x = -2.5 + i;
        rodillo.position.y = 0.15;
        rodillo.rotation.x = Math.PI / 2;
        
        // Animación de rotación
        rodillo.metadata = { rotationSpeed: 0.05 };
    }
    
    // Letrero con letra
    const letrero = BABYLON.MeshBuilder.CreateBox(
        `letrero${letra}`,
        { width: 0.8, height: 0.6, depth: 0.05 },
        scene
    );
    const matLetrero = new BABYLON.StandardMaterial(`matLetrero${letra}`, scene);
    matLetrero.diffuseColor = letra === "A" ? new BABYLON.Color3(1, 0.8, 0) : new BABYLON.Color3(0, 0.8, 0.2);
    matLetrero.emissiveColor = letra === "A" ? new BABYLON.Color3(0.2, 0.15, 0) : new BABYLON.Color3(0, 0.2, 0.05);
    letrero.material = matLetrero;
    letrero.parent = lineaContainer;
    letrero.position.y = 0.8;
    letrero.position.z = 1.2;
    
    return lineaContainer;
}

// ===== FUNCIÓN: VERIFICAR SUBIDA DE NIVEL =====
function verificarSubidaNivel(scene) {
    if (componentesEntregados % componentesParaNivel === 0) {
        nivelDificultad++;
        
        // Mantener velocidad constante (no reducir)
        velocidadRobot = VELOCIDAD_ROBOT_BASE;
        
        console.log(`🎯 ¡NIVEL ${nivelDificultad}!`);
        console.log(`⚡ Velocidad: ${velocidadRobot.toFixed(3)}`);
        
        // Sonido especial de nivel
        soundGenerator.playDelivery();
        setTimeout(() => soundGenerator.playDelivery(), 200);
        
        // Cambiar ubicación de zonas (más difícil)
        if (nivelDificultad > 1) {
            cambiarUbicacionZonas(scene);
        }
        
        // Crear obstáculos nuevos (2-3 por nivel)
        const numObstaculos = nivelDificultad === 2 ? 2 : (nivelDificultad > 2 ? 3 : 0);
        for (let i = 0; i < numObstaculos; i++) {
            setTimeout(() => crearObstaculo(scene), i * 200);
        }
        
        // Actualizar UI con efecto
        statusElement.style.color = "#00ff88";
        statusElement.style.fontSize = "18px";
        actualizarUI(`🎯 ¡NIVEL ${nivelDificultad}! ¡Más difícil!`);
        
        setTimeout(() => {
            statusElement.style.color = "#ffcc00";
            statusElement.style.fontSize = "14px";
        }, 2000);
        
        // Actualizar UI de nivel
        if (nivelElement) {
            nivelElement.textContent = nivelDificultad;
            nivelElement.style.color = "#00ff88";
            nivelElement.style.fontSize = "18px";
            setTimeout(() => {
                nivelElement.style.color = "#00ff88";
                nivelElement.style.fontSize = "16px";
            }, 2000);
        }
    }
}

// ===== FUNCIÓN: CAMBIAR UBICACIÓN DE ZONAS =====
function cambiarUbicacionZonas(scene) {
    if (!zonaRecogida || !zonaEntrega || !lineaA || !lineaB) return;
    
    // Posiciones posibles para las zonas (más desafiantes)
    const posicionesDisponibles = [
        { x: -10, z: -8 },   // Esquina superior izquierda
        { x: -10, z: 8 },    // Esquina inferior izquierda
        { x: 10, z: -8 },    // Esquina superior derecha
        { x: 10, z: 8 },     // Esquina inferior derecha
        { x: -12, z: 0 },    // Izquierda centro
        { x: 12, z: 0 },     // Derecha centro
        { x: 0, z: -10 },    // Arriba centro
        { x: 0, z: 10 }      // Abajo centro
    ];
    
    // Seleccionar dos posiciones diferentes aleatoriamente
    const indices = [];
    while (indices.length < 2) {
        const idx = Math.floor(Math.random() * posicionesDisponibles.length);
        if (!indices.includes(idx)) {
            indices.push(idx);
        }
    }
    
    const nuevaPosRecogida = posicionesDisponibles[indices[0]];
    const nuevaPosEntrega = posicionesDisponibles[indices[1]];
    
    // Animar movimiento de zonas
    animarMovimientoZona(zonaRecogida, lineaA, nuevaPosRecogida);
    animarMovimientoZona(zonaEntrega, lineaB, nuevaPosEntrega);
    
    // Mover componente a nueva zona de recogida
    if (componente && componente.parent === null) {
        componente.position = new BABYLON.Vector3(nuevaPosRecogida.x, 0.6, nuevaPosRecogida.z);
    }
    
    console.log(`📍 Zonas reubicadas: Recogida(${nuevaPosRecogida.x}, ${nuevaPosRecogida.z}), Entrega(${nuevaPosEntrega.x}, ${nuevaPosEntrega.z})`);
}

// ===== FUNCIÓN: ANIMAR MOVIMIENTO DE ZONA =====
function animarMovimientoZona(zona, linea, nuevaPos) {
    const duration = 1000; // ms
    const startTime = Date.now();
    const startPosZona = zona.position.clone();
    const startPosLinea = linea.position.clone();
    const targetPosZona = new BABYLON.Vector3(nuevaPos.x, 0.31, nuevaPos.z);
    const targetPosLinea = new BABYLON.Vector3(nuevaPos.x, 0.15, nuevaPos.z);
    
    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease in-out cubic
        const easeProgress = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        // Interpolar posiciones
        zona.position = BABYLON.Vector3.Lerp(startPosZona, targetPosZona, easeProgress);
        linea.position = BABYLON.Vector3.Lerp(startPosLinea, targetPosLinea, easeProgress);
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    
    animate();
}

// ===== FUNCIÓN: CREAR OBSTÁCULO =====
function crearObstaculo(scene) {
    const matObstaculo = new BABYLON.StandardMaterial(`matObstaculo${obstaculos.length}`, scene);
    matObstaculo.diffuseColor = new BABYLON.Color3(0.8, 0.2, 0.1);
    matObstaculo.emissiveColor = new BABYLON.Color3(0.2, 0.05, 0);
    
    // Posición aleatoria evitando bordes
    let x, z;
    let intentos = 0;
    let posicionValida = false;
    
    // Intentar encontrar posición que no esté muy cerca de otros obstáculos
    while (!posicionValida && intentos < 20) {
        x = Math.random() * 16 - 8;  // Entre -8 y 8
        z = Math.random() * 16 - 8;  // Entre -8 y 8
        
        posicionValida = true;
        
        // Verificar distancia con otros obstáculos
        for (let obs of obstaculos) {
            if (obs.mesh) {
                const dist = Math.sqrt(
                    Math.pow(x - obs.mesh.position.x, 2) + 
                    Math.pow(z - obs.mesh.position.z, 2)
                );
                if (dist < 2.5) { // Mínimo 2.5 unidades de separación
                    posicionValida = false;
                    break;
                }
            }
        }
        intentos++;
    }
    
    const obstaculo = BABYLON.MeshBuilder.CreateCylinder(
        `obstaculo${obstaculos.length}`,
        { height: 1.5, diameter: 1.2 }, // Más grande = más difícil
        scene
    );
    obstaculo.position = new BABYLON.Vector3(x, 0.75, z);
    obstaculo.material = matObstaculo;
    
    // Agregar banda de advertencia
    const banda = BABYLON.MeshBuilder.CreateCylinder(
        `bandaObstaculo${obstaculos.length}`,
        { height: 0.3, diameter: 1.25 },
        scene
    );
    const matBanda = new BABYLON.StandardMaterial(`matBanda${obstaculos.length}`, scene);
    matBanda.diffuseColor = new BABYLON.Color3(1, 1, 0);
    matBanda.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0);
    banda.material = matBanda;
    banda.position = new BABYLON.Vector3(x, 0.75, z);
    
    // Efecto de aparición
    obstaculo.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
    banda.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
    
    const startTime = Date.now();
    const animarAparicion = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / 500, 1);
        const scale = progress;
        
        obstaculo.scaling = new BABYLON.Vector3(scale, scale, scale);
        banda.scaling = new BABYLON.Vector3(scale, scale, scale);
        
        if (progress < 1) {
            requestAnimationFrame(animarAparicion);
        }
    };
    animarAparicion();
    
    obstaculos.push({ mesh: obstaculo, banda: banda });
    
    console.log(`⚠️ Nuevo obstáculo ${obstaculos.length} en (${x.toFixed(1)}, ${z.toFixed(1)})`);
}

// ===== FUNCIÓN: AGREGAR CAJAS INDUSTRIALES =====
function agregarCajasIndustriales(scene, material) {
    // Material para cajas de fábrica
    const matCaja = new BABYLON.StandardMaterial("matCaja", scene);
    matCaja.diffuseColor = new BABYLON.Color3(0.6, 0.4, 0.2);
    matCaja.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);

    // Material para bandas de advertencia
    const matAdvertencia = new BABYLON.StandardMaterial("matAdvertencia", scene);
    matAdvertencia.diffuseColor = new BABYLON.Color3(1, 0.8, 0);
    matAdvertencia.emissiveColor = new BABYLON.Color3(0.2, 0.15, 0);

    // Cajas apiladas en las esquinas
    const posiciones = [
        { x: -12, z: -12 },
        { x: -12, z: 12 },
        { x: 12, z: -12 },
        { x: 12, z: 12 }
    ];

    posiciones.forEach((pos, index) => {
        const altura = 1.5 + Math.random() * 1;
        
        // Caja principal
        const caja = BABYLON.MeshBuilder.CreateBox(
            `caja${index}`,
            { width: 1.5, height: altura, depth: 1.5 },
            scene
        );
        caja.position = new BABYLON.Vector3(pos.x, altura / 2, pos.z);
        caja.material = matCaja;

        // Banda de advertencia
        const banda = BABYLON.MeshBuilder.CreateBox(
            `banda${index}`,
            { width: 1.6, height: 0.2, depth: 1.6 },
            scene
        );
        banda.position = new BABYLON.Vector3(pos.x, altura * 0.6, pos.z);
        banda.material = matAdvertencia;

        // Etiqueta superior
        const etiqueta = BABYLON.MeshBuilder.CreateBox(
            `etiqueta${index}`,
            { width: 0.8, height: 0.05, depth: 0.8 },
            scene
        );
        etiqueta.position = new BABYLON.Vector3(pos.x, altura + 0.03, pos.z);
        const matEtiqueta = new BABYLON.StandardMaterial(`matEtiqueta${index}`, scene);
        matEtiqueta.diffuseColor = new BABYLON.Color3(1, 1, 1);
        etiqueta.material = matEtiqueta;
    });
}

// ===== FUNCIÓN: ACTUALIZAR UI =====
function actualizarUI(mensaje) {
    statusElement.textContent = mensaje;
}

// ===== FUNCIÓN: ANIMAR RECOGIDA =====
function animarRecogida(mesh) {
    const startY = mesh.position.y;
    const targetY = OFFSET_COMPONENTE.y;
    const duration = 300; // ms
    const startTime = Date.now();
    
    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        if (mesh.parent) { // Solo si sigue siendo hijo del robot
            mesh.position.y = startY + (targetY - startY) * easeProgress;
            mesh.rotation.y += 0.1;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
    };
    
    animate();
}

// ===== FUNCIÓN: ANIMAR ENTREGA =====
function animarEntrega(mesh, callback) {
    const duration = 500; // ms
    const startTime = Date.now();
    const startScale = mesh.scaling.clone();
    
    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Pulso de escala
        const scale = 1 + Math.sin(progress * Math.PI) * 0.3;
        mesh.scaling = new BABYLON.Vector3(
            startScale.x * scale,
            startScale.y * scale,
            startScale.z * scale
        );
        
        mesh.rotation.y += 0.15;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            mesh.scaling = startScale;
            if (callback) callback();
        }
    };
    
    animate();
}

// ===== INICIAR JUEGO =====
const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});

window.addEventListener("resize", function () {
    engine.resize();
});

console.log("🤖 Juego de Robot de Fábrica iniciado");
console.log("📦 Recoge componentes de la Línea A y llévalos a la Línea B");
