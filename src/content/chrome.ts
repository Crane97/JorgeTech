import type { Locale } from '../i18n'

const en = {
  brand: 'Jorge Ruiz de la Torre',
  fullName: 'Jorge Ruiz de la Torre Bertolín',
  nav: {
    projects: 'Projects',
    stack: 'Stack',
    about: 'About',
    resume: 'Resume',
    contact: 'Contact',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  hero: {
    headline: 'I build reliable software products end to end.',
    subtext:
      'Full stack engineer focused on backends, platforms, and AI-enabled commercial tools.',
    ctaWork: 'Selected work',
    ctaContact: 'Contact',
    basedIn: 'Based in',
    location: 'Miami, Florida',
  },
  projects: {
    title: 'Selected projects',
    intro: 'A quick look at recent builds. Open the full archive for deeper case studies.',
    pageTitle: 'All projects',
    pageIntro:
      'Case studies from platforms I designed, built, and shipped. Real products, real constraints.',
    problem: 'Problem',
    solution: 'Solution',
    architecture: 'Architecture',
    technologies: 'Technologies',
    results: 'Results',
    howItWorks: 'How it works',
    expandImage: 'View image',
    previousImage: 'Previous image',
    nextImage: 'Next image',
    close: 'Close',
    viewCase: 'View case study',
    viewAllProjects: 'View all projects',
    backToHome: 'Back to home',
    visitLive: 'Visit live site',
  },
  stack: {
    title: 'Technology stack',
    intro: 'Tools I use to design, build, test, and ship production software.',
    groups: {
      languages: 'Languages & runtimes',
      frontend: 'Frontend',
      backend: 'Backend & data',
      ai: 'AI & automation',
      cloud: 'Cloud & delivery',
    },
  },
  about: {
    title: 'About me',
    photos: 'Boxing',
    close: 'Close',
    backToHome: 'Back to home',
  },
  resume: {
    title: 'Resume',
    intro:
      'Roles, education, and continuous learning — the full picture of how I build and ship.',
    experience: 'Experience',
    education: 'Education',
    courses: 'Certifications & training',
    languages: 'Languages',
    additional: 'Additional',
    profile: 'Profile',
  },
  contact: {
    title: 'Let’s work together',
    intro:
      'Open to collaborations and new challenges. Share a brief and I will get back to you.',
    formName: 'Name',
    formEmail: 'Email',
    formMessage: 'Message',
    formSubmit: 'Send message',
    formHint: 'Opens your email app with this message ready for jorge@macdiego.com.',
    addressLabel: 'Based in',
  },
  footer: {
    rights: 'Jorge Ruiz de la Torre Bertolín · 2026',
  },
} as const

const es = {
  brand: 'Jorge Ruiz de la Torre',
  fullName: 'Jorge Ruiz de la Torre Bertolín',
  nav: {
    projects: 'Proyectos',
    stack: 'Stack',
    about: 'Sobre mí',
    resume: 'CV',
    contact: 'Contacto',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
  },
  hero: {
    headline: 'Construyo software fiable de extremo a extremo.',
    subtext:
      'Ingeniero full stack centrado en backends, plataformas y herramientas comerciales con IA.',
    ctaWork: 'Proyectos',
    ctaContact: 'Contacto',
    basedIn: 'Basado en',
    location: 'Miami, Florida',
  },
  projects: {
    title: 'Proyectos seleccionados',
    intro:
      'Un vistazo rápido a builds recientes. Abre el archivo completo para los casos de estudio.',
    pageTitle: 'Todos los proyectos',
    pageIntro:
      'Casos de estudio de plataformas que diseñé, construí y lancé. Productos reales, restricciones reales.',
    problem: 'Problema',
    solution: 'Solución',
    architecture: 'Arquitectura',
    technologies: 'Tecnologías',
    results: 'Resultados',
    howItWorks: 'Cómo funciona',
    expandImage: 'Ver imagen',
    previousImage: 'Imagen anterior',
    nextImage: 'Imagen siguiente',
    close: 'Cerrar',
    viewCase: 'Ver caso de estudio',
    viewAllProjects: 'Ver todos los proyectos',
    backToHome: 'Volver al inicio',
    visitLive: 'Visitar sitio',
  },
  stack: {
    title: 'Stack tecnológico',
    intro: 'Herramientas con las que diseño, construyo, pruebo y publico software en producción.',
    groups: {
      languages: 'Lenguajes y runtimes',
      frontend: 'Frontend',
      backend: 'Backend y datos',
      ai: 'IA y automatización',
      cloud: 'Cloud y entrega',
    },
  },
  about: {
    title: 'Sobre mí',
    photos: 'Boxeo',
    close: 'Cerrar',
    backToHome: 'Volver al inicio',
  },
  resume: {
    title: 'Currículum',
    intro:
      'Roles, formación y aprendizaje continuo — la foto completa de cómo construyo y entrego.',
    experience: 'Experiencia',
    education: 'Formación',
    courses: 'Certificaciones y cursos',
    languages: 'Idiomas',
    additional: 'Adicional',
    profile: 'Perfil',
  },
  contact: {
    title: 'Trabajemos juntos',
    intro:
      'Abierto a colaboraciones y nuevos retos. Cuéntame el contexto y te responderé.',
    formName: 'Nombre',
    formEmail: 'Email',
    formMessage: 'Mensaje',
    formSubmit: 'Enviar mensaje',
    formHint: 'Abre tu app de email con el mensaje listo para jorge@macdiego.com.',
    addressLabel: 'Basado en',
  },
  footer: {
    rights: 'Jorge Ruiz de la Torre Bertolín · 2026',
  },
} as const

const fr = {
  brand: 'Jorge Ruiz de la Torre',
  fullName: 'Jorge Ruiz de la Torre Bertolín',
  nav: {
    projects: 'Projets',
    stack: 'Stack',
    about: 'À propos',
    resume: 'CV',
    contact: 'Contact',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
  },
  hero: {
    headline: 'Je construis des logiciels fiables de bout en bout.',
    subtext:
      'Ingénieur full stack axé sur les backends, les plateformes et les outils commerciaux alimentés par l’IA.',
    ctaWork: 'Projets',
    ctaContact: 'Contact',
    basedIn: 'Basé à',
    location: 'Miami, Floride',
  },
  projects: {
    title: 'Projets sélectionnés',
    intro:
      'Un aperçu rapide des builds récents. Ouvrez l’archive complète pour les études de cas.',
    pageTitle: 'Tous les projets',
    pageIntro:
      'Études de cas de plateformes que j’ai conçues, construites et livrées. Vrais produits, vraies contraintes.',
    problem: 'Problème',
    solution: 'Solution',
    architecture: 'Architecture',
    technologies: 'Technologies',
    results: 'Résultats',
    howItWorks: 'Comment ça marche',
    expandImage: 'Voir l’image',
    previousImage: 'Image précédente',
    nextImage: 'Image suivante',
    close: 'Fermer',
    viewCase: 'Voir l’étude de cas',
    viewAllProjects: 'Voir tous les projets',
    backToHome: 'Retour à l’accueil',
    visitLive: 'Voir le site',
  },
  stack: {
    title: 'Stack technologique',
    intro: 'Outils que j’utilise pour concevoir, construire, tester et livrer des logiciels.',
    groups: {
      languages: 'Langages et runtimes',
      frontend: 'Frontend',
      backend: 'Backend et données',
      ai: 'IA et automatisation',
      cloud: 'Cloud et livraison',
    },
  },
  about: {
    title: 'À propos',
    photos: 'Boxe',
    close: 'Fermer',
    backToHome: 'Retour à l’accueil',
  },
  resume: {
    title: 'CV',
    intro:
      'Rôles, formation et apprentissage continu — le tableau complet de comment je construis et livre.',
    experience: 'Expérience',
    education: 'Formation',
    courses: 'Certifications et cours',
    languages: 'Langues',
    additional: 'Complément',
    profile: 'Profil',
  },
  contact: {
    title: 'Travaillons ensemble',
    intro:
      'Ouvert aux collaborations et aux nouveaux défis. Partagez un brief et je vous répondrai.',
    formName: 'Nom',
    formEmail: 'Email',
    formMessage: 'Message',
    formSubmit: 'Envoyer le message',
    formHint: 'Ouvre votre app mail avec le message prêt pour jorge@macdiego.com.',
    addressLabel: 'Basé à',
  },
  footer: {
    rights: 'Jorge Ruiz de la Torre Bertolín · 2026',
  },
} as const

const chrome = { en, es, fr } as const

export type Chrome = (typeof chrome)[Locale]

export function getChrome(locale: Locale): Chrome {
  return chrome[locale]
}
