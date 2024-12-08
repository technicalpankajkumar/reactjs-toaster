
import { ToastMessage, ToastPosition, ToastsProps, classNameProps, styleProps } from './types/toastTypes'
import { getPositionClasses } from './getPositionClasses'
import { Toast } from './toasts/Toast'
import { ToastModal } from './toasts/ModalToast'
import { Toaster } from './toasts/Toaster'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion';

interface ToastContainerProps {
  toasts: ToastsProps[]
  removeToast: (id: string) => void
  toastModal: boolean,
  styles?: styleProps,
  className?: classNameProps
  toaster?: ToastMessage[]
}

export function ToastContainer({ toasts,toaster, removeToast, toastModal , styles, className }: ToastContainerProps) {
  const groupedToasts = toasts?.reduce((acc, toast) => {
    if (!acc[toast?.position]) {
      acc[toast?.position] = []
    }
    acc[toast?.position].push(toast)
    return acc
  }, {} as Record<ToastPosition, ToastsProps[]>)

  return (
    <>
    {
      ReactDOM.createPortal( <div className='fixed top-0 left-0 right-0 z-50'>
        {['top-left', 'top-center', 'top-right', 'middle-left', 'middle-center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'].map((position) => (
          <div key={position} className={`fixed z-50 bg-transparent ${getPositionClasses(position as ToastPosition)}`}>
             <AnimatePresence initial={false}>
            {toaster?.filter((toast) => toast.position === position)
              ?.map((toast) => (
                <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <Toaster key={toast.id} type={toast.type} message={toast.message} className={className} styles={styles} />
              </motion.div>
              ))}
              </AnimatePresence>
          </div>
        ))}
        {
          !toastModal ? Object.entries(groupedToasts).map(([position, positionToasts]) => (
          <div key={position} className={`fixed z-50 flex flex-col gap-2 ${getPositionClasses(position as ToastPosition)}`}>
            <AnimatePresence initial={false}>
            {positionToasts?.map((toast) => (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <Toast
                  key={toast.id}
                  id={toast.id}
                  type={toast.type}
                  message={toast.message}
                  duration={toast.duration}
                  onClose={() => removeToast(toast.id)}
                  styles={styles}
                  className={className}
                />
                </motion.div>
            ))}
            </AnimatePresence>
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
  
      </div>, document.body)
    }
    </>
    
  )
}

