import { confirmedAreas } from './firm';
export const questions = [
 {title:'¿Sobre qué tema quieres consultar?', help:'Elige una categoría general. No necesitamos detalles de tu caso.', options:[...confirmedAreas, 'Otro tema', 'No lo sé']},
 {title:'¿Qué necesitas aclarar?', help:'Puedes cambiar tus respuestas en cualquier momento.', options:['Entender una comunicación', 'Preparar una primera consulta', 'Ordenar documentos', 'Conocer qué información falta', 'No lo sé']},
 {title:'¿Has recibido alguna comunicación relacionada?', help:'No la adjuntes ni copies su contenido aquí.', options:['Sí, en papel o formato digital', 'No', 'No lo sé']},
 {title:'¿Hay una fecha o un plazo indicado?', help:'No introduzcas fechas. Esta herramienta no calcula plazos legales.', options:['Sí, hay una fecha o un plazo', 'No veo ninguna fecha', 'No lo sé']},
 {title:'¿Qué documentación tienes disponible?', help:'Solo necesitamos una idea general, sin subir archivos.', options:['Documentos y comunicaciones', 'Solo algunas comunicaciones', 'Todavía no tengo documentos', 'No lo sé']},
] as const;
export type Answers = string[];
export const disclaimer = 'Esta herramienta ofrece información general. La valoración de tu caso requiere revisar sus circunstancias y documentación.';
export const deadlineWarning = 'Si hay un plazo indicado, conviene que un profesional revise la documentación cuanto antes. Esta herramienta no calcula ni confirma plazos.';
export function validAnswers(a: Answers) { return a.length === questions.length && a.every((v,i) => (questions[i].options as readonly string[]).includes(v)); }
export function getResult(a: Answers) {
 if (!validAnswers(a)) throw new Error('Respuestas incompletas o inválidas');
 return { warning: a[3] === questions[3].options[0] ? deadlineWarning : null,
 information:['Prepara una cronología breve: qué ocurrió y en qué orden, distinguiendo hechos de dudas.', 'Anota qué te gustaría aclarar y qué información todavía desconoces.'],
 documents: a[4] === 'Todavía no tengo documentos' ? ['Anota qué documentos podrían existir y dónde podrías obtener una copia. No necesitas tenerlo todo para preparar la consulta.'] : ['Si existen, reúne las comunicaciones completas y conserva sus sobres o justificantes de recepción.', 'Si están relacionados, localiza contratos, acuerdos y versiones anteriores. Conserva los originales.'],
 questions:['¿Qué documentación falta para poder valorar la situación?', '¿Qué alternativas habría que estudiar y qué implicaría cada una?', '¿Cuál sería el alcance del encargo y cómo se acordarían los honorarios?'],
 review:['Las circunstancias concretas, las personas intervinientes y la documentación completa.', 'La jurisdicción, las normas aplicables y cualquier fecha que requiera comprobación.'] };
}
