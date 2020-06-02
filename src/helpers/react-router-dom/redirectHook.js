import { useContext } from 'react'
import RedirectContext from './redirectContext'

export default function useRedirect() {
  return useContext(RedirectContext)
}
