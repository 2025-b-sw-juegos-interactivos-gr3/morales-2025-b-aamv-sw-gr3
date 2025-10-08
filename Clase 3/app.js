// Configuración del canvas
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });

// Datos de los planetas con información realista
const planetData = {
    sol: { 
        size: 6, 
        color: new BABYLON.Color3(1, 0.95, 0.8),
        emissive: new BABYLON.Color3(1, 0.9, 0.7)
    },
    mercurio: { 
        size: 0.38, 
        distance: 9, 
        speed: 4.74, 
        color: new BABYLON.Color3(0.55, 0.55, 0.55),
        secondColor: new BABYLON.Color3(0.4, 0.4, 0.4),
        specular: 0.2,
        roughness: 0.9,
        metallic: 0.1
    },
    venus: { 
        size: 0.95, 
        distance: 13, 
        speed: 3.50, 
        color: new BABYLON.Color3(0.9, 0.8, 0.6),
        secondColor: new BABYLON.Color3(0.95, 0.85, 0.65),
        specular: 0.3,
        roughness: 0.7,
        metallic: 0.0
    },
    tierra: { 
        size: 1, 
        distance: 18, 
        speed: 2.98, 
        color: new BABYLON.Color3(0.2, 0.4, 0.8),
        secondColor: new BABYLON.Color3(0.2, 0.6, 0.3),
        specular: 0.6,
        roughness: 0.4,
        metallic: 0.0,
        hasLuna: true
    },
    marte: { 
        size: 0.53, 
        distance: 24, 
        speed: 2.41, 
        color: new BABYLON.Color3(0.8, 0.4, 0.3),
        secondColor: new BABYLON.Color3(0.7, 0.3, 0.2),
        specular: 0.2,
        roughness: 0.8,
        metallic: 0.0
    },
    jupiter: { 
        size: 2.8, 
        distance: 35, 
        speed: 1.31, 
        color: new BABYLON.Color3(0.85, 0.7, 0.55),
        secondColor: new BABYLON.Color3(0.75, 0.6, 0.45),
        specular: 0.5,
        roughness: 0.3,
        metallic: 0.0
    },
    saturno: { 
        size: 2.4, 
        distance: 48, 
        speed: 0.97, 
        color: new BABYLON.Color3(0.9, 0.85, 0.7),
        secondColor: new BABYLON.Color3(0.85, 0.75, 0.6),
        specular: 0.4,
        roughness: 0.4,
        metallic: 0.0
    },
    urano: { 
        size: 1.6, 
        distance: 58, 
        speed: 0.68, 
        color: new BABYLON.Color3(0.6, 0.8, 0.9),
        secondColor: new BABYLON.Color3(0.5, 0.75, 0.85),
        specular: 0.5,
        roughness: 0.3,
        metallic: 0.0
    },
    neptuno: { 
        size: 1.55, 
        distance: 68, 
        speed: 0.54, 
        color: new BABYLON.Color3(0.3, 0.5, 0.95),
        secondColor: new BABYLON.Color3(0.25, 0.45, 0.9),
        specular: 0.5,
        roughness: 0.3,
        metallic: 0.0
    }
};

