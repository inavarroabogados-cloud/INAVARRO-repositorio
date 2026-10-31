# ¿Y ahora qué? · INAVARRO Abogados

Aplicación Next.js + TypeScript para preparar una consulta. Creada en el repositorio vacío INAVARRO-repositorio; el portal estático del repositorio hermano Inavarro permanece intacto. No se ha publicado ni contratado ningún servicio.

## Ejecutar

Node 24 y npm 11 (usados en esta entrega).

```sh
npm ci
npm run dev
# producción local demostrable
npm run build
npm start
```

## Comprobar

```sh
npm run typecheck
npm test
npm run build
npm start # mantener abierto en otra terminal
npm run test:e2e
npm run check:launch # sale con código 1 mientras existan pendientes
```

Las pruebas de navegador usan Chromium en `/usr/bin/chromium`; adapta `playwright.config.ts` en otra máquina. No hay lint configurado. Las pruebas de reglas cubren entradas inválidas, todas las combinaciones de tema/documentación, respuestas desconocidas, avisos de fecha y validación de configuración. Playwright recorre navegación, errores, corrección, reinicio, privacidad, enlaces, descargas y análisis axe en 360, 390, 768 y 1440 px. Axe no certifica por sí solo WCAG AA: queda recomendada una revisión con lector de pantalla y personas usuarias.

## Arquitectura y datos

- `lib/firm.ts`: configuración tipada y bloqueo de lanzamiento. Datos documentados: `../Inavarro/config.json`, `README.md`, `services.json` y `build.mjs`. No se ha verificado su vigencia externamente. Marca real copiada de `assets.tar.gz/assets/marca.png`.
- `lib/content.ts`: guías y borradores, separados de los datos del despacho. No atribuyen revisor ni fecha de revisión. Contenido general, sin aplicar legislación territorial.
- `lib/orientador.ts`: preguntas, validación y reglas deterministas; no valoración jurídica ni cálculos.
- `components/`: interfaz del orientador, contacto externo y compartir.
- `app/globals.css`: tokens y estilos, impresión, foco y movimiento reducido.
- `lib/measurement.ts`: interfaz de eventos sin payload; adaptador vacío. No hay analítica activa.
- `public/social`: 12 PNG, cuatro guías por tres formatos. `python scripts/generate-cards.py` permite regenerarlos (Pillow y fuentes DejaVu necesarias; las imágenes generadas ya están incluidas).

Las respuestas viven únicamente en el estado React de la página: se pierden al recargar, salir del orientador o reiniciar. No hay localStorage, cookies de seguimiento, envío de respuestas, datos en URL ni IA. La impresión incluye únicamente el resumen local. Los enlaces de compartir son de guías públicas. Compartir usa Web Share, con copia alternativa y enlace manual si falla el permiso del navegador. Compartir una demo no la convierte en contenido validado.

Contacto por teléfono, correo y WhatsApp obtenido de los archivos. WhatsApp requiere revisar un mensaje genérico y anuncia el servicio externo. No incorpora las respuestas. No existe backend de contacto ni se simula envío. Por tanto no hay errores de proveedor/formulario de envío que probar. Los enlaces abren los canales, no acreditan recepción o disponibilidad. En ausencia de todos los canales se muestra un estado vacío y no acciones falsas en la sección de contacto.

## Datos pendientes antes de publicar — lista única

1. Confirmar jurisdicción y ámbito de la herramienta. Los archivos mencionan Tenerife; no se ha usado esa referencia para aplicar normas.
2. Confirmar dominio HTTPS propio de esta herramienta (`SITE_ORIGIN`), diferente del portal anterior si procede.
3. Reconfirmar titular, colegiación/colegio, domicilio, teléfono, correo, WhatsApp y áreas de actividad; completar identificación fiscal y cualquier dato profesional exigible.
4. Revisar y sustituir borradores de aviso legal, privacidad, cookies y alcance según jurisdicción y alojamiento. Validar responsable, finalidades, legitimación, conservación, destinatarios y derechos. No basta con cambiar una bandera.
5. Aprobar guías, preguntas, reglas y servicios. Añadir autor/revisor y fecha real solo tras revisión efectiva. Las tarjetas también deben regenerarse al aprobar o cambiar contenido.
6. Validar tratamiento de registros técnicos y contratos del proveedor de alojamiento; revisar accesibilidad manual, seguridad y canales en el despliegue elegido.

Después de resolverlos, actualizar configuración y contenidos, marcar validaciones justificadas, ejecutar `SITE_MODE=production SITE_ORIGIN=https://DOMINIO_CONFIRMADO npm run check:launch` y compilar de nuevo con esas variables. El layout bloquea la generación en producción si quedan pendientes. Un build de demo debe reconstruirse para producción: las páginas son prerenderizadas. No basta cambiar variables en un servidor que conserva un build anterior. Las funciones de contacto en producción requieren validación legal y de canales. No hay publicación automática.

## SEO y despliegue

Títulos/descripciones únicos, HTML semántico, Open Graph por guía y tarjetas reales. Demo: noindex y robots disallow; sitemap vacío. Canonical solo con origen configurado. Resultados no indexables. El origen social sin dominio definitivo usa el valor local de Next durante la demo y debe reconstruirse con el dominio real al publicar. No hay reseñas ni métricas inventadas. Datos estructurados limitados a identidad confirmada en archivos; deben reconfirmarse para publicación.

