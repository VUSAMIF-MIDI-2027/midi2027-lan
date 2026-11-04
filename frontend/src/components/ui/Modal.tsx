import { useEffect, useRef, type ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
  labelledBy: string
  onClose: () => void
  wide?: boolean
}

/** Native dialog provides focus containment, Escape handling, and background inertness. */
export default function Modal({ children, labelledBy, onClose, wide = false }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className={`register-modal ${wide ? 'register-modal--wide' : ''}`}
      aria-labelledby={labelledBy}
      onCancel={event => { event.preventDefault(); onClose() }}
      onClick={event => {
        if (event.target !== event.currentTarget) return
        const bounds = event.currentTarget.getBoundingClientRect()
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose()
      }}
    >
      {children}
    </dialog>
  )
}
