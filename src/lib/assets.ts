import zumexScrapingImage from '../assets/scraping/3493f21e-c223-4bab-b5bf-15128c4e64e6.png'
import logoMark from '../assets/logo/JRLogoBLK.png'

const boxingImageModules = import.meta.glob<{ default: string }>(
  '../assets/boxing/*.{jpeg,jpg,png,webp}',
  { eager: true },
)
export const BOXING_IMAGES = Object.keys(boxingImageModules)
  .sort()
  .map((key) => boxingImageModules[key].default)

const porraImageModules = import.meta.glob<{ default: string }>(
  '../assets/porra2026/*.{jpeg,jpg,png,webp}',
  { eager: true },
)
export const PORRA_IMAGES = Object.keys(porraImageModules)
  .sort()
  .map((key) => porraImageModules[key].default)

const porra2022ImageModules = import.meta.glob<{ default: string }>(
  '../assets/porra2022/*.{jpeg,jpg,png,webp}',
  { eager: true },
)
export const PORRA_2022_IMAGES = Object.keys(porra2022ImageModules)
  .sort()
  .map((key) => porra2022ImageModules[key].default)

const coworkingImageModules = import.meta.glob<{ default: string }>(
  '../assets/coworking/*.{jpeg,jpg,png,webp}',
  { eager: true },
)
export const COWORKING_IMAGES = Object.keys(coworkingImageModules)
  .sort()
  .map((key) => coworkingImageModules[key].default)

const sumeroImageModules = import.meta.glob<{ default: string }>(
  '../assets/sumeros/*.{jpeg,jpg,png,webp}',
  { eager: true },
)
export const SUMERO_IMAGES = Object.keys(sumeroImageModules)
  .sort()
  .map((key) => sumeroImageModules[key].default)

export const ZUMEX_IMAGES = [zumexScrapingImage]
export { logoMark }
