import type { CSSProperties } from 'react'
export const wrap: CSSProperties = { width: 'min(1000px, calc(100% - 48px))', marginInline: 'auto' }

export const h2: CSSProperties = {
  margin: '0 0 40px',
  fontWeight: 800,
  fontSize: 'clamp(38px, 5vw, 56px)',
  lineHeight: 1,
  color: '#eef4ff',
}
