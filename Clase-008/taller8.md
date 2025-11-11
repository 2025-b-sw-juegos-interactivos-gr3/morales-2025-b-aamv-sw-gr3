# Taller 8: El Diseño de Doble Propósito

**Tema:** El "Por Qué" y el "Para Qué" - Modelos de Negocio y Aplicaciones

**Basado en:** [Presentación de Juegos Serios vs Entretenimiento](https://app.presentations.ai/view/aV67XFEP4q)

**Fecha de entrega:** [Completar según indicaciones del profesor]

**Integrantes del grupo:**
- Alex Escobar
- Alexander Morales
---

## 1. Contexto y Objetivo

Como ingenieros de sistemas, ustedes diseñan software para resolver problemas. Sin embargo, los "problemas" y las "métricas de éxito" cambian drásticamente según el cliente.

- Para un **Juego de Entretenimiento**, el cliente es el mercado de jugadores, y la métrica de éxito es la **rentabilidad** (generada por la diversión).
- Para un **Juego Serio**, el cliente es una institución (escuela, hospital, empresa), y la métrica de éxito es el **impacto** (aprendizaje, cambio de comportamiento, etc.).

En este taller, diseñarán un sistema (un juego) dos veces. Tomarán una única idea central y la "bifurcarán" para servir a estos dos clientes radicalmente diferentes. Esto les enseñará cómo el propósito (el "para qué") es el requisito de diseño más importante que existe.

---

## 2. Objetivo del Taller

- **Primario:** Diseñar un concepto de juego único y adaptarlo a dos contextos: (1) Entretenimiento (comercial) y (2) Serio (aplicado).
- **Secundario:** Analizar cómo la elección del Modelo de Negocio (ej. F2P) impacta directamente en las Mecánicas de Monetización (ej. Pases de Batalla) y en el diseño del bucle de juego.
- **Terciario:** Diferenciar cómo las Mecánicas de Ludificación se usan para (1) impulsar la retención/monetización versus (2) reforzar los objetivos de aprendizaje/impacto.

---

## 3. Instrucciones de la Tarea

Como grupo, definan un **Concepto Núcleo (Core Concept)**. Debe ser simple y claro.

**Ejemplos:**
- Ejemplo 1: "Un juego sobre gestionar una colonia en Marte."
- Ejemplo 2: "Un juego de puzles tipo 'match-3' donde combinas elementos químicos."
- Ejemplo 3: "Un simulador de citas donde gestionas conversaciones."

**Pasos a seguir:**
1. Una vez definido el concepto, completen la **"Ficha de Diseño Dual"** (Sección 4).
2. Deberán rellenar las columnas para ambas versiones, justificando sus decisiones de diseño.
3. Finalmente, respondan a las **preguntas de análisis comparativo** (Sección 5).

---

## 4. Ficha de Diseño Dual (Plantilla a Completar)

### Concepto Núcleo del Juego:

**"Un juego de simulación de ciudad donde el jugador planifica y administra el sistema de transporte público de una metrópolis en crecimiento."**

El jugador debe diseñar rutas de autobuses, metro y trenes, gestionar horarios, optimizar conexiones, y expandir la infraestructura para satisfacer la demanda de millones de ciudadanos virtuales.

---

### Tabla Comparativa de Diseño

| Característica de Diseño | Versión 1: Juego de Entretenimiento | Versión 2: Juego Serio |
|--------------------------|-------------------------------------|------------------------|
| **Título (Sugerido)** | **"Metro Rush: Transit Empire"** | **"CityFlow: Simulador de Planificación Urbana Sostenible"** |
| **Estética MDA (Propósito)** | **¿Cuál es la "diversión"?**<br><br>• **Fantasía:** Convertirse en el magnate del transporte, construir un imperio de movilidad.<br>• **Desafío:** Resolver puzles logísticos bajo presión temporal y presupuestal.<br>• **Expresión:** Diseñar redes complejas y eficientes, personalizar estaciones y vehículos.<br>• **Descubrimiento:** Desbloquear nuevas tecnologías (metro magnético, autobuses eléctricos). | **¿Cuál es el "propósito" (no-lúdico)?**<br><br>• **Educación:** Enseñar principios de planificación urbana sostenible y movilidad multimodal.<br>• **Entrenamiento:** Capacitar a futuros urbanistas en la toma de decisiones sobre transporte público.<br>• **Concienciación:** Demostrar el impacto ambiental, social y económico de diferentes modelos de transporte.<br>• **Cambio de Comportamiento:** Promover la comprensión de por qué el transporte público es crucial para ciudades sostenibles. |
| **Bucle de Juego (Core Loop)** | **¿Qué hace el jugador repetidamente para divertirse?**<br><br>1. **Observar demanda** → Ver quejas de ciudadanos y puntos calientes de tráfico.<br>2. **Diseñar ruta** → Trazar líneas de autobús/metro conectando zonas clave.<br>3. **Gestionar recursos** → Comprar vehículos, ajustar frecuencias, manejar presupuesto.<br>4. **Ganar dinero** → Cobrar pasajes, recibir subsidios según satisfacción ciudadana.<br>5. **Desbloquear contenido** → Acceder a nuevas tecnologías, mapas, desafíos especiales.<br>6. **Competir** → Subir en rankings globales de "mejor sistema de transporte". | **¿Qué hace el jugador repetidamente para aprender?**<br><br>1. **Analizar escenario real** → Recibir datos de una ciudad real (ej. Bogotá, Santiago) con problemas de movilidad documentados.<br>2. **Proponer solución** → Diseñar intervención (nueva línea, cambio de rutas, política de precios).<br>3. **Simular impacto** → El sistema calcula cambios en: tiempos de viaje, emisiones CO₂, accesibilidad a empleos, equidad social.<br>4. **Recibir feedback pedagógico** → Explicaciones detalladas sobre por qué la decisión funcionó o falló (ej. "Tu ruta ignoró barrios de bajos ingresos, aumentando desigualdad").<br>5. **Iterar y mejorar** → Refinar la solución basándose en métricas de sostenibilidad (triple bottom line: económico, social, ambiental). |
| **Modelo de Negocio / Financiación** | **¿Cómo se financia?**<br><br>**Modelo:** Free-to-Play (F2P) con Pase de Batalla.<br><br>• Descarga gratuita en iOS/Android/Steam.<br>• Ingresos por microtransacciones y suscripción premium. | **¿Cómo se financia?**<br><br>**Modelo:** B2B (Business-to-Business) + Licencias Educativas.<br><br>• Vendido a universidades (Facultades de Ingeniería Civil, Urbanismo) como herramienta de laboratorio.<br>• Licencias gubernamentales para ministerios de transporte y planificación urbana.<br>• Precio: $5,000 USD/año por institución (acceso ilimitado para estudiantes/funcionarios). |
| **Mecánicas de Monetización** | **¿Cómo genera ingresos?**<br><br>**1. Microtransacciones (MTX):**<br>• **"CityCoins" (moneda premium):** Para acelerar construcción de estaciones (normalmente 24h reales → instantáneo).<br>• **Paquetes de vehículos exclusivos:** Trenes futuristas, autobuses con skins de marcas reales (publicidad integrada).<br><br>**2. Pase de Batalla (Battle Pass):**<br>• Temporadas de 90 días con desafíos diarios ("Transporta 1M de pasajeros hoy").<br>• Recompensas: Decoraciones de estaciones, efectos visuales, mapas exclusivos (ej. "Nueva York 1920").<br>• Versión gratis (recompensas básicas) vs. Premium ($9.99, recompensas x3).<br><br>**3. DLC:**<br>• Expansiones de ciudades ("Tokyo Megacity", "European Capitals").<br>• Modo "Desastres" (gestionar transporte durante terremotos, inundaciones). | **¿Cómo "genera ingresos" o justifica su costo?**<br><br>**No hay monetización al usuario final.** El valor se justifica por:<br><br>**1. Reducción de costos educativos:**<br>• Reemplaza costosas visitas de campo y estudios de caso tradicionales.<br>• Una licencia de $5,000/año es más barata que contratar consultores externos para capacitación.<br><br>**2. Mejora en outcomes académicos:**<br>• Estudiantes que usan el simulador obtienen 23% mejor rendimiento en exámenes de planificación de transporte (según estudio piloto ficticio).<br><br>**3. Impacto en políticas públicas:**<br>• Gobiernos usan el simulador para comunicar a ciudadanos por qué ciertas rutas de metro son inviables (ej. "Vea usted mismo por qué la ruta X es 400% más costosa que Y").<br><br>**4. ROI medible:**<br>• Reducción de errores en proyectos reales (ej. menos rutas de transporte mal planificadas que deben reconfigurarse, ahorrando millones). |
| **Mecánicas de Ludificación (Gamificación)** | **¿Cómo se usa para impulsar la retención/monetización?**<br><br>**1. Puntos (Currency System):**<br>• **Dinero del juego** (gratis, lento) vs. **CityCoins** (premium, rápido).<br>• Genera "friction" para que los jugadores impacientes paguen.<br><br>**2. Leaderboards (Tablas de Clasificación):**<br>• **Global:** "Top 100 sistemas de transporte más eficientes".<br>• **Regional:** Competir con amigos.<br>• **Incentivo:** Los top 10 cada temporada ganan CityCoins gratis (fomenta juego competitivo constante).<br><br>**3. Recompensas Variables (Loot Boxes):**<br>• **Cajas Misteriosas:** Al completar desafíos diarios, posibilidad de ganar ítems raros (0.5% probabilidad de vehículo legendario).<br>• Explotan el ciclo de recompensa dopaminérgica.<br><br>**4. FOMO (Fear of Missing Out):**<br>• Eventos limitados ("Semana de Trenes Bala: ¡Solo 7 días!").<br>• Pase de Batalla expira, forzando juego diario para no "perder" recompensas pagadas.<br><br>**5. Logros (Achievements):**<br>• 200+ logros desbloqueables (ej. "Mueve 10M de pasajeros sin accidentes").<br>• Impulsan completionismo. | **¿Cómo se usa para reforzar el objetivo pedagógico?**<br><br>**1. Insignias (Badges) Pedagógicas:**<br>• **"Experto en Multimodalidad":** Por diseñar sistema con 3+ tipos de transporte integrados.<br>• **"Defensor de la Equidad":** Por reducir tiempo de viaje promedio en barrios de bajos ingresos en 20%.<br>• Funcionan como **micro-credenciales** que aparecen en perfil del estudiante (pueden mostrarse en CVs).<br><br>**2. Barras de Progreso (Mastery Paths):**<br>• Módulos secuenciales: "Fundamentos → Diseño Avanzado → Sostenibilidad → Política Pública".<br>• Cada módulo tiene objetivos claros (ej. "Reduce emisiones CO₂ en 30%").<br>• Transparencia total: el estudiante ve exactamente qué le falta para dominar cada concepto.<br><br>**3. Feedback Inmediato y Formativo:**<br>• **No punitivo:** En lugar de "Game Over", el juego dice: "Tu ruta generó 200 toneladas extra de CO₂ porque no priorizaste buses eléctricos. Intenta de nuevo con la flota verde".<br>• **Explicaciones contextuales:** Pop-ups con microartículos (estilo Wikipedia) sobre conceptos (ej. "¿Qué es Transit-Oriented Development?").<br><br>**4. Simulación de Consecuencias Realistas:**<br>• Las decisiones tienen efectos a largo plazo visibles (ej. una mala ruta genera protestas ciudadanas virtuales, noticias en periódicos del juego).<br>• **Aprendizaje experiencial:** El estudiante "vive" las consecuencias sin riesgo real.<br><br>**5. Portafolio de Evidencias:**<br>• El juego exporta un PDF con todas las soluciones del estudiante, métricas logradas, y reflexiones (el estudiante escribe por qué tomó cada decisión).<br>• Este portafolio se entrega como tarea evaluable. |
| **Métrica de Éxito (KPI)** | **¿Cómo medimos el éxito del sistema?**<br><br>**KPIs de Negocio (Rentabilidad):**<br><br>**1. Retención:**<br>• **D1:** 60% (jugadores que vuelven al día siguiente).<br>• **D7:** 35%.<br>• **D30:** 15%.<br><br>**2. Monetización:**<br>• **ARPDAU:** $0.15 (Ingreso Promedio por Usuario Activo Diario).<br>• **Conversion Rate:** 8% de jugadores F2P compran algo.<br>• **Whale Percentage:** 2% de jugadores generan 50% de los ingresos.<br><br>**3. Engagement:**<br>• **Sesión promedio:** 35 minutos.<br>• **Sesiones/día:** 2.5.<br><br>**4. Viralidad:**<br>• **K-Factor:** 1.2 (cada jugador trae 1.2 jugadores nuevos en promedio).<br><br>**Meta:** Ser top 50 en categoría "Simulación" en App Store en 6 meses. | **¿Cómo medimos el éxito del sistema?**<br><br>**KPIs de Impacto Educativo:**<br><br>**1. Aprendizaje (Learning Outcomes):**<br>• **Pre/Post Test:** Examen antes y después del uso del simulador.<br>  - **Meta:** 30% de mejora promedio en puntajes.<br>• **Retención de Conocimiento:** Re-test a los 3 meses (¿siguen recordando los conceptos?).<br><br>**2. Completitud del Módulo:**<br>• **Meta:** 85% de estudiantes completan todos los módulos obligatorios.<br>• **Tiempo promedio de completitud:** 12 horas (equivalente a 1.5 semanas de clases tradicionales).<br><br>**3. Transferencia de Habilidades:**<br>• **Evaluación de proyectos reales:** ¿Los estudiantes que usaron el simulador diseñan mejores propuestas de transporte en sus proyectos finales de carrera?<br>  - **Meta:** 40% más probable que sus propuestas sean "viables" según rúbrica de profesores.<br><br>**4. Satisfacción del Cliente (Institución):**<br>• **NPS (Net Promoter Score):** Encuesta a profesores: "¿Recomendaría este software?" (Meta: NPS > 50).<br>• **Renovación de licencia:** 90% de instituciones renuevan al año siguiente.<br><br>**5. Impacto Social Medible:**<br>• Número de funcionarios gubernamentales capacitados que luego implementaron políticas de transporte sostenible (evidencia anecdótica + casos de estudio). |

---

## 5. Análisis Comparativo (Preguntas)

Después de llenar la tabla, discutan como grupo y respondan las siguientes preguntas:

### 1. Impacto del Modelo F2P

En su Versión 1 (Entretenimiento), **¿cómo la elección del modelo F2P y sus mecánicas de monetización (MTX, Pases de Batalla) forzaron cambios en el diseño del bucle de juego?**

*(Ej. ¿Tuvieron que añadir "puntos de dolor" (como tiempos de espera) para que las MTX (aceleradores) fueran deseables?)*

**Respuesta:**

Sí, el modelo F2P transformó radicalmente el bucle de juego de **Metro Rush**. Mientras que en una versión premium (pago único) el objetivo sería puramente "resolver el puzle de transporte", en F2P tuvimos que introducir **fricción artificial** para crear oportunidades de monetización:

**Puntos de dolor añadidos:**

1. **Temporizadores de construcción:** Construir una estación de metro toma 24 horas reales (reducible a instantáneo con 500 CityCoins). Esto no tiene justificación de diseño lúdico—es puramente un "pain point" para vender aceleradores.

2. **Sistema de energía limitada:** Los jugadores tienen 5 "Permisos de Construcción" que se regeneran cada 4 horas. Si quieren expandir más rápido, deben pagar. Esto fragmenta sesiones de juego naturalmente largas (negativo para la experiencia, positivo para la retención D1).

3. **Curva de progresión inflada:** En las primeras 2 horas, el juego es generoso (progreso rápido, engancha al jugador). Luego, entre las horas 3-10, el progreso se vuelve deliberadamente lento sin gastar dinero—el infame "paywall suave".

4. **Desbalanceo intencional:** Los vehículos premium (de pago) son 30% más eficientes que los gratuitos. Técnicamente, puedes ganar sin pagar, pero te toma 3x más tiempo, generando frustración que empuja a las MTX.

**Impacto en mecánicas:**

- **Leaderboards:** Tuvimos que añadir rankings competitivos que premian a los jugadores que progresan más rápido (lo cual favorece a quienes pagan). Esto crea presión social/FOMO para gastar.
  
- **Eventos temporales:** Creamos desafíos de tiempo limitado ("¡Construye 10 estaciones en 48 horas!") que son casi imposibles sin pagar por aceleradores. Esto explota la aversión a perder oportunidades únicas.

**Conclusión crítica:** El modelo F2P nos forzó a **diseñar contra la diversión** en ciertos momentos. La versión más divertida sería sin temporizadores, pero la más rentable requiere frustración calculada. Este es el compromiso ético del F2P: balancear rentabilidad con no alienar completamente a jugadores no-pagadores.

---

### 2. Impacto del Propósito Serio

En su Versión 2 (Serio), **¿cómo el objetivo pedagógico (ej. "enseñar higiene") restringió el diseño del juego?**

**¿Qué mecánicas divertidas pero "poco realistas" de la Versión 1 tuvieron que eliminar o modificar?**

**Respuesta:**

El objetivo pedagógico de **CityFlow** (enseñar planificación de transporte sostenible) impuso restricciones de **realismo y precisión** que entraron en conflicto directo con mecánicas "divertidas" de la versión de entretenimiento:

**Mecánicas eliminadas por falta de realismo:**

1. **Construcción instantánea ilimitada (versión arcádica):**
   - **En Metro Rush:** Puedes trazar 50 líneas de metro en 5 minutos, ignorando geología, propiedad de tierras, etc.
   - **En CityFlow:** Cada propuesta de ruta debe considerar: costo real por km ($100M-$500M), suelo apto (no puedes tunear bajo ríos sin tecnología especial), impacto en comunidades (¿desplazarás viviendas?). Esto ralentiza el juego pero es esencial para el aprendizaje.

2. **Vehículos "fantásticos":**
   - **En Metro Rush:** Existe un "Tren Bala Arcoíris" que va a 800 km/h y tiene capacidad infinita (monetizado, divertido, irreal).
   - **En CityFlow:** Solo se permiten vehículos con especificaciones reales (ej. Metro de Medellín: 60 km/h máximo, 1,200 pasajeros/hora por dirección). Los estudiantes deben entender las **limitaciones físicas reales**.

3. **Simplificación extrema del presupuesto:**
   - **En Metro Rush:** "Dinero del juego" abstracto. Ganas $1,000 por pasajero, gastas $5,000 en una estación. Los números no significan nada real.
   - **En CityFlow:** Presupuestos basados en datos de proyectos reales del Banco Mundial. Los estudiantes deben defender su propuesta ante un "Concejo Municipal simulado" con recursos limitados ($500M para 10 años). Esto enseña trade-offs reales pero reduce la gratificación instantánea.

4. **Eliminación de "power-ups" mágicos:**
   - **En Metro Rush:** Puedes comprar un ítem que "duplica pasajeros por 1 hora" (mecánica de boost típica de mobile games).
   - **En CityFlow:** No hay atajos mágicos. Si quieres más pasajeros, debes diseñar rutas que realmente conecten zonas de alta demanda (residencias con empleos). Esto es educativo pero menos emocionante.

**Mecánicas modificadas (no eliminadas, sino "realistizadas"):**

5. **Sistema de desastres:**
   - **En Metro Rush:** Los desastres son espectaculares y arcade (ej. Godzilla destruye tu metro, debes reconstruir rápido—puro entretenimiento).
   - **En CityFlow:** Los desastres son escenarios pedagógicos reales: "Terremoto 7.5 Richter—¿tu metro tiene diseño antisísmico? Si no, analiza costos de reconstrucción vs. inversión preventiva". Enseña resiliencia urbana pero es menos "épico".

**Restricción pedagógica más importante:**

La necesidad de **feedback formativo explícito** ralentizó el ritmo del juego. En Metro Rush, el feedback es inmediato y emocional ("¡Wow, 5 estrellas!"). En CityFlow, cada decisión genera un informe de 2 párrafos explicando el impacto en equidad, ambiente y economía. Esto es crucial para aprender, pero interrumpe el "flow state" que busca un juego de entretenimiento.

**Conclusión:** El propósito serio nos obligó a priorizar **fidelidad a la realidad** sobre diversión inmediata. Tuvimos que aceptar que CityFlow sería "menos adictivo" pero infinitamente más útil para sus usuarios (estudiantes y planificadores).

---

### 3. El Doble Rol de la Ludificación

Comparen el uso de las mecánicas de gamificación (Puntos, Insignias, Leaderboards) en ambas versiones.

**¿Cómo cambia su propósito de ser una herramienta de motivación extrínseca para el gasto/juego a ser una herramienta de refuerzo positivo para el aprendizaje?**

**Respuesta:**

Las mismas mecánicas de gamificación (Puntos, Insignias, Leaderboards) aparecen en ambas versiones, pero su **diseño ético y función psicológica** son radicalmente opuestos:

---

#### **A) PUNTOS (Sistema de Scoring)**

| Aspecto | Metro Rush (Entretenimiento) | CityFlow (Serio) |
|---------|------------------------------|-------------------|
| **Qué representan** | **Dinero virtual abstracto** sin relación con economía real. Diseñado para ser abundante al inicio (dopamina) y escaso después (frustración→pago). | **Indicadores de desempeño reales:** Puntaje de sostenibilidad (0-100) calculado con fórmulas del IPCC (emisiones), índice Gini (equidad), y costo-beneficio económico. |
| **Función psicológica** | **Motivación extrínseca manipulativa:** Los puntos existen para crear "hambre" de más puntos, lo cual se satisface gastando dinero real (comprar boosts que dan +50% puntos). | **Feedback formativo transparente:** Los puntos reflejan qué tan bien el estudiante entendió los principios de diseño. Un puntaje bajo viene con explicación de qué mejorar. |
| **Diseño ético** | **Opaco e inflado:** El juego no explica cómo se calculan los puntos (black box). Los números son grandes (¡10,000 puntos!) para generar sensación de progreso sin significado real. | **Transparente y calibrado:** Cada punto tiene una rúbrica. "Obtuviste 65/100 en equidad porque tu sistema sirve solo al 40% de barrios de bajos ingresos (meta: 80%)". |

**Cambio clave:** En Metro Rush, los puntos son un **señuelo** para mantener al jugador en un bucle de recompensa que culmina en gasto. En CityFlow, los puntos son un **termómetro educativo** que guía el aprendizaje.

---

#### **B) INSIGNIAS (Badges/Achievements)**

| Aspecto | Metro Rush (Entretenimiento) | CityFlow (Serio) |
|---------|------------------------------|-------------------|
| **Qué desbloquean** | **Contenido cosmético y estatus social.** Ej: Insignia "Metro Baron" (construye 100 estaciones) desbloquea un avatar dorado para mostrar en tu perfil. | **Certificación de competencias.** Ej: Insignia "Experto en Transporte Multimodal" certifica que el estudiante demostró habilidad para integrar 3+ modos (bus, metro, bici) con transferencias eficientes <5 min. |
| **Función psicológica** | **Completionismo y FOMO.** Hay 200+ insignias, muchas exclusivas de eventos ("¡Solo en Navidad 2025!"). Explotan el deseo de coleccionar y la aversión a perderse contenido. | **Micro-credenciales significativas.** Las insignias son evidencia de aprendizaje. Los profesores las mapean a objetivos del curso. Algunas incluso son reconocidas por empleadores (ej. ministerios de transporte valoran la insignia "Planificador Sostenible Certificado"). |
| **Criterio de obtención** | **Grind o pago.** Muchas insignias requieren tiempo absurdo (ej. "Transporta 1 billón de pasajeros"—calculado para tomar 500 horas o comprar aceleradores). | **Demostración de maestría.** Para obtener "Experto en Sostenibilidad", debes completar 5 escenarios donde reduces emisiones >30% sin aumentar costo >10%. No puedes comprar esto, debes aprenderlo. |

**Cambio clave:** En Metro Rush, las insignias son **trofeos vacíos** diseñados para alimentar el ego y el FOMO. En CityFlow, son **credenciales pedagógicas** que certifican habilidades transferibles al mundo real.

---

#### **C) LEADERBOARDS (Tablas de Clasificación)**

| Aspecto | Metro Rush (Entretenimiento) | CityFlow (Serio) |
|---------|------------------------------|-------------------|
| **Qué miden** | **Progreso total (absoluto).** Top 100 jugadores con más "puntos acumulados" o "sistemas más grandes". Favorece a quien juega más horas o gasta más dinero. | **Calidad de soluciones (relativo).** Rankings por "mejor diseño" en cada escenario, evaluado por algoritmo multi-criterio (sostenibilidad, equidad, viabilidad). Un estudiante que juega 2 horas pero diseña brillantemente puede superar a quien jugó 20 horas mediocremente. |
| **Función psicológica** | **Competencia dañina (Pay-to-Win).** Como los jugadores pagadores progresan más rápido, los leaderboards se vuelven "rankings de quién gastó más". Esto genera resentimiento en jugadores F2P pero también presiona a algunos a pagar para "no quedar atrás". | **Competencia constructiva (Colaboración implícita).** Los estudiantes pueden ver las soluciones de los top 10 (anonimizadas) y aprender de ellas. El leaderboard se convierte en un repositorio de "mejores prácticas". |
| **Incentivos** | **Recompensas que impulsan más gasto.** Los top 10 de cada semana ganan 1,000 CityCoins gratis. Esto crea un ciclo: gastar para llegar al top → ganar moneda gratis → sentirse validado → gastar más la próxima semana. | **Recompensas puramente simbólicas.** Los top 10 del semestre reciben un "Certificado de Excelencia" firmado por el profesor y un badge digital para LinkedIn. No hay incentivo monetario—la recompensa es el reconocimiento académico genuino. |

**Cambio clave:** En Metro Rush, los leaderboards son una **herramienta de explotación** que convierte la competitividad natural en presión para monetizar. En CityFlow, son una **herramienta de benchmarking** que permite a los estudiantes calibrar su aprendizaje contra pares.

---

#### **SÍNTESIS: Motivación Extrínseca (Entretenimiento) vs. Refuerzo Positivo (Aprendizaje)**

| Dimensión | Metro Rush | CityFlow |
|-----------|------------|----------|
| **¿Para qué existen las mecánicas de gamificación?** | Para **maximizar tiempo en pantalla y gasto**. Cada mecánica está calibrada para crear ansiedad, FOMO y deseo de pagar. | Para **estructurar el proceso de aprendizaje**. Cada mecánica proporciona feedback, motiva la práctica deliberada, y certifica competencias. |
| **¿Qué emoción explotan?** | **Avaricia, envidia, miedo a perder.** Leaderboards generan envidia ("¿Por qué él está #1 y yo #500?"). Las recompensas variables (loot boxes) explotan la adicción al azar. | **Curiosidad, orgullo, sentido de logro.** Las insignias generan orgullo por maestría genuina. El feedback genera curiosidad ("¿Cómo puedo mejorar mi puntaje de equidad?"). |
| **¿Son manipulativas?** | **Sí, intencionalmente.** Diseñadas por psicólogos para crear "whales" (jugadores que gastan $1,000+). No hay transparencia sobre probabilidades, costos ocultos, etc. | **No. Son transparentes y opcionales.** Los estudiantes saben exactamente qué mide cada métrica. Si un estudiante no le interesan las insignias, puede ignorarlas sin penalización (la evaluación del profesor es independiente). |
| **¿Qué sucede si las eliminas?** | **El juego colapsa.** Sin leaderboards, sin FOMO, sin loot boxes, la retención cae 70% y la monetización desaparece. Las mecánicas de gamificación SON el producto. | **El aprendizaje persiste.** Las mecánicas de gamificación son un "andamiaje motivacional" útil, pero los estudiantes podrían aprender los mismos conceptos sin ellas (solo sería menos motivante). Las mecánicas **facilitan** el aprendizaje, no lo constituyen. |

**Conclusión filosófica:**

En **Metro Rush**, la gamificación es una **trampa de Skinner** (condicionamiento operante para maximizar extracción de valor del jugador). En **CityFlow**, es **andamiaje Vigotskiano** (estructura temporal que soporta el aprendizaje hasta que el estudiante internaliza las competencias).

La misma herramienta (puntos, insignias, leaderboards), pero con **intenciones éticas opuestas**: una diseñada para lucrar de impulsos humanos, la otra para cultivar habilidades humanas.

---

## Notas y Reflexiones Adicionales

### Lecciones Clave del Ejercicio de Diseño Dual

Este ejercicio de "bifurcar" un mismo concepto de juego en dos direcciones opuestas (entretenimiento vs. serio) revela verdades fundamentales sobre el diseño de sistemas:

#### 1. **El "Para Qué" Determina el "Cómo"**

El propósito del sistema (rentabilidad vs. impacto educativo) no es un "detalle" que se agrega al final—es el **requisito arquitectónico fundamental** que dicta:
- Qué métricas optimizamos (tiempo en pantalla vs. transferencia de conocimiento)
- Qué constituye "éxito" (retención D7 vs. mejora en exámenes post-test)
- Qué trade-offs son aceptables (frustración calculada para monetización vs. realismo aunque sea menos "divertido")

#### 2. **El Modelo de Negocio es una Fuerza de Diseño**

El modelo F2P no es solo "cómo cobramos"—es una **decisión de producto** que ripples a través de todo el diseño:
- Fuerza la creación de "pain points" artificiales (temporizadores)
- Requiere sistemas de retención agresivos (eventos FOMO, recompensas variables)
- Convierte el diseño de juego en "diseño de incentivos para el gasto"

En contraste, el modelo B2B/Licencias en juegos serios permite diseñar sin estas restricciones, pero impone otras: cumplir estándares educativos, medibilidad de outcomes, justificación de ROI al cliente institucional.

#### 3. **La Gamificación es una Navaja de Doble Filo**

Las mecánicas de gamificación (puntos, insignias, leaderboards) son **moralmente neutras**—su ética depende de la intención:
- Usadas para explotar vulnerabilidades psicológicas (adicción al azar, FOMO, envidia) = manipulación
- Usadas para estructurar aprendizaje, dar feedback, certificar competencias = pedagogía

Como diseñadores, tenemos la responsabilidad de preguntarnos: **¿Estas mecánicas sirven al usuario o lo explotan?**

#### 4. **Restricciones Pedagógicas ≠ Menos Creatividad**

Contrario a la intuición, diseñar bajo las restricciones de un juego serio (realismo, precisión, objetivos educativos) no sofoca la creatividad—la **reenfoca**:
- En vez de "¿Cómo hacemos esto más adictivo?", preguntamos "¿Cómo hacemos esto más significativo?"
- Las mecánicas deben hacer "doble trabajo": ser engaging Y enseñar algo verdadero sobre el mundo

### Preguntas para Reflexión Grupal

1. **Ética del F2P:** ¿Es inherentemente inmoral diseñar juegos F2P que explotan FOMO y recompensas variables? ¿O es aceptable mientras el jugador sepa en qué se está metiendo?

2. **Diversión vs. Aprendizaje:** ¿Son fundamentalmente incompatibles? ¿O simplemente requieren diferentes balances de realismo, dificultad y feedback?

3. **Transferencia de Conocimiento:** Si tuvieras que diseñar un juego serio para enseñar tu propia carrera (ingeniería de sistemas), ¿qué concepto núcleo elegirías? ¿Qué mecánicas serían esenciales vs. cuáles serían contraproducentes?

---

### Referencias y Recursos Adicionales

**Sobre Modelos de Negocio en Juegos:**
- Luton, W. (2013). *Free-to-Play: Making Money From Games You Give Away*
- Seufert, E. B. (2013). *Freemium Economics*

**Sobre Juegos Serios y Gamificación:**
- Deterding, S., et al. (2011). "Gamification: Toward a Definition"
- Gee, J. P. (2007). *What Video Games Have to Teach Us About Learning and Literacy*
- Bogost, I. (2007). *Persuasive Games: The Expressive Power of Videogames*

**Sobre Diseño Ético:**
- Celia Hodent (2017). *The Gamer's Brain: How Neuroscience and UX Can Impact Video Game Design*
- Sicart, M. (2009). *The Ethics of Computer Games*

**Casos de Estudio de Juegos Serios:**
- *Foldit* (University of Washington) - Plegamiento de proteínas
- *SimCityEDU* (GlassLab) - Planificación urbana para estudiantes
- *Re-Mission* (HopeLab) - Adherencia a tratamientos de cáncer en adolescentes
