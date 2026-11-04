import { createContext, useContext } from 'react'
import type { Lang } from './translations'
import { t } from './translations'

export const LangContext = createContext<Lang>('EN')

export function useLang() {
  const lang = useContext(LangContext)
  return t[lang]
}
