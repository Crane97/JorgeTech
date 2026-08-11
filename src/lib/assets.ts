import zumexScrapingImage from '../assets/scraping/3493f21e-c223-4bab-b5bf-15128c4e64e6.png'
import logoMark from '../assets/logo/JRLogoBLK.png'
import sumero01 from '../assets/sumeros/sumeros-01-inicio.jpg'
import sumero02 from '../assets/sumeros/sumeros-02-partida.jpg'
import sumero04 from '../assets/sumeros/sumeros-04-muy-dificil.jpg'
import sumero05 from '../assets/sumeros/sumeros-05-resuelto.jpg'
import sumero06 from '../assets/sumeros/sumeros-06-mobile-inicio.jpg'
import sumero07 from '../assets/sumeros/sumeros-07-mobile-partida.jpg'

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

export const SUMERO_IMAGES = [
  sumero01,
  sumero02,
  sumero04,
  sumero05,
  sumero06,
  sumero07,
]

export const ZUMEX_IMAGES = [zumexScrapingImage]
export { logoMark }
