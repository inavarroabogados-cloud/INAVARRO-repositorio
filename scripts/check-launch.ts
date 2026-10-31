import {firm,launchIssues} from '../lib/firm';
const issues=launchIssues(firm);if(issues.length){console.error('Publicación bloqueada:\n'+issues.map(i=>'• '+i).join('\n'));process.exitCode=1}else console.log('Configuración publicable; confirmar además revisión de alojamiento y accesibilidad.');
