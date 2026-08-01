import type { Locale } from '../i18n'

const en = {
  title: 'View details',
  paragraphs: [
    'The application is entirely frontend-based and requires no dedicated backend server.',
    'Participants submit their predictions through Google Forms, which automatically stores every response in Google Sheets.',
    'Whenever someone opens the website, the application retrieves the latest spreadsheet data using the Google Visualization API, ensuring that every page refresh displays the most up-to-date ranking.',
    'Tournament fixtures and results are obtained from OpenFootball, allowing the application to automatically calculate scores, update rankings, display the group standings, and generate the knockout bracket.',
  ],
  technologiesTitle: 'Built with',
  technologies: [
    'React 19',
    'TypeScript',
    'Vite',
    'Tailwind CSS',
    'React Router',
    'Google Forms',
    'Google Sheets (Google Visualization API)',
    'OpenFootball JSON',
    'Vercel',
  ],
  architecture:
    'The application follows a modular architecture based on services, hooks, utilities and reusable components, making it easy to maintain and extend with new features.',
} as const

const es = {
  title: 'Ver detalles',
  paragraphs: [
    'La aplicación es enteramente frontend y no requiere un servidor backend dedicado.',
    'Los participantes envían sus predicciones a través de Google Forms, que almacena automáticamente cada respuesta en Google Sheets.',
    'Cada vez que alguien abre el sitio, la aplicación recupera los datos más recientes de la hoja de cálculo mediante la Google Visualization API, de modo que cada recarga muestra el ranking actualizado.',
    'Los partidos y resultados del torneo se obtienen de OpenFootball, lo que permite calcular automáticamente las puntuaciones, actualizar el ranking, mostrar la clasificación de grupos y generar el cuadro de eliminatorias.',
  ],
  technologiesTitle: 'Tecnologías',
  technologies: [
    'React 19',
    'TypeScript',
    'Vite',
    'Tailwind CSS',
    'React Router',
    'Google Forms',
    'Google Sheets (Google Visualization API)',
    'OpenFootball JSON',
    'Vercel',
  ],
  architecture:
    'La aplicación sigue una arquitectura modular basada en services, hooks, utilities y componentes reutilizables, lo que facilita mantenerla y ampliarla con nuevas funcionalidades.',
} as const

const fr = {
  title: 'Voir les détails',
  paragraphs: [
    'L’application est entièrement frontend et ne nécessite aucun serveur backend dédié.',
    'Les participants soumettent leurs prédictions via Google Forms, qui stocke automatiquement chaque réponse dans Google Sheets.',
    'Chaque fois que quelqu’un ouvre le site, l’application récupère les données les plus récentes de la feuille via la Google Visualization API, afin que chaque actualisation affiche le classement à jour.',
    'Les calendriers et résultats du tournoi proviennent d’OpenFootball, ce qui permet de calculer automatiquement les scores, de mettre à jour le classement, d’afficher les groupes et de générer le tableau des phases finales.',
  ],
  technologiesTitle: 'Technologies',
  technologies: [
    'React 19',
    'TypeScript',
    'Vite',
    'Tailwind CSS',
    'React Router',
    'Google Forms',
    'Google Sheets (Google Visualization API)',
    'OpenFootball JSON',
    'Vercel',
  ],
  architecture:
    'L’application suit une architecture modulaire basée sur services, hooks, utilities et composants réutilisables, ce qui facilite la maintenance et l’ajout de nouvelles fonctionnalités.',
} as const

export const porra2026DetailsByLocale = { en, es, fr } as const

export function getPorra2026Details(locale: Locale) {
  return porra2026DetailsByLocale[locale]
}
