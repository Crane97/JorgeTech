import type { Locale } from '../i18n'

const en = {
  title: 'How it works',
  paragraphs: [
    'The application generates complete Sumero solutions through a constraint-based search algorithm.',
    'It starts from a predefined catalogue of valid cell combinations, where each cell contains three digits and one empty position. These combinations are carefully selected so that the digits satisfy the puzzle\'s arithmetic constraints.',
    'The generator progressively builds the board by randomly selecting compatible cells while continuously validating several rules:',
  ],
  rules: [
    'Every row must produce the same target sum.',
    'Every column must produce the same target sum.',
    'Digits cannot be repeated between neighbouring cells (except the empty value).',
    'Every intermediate step must remain compatible with a valid final solution.',
  ],
  midParagraphs: [
    'Whenever the algorithm reaches an invalid state or exceeds the search timeout, the current attempt is discarded and a new randomized search begins.',
    'After a valid solution is found, the board is exported to an Excel template containing spreadsheet automation that transforms the complete solution into a playable puzzle. The automation selectively removes values, preserves the puzzle constraints, and formats the board to resemble a crossword-style numeric puzzle ready to be solved.',
    'This workflow separates the computationally intensive task of generating valid solutions from the puzzle design stage, allowing multiple playable Sumero puzzles to be produced from automatically generated boards.',
  ],
  technologiesTitle: 'Technologies',
  technologies: [
    'Java 16',
    'JavaFX',
    'FXML',
    'Maven',
    'Microsoft Excel (automation and puzzle generation)',
    'JUnit 5',
  ],
} as const

const es = {
  title: 'Cómo funciona',
  paragraphs: [
    'La aplicación genera soluciones completas de Sumero mediante un algoritmo de búsqueda basado en restricciones.',
    'Parte de un catálogo predefinido de combinaciones válidas de celdas, donde cada celda contiene tres dígitos y una posición vacía. Esas combinaciones se seleccionan de forma que los dígitos cumplan las restricciones aritméticas del puzzle.',
    'El generador construye el tablero de forma progresiva eligiendo celdas compatibles al azar, a la vez que valida continuamente varias reglas:',
  ],
  rules: [
    'Cada fila debe producir la misma suma objetivo.',
    'Cada columna debe producir la misma suma objetivo.',
    'Los dígitos no pueden repetirse entre celdas vecinas (excepto el valor vacío).',
    'Cada paso intermedio debe seguir siendo compatible con una solución final válida.',
  ],
  midParagraphs: [
    'Cuando el algoritmo llega a un estado inválido o supera el tiempo de búsqueda, se descarta el intento actual y comienza una nueva búsqueda aleatoria.',
    'Cuando se encuentra una solución válida, el tablero se exporta a una plantilla de Excel con automatización que transforma la solución completa en un puzzle jugable. La automatización elimina valores de forma selectiva, preserva las restricciones del puzzle y formatea el tablero para que se asemeje a un crucigrama numérico listo para resolver.',
    'Este flujo separa la tarea computacionalmente intensiva de generar soluciones válidas de la fase de diseño del puzzle, permitiendo producir múltiples Sumeros jugables a partir de tableros generados automáticamente.',
  ],
  technologiesTitle: 'Tecnologías',
  technologies: [
    'Java 16',
    'JavaFX',
    'FXML',
    'Maven',
    'Microsoft Excel (automatización y generación de puzzles)',
    'JUnit 5',
  ],
} as const

const fr = {
  title: 'Comment ça marche',
  paragraphs: [
    'L’application génère des solutions Sumero complètes grâce à un algorithme de recherche basé sur des contraintes.',
    'Elle part d’un catalogue prédéfini de combinaisons de cellules valides, où chaque cellule contient trois chiffres et une position vide. Ces combinaisons sont sélectionnées de façon à ce que les chiffres satisfassent les contraintes arithmétiques du puzzle.',
    'Le générateur construit progressivement le plateau en sélectionnant au hasard des cellules compatibles, tout en validant en continu plusieurs règles :',
  ],
  rules: [
    'Chaque ligne doit produire la même somme cible.',
    'Chaque colonne doit produire la même somme cible.',
    'Les chiffres ne peuvent pas se répéter entre cellules voisines (sauf la valeur vide).',
    'Chaque étape intermédiaire doit rester compatible avec une solution finale valide.',
  ],
  midParagraphs: [
    'Chaque fois que l’algorithme atteint un état invalide ou dépasse le délai de recherche, la tentative en cours est abandonnée et une nouvelle recherche aléatoire commence.',
    'Une fois une solution valide trouvée, le plateau est exporté vers un modèle Excel contenant une automatisation qui transforme la solution complète en puzzle jouable. L’automatisation retire sélectivement des valeurs, préserve les contraintes du puzzle et met en forme le plateau pour qu’il ressemble à un crossword numérique prêt à être résolu.',
    'Ce workflow sépare la tâche computationnellement intensive de génération de solutions valides de l’étape de conception du puzzle, permettant de produire plusieurs Sumeros jouables à partir de plateaux générés automatiquement.',
  ],
  technologiesTitle: 'Technologies',
  technologies: [
    'Java 16',
    'JavaFX',
    'FXML',
    'Maven',
    'Microsoft Excel (automatisation et génération de puzzles)',
    'JUnit 5',
  ],
} as const

export const sumeroDetailsByLocale = { en, es, fr } as const

export function getSumeroDetails(locale: Locale) {
  return sumeroDetailsByLocale[locale]
}
