import type { Locale } from '../i18n'

const en = {
  title: 'How it works',
  paragraphs: [
    'The application is divided into two independent projects: an Angular frontend and a Spring Boot REST API.',
    'Users authenticate through a JWT-based login system and access a dashboard where they can browse rooms, create reservations, manage their profile, and complete payments using Stripe.',
    'The backend is responsible for all business logic, including reservation validation, room availability, recurring bookings, invoice generation and payment processing.',
    'Different reservation types are supported:',
  ],
  reservationTypes: [
    'Standard hourly reservations',
    'Multi-day reservations',
    'Recurring weekly reservations',
    'Face-to-face appointments',
  ],
  midParagraphs: [
    'Before confirming a booking, the API checks room availability and prevents overlapping reservations.',
    'Payments are handled through Stripe, supporting payment intents, subscriptions, customer portal access, refunds and webhook processing for payment events.',
    'The frontend focuses entirely on the user experience, communicating with the backend through REST endpoints while displaying an intuitive dashboard built with Angular Material and Bootstrap.',
  ],
  architecture:
    'The backend follows a layered architecture based on Controllers, Services and Repositories, ensuring a clean separation between presentation, business logic and persistence.',
  technologiesTitle: 'Technologies',
  frontendTitle: 'Frontend',
  frontendTechnologies: [
    'Angular 13',
    'TypeScript',
    'Angular Material',
    'Bootstrap 5',
    'DayPilot Lite',
    'RxJS',
    'JWT Authentication',
    'Stripe.js',
    'ngx-stripe',
    'HttpClient',
  ],
  backendTitle: 'Backend',
  backendTechnologies: [
    'Java 11',
    'Spring Boot',
    'Spring Security',
    'JWT Authentication',
    'Spring Data JPA',
    'Hibernate',
    'MySQL',
    'Stripe API',
    'Lombok',
    'Maven',
  ],
} as const

const es = {
  title: 'Cómo funciona',
  paragraphs: [
    'La aplicación se divide en dos proyectos independientes: un frontend en Angular y una API REST en Spring Boot.',
    'Los usuarios se autentican mediante un sistema de login basado en JWT y acceden a un dashboard donde pueden explorar salas, crear reservas, gestionar su perfil y completar pagos con Stripe.',
    'El backend se encarga de toda la lógica de negocio, incluida la validación de reservas, la disponibilidad de salas, las reservas recurrentes, la generación de facturas y el procesamiento de pagos.',
    'Se admiten distintos tipos de reserva:',
  ],
  reservationTypes: [
    'Reservas estándar por horas',
    'Reservas de varios días',
    'Reservas recurrentes semanales',
    'Citas presenciales',
  ],
  midParagraphs: [
    'Antes de confirmar una reserva, la API comprueba la disponibilidad de la sala y evita solapamientos.',
    'Los pagos se gestionan con Stripe, con soporte para payment intents, suscripciones, acceso al customer portal, reembolsos y procesamiento de webhooks para eventos de pago.',
    'El frontend se centra por completo en la experiencia de usuario, comunicándose con el backend a través de endpoints REST y mostrando un dashboard intuitivo construido con Angular Material y Bootstrap.',
  ],
  architecture:
    'El backend sigue una arquitectura en capas basada en Controllers, Services y Repositories, asegurando una separación clara entre presentación, lógica de negocio y persistencia.',
  technologiesTitle: 'Tecnologías',
  frontendTitle: 'Frontend',
  frontendTechnologies: [
    'Angular 13',
    'TypeScript',
    'Angular Material',
    'Bootstrap 5',
    'DayPilot Lite',
    'RxJS',
    'JWT Authentication',
    'Stripe.js',
    'ngx-stripe',
    'HttpClient',
  ],
  backendTitle: 'Backend',
  backendTechnologies: [
    'Java 11',
    'Spring Boot',
    'Spring Security',
    'JWT Authentication',
    'Spring Data JPA',
    'Hibernate',
    'MySQL',
    'Stripe API',
    'Lombok',
    'Maven',
  ],
} as const

const fr = {
  title: 'Comment ça marche',
  paragraphs: [
    'L’application est divisée en deux projets indépendants : un frontend Angular et une API REST Spring Boot.',
    'Les utilisateurs s’authentifient via un système de login basé sur JWT et accèdent à un tableau de bord où ils peuvent parcourir les salles, créer des réservations, gérer leur profil et effectuer des paiements avec Stripe.',
    'Le backend est responsable de toute la logique métier, y compris la validation des réservations, la disponibilité des salles, les réservations récurrentes, la génération de factures et le traitement des paiements.',
    'Différents types de réservation sont pris en charge :',
  ],
  reservationTypes: [
    'Réservations horaires standard',
    'Réservations multi-jours',
    'Réservations récurrentes hebdomadaires',
    'Rendez-vous en présentiel',
  ],
  midParagraphs: [
    'Avant de confirmer une réservation, l’API vérifie la disponibilité de la salle et empêche les chevauchements.',
    'Les paiements sont gérés via Stripe, avec prise en charge des payment intents, abonnements, accès au customer portal, remboursements et traitement des webhooks pour les événements de paiement.',
    'Le frontend se concentre entièrement sur l’expérience utilisateur, communiquant avec le backend via des endpoints REST et affichant un tableau de bord intuitif construit avec Angular Material et Bootstrap.',
  ],
  architecture:
    'Le backend suit une architecture en couches basée sur Controllers, Services et Repositories, assurant une séparation claire entre présentation, logique métier et persistance.',
  technologiesTitle: 'Technologies',
  frontendTitle: 'Frontend',
  frontendTechnologies: [
    'Angular 13',
    'TypeScript',
    'Angular Material',
    'Bootstrap 5',
    'DayPilot Lite',
    'RxJS',
    'JWT Authentication',
    'Stripe.js',
    'ngx-stripe',
    'HttpClient',
  ],
  backendTitle: 'Backend',
  backendTechnologies: [
    'Java 11',
    'Spring Boot',
    'Spring Security',
    'JWT Authentication',
    'Spring Data JPA',
    'Hibernate',
    'MySQL',
    'Stripe API',
    'Lombok',
    'Maven',
  ],
} as const

export const coworkingDetailsByLocale = { en, es, fr } as const

export function getCoworkingDetails(locale: Locale) {
  return coworkingDetailsByLocale[locale]
}
