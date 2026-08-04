import type { Locale } from '../i18n'

const en = {
  title: 'How it works',
  intro:
    'The 2022 version was built around a traditional REST architecture. Four years later, I redesigned the project from scratch, replacing the backend with Google Forms and Google Sheets to simplify the architecture. Despite having fewer moving parts, the new version delivers a much richer experience, with live rankings, match schedules, group standings, knockout brackets and detailed tournament information.',
  paragraphs: [
    'The application follows a traditional client-server architecture.',
    'The React frontend communicates with a Spring Boot REST API, which manages all business logic, persistence and score calculations.',
    'Participants submit their predictions through the frontend, where every prediction is stored in a MySQL database.',
    'As the World Cup progresses, an administrator updates the qualified and eliminated teams through dedicated API endpoints. The backend automatically recalculates:',
  ],
  recalculates: [
    'Current score for every participant',
    'Maximum achievable score',
    'Overall ranking',
    'Winning predictions for each round',
  ],
  frontendIntro: 'The frontend consumes these endpoints to display:',
  frontendDisplays: [
    'Live ranking',
    'Detailed prediction for every participant',
    'Maximum achievable points',
    'Tournament progression',
  ],
  architecture:
    'The backend follows a layered architecture based on Controllers, Services, Repositories and DTOs, while the frontend is built as a React Single Page Application.',
  technologiesTitle: 'Technologies',
  frontendTitle: 'Frontend',
  frontendTechnologies: [
    'React 18',
    'Create React App',
    'React Router',
    'Bootstrap 5',
    'Fetch API',
    'GitHub Pages',
  ],
  backendTitle: 'Backend',
  backendTechnologies: [
    'Java 17',
    'Spring Boot',
    'Spring Data JPA',
    'Hibernate',
    'MySQL',
    'H2 (development)',
    'Lombok',
    'MapStruct',
    'Maven',
  ],
} as const

const es = {
  title: 'Cómo funciona',
  intro:
    'La versión de 2022 se construyó sobre una arquitectura REST tradicional. Cuatro años después, rediseñé el proyecto desde cero, sustituyendo el backend por Google Forms y Google Sheets para simplificar la arquitectura. A pesar de tener menos piezas móviles, la nueva versión ofrece una experiencia mucho más completa, con ranking en vivo, calendario de partidos, clasificación de grupos, cuadro de eliminatorias e información detallada del torneo.',
  paragraphs: [
    'La aplicación sigue una arquitectura cliente-servidor tradicional.',
    'El frontend en React se comunica con una API REST de Spring Boot, que gestiona toda la lógica de negocio, la persistencia y el cálculo de puntuaciones.',
    'Los participantes envían sus predicciones desde el frontend, y cada predicción se almacena en una base de datos MySQL.',
    'A medida que avanza el Mundial, un administrador actualiza los equipos clasificados y eliminados a través de endpoints dedicados de la API. El backend recalcula automáticamente:',
  ],
  recalculates: [
    'Puntuación actual de cada participante',
    'Puntuación máxima alcanzable',
    'Ranking general',
    'Predicciones ganadoras de cada ronda',
  ],
  frontendIntro: 'El frontend consume estos endpoints para mostrar:',
  frontendDisplays: [
    'Ranking en vivo',
    'Predicción detallada de cada participante',
    'Puntos máximos alcanzables',
    'Progresión del torneo',
  ],
  architecture:
    'El backend sigue una arquitectura en capas basada en Controllers, Services, Repositories y DTOs, mientras que el frontend está construido como una Single Page Application en React.',
  technologiesTitle: 'Tecnologías',
  frontendTitle: 'Frontend',
  frontendTechnologies: [
    'React 18',
    'Create React App',
    'React Router',
    'Bootstrap 5',
    'Fetch API',
    'GitHub Pages',
  ],
  backendTitle: 'Backend',
  backendTechnologies: [
    'Java 17',
    'Spring Boot',
    'Spring Data JPA',
    'Hibernate',
    'MySQL',
    'H2 (desarrollo)',
    'Lombok',
    'MapStruct',
    'Maven',
  ],
} as const

const fr = {
  title: 'Comment ça marche',
  intro:
    'La version 2022 a été construite autour d’une architecture REST traditionnelle. Quatre ans plus tard, j’ai reconstruit le projet de zéro, en remplaçant le backend par Google Forms et Google Sheets pour simplifier l’architecture. Malgré moins de pièces mobiles, la nouvelle version offre une expérience bien plus riche, avec classements en direct, calendriers de matchs, classements de groupes, tableaux des phases finales et informations détaillées sur le tournoi.',
  paragraphs: [
    'L’application suit une architecture client-serveur traditionnelle.',
    'Le frontend React communique avec une API REST Spring Boot, qui gère toute la logique métier, la persistance et le calcul des scores.',
    'Les participants soumettent leurs prédictions via le frontend, et chaque prédiction est stockée dans une base de données MySQL.',
    'Au fur et à mesure de la Coupe du Monde, un administrateur met à jour les équipes qualifiées et éliminées via des endpoints API dédiés. Le backend recalcule automatiquement :',
  ],
  recalculates: [
    'Score actuel de chaque participant',
    'Score maximum atteignable',
    'Classement général',
    'Prédictions gagnantes pour chaque tour',
  ],
  frontendIntro: 'Le frontend consomme ces endpoints pour afficher :',
  frontendDisplays: [
    'Classement en direct',
    'Prédiction détaillée de chaque participant',
    'Points maximums atteignables',
    'Progression du tournoi',
  ],
  architecture:
    'Le backend suit une architecture en couches basée sur Controllers, Services, Repositories et DTOs, tandis que le frontend est construit comme une Single Page Application React.',
  technologiesTitle: 'Technologies',
  frontendTitle: 'Frontend',
  frontendTechnologies: [
    'React 18',
    'Create React App',
    'React Router',
    'Bootstrap 5',
    'Fetch API',
    'GitHub Pages',
  ],
  backendTitle: 'Backend',
  backendTechnologies: [
    'Java 17',
    'Spring Boot',
    'Spring Data JPA',
    'Hibernate',
    'MySQL',
    'H2 (développement)',
    'Lombok',
    'MapStruct',
    'Maven',
  ],
} as const

export const porra2022DetailsByLocale = { en, es, fr } as const

export function getPorra2022Details(locale: Locale) {
  return porra2022DetailsByLocale[locale]
}
