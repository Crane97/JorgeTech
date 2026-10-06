import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const PARAM = 'project'

type ModalState = { projectModal?: boolean } | null

/**
 * The open project modal lives in the URL (`?project=coworking`) so it can be
 * shared and the browser back button closes it.
 */
export function useProjectParam() {
  const location = useLocation()
  const navigate = useNavigate()
  const openId = new URLSearchParams(location.search).get(PARAM)

  const open = useCallback(
    (id: string) => {
      const pushedByUs = (location.state as ModalState)?.projectModal
      navigate(
        { pathname: location.pathname, search: `?${PARAM}=${encodeURIComponent(id)}` },
        // Switching between projects inside the modal replaces the entry, so
        // one Back always returns to the page.
        { replace: Boolean(openId), state: { projectModal: pushedByUs || !openId }, preventScrollReset: true },
      )
    },
    [location.pathname, location.state, navigate, openId],
  )

  const close = useCallback(() => {
    if ((location.state as ModalState)?.projectModal) {
      navigate(-1)
    } else {
      navigate({ pathname: location.pathname, search: '' }, { replace: true, preventScrollReset: true })
    }
  }, [location.pathname, location.state, navigate])

  return { openId, open, close }
}