// Función para crear texturas procedurales
function createPlanetTexture(planetName, data, scene) {
    const textureSize = 512;
    const dynamicTexture = new BABYLON.DynamicTexture(
        `${planetName}Texture`,
        textureSize,
        scene,
        false
    );
    
    const ctx = dynamicTexture.getContext();
    const canvas = ctx.canvas;
    
    // Crear gradiente base
    const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
    );
    
    // Colores del planeta
    const color1 = data.color;
    const color2 = data.secondColor || data.color;
    
    gradient.addColorStop(0, `rgb(${color1.r * 255}, ${color1.g * 255}, ${color1.b * 255})`);
    gradient.addColorStop(1, `rgb(${color2.r * 255}, ${color2.g * 255}, ${color2.b * 255})`);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Añadir variaciones (manchas/bandas) según el planeta
    ctx.globalAlpha = 0.3;
    
    if (planetName === 'jupiter' || planetName === 'saturno') {
        // Bandas horizontales para gigantes gaseosos
        for (let i = 0; i < 15; i++) {
            const y = (canvas.height / 15) * i;
            const bandHeight = canvas.height / 20;
            const color = i % 2 === 0 ? color1 : color2;
            ctx.fillStyle = `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, 0.4)`;
            ctx.fillRect(0, y, canvas.width, bandHeight);
        }
    } else if (planetName === 'tierra') {
        // Continentes (verde) y océanos (azul)
        ctx.fillStyle = `rgb(${color2.r * 255}, ${color2.g * 255}, ${color2.b * 255})`;
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = 20 + Math.random() * 60;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    } else {
        // Cráteres y manchas para planetas rocosos
        for (let i = 0; i < 30; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = 5 + Math.random() * 20;
            const darkness = Math.random() * 0.5;
            ctx.fillStyle = `rgba(0, 0, 0, ${darkness})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    ctx.globalAlpha = 1.0;
    dynamicTexture.update();
    
    return dynamicTexture;
}

// Crear la escena
function createScene() {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.01, 0.01, 0.05);
    
    // Habilitar efectos avanzados
    scene.ambientColor = new BABYLON.Color3(0.1, 0.1, 0.15);

    // Cámara mejorada
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        Math.PI / 2,
        Math.PI / 3,
        90,
        BABYLON.Vector3.Zero(),
        scene
    );
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 8;
    camera.upperRadiusLimit = 180;
    camera.wheelPrecision = 20;
    camera.panningSensibility = 50;

    // Sistema de iluminación realista del Sol - MUY POTENTE
    const sunLight = new BABYLON.PointLight(
        "sunLight",
        BABYLON.Vector3.Zero(),
        scene
    );
    sunLight.intensity = 5.0; // Más intenso para dramatismo
    sunLight.diffuse = new BABYLON.Color3(1, 0.98, 0.9);
    sunLight.specular = new BABYLON.Color3(1, 0.95, 0.85);
    sunLight.range = 250;
    
    // Configuración de atenuación realista (ley inversa del cuadrado)
    sunLight.falloffType = BABYLON.Light.FALLOFF_PHYSICAL;
    sunLight.radius = 0.001; // Radio pequeño para sombras definidas

    // Luz ambiental ajustada para ver los planetas
    const ambientLight = new BABYLON.HemisphericLight(
        "ambientLight",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );
    ambientLight.intensity = 0.15; // Suficiente para ver el lado oscuro
    ambientLight.diffuse = new BABYLON.Color3(0.1, 0.1, 0.15);
    ambientLight.specular = new BABYLON.Color3(0, 0, 0);
    ambientLight.groundColor = new BABYLON.Color3(0.05, 0.05, 0.1);

    // Crear el Sol con textura procedural
    const sun = BABYLON.MeshBuilder.CreateSphere(
        "sol",
        { diameter: planetData.sol.size * 2, segments: 64 },
        scene
    );
    const sunMaterial = new BABYLON.StandardMaterial("sunMat", scene);
    sunMaterial.emissiveColor = planetData.sol.emissive;
    sunMaterial.diffuseColor = planetData.sol.color;
    sunMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    sunMaterial.disableLighting = true;
    sun.material = sunMaterial;

    // Sistema de brillo dramático para el Sol
    const glowLayer = new BABYLON.GlowLayer("glow", scene, {
        mainTextureFixedSize: 1024,
        blurKernelSize: 128
    });
    glowLayer.intensity = 1.5;
    
    // Corona solar multicapa
    const corona1 = BABYLON.MeshBuilder.CreateSphere(
        "corona1",
        { diameter: planetData.sol.size * 2.2, segments: 32 },
        scene
    );
    const corona1Material = new BABYLON.StandardMaterial("corona1Mat", scene);
    corona1Material.emissiveColor = new BABYLON.Color3(1, 0.8, 0.4);
    corona1Material.alpha = 0.2;
    corona1Material.disableLighting = true;
    corona1.material = corona1Material;
    corona1.parent = sun;
    
    const corona2 = BABYLON.MeshBuilder.CreateSphere(
        "corona2",
        { diameter: planetData.sol.size * 2.5, segments: 32 },
        scene
    );
    const corona2Material = new BABYLON.StandardMaterial("corona2Mat", scene);
    corona2Material.emissiveColor = new BABYLON.Color3(1, 0.6, 0.2);
    corona2Material.alpha = 0.1;
    corona2Material.disableLighting = true;
    corona2.material = corona2Material;
    corona2.parent = sun;

    // Almacenar planetas y órbitas
    const planets = [];
    const orbits = [];

    // Crear planetas
    Object.keys(planetData).forEach((planetName) => {
        if (planetName === 'sol') return;

        const data = planetData[planetName];

        // Crear órbita (círculo)
        const orbitPoints = [];
        for (let i = 0; i <= 360; i += 5) {
            const angle = (i * Math.PI) / 180;
            orbitPoints.push(
                new BABYLON.Vector3(
                    data.distance * Math.cos(angle),
                    0,
                    data.distance * Math.sin(angle)
                )
            );
        }

        const orbit = BABYLON.MeshBuilder.CreateLines(
            `${planetName}Orbit`,
            { points: orbitPoints },
            scene
        );
        orbit.color = new BABYLON.Color3(0.3, 0.3, 0.3);
        orbit.alpha = 0.5;
        orbits.push(orbit);

        // Crear planeta con más detalle
        const planet = BABYLON.MeshBuilder.CreateSphere(
            planetName,
            { diameter: data.size * 2, segments: 64 },
            scene
        );

        // Crear textura procedural para el planeta
        const planetTexture = createPlanetTexture(planetName, data, scene);

        // Usar material Standard para mejor compatibilidad con iluminación
        const planetMaterial = new BABYLON.StandardMaterial(
            `${planetName}Mat`,
            scene
        );
        
        // Aplicar textura procedural
        planetMaterial.diffuseTexture = planetTexture;
        planetMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
        
        // Sin emisión propia - depende de la luz del sol
        planetMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0);
        
        // Configurar propiedades especulares según el planeta
        if (planetName === 'tierra') {
            // La Tierra tiene océanos brillantes
            planetMaterial.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
            planetMaterial.specularPower = 32;
        } else if (planetName === 'jupiter' || planetName === 'saturno' || 
                   planetName === 'urano' || planetName === 'neptuno') {
            // Gigantes gaseosos tienen algo de brillo
            planetMaterial.specularColor = new BABYLON.Color3(0.3, 0.3, 0.3);
            planetMaterial.specularPower = 16;
        } else {
            // Planetas rocosos son más opacos
            planetMaterial.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
            planetMaterial.specularPower = 8;
        }
        
        // Habilitar recepción de sombras
        planet.receiveShadows = true;
        
        planet.material = planetMaterial;

        // Posición inicial
        planet.position.x = data.distance;
        planet.position.y = 0;
        planet.position.z = 0;

        // Guardar datos del planeta
        planets.push({
            mesh: planet,
            distance: data.distance,
            speed: data.speed / 50,
            angle: Math.random() * Math.PI * 2,
            name: planetName,
            moons: []
        });
        
        // Añadir Luna a la Tierra
        if (data.hasLuna) {
            const luna = BABYLON.MeshBuilder.CreateSphere(
                'luna',
                { diameter: data.size * 0.27, segments: 32 },
                scene
            );
            
            const lunaMaterial = new BABYLON.StandardMaterial('lunaMat', scene);
            lunaMaterial.diffuseColor = new BABYLON.Color3(0.6, 0.6, 0.6);
            lunaMaterial.specularColor = new BABYLON.Color3(0.05, 0.05, 0.05);
            lunaMaterial.specularPower = 4;
            lunaMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0);
            luna.material = lunaMaterial;
            luna.receiveShadows = true;
            
            // Posicionar luna
            luna.position.x = data.size * 3;
            luna.parent = planet;
            
            planets[planets.length - 1].moons.push({
                mesh: luna,
                distance: data.size * 3,
                speed: 0.1,
                angle: 0
            });
        }

        // Añadir anillos mejorados a Saturno
        if (planetName === 'saturno') {
            const ring = BABYLON.MeshBuilder.CreateDisc(
                'saturnRing',
                { 
                    radius: data.size * 2.5,
                    tessellation: 128,
                    arc: 1,
                    sideOrientation: BABYLON.Mesh.DOUBLESIDE
                },
                scene
            );
            
            // Crear hueco interior para el anillo
            const innerRing = BABYLON.MeshBuilder.CreateDisc(
                'saturnRingInner',
                { 
                    radius: data.size * 1.5,
                    tessellation: 128
                },
                scene
            );
            
            // Material realista para los anillos con transparencia
            const ringMaterial = new BABYLON.PBRMaterial('ringMat', scene);
            ringMaterial.albedoColor = new BABYLON.Color3(0.85, 0.75, 0.6);
            ringMaterial.metallic = 0.1;
            ringMaterial.roughness = 0.8;
            ringMaterial.alpha = 0.75;
            ringMaterial.alphaMode = BABYLON.Engine.ALPHA_COMBINE;
            
            // Aplicar efecto de bandas en los anillos
            ringMaterial.emissiveColor = new BABYLON.Color3(0.1, 0.08, 0.06);
            
            ring.material = ringMaterial;
            ring.parent = planet;
            ring.rotation.x = Math.PI / 2;
            ring.rotation.z = 0.2; // Pequeña inclinación
            
            // Sombra del anillo sobre el planeta
            ring.receiveShadows = true;
            
            // El anillo interior es invisible (para crear el hueco)
            innerRing.parent = ring;
            innerRing.visibility = 0;
        }
        
        // Añadir atmósfera sutil solo a planetas específicos
        if (planetName === 'tierra' || planetName === 'venus') {
            const atmosphere = BABYLON.MeshBuilder.CreateSphere(
                `${planetName}Atmosphere`,
                { diameter: data.size * 2.08, segments: 32 },
                scene
            );
            
            const atmosphereMaterial = new BABYLON.StandardMaterial(
                `${planetName}AtmosphereMat`,
                scene
            );
            
            // Color de atmósfera según el planeta
            let atmosphereColor;
            let atmosphereAlpha;
            if (planetName === 'tierra') {
                atmosphereColor = new BABYLON.Color3(0.5, 0.7, 1.0);
                atmosphereAlpha = 0.15;
            } else if (planetName === 'venus') {
                atmosphereColor = new BABYLON.Color3(0.95, 0.85, 0.6);
                atmosphereAlpha = 0.2;
            }
            
            // La atmósfera recibe luz pero no emite
            atmosphereMaterial.diffuseColor = atmosphereColor;
            atmosphereMaterial.emissiveColor = new BABYLON.Color3(0, 0, 0);
            atmosphereMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
            atmosphereMaterial.alpha = atmosphereAlpha;
            atmosphereMaterial.backFaceCulling = false;
            atmosphere.material = atmosphereMaterial;
            atmosphere.parent = planet;
        }
    });

    // Crear campo de estrellas de fondo
    createStarField(scene);
    
    // Crear nebulosa de fondo
    createNebula(scene);
    
    // Crear cometas
    const comets = createComets(scene, sunLight);

    // Configurar sombras de alta calidad
    const shadowGenerator = new BABYLON.ShadowGenerator(2048, sunLight);
    shadowGenerator.usePercentageCloserFiltering = true;
    shadowGenerator.filteringQuality = BABYLON.ShadowGenerator.QUALITY_HIGH;
    shadowGenerator.darkness = 0.95; // Sombras muy oscuras, el espacio es negro
    
    planets.forEach(p => {
        shadowGenerator.addShadowCaster(p.mesh);
        p.moons.forEach(moon => {
            shadowGenerator.addShadowCaster(moon.mesh);
        });
    });

    // Animación mejorada y dinámica
    let time = 0;
    scene.registerBeforeRender(() => {
        time += 0.01;
        
        // Pulsación sutil del Sol
        sun.scaling.setAll(1 + Math.sin(time * 0.5) * 0.015);

        // Mover planetas en sus órbitas
        planets.forEach((planet) => {
            planet.angle += planet.speed * 0.01;
            planet.mesh.position.x = planet.distance * Math.cos(planet.angle);
            planet.mesh.position.z = planet.distance * Math.sin(planet.angle);
            
            // Rotación sobre su propio eje (varía por planeta)
            const rotationSpeed = 0.005 + (1 / planet.distance) * 0.01;
            planet.mesh.rotation.y += rotationSpeed;
            
            // Inclinación axial característica
            if (planet.name === 'tierra') {
                planet.mesh.rotation.z = 0.41; // 23.5 grados
            } else if (planet.name === 'saturno') {
                planet.mesh.rotation.z = 0.47; // 26.7 grados
            } else if (planet.name === 'urano') {
                planet.mesh.rotation.z = 1.71; // 98 grados - está de lado!
            }
            
            // Animar lunas
            planet.moons.forEach(moon => {
                moon.angle += moon.speed;
                moon.mesh.position.x = moon.distance * Math.cos(moon.angle);
                moon.mesh.position.z = moon.distance * Math.sin(moon.angle);
                moon.mesh.rotation.y += 0.02;
            });
        });
        
        // Animar cometas
        comets.forEach(comet => {
            comet.angle += comet.speed;
            const x = comet.a * Math.cos(comet.angle);
            const z = comet.b * Math.sin(comet.angle);
            const y = Math.sin(comet.angle * 2) * 5;
            
            comet.mesh.position.set(x, y, z);
            
            // Calcular dirección del movimiento para orientar la cola
            const direction = comet.mesh.position.subtract(comet.lastPosition);
            if (direction.length() > 0.001) {
                // La dirección de emisión de partículas es opuesta al movimiento
                const emitDirection = direction.normalize().negate();
                comet.particles.direction1 = emitDirection;
                comet.particles.direction2 = emitDirection;
            }
            
            comet.lastPosition.copyFrom(comet.mesh.position);
            
            // Ajustar intensidad según distancia al sol
            const distToSun = comet.mesh.position.length();
            const intensity = Math.max(0.3, 25 / distToSun);
            comet.coma.material.emissiveColor.scaleToRef(intensity, comet.coma.material.emissiveColor);
            comet.particles.emitRate = 100 + (intensity * 100);
        });
    });

    return scene;
}

// Crear campo de estrellas mejorado
function createStarField(scene) {
    const starCount = 3000;
    
    // Usar un sistema de partículas para mejor rendimiento
    const starParticles = new BABYLON.ParticleSystem("stars", starCount, scene);
    
    // Textura de estrella (punto brillante)
    starParticles.particleTexture = new BABYLON.Texture(
        "https://raw.githubusercontent.com/BabylonJS/Babylon.js/master/packages/tools/playground/public/textures/flare.png",
        scene
    );
    
    // Emisor en el centro
    starParticles.emitter = BABYLON.Vector3.Zero();
    starParticles.minEmitBox = new BABYLON.Vector3(-150, -150, -150);
    starParticles.maxEmitBox = new BABYLON.Vector3(150, 150, 150);
    
    // Configuración de partículas
    starParticles.color1 = new BABYLON.Color4(0.9, 0.9, 1, 1);
    starParticles.color2 = new BABYLON.Color4(1, 1, 0.9, 1);
    starParticles.colorDead = new BABYLON.Color4(0.8, 0.8, 1, 0.8);
    
    starParticles.minSize = 0.1;
    starParticles.maxSize = 0.5;
    
    starParticles.minLifeTime = Number.MAX_VALUE;
    starParticles.maxLifeTime = Number.MAX_VALUE;
    
    starParticles.emitRate = starCount;
    starParticles.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
    
    starParticles.gravity = BABYLON.Vector3.Zero();
    starParticles.direction1 = BABYLON.Vector3.Zero();
    starParticles.direction2 = BABYLON.Vector3.Zero();
    
    starParticles.minEmitPower = 0;
    starParticles.maxEmitPower = 0;
    starParticles.updateSpeed = 0.005;
    
    starParticles.start();
    
    // Añadir algunas estrellas brillantes individuales
    for (let i = 0; i < 100; i++) {
        const star = BABYLON.MeshBuilder.CreateSphere(
            `brightStar${i}`,
            { diameter: 0.4 + Math.random() * 0.3, segments: 8 },
            scene
        );
        
        // Posición aleatoria en una esfera grande
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 120 + Math.random() * 50;
        
        star.position.x = radius * Math.sin(phi) * Math.cos(theta);
        star.position.y = radius * Math.sin(phi) * Math.sin(theta);
        star.position.z = radius * Math.cos(phi);
        
        const starMaterial = new BABYLON.StandardMaterial(`brightStarMat${i}`, scene);
        
        // Colores variados de estrellas
        const colorType = Math.random();
        if (colorType < 0.3) {
            starMaterial.emissiveColor = new BABYLON.Color3(0.9, 0.9, 1); // Azul
        } else if (colorType < 0.6) {
            starMaterial.emissiveColor = new BABYLON.Color3(1, 1, 0.9); // Amarillo
        } else if (colorType < 0.9) {
            starMaterial.emissiveColor = new BABYLON.Color3(1, 0.95, 0.95); // Blanco
        } else {
            starMaterial.emissiveColor = new BABYLON.Color3(1, 0.7, 0.6); // Rojo
        }
        
        const brightness = 0.6 + Math.random() * 0.4;
        starMaterial.emissiveColor.scaleInPlace(brightness);
        starMaterial.disableLighting = true;
        star.material = starMaterial;
    }
}

// Crear efecto de nebulosa
function createNebula(scene) {
    const nebula = BABYLON.MeshBuilder.CreateSphere(
        "nebula",
        { diameter: 300, segments: 32 },
        scene
    );
    
    const nebulaMaterial = new BABYLON.StandardMaterial("nebulaMat", scene);
    nebulaMaterial.emissiveColor = new BABYLON.Color3(0.15, 0.08, 0.25);
    nebulaMaterial.alpha = 0.02;
    nebulaMaterial.backFaceCulling = false;
    nebulaMaterial.disableLighting = true;
    nebula.material = nebulaMaterial;
}

// Crear cometas dinámicos mejorados
function createComets(scene, sunLight) {
    const comets = [];
    const cometCount = 3;
    
    for (let i = 0; i < cometCount; i++) {
        // Núcleo del cometa
        const cometNucleus = BABYLON.MeshBuilder.CreateSphere(
            `comet${i}`,
            { diameter: 0.4, segments: 16 },
            scene
        );
        
        const nucleusMaterial = new BABYLON.StandardMaterial(`cometNucleusMat${i}`, scene);
        nucleusMaterial.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.45);
        nucleusMaterial.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        nucleusMaterial.emissiveColor = new BABYLON.Color3(0.05, 0.08, 0.1);
        cometNucleus.material = nucleusMaterial;
        
        // Sistema de partículas mejorado para la cola
        const particleSystem = new BABYLON.ParticleSystem(`cometParticles${i}`, 1000, scene);
        
        // Crear textura simple para partículas
        const particleTexture = new BABYLON.Texture(
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9ImdyYWQiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOnJnYigyNTUsMjU1LDI1NSk7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjpyZ2IoMjU1LDI1NSwyNTUpO3N0b3Atb3BhY2l0eTowIiAvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxjaXJjbGUgY3g9IjY0IiBjeT0iNjQiIHI9IjY0IiBmaWxsPSJ1cmwoI2dyYWQpIiAvPjwvc3ZnPg==",
            scene
        );
        particleSystem.particleTexture = particleTexture;
        
        particleSystem.emitter = cometNucleus;
        particleSystem.createPointEmitter(
            new BABYLON.Vector3(-1, 0, 0),
            new BABYLON.Vector3(-1, 0, 0)
        );
        
        // Colores suaves y luminosos
        particleSystem.color1 = new BABYLON.Color4(0.8, 0.9, 1.0, 0.8);
        particleSystem.color2 = new BABYLON.Color4(0.5, 0.7, 1.0, 0.6);
        particleSystem.colorDead = new BABYLON.Color4(0.2, 0.4, 0.8, 0);
        
        particleSystem.minSize = 0.5;
        particleSystem.maxSize = 2.0;
        particleSystem.minLifeTime = 0.5;
        particleSystem.maxLifeTime = 1.5;
        
        particleSystem.emitRate = 200;
        particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
        
        // Movimiento de la cola - las partículas se quedan atrás
        particleSystem.minEmitPower = 0.5;
        particleSystem.maxEmitPower = 1.5;
        particleSystem.updateSpeed = 0.01;
        
        // Sin gravity para que floten naturalmente
        particleSystem.gravity = BABYLON.Vector3.Zero();
        
        // Agregar algo de dispersión
        particleSystem.minAngularSpeed = -0.5;
        particleSystem.maxAngularSpeed = 0.5;
        
        particleSystem.start();
        
        // Coma (nube alrededor del núcleo)
        const coma = BABYLON.MeshBuilder.CreateSphere(
            `cometComa${i}`,
            { diameter: 1.5, segments: 16 },
            scene
        );
        const comaMaterial = new BABYLON.StandardMaterial(`comaMat${i}`, scene);
        comaMaterial.emissiveColor = new BABYLON.Color3(0.4, 0.6, 0.8);
        comaMaterial.alpha = 0.3;
        comaMaterial.disableLighting = true;
        coma.material = comaMaterial;
        coma.parent = cometNucleus;
        
        // Parámetros de órbita elíptica
        const a = 45 + i * 18; // Semi-eje mayor
        const b = 28 + i * 12; // Semi-eje menor
        const speed = 0.006 + i * 0.003;
        const angle = (i * Math.PI * 2) / cometCount;
        
        comets.push({
            mesh: cometNucleus,
            coma: coma,
            particles: particleSystem,
            a: a,
            b: b,
            speed: speed,
            angle: angle,
            lastPosition: new BABYLON.Vector3(0, 0, 0)
        });
    }
    
    return comets;
}

// Crear y ejecutar la escena
const scene = createScene();

// Renderizar
engine.runRenderLoop(() => {
    scene.render();
});

// Redimensionar
window.addEventListener("resize", () => {
    engine.resize();
});

// Información adicional en consola
console.log("🌌 Sistema Solar cargado correctamente");
console.log("📍 Planetas creados:", Object.keys(planetData).length - 1);
console.log("✨ Usa el mouse para explorar el sistema solar");
