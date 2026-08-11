import zumexScrapingImage from '../assets/scraping/3493f21e-c223-4bab-b5bf-15128c4e64e6.png'
import logoMark from '../assets/logo/JRLogoBLK.png'
import boxing01 from '../assets/boxing/1736353347650.jpeg'
import boxing02 from '../assets/boxing/1736353347722.jpeg'
import boxing03 from '../assets/boxing/1736353347754.jpeg'
import boxing04 from '../assets/boxing/1736353347793.jpeg'
import boxing05 from '../assets/boxing/1736353347838.jpeg'
import boxing06 from '../assets/boxing/1736353347842.jpeg'
import boxing07 from '../assets/boxing/1736353348083.jpeg'
import boxing08 from '../assets/boxing/1736353348124.jpeg'
import sumero01 from '../assets/sumeros/sumeros-01-inicio.jpg'
import sumero02 from '../assets/sumeros/sumeros-02-partida.jpg'
import sumero04 from '../assets/sumeros/sumeros-04-muy-dificil.jpg'
import sumero05 from '../assets/sumeros/sumeros-05-resuelto.jpg'
import sumero06 from '../assets/sumeros/sumeros-06-mobile-inicio.jpg'
import sumero07 from '../assets/sumeros/sumeros-07-mobile-partida.jpg'

export const BOXING_IMAGES = [
  boxing01,
  boxing02,
  boxing03,
  boxing04,
  boxing05,
  boxing06,
  boxing07,
  boxing08,
]

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