`next.config.ts` configura CSP, protección de marcos, no-sniff, referrer y permisos. La CSP permite inline por el runtime de Next; un despliegue con nonce necesita otra estrategia y debe probarse. Un proxy/CDN debe conservar las cabeceras; exportar HTML a hosting estático no aplica automáticamente las cabeceras de Next. Configurar TLS y HSTS en el proveedor después de confirmar todos los subdominios. No se asume compatibilidad universal ni cumplimiento garantizado.

## Identidad visual

Base real: símbolo iN marfil/azul del archivo de marca. Wordmark INAVARRO + ABOGADOS. El trazo abstracto del hero es un recurso editorial inspirado en I/N, no un nuevo logotipo oficial. Azul tinta `#142b3c`, marfil `#f7f5ef`, cobre `#936145`, texto secundario `#52616a`. Titulares Georgia, lectura Arial con fuentes del sistema sin peticiones externas. Espaciado amplio, líneas finas, numeración, radios 3 px, sombras muy leves; foco visible cobre. Usar el cobre para acentos, sin alarmas comerciales. Mantener lenguaje condicional y no atribuir resultados. Evitar fotografías ficticias de profesionales. Tokens centrales en CSS; diseño adaptable y versión de impresión.

## Integraciones opcionales (no contratadas)

| Opción | Dependencia / coste |
| --- | --- |
| Formulario de consulta | Proveedor de correo y backend, coste según volumen/tarifa. Requiere validación servidor, antispam, límite distribuido, privacidad y secretos. No implementado para evitar envíos ficticios. |
| Agenda | URL confirmada y proveedor externo; coste según plan. Sin iframe de seguimiento. |
| Analítica genérica | Adaptador propio y revisión de privacidad; coste según proveedor. Desactivada. |
| Alojamiento | Node compatible con Next; precio según plan, tráfico y proveedor. No desplegado. |

## Diez propuestas de publicaciones

| Gancho informativo | Idea visual | Llamada a la acción |
| --- | --- | --- |
| No necesitas tener todas las respuestas para empezar | Tarjeta ¿Y ahora qué? con tres líneas ordenadas | Conoce el orientador |
| Antes de una consulta, prepara tus preguntas | Lista editorial 01–03 | Lee la guía |
| Una cronología ayuda a explicar lo ocurrido | Línea de tiempo sin datos reales | Aprende a ordenarla |
| Una fecha en un documento necesita contexto | Marco alrededor de una fecha ficticia sin calcular plazos | Consulta qué conservar |
| Guarda el documento completo, no solo una captura | Hojas y anexos abstractos | Lee la guía de documentos |
| Puedes orientarte sin identificarte | Cinco casillas vacías | Ordena tu consulta |
| Compartir una guía no exige contar tu caso | Tarjeta genérica con símbolo de enlace | Comparte información útil |
| Hechos y dudas pueden ir en columnas distintas | Dos columnas editoriales | Prepara una cronología |
| Qué preguntar sobre el alcance de una consulta | Tres preguntas sobre documentación y honorarios | Prepara tu conversación |
| El primer paso puede ser ponerlo en claro | Recurso I/N y palabra ORDEN | Descubre ¿Y ahora qué? |

Todas son propuestas provisionales para revisión, sin prometer viralidad, gratuidad, éxito o urgencia. No usar casos ni respuestas de visitantes.

## Despliegue preparado en Render

`render.yaml` describe un servicio Node en plan gratuito para la **demostración**, con compilación, pruebas y comprobación de salud. No crea ni contrata recursos por sí solo. Conectar este repositorio al servicio Render que confirme el titular y aplicar el Blueprint. Comprobar las condiciones vigentes del plan en la cuenta; no cambiar a uno de pago automáticamente. El arranque usa el puerto asignado por Render. No reemplazar el portal estático existente. La demo conserva su etiqueta y noindex; esta configuración no valida ni publica contenido jurídico definitivo.

## Publicación dentro del portal existente

La integración usa la vía de publicación del repositorio `inavarroabogados-cloud/Inavarro` y el montaje `/y-ahora-que/`. No necesita crear un servicio Render nuevo. Generación reproducible:

```sh
STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/y-ahora-que NEXT_TELEMETRY_DISABLED=1 npm run build
tar -czf /workspace/Inavarro/orientador-static.tar.gz -C out .
```

`lib/paths.ts` aplica el prefijo a recursos y enlaces compartidos; Next aplica el prefijo a su navegación. En el portal, `deploy.mjs` instala el paquete después del build existente y añade el acceso público. No modifica el área de clientes. El paquete sigue siendo demo, sin indexación y con los pendientes jurídicos intactos. No anunciarlo como versión jurídica validada.

`node scripts/check-static.mjs` prueba la integración completa servida por loopback en el puerto 3001 (o `STATIC_TEST_ORIGIN`), incluyendo acceso desde el portal, recorrido, contacto, descargas, recursos, accesibilidad y cuatro tamaños. Las cabeceras de Next no se aplican en la exportación; el instalador del portal incorpora las políticas compatibles con HTML y las cabeceras restantes dependen del alojamiento. Un push al portal solicita su despliegue automático documentado, pero no demuestra por sí solo que Render haya terminado: comprobar el destino público cuando el acceso esté disponible.
