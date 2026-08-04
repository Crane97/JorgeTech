export type Locale = 'en' | 'es' | 'fr'

export const LOCALES: { code: Locale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
]

export const translations = {
  en: {
    nav: {
      path: 'Professional path',
      projects: 'Projects',
      about: 'Get to know me',
      contact: 'Contact',
    },
    hero: {
      line1: 'Computer Engineer',
      line2: 'Customer Success',
      line3: 'Obsessed by AI',
      basedIn: 'Based in',
      location: 'Miami, Florida',
    },
    menu: {
      siteIndex: 'Site Index',
      findMe: 'Find Me',
      open: 'Open menu',
      close: 'Close menu',
    },
    social: {
      instagram: 'Instagram',
      email: 'Email',
      linkedin: 'LinkedIn',
    },
    profile: {
      eyebrow: 'Profile',
      body: 'Full Stack Developer with experience in modern technologies such as Java Spring Boot and C# with .NET, mainly focused on backend systems and software-enabled platforms. Comfortable working in cross-functional teams, with involvement in feature implementation and technical discussions. Fluent in English, French, and Spanish.',
    },
    experience: {
      eyebrow: 'Experience',
      title: 'Professional path',
      jobs: [
        {
          role: 'Customer Success',
          company: 'Zumex Group',
          place: 'Miami, Florida',
          dates: 'January 2026 — Now',
          points: [
            'Participated in trade shows and customer meetings, supporting product presentations and building relationships with distributors and end users.',
            'Collaborated with sales, marketing, and technical teams to improve customer experience and support strategic dealer development initiatives.',
          ],
        },
        {
          role: 'Full Stack Developer',
          company: 'Solera Inc',
          place: 'Seville, Spain',
          dates: 'November 2022 — December 2025',
          points: [
            'Participated in a Data Integration Middleware (ETL) project, focused on developing and enhancing its functionality.',
            'Worked with C# .NET, React.js, unit testing, and cloud computing, with a focus on process optimization, scalability, and modernizing legacy systems.',
            'Collaborated with cross-functional teams to understand business requirements and translate them into technical solutions.',
          ],
        },
        {
          role: 'Software Development Bootcamp',
          company: 'Solera Inc',
          place: 'Seville, Spain',
          dates: 'September 2022 — November 2022',
          points: [
            'Intensive software development bootcamp with a practical focus on modern technologies, as part of the onboarding process.',
          ],
        },
        {
          role: 'Software Engineer',
          company: 'Capgemini',
          place: 'Valencia, Spain',
          dates: 'June 2021 — May 2022',
          points: [
            'Developed new backend features using Java Spring Framework.',
            'Improved test coverage with JUnit and Mockito to ensure quality.',
            'Provided training and support to new interns within the team.',
          ],
        },
        {
          role: 'Consultant',
          company: 'Edicom SL',
          place: 'Valencia, Spain',
          dates: 'June 2020 — March 2021',
          points: [
            'EDI data integration and automation, transforming information from ERPs into standard formats and configuring external connections.',
            'Client validation to ensure accurate data transmission and regulatory compliance.',
          ],
        },
      ],
    },
    education: {
      eyebrow: 'Education',
      title: 'Academic background',
      languagesEyebrow: 'Languages',
      languages:
        'Spanish (Native) · French (Advanced — Native) · English (Advanced)',
      additionalEyebrow: 'Additional',
      additional:
        "Passionate about sports and personal development. Strong interest in Artificial Intelligence and emerging technologies. Valid driver's license.",
      items: [
        {
          title: "Bachelor's Degree in Computer Engineering",
          school:
            'Polytechnic University of Valencia — INSA Lyon (Erasmus Program)',
          dates: 'September 2015 — July 2022',
          detail:
            'Specialization in Software Engineering. Final Degree Project: design and development of a coworking management website.',
        },
        {
          title: 'Compulsory Education and High School Diploma',
          school: 'Lycée Français de Valencia',
          dates: 'September 2003 — July 2015',
          detail:
            'Scientific Baccalaureate with a focus on Computer Science.',
        },
      ],
    },
    courses: {
      eyebrow: 'Courses',
      title: 'Certifications & training',
      items: [
        {
          title: 'Advanced Course in Business Internationalization',
          school: 'Universitat Politècnica de València (UPV)',
          dates: 'July 2026',
        },
        {
          title: 'Internet Information Search Course',
          school:
            'Instituto Valenciano de Competitividad e Innovación IVACE +i (Generalitat Valenciana)',
          dates: 'January 2026',
        },
        {
          title:
            'Absolute Introduction to Object Oriented Programming in Java',
          school: 'Udemy',
          dates: 'December 2022',
        },
        {
          title: 'SOLID Principles: Introducing Software Architecture & Design',
          school: 'Udemy',
          dates: 'October 2022',
        },
        {
          title: 'SDLC (2022) — Software Development Life Cycle',
          school: 'Udemy',
          dates: 'October 2022',
        },
      ],
    },
    path: {
      eyebrow: 'Professional',
      title: 'Professional path',
      intro:
        'A look at my professional journey — experience, education, and continuous learning.',
    },
    projects: {
      eyebrow: 'Projects',
      title: 'My projects',
      intro:
        'Side projects where I explore product ideas, compete for fun, and keep shipping.',
      open: 'Open',
      close: 'Close',
      photosNote: 'Project visuals — coming soon.',
      hubLabel: 'Explore builds, experiments, and platforms I have shipped on my own.',
      learnMore: 'How it works',
      viewDetails: 'View details',
      expandImage: 'View image',
      previousImage: 'Previous image',
      nextImage: 'Next image',
      items: [
        {
          id: 'zumex',
          year: '2026',
          title: 'Zumex Dealers & Distributors Scraping',
          subtitle:
            'An AI-powered platform that crawls, analyzes and scores foodservice equipment dealers to identify the best commercial partners.',
          paragraphs: [
            'AI-powered commercial intelligence platform for HORECA distributors',
            'I developed an end-to-end AI platform that automatically discovers, analyzes and qualifies restaurant equipment dealers across North America to help identify the best commercial partners for Zumex.',
            'The application combines web crawling, PDF analysis, structured data extraction and Large Language Models (LLMs) to generate standardized commercial profiles that can be used by sales and business development teams.',
            'Instead of manually reviewing hundreds of distributor websites, the platform automatically collects and consolidates relevant business information into structured reports.',
          ],
        },
        {
          id: 'worldcup-2026',
          year: '2026',
          title: 'World Cup Family Pool 2026',
          subtitle: 'A family tradition, powered by code.',
          paragraphs: [
            'Every FIFA World Cup, my family gets together to organize our own prediction game. With a large family, everyone takes part by submitting their predictions before the tournament begins.',
            'This project was built exclusively for our family, purely for fun and without any commercial purpose.',
            'For the 2026 World Cup, I decided to take the experience one step further by developing this web application, where everyone can follow the competition throughout the tournament.',
          ],
          includesTitle: 'The application includes:',
          includes: [
            'Live family ranking',
            "Detailed view of every participant's predictions",
            'Match schedule and results',
            'Group stage standings',
            'Knockout bracket',
            'Achievement badges unlocked based on each player\'s predictions',
          ],
          scoringTitle: 'Scoring System',
          scoringIntro:
            'Before the tournament starts, each participant predicts every stage of the competition.',
          scoringPointsLabel: 'Points are awarded as follows:',
          scoringHeaders: { prediction: 'Prediction', points: 'Points' },
          scoringRows: [
            { prediction: 'Teams qualifying from Group Stage', points: '2' },
            { prediction: 'Teams reaching Round of 32', points: '4' },
            { prediction: 'Teams reaching Round of 16', points: '8' },
            { prediction: 'Teams reaching Quarter-finals', points: '16' },
            { prediction: 'Teams reaching Semi-finals', points: '32' },
            { prediction: 'World Champion', points: '64' },
          ],
          scoringFooter:
            'The participant with the highest total score at the end of the tournament wins the family pool.',
        },
        {
          id: 'worldcup-2022',
          year: '2022',
          title: 'World Cup Family Pool 2022',
          subtitle:
            "The first digital version of our family's World Cup prediction game.",
          paragraphs: [
            'Every FIFA World Cup, my family organizes a prediction competition where everyone tries to guess how the tournament will unfold.',
            'For the 2022 edition, I developed the first web version of the project, replacing spreadsheets with a complete web application composed of a React frontend and a Spring Boot backend.',
            'Participants could register their predictions, follow the live family ranking, check every player\'s picks, and see how the standings evolved as the tournament progressed.',
            'Unlike traditional betting games, predictions were based on which teams would advance through each stage of the tournament, with points awarded as the real results unfolded.',
            'The project was created exclusively for my family, purely for entertainment and with no commercial purpose.',
          ],
          scoringTitle: 'Scoring System',
          scoringIntro:
            'Participants predicted every knockout stage before the tournament started.',
          scoringPointsLabel: 'Points were awarded as follows:',
          scoringHeaders: { prediction: 'Prediction', points: 'Points' },
          scoringRows: [
            { prediction: 'Teams reaching Round of 16', points: '2' },
            { prediction: 'Teams reaching Quarter-finals', points: '4' },
            { prediction: 'Teams reaching Semi-finals', points: '8' },
            { prediction: 'Teams reaching the Final', points: '16' },
            { prediction: 'World Champion', points: '32' },
          ],
          scoringFooter:
            "Players accumulated points as teams progressed through the tournament, while the application also calculated each participant's maximum possible score, showing how many points they could still achieve.",
        },
        {
          id: 'sumero',
          year: '2022',
          title: 'Sumero Puzzle Generator',
          subtitle:
            'An algorithmic generator for creating valid Sumero puzzle boards.',
          paragraphs: [
            'This project was developed to automatically generate valid Sumero boards, a logic puzzle inspired by Sudoku where each cell contains three digits and one empty position, while rows and columns must satisfy specific sum constraints without repeating numbers.',
            'Rather than solving existing puzzles, the application focuses on generating complete and valid game boards that can later be transformed into playable puzzles.',
            'Once a valid solution was generated, an Excel automation transformed the completed board into a playable puzzle by automatically removing selected values and formatting the grid to resemble a numeric crossword.',
            'The project combines constraint satisfaction, random search and validation algorithms to produce unique puzzle layouts.',
          ],
          includesTitle: 'Main Features',
          includes: [
            'Automatic generation of valid Sumero boards',
            'Randomized solution generation',
            'Row and column sum validation',
            'Sudoku-like digit uniqueness constraints',
            'Excel automation to generate playable puzzle layouts',
            'Simple JavaFX interface to launch the generator',
          ],
        },
        {
          id: 'coworking',
          year: '2021',
          title: 'Coworking Management System',
          subtitle: 'A complete workspace reservation and management platform.',
          lead:
            'Built as part of a university software engineering project, this application reproduces the workflow of a real coworking management platform, including reservations, authentication, payments and administrative tools.',
          paragraphs: [
            'This project is a full-stack web application developed to manage the daily operations of a coworking space.',
            'The platform allows users to register, authenticate, browse available workspaces, make reservations, manage their bookings, and securely pay for memberships and services through Stripe.',
            'Besides the customer-facing features, the application also provides an administration panel to manage rooms, users, companies, reservations, invoices and payments.',
            'The project follows a traditional client-server architecture, with an Angular frontend consuming a Spring Boot REST API connected to a MySQL database.',
          ],
          includesTitle: 'Main Features',
          includes: [
            'User authentication with JWT',
            'Workspace and meeting room management',
            'Multiple reservation types',
            'Recurring bookings',
            'Stripe payment integration',
            'Invoice management',
            'Company management',
            'Administrator dashboard',
            'Responsive user interface',
          ],
        },
      ],
    },
    about: {
      eyebrow: 'Personal',
      title: 'Beyond the résumé',
      open: 'Open',
      close: 'Close',
      hubLabel:
        'Anecdotes, boxing, and the people who shaped how I compete and build.',
      postLabel: 'A note from me',
      postAttribution: 'LinkedIn post — December 1, 2024',
      paragraphs: [
        'Martial arts and combat techniques are often mistaken for purely violent sports. Looking deeper, you discover the values they truly represent: discipline, resilience, self-control, humility, and hard work. A great deal of each.',
        'On November 30th I had the privilege of taking part in a boxing evening, with everything that entails. It was a couple of months of intense preparation that I managed to balance with my job.',
        'Boxing is not only about physical strength or violence. I associate it more with strategy, intelligence, and the right mindset to face any adversity. I had to cut weight in a way that was far from easy, and face a more experienced rival — bigger, stronger, with a solid record. Even so, we took the win.',
        'Every training session and every punch recalls the importance of staying steady under pressure, adapting to circumstances, and giving your best at all times.',
        'This achievement is, for me, a reminder of what can be reached with hard work and dedication. It also highlights how valuable it is to carry these values into both personal and professional life.',
      ],
      quote:
        'The only fighter who fights with confidence is the one who has seen his own blood, been knocked down and beaten in body, but not in spirit. The one who, as many times as he falls, stands up again — more defiant than ever.',
      quoteAuthor: 'Seneca',
      photosEyebrow: 'Boxing',
      sportsEyebrow: 'Sports references',
      sports: [
        'Athletes and coaches who treat preparation as a craft — consistency over noise.',
      ],
      businessEyebrow: 'Business references',
      business: [
        'Builders and operators who combine long-term vision with sharp execution.',
      ],
    },
    personal: {
      eyebrow: 'Personal',
      title: 'Get to know me',
      intro:
        'Outside the résumé there is a person — curious, social, and always looking for the next conversation.',
      story:
        "I'm Jorge. I was born and raised in Valencia, more precisely in Massarrojos — a small town I'm deeply proud of. I come from a big family, and that shapes a lot of who I am: I love being around people, I'm sociable, I enjoy traveling, and I love meeting new people and discovering new places. I have friends scattered around the world, and since I grew up in a large family I've never really been alone. When I am, as my friends like to say — I talk even to the stones.",
    },
    contact: {
      eyebrow: 'Contact',
      title: "Let's build together",
      intro:
        "I'm open to collaborations and new projects. If you have an idea, a challenge, or something you'd like to create — I'd be glad to hear from you.",
      cta: 'Write me an email',
      formName: 'Your name',
      formEmail: 'Your email',
      formMessage: 'Tell me about your project',
      formSubmit: 'Prepare email',
      formHint: 'This opens your email app with the message ready to send to Jorge.',
      addressLabel: 'Based in',
    },
  },
  es: {
    nav: {
      path: 'Recorrido profesional',
      projects: 'Proyectos',
      about: 'Conóceme',
      contact: 'Contacto',
    },
    hero: {
      line1: 'Ingeniero Informático',
      line2: 'Customer Success',
      line3: 'Obsesionado por la IA',
      basedIn: 'Basado en',
      location: 'Miami, Florida',
    },
    menu: {
      siteIndex: 'Índice',
      findMe: 'Encuéntrame',
      open: 'Abrir menú',
      close: 'Cerrar menú',
    },
    social: {
      instagram: 'Instagram',
      email: 'Email',
      linkedin: 'LinkedIn',
    },
    profile: {
      eyebrow: 'Perfil',
      body: 'Desarrollador Full Stack con experiencia en tecnologías modernas como Java Spring Boot y C# con .NET, centrado principalmente en sistemas backend y plataformas impulsadas por software. Cómodo trabajando en equipos transversales, con participación en la implementación de funcionalidades y discusiones técnicas. Fluido en inglés, francés y español.',
    },
    experience: {
      eyebrow: 'Experiencia',
      title: 'Trayectoria profesional',
      jobs: [
        {
          role: 'Customer Success',
          company: 'Zumex Group',
          place: 'Miami, Florida',
          dates: 'Enero 2026 — Actualidad',
          points: [
            'Participación en ferias y reuniones con clientes, apoyando presentaciones de producto y construyendo relaciones con distribuidores y usuarios finales.',
            'Colaboración con equipos de ventas, marketing y técnicos para mejorar la experiencia del cliente e impulsar iniciativas estratégicas de desarrollo de dealers.',
          ],
        },
        {
          role: 'Desarrollador Full Stack',
          company: 'Solera Inc',
          place: 'Sevilla, España',
          dates: 'Noviembre 2022 — Diciembre 2025',
          points: [
            'Participación en un proyecto de Middleware de Integración de Datos (ETL), centrado en el desarrollo y mejora de su funcionalidad.',
            'Trabajo con C# .NET, React.js, testing unitario y cloud computing, con foco en optimización de procesos, escalabilidad y modernización de sistemas legacy.',
            'Colaboración con equipos transversales para entender requisitos de negocio y traducirlos en soluciones técnicas.',
          ],
        },
        {
          role: 'Bootcamp de Desarrollo de Software',
          company: 'Solera Inc',
          place: 'Sevilla, España',
          dates: 'Septiembre 2022 — Noviembre 2022',
          points: [
            'Bootcamp intensivo de desarrollo de software con enfoque práctico en tecnologías modernas, como parte del proceso de onboarding.',
          ],
        },
        {
          role: 'Ingeniero de Software',
          company: 'Capgemini',
          place: 'Valencia, España',
          dates: 'Junio 2021 — Mayo 2022',
          points: [
            'Desarrollo de nuevas funcionalidades backend con Java Spring Framework.',
            'Mejora de la cobertura de tests con JUnit y Mockito para garantizar la calidad.',
            'Formación y apoyo a nuevos becarios dentro del equipo.',
          ],
        },
        {
          role: 'Consultor',
          company: 'Edicom SL',
          place: 'Valencia, España',
          dates: 'Junio 2020 — Marzo 2021',
          points: [
            'Integración EDI y automatización de datos, transformando información de ERPs a formatos estándar y configurando conexiones externas.',
            'Validación con clientes para garantizar una transmisión de datos precisa y el cumplimiento normativo.',
          ],
        },
      ],
    },
    education: {
      eyebrow: 'Formación',
      title: 'Formación académica',
      languagesEyebrow: 'Idiomas',
      languages:
        'Español (Nativo) · Francés (Avanzado — Nativo) · Inglés (Avanzado)',
      additionalEyebrow: 'Adicional',
      additional:
        'Apasionado del deporte y el desarrollo personal. Fuerte interés por la Inteligencia Artificial y las tecnologías emergentes. Permiso de conducir válido.',
      items: [
        {
          title: 'Grado en Ingeniería Informática',
          school:
            'Universitat Politècnica de València — INSA Lyon (Programa Erasmus)',
          dates: 'Septiembre 2015 — Julio 2022',
          detail:
            'Especialización en Ingeniería del Software. Trabajo de Fin de Grado: diseño y desarrollo de un sitio web de gestión de coworking.',
        },
        {
          title: 'Educación Obligatoria y Bachillerato',
          school: 'Lycée Français de Valencia',
          dates: 'Septiembre 2003 — Julio 2015',
          detail:
            'Bachillerato Científico con orientación en Informática.',
        },
      ],
    },
    courses: {
      eyebrow: 'Cursos',
      title: 'Certificaciones y formación',
      items: [
        {
          title: 'Curso Superior en Internacionalización de la Empresa',
          school: 'Universitat Politècnica de València (UPV)',
          dates: 'Julio 2026',
        },
        {
          title: 'Curso de búsqueda de información en internet',
          school:
            'Instituto Valenciano de Competitividad e Innovación IVACE +i (Generalitat Valenciana)',
          dates: 'Enero 2026',
        },
        {
          title:
            'Absolute Introduction to Object Oriented Programming in Java',
          school: 'Udemy',
          dates: 'Diciembre 2022',
        },
        {
          title: 'SOLID Principles: Introducing Software Architecture & Design',
          school: 'Udemy',
          dates: 'Octubre 2022',
        },
        {
          title: 'SDLC (2022) — Software Development Life Cycle',
          school: 'Udemy',
          dates: 'Octubre 2022',
        },
      ],
    },
    path: {
      eyebrow: 'Profesional',
      title: 'Recorrido profesional',
      intro:
        'Una mirada a mi trayectoria profesional — experiencia, formación y aprendizaje continuo.',
    },
    projects: {
      eyebrow: 'Proyectos',
      title: 'Mis proyectos',
      intro:
        'Proyectos en los que exploro ideas de producto, compito por diversión y sigo construyendo.',
      open: 'Abrir',
      close: 'Cerrar',
      photosNote: 'Visuales del proyecto — próximamente.',
      hubLabel:
        'Explora builds, experimentos y plataformas que he lanzado por mi cuenta.',
      learnMore: 'Cómo funciona',
      viewDetails: 'Ver detalles',
      expandImage: 'Ver imagen',
      previousImage: 'Imagen anterior',
      nextImage: 'Imagen siguiente',
      items: [
        {
          id: 'zumex',
          year: '2026',
          title: 'Scraping de dealers y distribuidores Zumex',
          subtitle:
            'Una plataforma impulsada por IA que rastrea, analiza y puntúa dealers de equipamiento foodservice para identificar a los mejores partners comerciales.',
          paragraphs: [
            'Plataforma de inteligencia comercial impulsada por IA para distribuidores HORECA',
            'Desarrollé una plataforma de IA de extremo a extremo que descubre, analiza y cualifica automáticamente dealers de equipamiento para restauración en Norteamérica, con el fin de identificar a los mejores partners comerciales para Zumex.',
            'La aplicación combina web crawling, análisis de PDF, extracción de datos estructurados y Large Language Models (LLMs) para generar perfiles comerciales estandarizados que pueden usar los equipos de ventas y business development.',
            'En lugar de revisar manualmente cientos de sitios web de distribuidores, la plataforma recopila y consolida automáticamente la información de negocio relevante en informes estructurados.',
          ],
        },
        {
          id: 'worldcup-2026',
          year: '2026',
          title: 'Porra familiar del Mundial 2026',
          subtitle: 'Una tradición familiar, impulsada por código.',
          paragraphs: [
            'En cada Mundial de la FIFA, mi familia se reúne para organizar nuestra propia porra. Somos muchos, y todo el mundo participa enviando sus predicciones antes de que empiece el torneo.',
            'Este proyecto se construyó exclusivamente para la familia, solo por diversión y sin ningún fin comercial.',
            'Para el Mundial 2026 decidí llevar la experiencia un paso más allá desarrollando esta aplicación web, donde todos pueden seguir la competición a lo largo del torneo.',
          ],
          includesTitle: 'La aplicación incluye:',
          includes: [
            'Ranking familiar en vivo',
            'Vista detallada de las predicciones de cada participante',
            'Calendario de partidos y resultados',
            'Clasificación de la fase de grupos',
            'Cuadro de eliminatorias',
            'Insignias de logros desbloqueadas según las predicciones de cada jugador',
          ],
          scoringTitle: 'Sistema de puntuación',
          scoringIntro:
            'Antes de que empiece el torneo, cada participante predice todas las fases de la competición.',
          scoringPointsLabel: 'Los puntos se otorgan así:',
          scoringHeaders: { prediction: 'Predicción', points: 'Puntos' },
          scoringRows: [
            { prediction: 'Equipos que clasifican de la fase de grupos', points: '2' },
            { prediction: 'Equipos que llegan a dieciseisavos', points: '4' },
            { prediction: 'Equipos que llegan a octavos', points: '8' },
            { prediction: 'Equipos que llegan a cuartos', points: '16' },
            { prediction: 'Equipos que llegan a semifinales', points: '32' },
            { prediction: 'Campeón del mundo', points: '64' },
          ],
          scoringFooter:
            'El participante con la puntuación total más alta al final del torneo gana la porra familiar.',
        },
        {
          id: 'worldcup-2022',
          year: '2022',
          title: 'Porra familiar del Mundial 2022',
          subtitle:
            'La primera versión digital de la porra del Mundial de nuestra familia.',
          paragraphs: [
            'En cada Mundial de la FIFA, mi familia organiza una competición de predicciones en la que todo el mundo intenta adivinar cómo se desarrollará el torneo.',
            'Para la edición de 2022, desarrollé la primera versión web del proyecto, sustituyendo las hojas de cálculo por una aplicación completa con frontend en React y backend en Spring Boot.',
            'Los participantes podían registrar sus predicciones, seguir el ranking familiar en vivo, consultar las elecciones de cada jugador y ver cómo evolucionaba la clasificación a medida que avanzaba el torneo.',
            'A diferencia de las porras tradicionales, las predicciones se basaban en qué equipos avanzarían en cada fase del torneo, y los puntos se otorgaban conforme se conocían los resultados reales.',
            'El proyecto se creó exclusivamente para mi familia, solo por diversión y sin ningún fin comercial.',
          ],
          scoringTitle: 'Sistema de puntuación',
          scoringIntro:
            'Los participantes predijeron todas las fases eliminatorias antes de que empezara el torneo.',
          scoringPointsLabel: 'Los puntos se otorgaban así:',
          scoringHeaders: { prediction: 'Predicción', points: 'Puntos' },
          scoringRows: [
            { prediction: 'Equipos que llegan a octavos', points: '2' },
            { prediction: 'Equipos que llegan a cuartos', points: '4' },
            { prediction: 'Equipos que llegan a semifinales', points: '8' },
            { prediction: 'Equipos que llegan a la final', points: '16' },
            { prediction: 'Campeón del mundo', points: '32' },
          ],
          scoringFooter:
            'Los jugadores acumulaban puntos a medida que los equipos avanzaban en el torneo, y la aplicación también calculaba la puntuación máxima posible de cada participante, mostrando cuántos puntos podían alcanzar todavía.',
        },
        {
          id: 'sumero',
          year: '2022',
          title: 'Generador de puzzles Sumero',
          subtitle:
            'Un generador algorítmico para crear tableros Sumero válidos.',
          paragraphs: [
            'Este proyecto se desarrolló para generar automáticamente tableros Sumero válidos, un puzzle lógico inspirado en el Sudoku donde cada celda contiene tres dígitos y una posición vacía, mientras que filas y columnas deben cumplir restricciones de suma específicas sin repetir números.',
            'En lugar de resolver puzzles existentes, la aplicación se centra en generar tableros de juego completos y válidos que después pueden transformarse en puzzles jugables.',
            'Una vez generada una solución válida, una automatización de Excel transformaba el tablero completo en un puzzle jugable eliminando automáticamente valores seleccionados y formateando la cuadrícula para que se asemejara a un crucigrama numérico.',
            'El proyecto combina satisfacción de restricciones, búsqueda aleatoria y algoritmos de validación para producir layouts de puzzle únicos.',
          ],
          includesTitle: 'Funcionalidades principales',
          includes: [
            'Generación automática de tableros Sumero válidos',
            'Generación aleatoria de soluciones',
            'Validación de sumas por filas y columnas',
            'Restricciones de unicidad de dígitos al estilo Sudoku',
            'Automatización en Excel para generar puzzles jugables',
            'Interfaz sencilla en JavaFX para lanzar el generador',
          ],
        },
        {
          id: 'coworking',
          year: '2021',
          title: 'Sistema de gestión de coworking',
          subtitle:
            'Una plataforma completa de reserva y gestión de espacios de trabajo.',
          lead:
            'Desarrollada como parte de un proyecto universitario de ingeniería del software, esta aplicación reproduce el flujo de trabajo de una plataforma real de gestión de coworking, incluyendo reservas, autenticación, pagos y herramientas de administración.',
          paragraphs: [
            'Este proyecto es una aplicación web full-stack desarrollada para gestionar el día a día de un espacio de coworking.',
            'La plataforma permite a los usuarios registrarse, autenticarse, explorar espacios disponibles, hacer reservas, gestionar sus reservas y pagar de forma segura membresías y servicios a través de Stripe.',
            'Además de las funcionalidades orientadas al cliente, la aplicación incluye un panel de administración para gestionar salas, usuarios, empresas, reservas, facturas y pagos.',
            'El proyecto sigue una arquitectura cliente-servidor tradicional, con un frontend en Angular que consume una API REST de Spring Boot conectada a una base de datos MySQL.',
          ],
          includesTitle: 'Funcionalidades principales',
          includes: [
            'Autenticación de usuarios con JWT',
            'Gestión de espacios de trabajo y salas de reuniones',
            'Múltiples tipos de reserva',
            'Reservas recurrentes',
            'Integración de pagos con Stripe',
            'Gestión de facturas',
            'Gestión de empresas',
            'Panel de administrador',
            'Interfaz de usuario responsive',
          ],
        },
      ],
    },
    about: {
      eyebrow: 'Personal',
      title: 'Más allá del CV',
      open: 'Abrir',
      close: 'Cerrar',
      hubLabel:
        'Anécdotas, boxeo y las personas que marcaron cómo compito y construyo.',
      postLabel: 'Una nota mía',
      postAttribution: 'Publicación en LinkedIn — 1 de diciembre de 2024',
      paragraphs: [
        'A menudo se confunden las artes marciales o las técnicas de combate con deportes meramente violentos. Sin embargo, al profundizar en ellas, descubres los valores que realmente representan: disciplina, resiliencia, autocontrol, humildad y trabajo. Mucho de cada uno.',
        'El pasado 30 de noviembre tuve el privilegio de participar en una velada de boxeo, con todo lo que ello implica. Fueron un par de meses de preparación intensa que logré compaginar con mi trabajo.',
        'El boxeo no es solo cuestión de fuerza física ni de violencia. Lo asocio más con la estrategia, la inteligencia y una mentalidad adecuada para enfrentar cualquier adversidad. Tuve que hacer una bajada de peso que no fue nada sencilla y enfrentarme a un rival más experimentado, grande, fuerte y con un buen récord. A pesar de ello, logramos llevarnos la victoria.',
        'Cada entrenamiento y cada golpe recuerdan la importancia de mantenerse firme ante los retos, adaptarse a las circunstancias y dar lo mejor de uno mismo en todo momento.',
        'Este logro es, para mí, un recordatorio de lo que se puede conseguir con trabajo duro y dedicación. Además, resalta lo valioso que es extrapolar estos valores tanto a nivel personal como profesional.',
      ],
      quote:
        'El único luchador que pelea con confianza es el que ha visto su propia sangre y ha sido tirado y golpeado de cuerpo, pero no de espíritu. El que tantas veces como se cae se vuelve a levantar, más desafiante que nunca.',
      quoteAuthor: 'Séneca',
      photosEyebrow: 'Boxeo',
      sportsEyebrow: 'Referentes en el deporte',
      sports: [
        'Atletas y entrenadores que tratan la preparación como un oficio — constancia por encima del ruido.',
      ],
      businessEyebrow: 'Referentes en los negocios',
      business: [
        'Constructores y operadores que combinan visión a largo plazo con ejecución precisa.',
      ],
    },
    personal: {
      eyebrow: 'Personal',
      title: 'Conóceme un poco más',
      intro:
        'Más allá del CV hay una persona: curiosa, sociable y siempre abierta a la siguiente conversación.',
      story:
        'Soy Jorge. Nací y crecí en Valencia, más concretamente en Massarrojos, un pueblo del que estoy profundamente orgulloso. Vengo de una familia numerosa, y eso marca mucho quién soy: me gusta estar rodeado de gente, soy sociable, disfruto viajando y me encanta conocer personas y lugares nuevos. Tengo amigos repartidos por el mundo y, como nunca he estado solo en casa, cuando me encuentro solo —como dicen mis amigos— hablo hasta con las piedras.',
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Construyamos juntos',
      intro:
        'Estoy abierto a colaboraciones y nuevos proyectos. Si tienes una idea, un reto o algo que te gustaría crear — estaré encantado de escucharte.',
      cta: 'Escríbeme un correo',
      formName: 'Tu nombre',
      formEmail: 'Tu email',
      formMessage: 'Cuéntame tu proyecto',
      formSubmit: 'Preparar email',
      formHint:
        'Se abrirá tu aplicación de correo con el mensaje listo para enviar a Jorge.',
      addressLabel: 'Basado en',
    },
  },
  fr: {
    nav: {
      path: 'Parcours professionnel',
      projects: 'Projets',
      about: 'Faites ma connaissance',
      contact: 'Contact',
    },
    hero: {
      line1: 'Ingénieur Informatique',
      line2: 'Customer Success',
      line3: "Passionné par l'IA",
      basedIn: 'Basé à',
      location: 'Miami, Floride',
    },
    menu: {
      siteIndex: 'Index',
      findMe: 'Me trouver',
      open: 'Ouvrir le menu',
      close: 'Fermer le menu',
    },
    social: {
      instagram: 'Instagram',
      email: 'Email',
      linkedin: 'LinkedIn',
    },
    profile: {
      eyebrow: 'Profil',
      body: 'Développeur Full Stack avec une expérience des technologies modernes telles que Java Spring Boot et C# avec .NET, principalement axé sur les systèmes backend et les plateformes logicielles. À l’aise dans des équipes transverses, avec une implication dans l’implémentation de fonctionnalités et les discussions techniques. Courant en anglais, français et espagnol.',
    },
    experience: {
      eyebrow: 'Expérience',
      title: 'Parcours professionnel',
      jobs: [
        {
          role: 'Customer Success',
          company: 'Zumex Group',
          place: 'Miami, Floride',
          dates: 'Janvier 2026 — Aujourd’hui',
          points: [
            'Participation à des salons et réunions clients, soutien aux présentations produit et développement de relations avec distributeurs et utilisateurs finaux.',
            'Collaboration avec les équipes commerciales, marketing et techniques pour améliorer l’expérience client et soutenir le développement stratégique des dealers.',
          ],
        },
        {
          role: 'Développeur Full Stack',
          company: 'Solera Inc',
          place: 'Séville, Espagne',
          dates: 'Novembre 2022 — Décembre 2025',
          points: [
            'Participation à un projet de Middleware d’Intégration de Données (ETL), axé sur le développement et l’amélioration de ses fonctionnalités.',
            'Travail avec C# .NET, React.js, tests unitaires et cloud computing, avec un focus sur l’optimisation des processus, la scalabilité et la modernisation de systèmes legacy.',
            'Collaboration avec des équipes transverses pour comprendre les besoins métier et les traduire en solutions techniques.',
          ],
        },
        {
          role: 'Bootcamp de Développement Logiciel',
          company: 'Solera Inc',
          place: 'Séville, Espagne',
          dates: 'Septembre 2022 — Novembre 2022',
          points: [
            'Bootcamp intensif de développement logiciel avec un focus pratique sur les technologies modernes, dans le cadre du processus d’onboarding.',
          ],
        },
        {
          role: 'Ingénieur Logiciel',
          company: 'Capgemini',
          place: 'Valence, Espagne',
          dates: 'Juin 2021 — Mai 2022',
          points: [
            'Développement de nouvelles fonctionnalités backend avec Java Spring Framework.',
            'Amélioration de la couverture de tests avec JUnit et Mockito pour garantir la qualité.',
            'Formation et accompagnement des nouveaux stagiaires au sein de l’équipe.',
          ],
        },
        {
          role: 'Consultant',
          company: 'Edicom SL',
          place: 'Valence, Espagne',
          dates: 'Juin 2020 — Mars 2021',
          points: [
            'Intégration EDI et automatisation des données, transformation d’informations d’ERPs en formats standards et configuration de connexions externes.',
            'Validation client pour garantir une transmission de données précise et la conformité réglementaire.',
          ],
        },
      ],
    },
    education: {
      eyebrow: 'Formation',
      title: 'Parcours académique',
      languagesEyebrow: 'Langues',
      languages:
        'Espagnol (Natif) · Français (Avancé — Natif) · Anglais (Avancé)',
      additionalEyebrow: 'Autres',
      additional:
        "Passionné de sport et de développement personnel. Fort intérêt pour l'Intelligence Artificielle et les technologies émergentes. Permis de conduire valide.",
      items: [
        {
          title: 'Licence en Génie Informatique',
          school:
            'Universitat Politècnica de València — INSA Lyon (Programme Erasmus)',
          dates: 'Septembre 2015 — Juillet 2022',
          detail:
            'Spécialisation en génie logiciel. Projet de fin d’études : conception et développement d’un site de gestion de coworking.',
        },
        {
          title: 'Enseignement obligatoire et baccalauréat',
          school: 'Lycée Français de Valencia',
          dates: 'Septembre 2003 — Juillet 2015',
          detail:
            'Baccalauréat scientifique avec orientation Informatique.',
        },
      ],
    },
    courses: {
      eyebrow: 'Cours',
      title: 'Certifications et formation',
      items: [
        {
          title: "Cours supérieur d'internationalisation de l'entreprise",
          school: 'Universitat Politècnica de València (UPV)',
          dates: 'Juillet 2026',
        },
        {
          title: "Cours de recherche d'information sur internet",
          school:
            'Instituto Valenciano de Competitividad e Innovación IVACE +i (Generalitat Valenciana)',
          dates: 'Janvier 2026',
        },
        {
          title:
            'Absolute Introduction to Object Oriented Programming in Java',
          school: 'Udemy',
          dates: 'Décembre 2022',
        },
        {
          title: 'SOLID Principles: Introducing Software Architecture & Design',
          school: 'Udemy',
          dates: 'Octobre 2022',
        },
        {
          title: 'SDLC (2022) — Software Development Life Cycle',
          school: 'Udemy',
          dates: 'Octobre 2022',
        },
      ],
    },
    path: {
      eyebrow: 'Professionnel',
      title: 'Parcours professionnel',
      intro:
        'Un regard sur mon parcours professionnel — expérience, formation et apprentissage continu.',
    },
    projects: {
      eyebrow: 'Projets',
      title: 'Mes projets',
      intro:
        'Des projets où j’explore des idées produit, je joue pour le plaisir et je continue de construire.',
      open: 'Ouvrir',
      close: 'Fermer',
      photosNote: 'Visuels du projet — bientôt.',
      hubLabel:
        'Explorez builds, expérimentations et plateformes que j’ai lancés de mon côté.',
      learnMore: 'Comment ça marche',
      viewDetails: 'Voir les détails',
      expandImage: 'Voir l’image',
      previousImage: 'Image précédente',
      nextImage: 'Image suivante',
      items: [
        {
          id: 'zumex',
          year: '2026',
          title: 'Scraping des dealers et distributeurs Zumex',
          subtitle:
            'Une plateforme alimentée par l’IA qui crawl, analyse et note les dealers d’équipement foodservice afin d’identifier les meilleurs partenaires commerciaux.',
          paragraphs: [
            'Plateforme d’intelligence commerciale alimentée par l’IA pour les distributeurs HORECA',
            'J’ai développé une plateforme d’IA de bout en bout qui découvre, analyse et qualifie automatiquement des dealers d’équipement pour la restauration en Amérique du Nord, afin d’identifier les meilleurs partenaires commerciaux pour Zumex.',
            'L’application combine web crawling, analyse de PDF, extraction de données structurées et Large Language Models (LLMs) pour générer des profils commerciaux standardisés utilisables par les équipes commerciales et de business development.',
            'Au lieu d’examiner manuellement des centaines de sites de distributeurs, la plateforme collecte et consolide automatiquement les informations business pertinentes dans des rapports structurés.',
          ],
        },
        {
          id: 'worldcup-2026',
          year: '2026',
          title: 'Pronostics familiaux Coupe du Monde 2026',
          subtitle: 'Une tradition familiale, propulsée par le code.',
          paragraphs: [
            'À chaque Coupe du Monde de la FIFA, ma famille se réunit pour organiser notre propre jeu de prédictions. Nous sommes nombreux, et tout le monde participe en envoyant ses pronostics avant le début du tournoi.',
            'Ce projet a été conçu exclusivement pour la famille, purement pour le plaisir et sans aucun but commercial.',
            'Pour la Coupe du Monde 2026, j’ai décidé d’aller plus loin en développant cette application web, où chacun peut suivre la compétition tout au long du tournoi.',
          ],
          includesTitle: 'L’application inclut :',
          includes: [
            'Classement familial en direct',
            'Vue détaillée des prédictions de chaque participant',
            'Calendrier des matchs et résultats',
            'Classements de la phase de groupes',
            'Tableau des phases finales',
            'Badges de réussite débloqués selon les prédictions de chaque joueur',
          ],
          scoringTitle: 'Système de points',
          scoringIntro:
            'Avant le début du tournoi, chaque participant prédit toutes les phases de la compétition.',
          scoringPointsLabel: 'Les points sont attribués comme suit :',
          scoringHeaders: { prediction: 'Prédiction', points: 'Points' },
          scoringRows: [
            { prediction: 'Équipes qualifiées de la phase de groupes', points: '2' },
            { prediction: 'Équipes atteignant les 32es de finale', points: '4' },
            { prediction: 'Équipes atteignant les 8es de finale', points: '8' },
            { prediction: 'Équipes atteignant les quarts de finale', points: '16' },
            { prediction: 'Équipes atteignant les demi-finales', points: '32' },
            { prediction: 'Champion du monde', points: '64' },
          ],
          scoringFooter:
            'Le participant avec le score total le plus élevé à la fin du tournoi remporte le concours familial.',
        },
        {
          id: 'worldcup-2022',
          year: '2022',
          title: 'Pronostics familiaux Coupe du Monde 2022',
          subtitle:
            'La première version numérique du jeu de prédictions familial pour la Coupe du Monde.',
          paragraphs: [
            'À chaque Coupe du Monde de la FIFA, ma famille organise une compétition de prédictions où tout le monde essaie de deviner le déroulement du tournoi.',
            'Pour l’édition 2022, j’ai développé la première version web du projet, remplaçant les tableurs par une application complète composée d’un frontend React et d’un backend Spring Boot.',
            'Les participants pouvaient enregistrer leurs prédictions, suivre le classement familial en direct, consulter les choix de chaque joueur et voir l’évolution du classement au fil du tournoi.',
            'Contrairement aux paris traditionnels, les prédictions portaient sur les équipes qui avanceraient à chaque phase du tournoi, avec des points attribués au fur et à mesure des résultats réels.',
            'Le projet a été créé exclusivement pour ma famille, purement pour le divertissement et sans aucun but commercial.',
          ],
          scoringTitle: 'Système de points',
          scoringIntro:
            'Les participants prédisaient toutes les phases à élimination directe avant le début du tournoi.',
          scoringPointsLabel: 'Les points étaient attribués comme suit :',
          scoringHeaders: { prediction: 'Prédiction', points: 'Points' },
          scoringRows: [
            { prediction: 'Équipes atteignant les 8es de finale', points: '2' },
            { prediction: 'Équipes atteignant les quarts de finale', points: '4' },
            { prediction: 'Équipes atteignant les demi-finales', points: '8' },
            { prediction: 'Équipes atteignant la finale', points: '16' },
            { prediction: 'Champion du monde', points: '32' },
          ],
          scoringFooter:
            'Les joueurs accumulaient des points au fur et à mesure de la progression des équipes, tandis que l’application calculait aussi le score maximum possible de chaque participant, indiquant combien de points ils pouvaient encore atteindre.',
        },
        {
          id: 'sumero',
          year: '2022',
          title: 'Générateur de puzzles Sumero',
          subtitle:
            'Un générateur algorithmique pour créer des plateaux Sumero valides.',
          paragraphs: [
            'Ce projet a été développé pour générer automatiquement des plateaux Sumero valides, un puzzle logique inspiré du Sudoku où chaque cellule contient trois chiffres et une position vide, tandis que les lignes et colonnes doivent respecter des contraintes de somme spécifiques sans répéter les nombres.',
            'Plutôt que de résoudre des puzzles existants, l’application se concentre sur la génération de plateaux de jeu complets et valides qui peuvent ensuite être transformés en puzzles jouables.',
            'Une fois une solution valide générée, une automatisation Excel transformait le plateau complet en puzzle jouable en retirant automatiquement certaines valeurs et en formatant la grille pour qu’elle ressemble à un crossword numérique.',
            'Le projet combine satisfaction de contraintes, recherche aléatoire et algorithmes de validation pour produire des layouts de puzzle uniques.',
          ],
          includesTitle: 'Fonctionnalités principales',
          includes: [
            'Génération automatique de plateaux Sumero valides',
            'Génération aléatoire de solutions',
            'Validation des sommes par lignes et colonnes',
            'Contraintes d’unicité des chiffres de type Sudoku',
            'Automatisation Excel pour générer des puzzles jouables',
            'Interface JavaFX simple pour lancer le générateur',
          ],
        },
        {
          id: 'coworking',
          year: '2021',
          title: 'Système de gestion de coworking',
          subtitle:
            'Une plateforme complète de réservation et de gestion d’espaces de travail.',
          lead:
            'Développée dans le cadre d’un projet universitaire de génie logiciel, cette application reproduit le workflow d’une vraie plateforme de gestion de coworking, incluant réservations, authentification, paiements et outils d’administration.',
          paragraphs: [
            'Ce projet est une application web full-stack développée pour gérer le quotidien d’un espace de coworking.',
            'La plateforme permet aux utilisateurs de s’inscrire, de s’authentifier, de parcourir les espaces disponibles, de faire des réservations, de gérer leurs réservations et de payer en toute sécurité abonnements et services via Stripe.',
            'En plus des fonctionnalités destinées aux clients, l’application fournit aussi un panneau d’administration pour gérer salles, utilisateurs, entreprises, réservations, factures et paiements.',
            'Le projet suit une architecture client-serveur traditionnelle, avec un frontend Angular qui consomme une API REST Spring Boot connectée à une base de données MySQL.',
          ],
          includesTitle: 'Fonctionnalités principales',
          includes: [
            'Authentification des utilisateurs avec JWT',
            'Gestion des espaces de travail et salles de réunion',
            'Plusieurs types de réservation',
            'Réservations récurrentes',
            'Intégration des paiements Stripe',
            'Gestion des factures',
            'Gestion des entreprises',
            'Tableau de bord administrateur',
            'Interface utilisateur responsive',
          ],
        },
      ],
    },
    about: {
      eyebrow: 'Personnel',
      title: 'Au-delà du CV',
      open: 'Ouvrir',
      close: 'Fermer',
      hubLabel:
        'Anecdotes, boxe et les personnes qui ont façonné ma façon de combattre et de construire.',
      postLabel: 'Une note de moi',
      postAttribution: 'Publication LinkedIn — 1er décembre 2024',
      paragraphs: [
        'On confond souvent les arts martiaux ou les techniques de combat avec des sports purement violents. Pourtant, en y plongeant, on découvre les valeurs qu’ils représentent vraiment : discipline, résilience, maîtrise de soi, humilité et travail. Beaucoup de chacune.',
        'Le 30 novembre dernier, j’ai eu le privilège de participer à une soirée de boxe, avec tout ce que cela implique. Ce furent quelques mois de préparation intense que j’ai réussis à concilier avec mon travail.',
        'La boxe n’est pas seulement une question de force physique ou de violence. Je l’associe davantage à la stratégie, à l’intelligence et à un état d’esprit adapté pour affronter n’importe quelle adversité. J’ai dû faire une perte de poids qui n’a rien eu de simple, et affronter un adversaire plus expérimenté, plus grand, plus fort, avec un bon palmarès. Malgré tout, nous avons remporté la victoire.',
        'Chaque entraînement et chaque coup rappellent l’importance de rester ferme face aux défis, de s’adapter aux circonstances et de donner le meilleur de soi-même à chaque instant.',
        'Cette réussite est, pour moi, un rappel de ce que l’on peut accomplir avec du travail acharné et de la dédicace. Elle souligne aussi combien il est précieux d’extrapoler ces valeurs, tant sur le plan personnel que professionnel.',
      ],
      quote:
        'Le seul combattant qui se bat avec confiance est celui qui a vu son propre sang, qui a été terrassé et frappé dans son corps, mais pas dans son esprit. Celui qui, autant de fois qu’il tombe, se relève — plus défiant que jamais.',
      quoteAuthor: 'Sénèque',
      photosEyebrow: 'Boxe',
      sportsEyebrow: 'Références sportives',
      sports: [
        'Athlètes et coachs qui traitent la préparation comme un métier — la constance plutôt que le bruit.',
      ],
      businessEyebrow: 'Références business',
      business: [
        'Bâtisseurs et opérateurs qui allient vision long terme et exécution précise.',
      ],
    },
    personal: {
      eyebrow: 'Personnel',
      title: 'Apprenez à me connaître',
      intro:
        'Au-delà du CV, il y a une personne : curieuse, sociable, toujours ouverte à la prochaine conversation.',
      story:
        'Je suis Jorge. Je suis né et j’ai grandi à Valence, plus précisément à Massarrojos — un village dont je suis profondément fier. Je viens d’une grande famille, et cela marque beaucoup qui je suis : j’aime être entouré de gens, je suis sociable, j’aime voyager et découvrir de nouvelles personnes et de nouveaux lieux. J’ai des amis dispersés dans le monde, et comme je n’ai jamais vraiment été seul à la maison, quand je me retrouve seul — comme disent mes amis — je parle même aux pierres.',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Construisons ensemble',
      intro:
        'Je suis ouvert aux collaborations et aux nouveaux projets. Si vous avez une idée, un défi ou quelque chose à créer — je serais ravi de vous écouter.',
      cta: 'Écrivez-moi un email',
      formName: 'Votre nom',
      formEmail: 'Votre email',
      formMessage: 'Parlez-moi de votre projet',
      formSubmit: 'Préparer l’email',
      formHint:
        'Cela ouvrira votre application mail avec le message prêt à envoyer à Jorge.',
      addressLabel: 'Basé à',
    },
  },
} as const

export type Translation = (typeof translations)[Locale]
