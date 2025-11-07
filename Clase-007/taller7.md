
---
---

# Clase 007

**Basado en:** [Presentación - Fundamentos y Contexto del Juego: Módulo 1](https://app.presentations.ai/view/z26sCCO9HS)

**Curso:** CC: 2025-B SW Juegos Interactivos GR3

---

## Taller 1.1 (Asincrónico): Deconstruyendo la Diversión

### Tema: El "Qué" y el "Dónde" - Análisis de Sistemas con el Framework MDA

---

### 1. Contexto y Objetivo

Como **ingenieros de sistemas**, su disciplina es **deconstruir sistemas complejos** para entender sus componentes, sus interacciones y sus objetivos. Un videojuego es un **sistema de software** con un objetivo muy particular: generar una **respuesta emocional específica** en el usuario (la "diversión" o Estética).

El **Framework MDA** (Mecánicas, Dinámicas, Estéticas) es una herramienta de ingeniería de diseño que nos permite **"leer" un juego**. Nos permite aplicar una autopsia formal a la experiencia del jugador:

- **Mecánicas (M):** Las reglas fundamentales y el código. Son los algoritmos, las acciones (los "verbos" del jugador como `saltar()`, `disparar()`) y los componentes base que el diseñador implementa.

- **Dinámicas (D):** El comportamiento emergente del sistema cuando el usuario (jugador) interactúa con las mecánicas. Son las estrategias, tácticas y comportamientos que no están programados explícitamente, pero que surgen del juego.

- **Estéticas (A):** La experiencia del usuario (UX) o la respuesta emocional que el sistema busca evocar. Es el "objetivo" del software (Desafío, Fantasía, Narrativa, Descubrimiento, etc.).

---

### 2. Objetivo del Taller

- **Primario:** Aplicar el framework MDA para analizar y deconstruir seis (6) sistemas de software (juegos) pertenecientes a los géneros principales.

- **Secundario:** Identificar los patrones de diseño (Mecánicas) que definen un género y comparar cómo diferentes sistemas (juegos) los implementan.

- **Terciario:** Practicar la habilidad de identificar cómo mecánicas similares pueden generar dinámicas y estéticas completamente diferentes.

---

### 3. Instrucciones de la Tarea Principal

La tarea de su grupo es analizar **seis (6) juegos**.

Deben seleccionar **un (1) juego** que represente clara y fuertemente a cada uno de los siguientes **seis géneros principales** vistos en la presentación:

1. **Acción**
2. **Aventura**
3. **RPG** (Juego de Rol)
4. **Estrategia**
5. **Simulación**
6. **Puzle**

Son libres de elegir cualquier juego (clásico o moderno) siempre que sea un **buen ejemplo del género**. Un buen ejemplo es aquel cuyas mecánicas centrales definen el género (Ej. Para Acción, Devil May Cry o Celeste; para Estrategia, StarCraft o Civilization).

- **Completen** la **"Tabla Comparativa de Análisis MDA"** que se encuentra en la Sección 4.
- Una vez completada la tabla, **respondan** a las preguntas de análisis en la Sección 5.

---

### 4. Ficha de Análisis: Tabla Comparativa MDA - COMPLETA

Completen la siguiente tabla. Sean específicos y concisos.

| Género | Juego Seleccionado (y Año) | Mecánicas Clave (M)<br>_(¿Cuáles son los "verbos" y reglas principales?)_ | Dinámicas Emergentes (D)<br>_(¿Qué estrategias o comportamientos surgen?)_ | Estética Dominante (A)<br>_(¿Cuál es la "diversión" o el objetivo emocional principal?)_ |
|--------|---------------------------|---------------------------------------------------------------------------|---------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| **Acción** | **Celeste** (2018) | • `Saltar()`<br>• `Dash()` (en 8 direcciones)<br>• `Escalar()` (resistencia limitada)<br>• **Regla:** Reset del Dash al tocar el suelo. | • Encadenamiento de saltos y dashes ("speedrunning").<br>• Tácticas de "baile" para evitar obstáculos.<br>• Búsqueda de rutas óptimas.<br>• Optimización frame-perfect. | • **Desafío** (Precisión, tiempo)<br>• **Dominio** (Sentirse hábil)<br>• **Descubrimiento** (rutas secretas) |
| **Aventura** | **The Legend of Zelda: Breath of the Wild** (2017) | • `Explorar()` mundo abierto<br>• `Escalar()` cualquier superficie<br>• `Cocinar()` / `Craftear()`<br>• `Resolver()` santuarios/puzzles<br>• **Regla:** Durabilidad de armas (se rompen) | • Planificación de rutas de exploración.<br>• Experimentación con sistemas de física (fuego + viento = corriente ascendente).<br>• Creatividad en combate (rodar rocas, atraer enemigos a trampas).<br>• Coleccionismo emergente (Korok seeds). | • **Descubrimiento** (exploración libre)<br>• **Expresión** (resolver problemas de múltiples formas)<br>• **Sensación** (escalada, parapente) |
| **RPG** | **Final Fantasy VII** (1997) | • `Combate()` por turnos (ATB - Active Time Battle)<br>• `EquiparMateria()` (sistema de habilidades modular)<br>• `Invocar()` criaturas<br>• `Desarrollar()` personajes (stats, niveles)<br>• **Regla:** Materia gana AP en combate y evoluciona | • Construcción de builds (combinaciones de Materia sinérgicas).<br>• Optimización de equipo para jefes específicos.<br>• Farming de AP/Gil en áreas específicas.<br>• Experimentación con invocaciones. | • **Fantasía** (salvar el planeta, ser héroe)<br>• **Narrativa** (historia emocional profunda)<br>• **Progresión** (ver crecer a los personajes)<br>• **Colección** (Materia, límites) |
| **Estrategia** | **StarCraft II: Wings of Liberty** (2010) | • `Recolectar()` recursos (minerales, gas vespeno)<br>• `Construir()` edificios y unidades<br>• `Microgestionar()` unidades en combate<br>• `Explorar()` mapa (fog of war)<br>• **Regla:** Recursos limitados, macro vs micro | • Desarrollo de build orders (secuencias de construcción optimizadas).<br>• Tácticas de "rush", "boom" o "turtle".<br>• Micromanagement de unidades (focus fire, kiting).<br>• Meta-game entre razas (Terran/Zerg/Protoss). | • **Desafío** (competencia PvP)<br>• **Estrategia** (planificación a largo plazo)<br>• **Dominio** (maestría de APM, decisiones)<br>• **Expresión** (estilo de juego único) |
| **Simulación** | **The Sims 4** (2014) | • `Crear()` Sims (personalización profunda)<br>• `Controlar()` necesidades (hambre, social, diversión)<br>• `Construir()` casas<br>• `Desarrollar()` relaciones<br>• `Trabajar()` en carreras<br>• **Regla:** Tiempo transcurre, necesidades decaen | • Narrativas emergentes (historias no planificadas).<br>• Experimentación social (¿qué pasa si...?).<br>• Optimización de rutinas para maximizar felicidad.<br>• Rol-playing (crear familias con personalidades específicas). | • **Fantasía** (vivir otra vida)<br>• **Expresión** (creatividad en construcción/personalización)<br>• **Narrativa Emergente** (drama no escrito)<br>• **Descubrimiento** (interacciones inesperadas) |
| **Puzle** | **Portal 2** (2011) | • `Disparar()` portales (entrada/salida en superficies blancas)<br>• `Usar()` momentum (velocidad se conserva entre portales)<br>• `Activar()` botones, redirigir láseres<br>• `Pensar()` en 3D espacial<br>• **Regla:** Solo 2 portales activos simultáneamente | • "Pensar con portales" (cambio de perspectiva mental).<br>• Flinging (usar caída para ganar velocidad horizontal).<br>• Secuencias de portales múltiples para navegación.<br>• Experimentación con física de objetos. | • **Desafío** (resolución de problemas)<br>• **Descubrimiento** (momento "¡ajá!" al resolver)<br>• **Sensación** (momentum, velocidad)<br>• **Narrativa** (humor oscuro de GLaDOS) |

---

### 5. Análisis Comparativo (Similitudes y Diferencias)

Después de llenar la tabla, discutan como grupo y respondan las siguientes preguntas en un breve ensayo (2-3 párrafos):

#### 1. Análisis de Diferencias:

Comparen directamente los juegos que eligieron para **Acción** y **Estrategia**. ¿En qué se diferencian fundamentalmente sus **"bucles de juego"** (Core Loops)? ¿Dónde pone cada sistema la presión sobre el jugador (ej. en la velocidad de reacción física vs. en la calidad de la planificación a largo plazo)?

**Respuesta:**

**Celeste** (Acción) y **StarCraft II** (Estrategia) representan dos filosofías de diseño completamente opuestas en cuanto a dónde colocan la presión cognitiva y física del jugador.

**El Core Loop de Celeste** es un **ciclo micro de segundos**: *Intentar → Fallar → Reintentar inmediatamente*. La presión está en la **ejecución física en tiempo real**. El jugador debe ejecutar inputs precisos (salto + dash + direccional) en ventanas de 0.1-0.2 segundos. La *"skill"* aquí es **memoria muscular** y **timing reflexivo**. El juego te permite reintentar infinitamente sin penalización, porque el desafío es puramente de ejecución. No hay planificación estratégica: ves la pantalla, sabes qué hacer, pero hacerlo es el reto. Es el equivalente digital a hacer un "trick" en skateboard: sabes cómo funciona, pero tu cuerpo debe ejecutarlo perfectamente.

**El Core Loop de StarCraft II** es un **ciclo macro de minutos**: *Planificar build order → Ejecutar macro económica → Scouts/Información → Adaptar estrategia → Combate táctico*. La presión está en **tomar decisiones correctas bajo información incompleta**. Aunque existe componente de ejecución (APM - acciones por minuto), la verdadera habilidad es **gestión cognitiva de múltiples sistemas simultáneos**: economía (¿cuántos trabajadores construyo?), tecnología (¿investigo unidades tier 2 o produzco más tier 1?), inteligencia militar (¿dónde está el ejército enemigo?), y micro-tácticas en combate. Cada decisión tiene *"costo de oportunidad"*: si construyes un edificio militar temprano, sacrificas economía; si esperas demasiado, te hacen "rush". Es más parecido a jugar ajedrez con límite de tiempo, donde la velocidad física importa, pero solo si tus decisiones son inteligentes.

**La diferencia fundamental:** Celeste es un **test de habilidad física** (¿pueden tus dedos ejecutar esto?). StarCraft II es un **test de habilidad mental** (¿puede tu cerebro gestionar esta complejidad?). En Celeste, puedes "ver" la solución al 100% y aún así fallar 200 veces. En StarCraft, puedes tener el APM de un profesional y perder porque tu estrategia fue inferior. Uno es **determinista** (mismo input = mismo output), el otro es **estocástico/adaptativo** (el oponente reacciona a tus acciones). Como ingenieros de sistemas, Celeste es un **sistema cerrado con estado completo visible**, mientras que StarCraft es un **sistema distribuido con información parcial** (fog of war).

---

#### 2. Análisis de Similitudes (Polimorfismo de Mecánicas):

Identifiquen una **Mecánica que exista en más de un género** de su tabla. (Ej. "Gestión de Recursos" puede estar en un RPG y en un juego de Estrategia; "Resolución de Puzles" puede estar en Aventura y Puzle).

**Analicen:** ¿Cómo el **contexto** (las otras mecánicas) cambia la **Dinámica** y la **Estética** de esa mecánica compartida?

_(Ej. "Gestionar recursos (pociones) en un RPG de Acción se siente como 'supervivencia táctica' (Estética: Desafío), mientras que gestionar recursos (madera) en un juego de Estrategia se siente como 'construcción de imperio' (Estética: Crecimiento/Dominio)")._

**Respuesta:**

**Mecánica Compartida Identificada: `Resolver() Puzles Espaciales`**

Esta mecánica aparece en **Breath of the Wild** (Aventura), **Portal 2** (Puzle), y como elemento secundario en **Final Fantasy VII** (RPG - puzles de dungeons).

En **Portal 2** (Puzle), `Resolver()` es la **mecánica central y única**. El juego es 100% puzles. Cada habitación es un "problema cerrado" con una solución específica (aunque a veces múltiples caminos). La **Dinámica** que emerge es puramente **analítica**: el jugador entra en "modo ingeniero", deconstruyendo el espacio en componentes (superficies portables, botones, cajas, láseres) y aplicando las "leyes de física" del juego (conservación de momentum, trayectorias parabólicas). Hay **cero presión de tiempo** (excepto en cámaras específicas). La **Estética** es el **momento "¡Eureka!"** - la satisfacción intelectual de resolver un problema complejo. Es **puro Desafío cognitivo**. Fallar no tiene consecuencia: simplemente reseteas la cámara y piensas de nuevo. Es como hacer un examen de matemáticas sin límite de tiempo.

En **Breath of the Wild** (Aventura), esa **misma mecánica** `Resolver()` existe en los 120 Santuarios, pero está **embebida en un contexto de exploración**. La **Dinámica** cambia radicalmente: los puzles son **interrupciones opcionales cortas** en el flujo de exploración. Un jugador puede ver un Santuario, decidir "no tengo ganas de pensar ahora", y continuar explorando. Muchos Santuarios tienen **múltiples soluciones no intencionales** gracias al motor de física abierto del juego (puedes usar la bomba para crear viento, congelar agua para hacer plataformas, usar Stasis en objetos no intencionales). La **Estética** aquí no es solo "resolví el puzle", es **"Descubrí este lugar escondido y además resolví algo"**. El puzle es el **premio por explorar**, no el objetivo principal. Es como encontrar un acertijo escondido en un parque: la diversión es tanto encontrarlo como resolverlo.

En **Final Fantasy VII** (RPG), los puzles aparecen en dungeons (ej. la torre de Shinra, el Templo de los Ancestros) pero son **mecánicas de "pacing"** - descansos entre combates. La **Dinámica** es casi inexistente: los puzles son triviales comparados con Portal 2 (mover estatuas, activar palancas en orden). Su **propósito de diseño** no es desafiar intelectualmente, sino **variar el ritmo** para evitar fatiga de combate. La **Estética** es casi nula aquí: nadie recuerda Final Fantasy VII por sus puzles. Son **mecánicas de servicio** para estructurar el dungeon, no el contenido central.

**Conclusión del Polimorfismo:** La mecánica `Resolver()` es **la misma función** (identificar patrón → aplicar solución → progresar), pero su **significado semántico** y **peso emocional** cambian completamente según el **contexto del género**:

- En **Puzle**: Es el **producto principal** (Estética: Desafío intelectual puro).
- En **Aventura**: Es un **condimento opcional** (Estética: Descubrimiento + Desafío leve).
- En **RPG**: Es un **elemento de pacing** (Estética: casi ninguna, utilidad estructural).

Como ingenieros, esto es **polimorfismo orientado a objetos** aplicado a diseño: la misma interfaz (`IResolvable`), implementaciones diferentes, comportamientos emergentes distintos según el sistema que los contiene.

---

#### 3. Análisis de Híbridos:

Observen los juegos que eligieron para **Aventura** y **RPG**. ¿Qué tan **"puras"** son sus mecánicas? ¿Cuántas mecánicas **"toma prestadas"** el uno del otro? (Ej. ¿Su juego de Aventura tiene un sistema de progresión o crafteo? ¿Su RPG tiene puzles de entorno?). ¿Qué les dice esto sobre los géneros modernos?

**Respuesta:**

**Breath of the Wild** (Aventura) y **Final Fantasy VII** (RPG) son ejemplos perfectos de cómo los géneros modernos son cada vez más **híbridos sistémicos** en lugar de categorías puras.

**BOTW "toma prestadas" mecánicas de RPG:**
- **Sistema de Progresión:** Aunque no hay niveles tradicionales, existe `DesarrollarStats()` a través de corazones, resistencia, y mejoras de inventario. Esto es puro RPG.
- **Crafteo/Cocina:** `Cocinar()` y `MejorarArmadura()` son mecánicas de RPG de supervivencia. La experimentación con ingredientes es directamente del género RPG.
- **Loot y Gestión de Inventario:** Armas, escudos, arcos con **stats** (daño, durabilidad) y **rareza** (colores) es vocabulario de RPG.

**Final Fantasy VII "toma prestadas" mecánicas de Aventura:**
- **Exploración de Mundo (limitada):** Aunque es lineal comparado con BOTW, existe un world map que puedes explorar con un vehículo (el Highwind), con dungeons opcionales escondidos. Esto es diseño de Aventura.
- **Puzles de Entorno:** Como mencionamos, los dungeons tienen puzles (Torre Shinra, Templo de los Ancestros). Esto no es combate por turnos tradicional de RPG, es diseño de Aventura.

**¿Qué tan "puros" son?**

**BOTW es ~60% Aventura / 40% RPG-Survival.** Si le quitáramos la progresión de stats, el crafteo y la durabilidad de armas, aún tendríamos un juego completo basado en exploración y combate en tiempo real. Pero esas mecánicas de RPG añaden **profundidad sistémica** y **engagement a largo plazo**.

**Final Fantasy VII es ~80% RPG / 20% Aventura.** El núcleo es combate por turnos + progresión de personajes + narrativa lineal. Los elementos de Aventura (exploración, puzles) son **cosméticos de estructura**, no fundamentales. Si los quitaras, el juego seguiría siendo Final Fantasy VII.

**¿Qué nos dice esto sobre géneros modernos?**

Los géneros **ya no son categorías discretas, son espectros superpuestos**. Desde el punto de vista de ingeniería de software, los juegos modernos no heredan de una sola clase base:

```pseudo
// Diseño "Puro" (1990s)
class FinalFantasyVII extends RPG { }

// Diseño Moderno (2010s+)
class BreathOfTheWild extends Aventura implements RPGProgression, Survival, Physics Sandbox { }
```

La tendencia es hacia **"sistemas composicionales"**: en lugar de definir un juego por su género, lo defines por el **conjunto de mecánicas que ofreces**. Breath of the Wild no preguntó "¿es esto Aventura o RPG?", preguntó **"¿qué sistemas hacen que la exploración sea interesante?"** y tomó mecánicas de donde fuera necesario.

**La hibridación como ventaja competitiva:** Juegos "puros" hoy se sienten **arcaicos** o **nicho**. Portal 2 es "puro Puzle" y funciona porque está **perfeccionado** en ese nicho. Pero los AAA modernos (Elden Ring, Horizon, The Witcher) son **híbridos de 3-4 géneros** porque los jugadores modernos esperan **profundidad sistémica**. Un juego que solo hace una cosa puede parecer "vacío" comparado con competidores que ofrecen combate + progresión + exploración + narrativa + crafteo.

**Como ingenieros:** Esto nos dice que el diseño moderno es **modular y composicional**. Desarrollas **sistemas independientes** (sistema de combate, sistema de progresión, sistema de física) que puedan **interactuar de formas emergentes**. La "magia" de BOTW es que su motor de física interactúa con el combate, el clima, la exploración y el crafteo de formas que ni los diseñadores predijeron completamente. Esa es la diferencia entre **diseño rígido** (RPG clásico: si enemigo.hp <= 0 then muere) y **diseño sistémico emergente** (BOTW: si enemigo está en agua y lanzas electricidad, el agua conduce la electricidad a todos los enemigos cerca).

Los géneros son etiquetas de marketing. Los sistemas son la realidad de ingeniería.

---

---