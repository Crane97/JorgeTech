import { getCoworkingDetails } from '../content/coworkingDetails'
import { getPorra2022Details } from '../content/porra2022Details'
import { getPorra2026Details } from '../content/porra2026Details'
import { getSumeroDetails } from '../content/sumeroDetails'
import { getZumexHowItWorks } from '../content/zumexHowItWorks'
import type { Locale, Translation } from '../i18n'
import {
  COWORKING_IMAGES,
  PORRA_2022_IMAGES,
  PORRA_IMAGES,
  SUMERO_IMAGES,
  ZUMEX_IMAGES,
} from './assets'

export type CaseStudy = {
  id: string
  year: string
  title: string
  subtitle?: string
  problem: string[]
  solution: string[]
  architecture?: string
  technologies: string[]
  results: string[]
  images: string[]
  stages?: { title: string; body: string }[]
  note?: string
  liveUrl?: string
}

const LIVE_URLS: Partial<Record<string, string>> = {
  sumero: 'https://sumeros.vercel.app/',
  'worldcup-2026': 'https://porramundialdepilar2026.vercel.app/',
}

export function buildCaseStudies(t: Translation, locale: Locale): CaseStudy[] {
  const zumex = getZumexHowItWorks(locale)
  const porra2026 = getPorra2026Details(locale)
  const porra2022 = getPorra2022Details(locale)
  const coworking = getCoworkingDetails(locale)
  const sumero = getSumeroDetails(locale)

  return t.projects.items.map((item) => {
    if (item.id === 'zumex') {
      return {
        id: item.id,
        year: item.year,
        title: item.title,
        subtitle: item.subtitle,
        problem: [item.paragraphs[0], item.paragraphs[1]].filter(Boolean),
        solution: [zumex.intro, ...item.paragraphs.slice(2)],
        architecture: zumex.architecture,
        technologies: [...zumex.technologies],
        results: [...zumex.features],
        images: ZUMEX_IMAGES,
        stages: zumex.stages.map((stage) => ({
          title: stage.title,
          body: stage.body,
        })),
        liveUrl: LIVE_URLS[item.id],
      }
    }

    if (item.id === 'worldcup-2026') {
      const includes = 'includes' in item ? item.includes : []
      const scoringRows = 'scoringRows' in item ? item.scoringRows : []
      const scoringIntro = 'scoringIntro' in item ? item.scoringIntro : ''
      const scoringFooter = 'scoringFooter' in item ? item.scoringFooter : ''
      return {
        id: item.id,
        year: item.year,
        title: item.title,
        subtitle: item.subtitle,
        problem: item.paragraphs.slice(0, 2),
        solution: [
          ...item.paragraphs.slice(2),
          ...porra2026.paragraphs,
          scoringIntro,
          ...scoringRows.map((row) => `${row.prediction}: ${row.points}`),
          scoringFooter,
        ].filter(Boolean),
        architecture: porra2026.architecture,
        technologies: [...porra2026.technologies],
        results: includes ? [...includes] : [],
        images: PORRA_IMAGES,
        liveUrl: LIVE_URLS[item.id],
      }
    }

    if (item.id === 'worldcup-2022') {
      const scoringRows = 'scoringRows' in item ? item.scoringRows : []
      const scoringIntro = 'scoringIntro' in item ? item.scoringIntro : ''
      const scoringFooter = 'scoringFooter' in item ? item.scoringFooter : ''
      return {
        id: item.id,
        year: item.year,
        title: item.title,
        subtitle: item.subtitle,
        problem: item.paragraphs.slice(0, 2),
        solution: [
          porra2022.intro,
          ...item.paragraphs.slice(2),
          ...porra2022.paragraphs,
          porra2022.frontendIntro,
          scoringIntro,
          ...scoringRows.map((row) => `${row.prediction}: ${row.points}`),
          scoringFooter,
        ].filter(Boolean),
        architecture: porra2022.architecture,
        technologies: [
          ...porra2022.frontendTechnologies,
          ...porra2022.backendTechnologies,
        ],
        results: [
          ...porra2022.recalculates,
          ...porra2022.frontendDisplays,
        ],
        images: PORRA_2022_IMAGES,
        liveUrl: LIVE_URLS[item.id],
      }
    }

    if (item.id === 'coworking') {
      const includes = 'includes' in item ? item.includes : []
      const lead = 'lead' in item ? item.lead : undefined
      return {
        id: item.id,
        year: item.year,
        title: item.title,
        subtitle: item.subtitle,
        problem: [lead, item.paragraphs[0]].filter(Boolean) as string[],
        solution: [
          ...item.paragraphs.slice(1),
          ...coworking.paragraphs,
          ...coworking.midParagraphs,
        ],
        architecture: coworking.architecture,
        technologies: [
          ...coworking.frontendTechnologies,
          ...coworking.backendTechnologies,
        ],
        results: includes
          ? [...includes, ...coworking.reservationTypes]
          : [...coworking.reservationTypes],
        images: COWORKING_IMAGES,
        liveUrl: LIVE_URLS[item.id],
      }
    }

    const includes = 'includes' in item ? item.includes : []
    return {
      id: item.id,
      year: item.year,
      title: item.title,
      subtitle: item.subtitle,
      problem: item.paragraphs.slice(0, 1),
      solution: [
        ...item.paragraphs.slice(1),
        ...sumero.paragraphs,
        ...sumero.midParagraphs,
      ],
      technologies: [...sumero.technologies],
      results: includes ? [...includes, ...sumero.rules] : [...sumero.rules],
      images: SUMERO_IMAGES,
      note: 'Rework UI 2026',
      liveUrl: LIVE_URLS[item.id],
    }
  })
}
