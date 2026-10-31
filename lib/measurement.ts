export type GenericEvent = 'orientador_inicio' | 'orientador_fin' | 'contacto' | 'guia_compartir' | 'tarjeta_descargar';
// Disabled by default. No payload accepts answers, topics or personal data.
export function measure(_event: GenericEvent): void { /* Add a consent-reviewed adapter only after configuration review. */ }
