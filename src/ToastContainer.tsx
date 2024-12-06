
import { ToastMessage, ToastPosition, ToastsProps, classNameProps, styleProps } from './types/toastTypes'
import { getPositionClasses } from './getPositionClasses'
import { Toast } from './toasts/Toast'
import { ToastModal } from './toasts/ModalToast'
import { Toaster } from './toasts/Toaster'
import * as React from 'react'

interface ToastContainerProps {
  toasts: ToastsProps[]
  removeToast: (id: string) => void
  isDarkMode: boolean
  toastModal: boolean,
  styles?: styleProps,
  className?: classNameProps
  toaster?: ToastMessage[]
}

export function ToastContainer({ toasts,toaster, removeToast, isDarkMode, toastModal , styles, className }: ToastContainerProps) {
  const groupedToasts = toasts?.reduce((acc, toast) => {
    if (!acc[toast?.position]) {
      acc[toast?.position] = []
    }
    acc[toast?.position].push(toast)
    return acc
  }, {} as Record<ToastPosition, ToastsProps[]>)

  return (
    <div>
      {['top-left', 'top-center', 'top-right', 'middle-left', 'middle-center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'].map((position) => (
        <div key={position} className={`fixed z-50 bg-white ${getPositionClasses(position as ToastPosition)}`}>
          {toaster?.filter((toast) => toast.position === position)
            ?.map((toast) => (
              <Toaster key={toast.id} type={toast.type} message={toast.message} className={className} styles={styles} />
            ))}
        </div>
      ))}
      {
        !toastModal ? Object.entries(groupedToasts).map(([position, positionToasts]) => (
        <div key={position} className={`fixed z-50 flex flex-col gap-2 ${getPositionClasses(position as ToastPosition)}`}>
          {positionToasts?.map((toast) => (
              <Toast
                key={toast.id}
                id={toast.id}
                type={toast.type}
                message={toast.message}
                duration={toast.duration}
                onClose={() => removeToast(toast.id)}
                isDarkMode={isDarkMode}
                styles={styles}
                className={className}
              />
          ))}
        </div>))
          :
          <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map((toast) => (

            <ToastModal
              key={toast.id}
              id={toast.id}
              type={toast.type}
              message={toast.message}
              duration={toast.duration}
              onClose={() => removeToast(toast.id)}
              styles={styles}
              className={className}
            />
          ))
        }</div>
      }

    </div>
  )
}

