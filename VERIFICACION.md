# Verificación de la entrega

Ejecutada el 31 de octubre de 2026 en esta instancia, con Node 24.19.0, npm 11.9.0, Next 16.4.3 y Chromium local.

- `npm ci`: instalación reproducible completada desde package-lock.json.
- `npm test`: 7 pruebas ejecutadas y aprobadas. Combinaciones de temas/documentos, desconocidos, aviso de plazo, entradas inválidas, ausencia de contacto y validación de producción.
- `npm run build`: compilación y generación de 16 páginas completadas. Aviso conocido: sin dominio configurado, Next resuelve las imágenes Open Graph con origen local en demo. No existe canonical inventado; reconstruir con dominio confirmado antes de publicar.
- `npm run typecheck`: aprobado.
- `npm run test:e2e`: 7 pruebas aprobadas sobre el build final, tras reiniciar el servidor. Flujo completo, error de selección, retroceso, corrección, resultado, borrado, recarga, contacto WhatsApp, copia, descargas, cancelación y fallo de permisos, foco de teclado y ausencia de localStorage/datos en URL.
- axe sobre inicio, primera pantalla del orientador, contacto y una guía en 360, 390, 768 y 1440 px: sin incidencias en las etiquetas WCAG A/AA 2, 2.1 y 2.2 utilizadas. Comprobación de scroll horizontal aprobada. No constituye auditoría completa de conformidad ni prueba con lector de pantalla.
- Inspección visual de capturas de inicio en escritorio y móvil y tarjeta PNG. Corregida fuente local para símbolos editoriales.
- 12 PNG generados (1080×1080, 1080×1920, 1200×630); descargas de tres formatos comprobadas en navegador.
- `npm run check:launch`: código 1 esperado y correcto por cinco requisitos pendientes. Producción bloqueada deliberadamente; no es un fallo de instalación.
- Servidor reiniciado y respuesta HTTP 200 del orientador con cabeceras de seguridad comprobadas.
- No hay lint configurado, backend de envío o proveedor de correo: esas pruebas no aplican. No se han enviado mensajes ni solicitudes al despacho.
- El portal hermano Inavarro permanece sin cambios según `git status --short`.
- Guardados `install_script` y `start_skill` en el borrador del entorno. No se ha publicado el entorno ni el sitio; no se ha probado restauración en otra tarea.

Pendientes editoriales y de lanzamiento reunidos exclusivamente en README.md. La experiencia es una demo funcional, no un sitio autorizado para publicar. Las pruebas y capturas se regeneran en test-results (ignorado por Git).
