export type Firm = { mode: 'demo' | 'production'; name: string; owner: string; registration: string; address: string; phone: string | null; email: string | null; whatsapp: string | null; booking: string | null; origin: string | null; jurisdiction: string | null; legalValidated: boolean; editorialValidated: boolean; contactValidated: boolean };
// Sources: ../Inavarro/config.json, README.md, services.json and build.mjs. No live verification implied.
export const firm: Firm = {
 mode: process.env.SITE_MODE === 'production' ? 'production' : 'demo', name: 'INAVARRO Abogados', owner: 'Imanol Navarro Pérez', registration: 'ICATF 6738',
 address: 'Avenida Profesor Peraza Ayala, 3, local bajo A, Residencial Anaga · 38001 Santa Cruz de Tenerife',
 phone: '+34634330504', email: 'inavarroabogados@gmail.com', whatsapp: '34634330504', booking: null,
 origin: process.env.SITE_ORIGIN || null, jurisdiction: null, legalValidated: false, editorialValidated: false, contactValidated: false,
};
export function launchIssues(f: Firm): string[] {
 return [!f.origin && 'Dominio propio de la herramienta pendiente', !f.jurisdiction && 'Jurisdicción pendiente de confirmación', !f.legalValidated && 'Aviso legal y privacidad pendientes de revisión profesional', !f.editorialValidated && 'Guías y alcance pendientes de validación', !f.contactValidated && 'Reconfirmar canales y datos profesionales', !(f.phone || f.email || f.whatsapp || f.booking) && 'Falta un canal real de contacto', f.origin && !/^https:\/\/[^/]+\/?$/.test(f.origin) && 'El dominio debe ser un origen HTTPS'].filter((x): x is string => Boolean(x));
}
export const contactEnabled = firm.mode === 'demo' || (firm.legalValidated && firm.contactValidated);
export const confirmedAreas = ['Herencias y sucesiones', 'Divorcios y familia', 'Alquileres', 'Derecho penal', 'Extranjería', 'Reclamaciones civiles', 'Protección de datos'];
