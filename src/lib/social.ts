import { Mail } from 'lucide-react'
import type { ComponentType } from 'react'
import { InstagramIcon, LinkedInIcon, type IconProps } from '../components/SocialIcons'

export const CONTACT_EMAIL = 'jorge@macdiego.com'

/** WhatsApp number in international format, digits only (+34 682 658 759). */
export const WHATSAPP_NUMBER = '34682658759'

/** wa.me link that opens a chat with a prefilled message. */
export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const SOCIAL_LINKS: {
  key: 'instagram' | 'email' | 'linkedin'
  href: string
  display: string
  Icon: ComponentType<IconProps>
}[] = [
  {
    key: 'instagram',
    href: 'https://instagram.com/jorgerdelat',
    display: '@jorgerdelat',
    Icon: InstagramIcon,
  },
  {
    key: 'email',
    href: `mailto:${CONTACT_EMAIL}`,
    display: CONTACT_EMAIL,
    Icon: Mail,
  },
  {
    key: 'linkedin',
    href: 'https://www.linkedin.com/in/jorgerdelat',
    display: 'LinkedIn',
    Icon: LinkedInIcon,
  },
]
