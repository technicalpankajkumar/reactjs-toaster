import * as React from 'react'
import { ToastContainer } from './ToastContainer'
import { ToastMessage, ToastPosition, ToastProps, ToastType, ToastsProps, classNameProps, styleProps } from './types/toastTypes'

interface ToastContextType {
  addToast: (toast: Omit<ToastsProps, 'id'>) => void
  removeToast: (id: string) => void
  isDarkMode?: boolean
  toggleDarkMode?: () => void
  showToast?: any,
  setClassName?: (className: classNameProps) => void,
  setStyles?: (styles: styleProps) => void,
  addToaster?: (toaster : Omit<ToastMessage, 'id'>) => void
}

export const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

const MAX_TOASTS = 12;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastsProps[]>([])
  const [toasters, setToasters] = React.useState<ToastMessage[]>([])
  const [toastModal,setToastModal] = React.useState<boolean>(false)
  const [isDarkMode, setIsDarkMode] = React.useState(false)
  const [className, setClassName] = React.useState<classNameProps>()
  const [styles, setStyles] = React.useState<styleProps>()
  const toastTimers = React.useRef(new Map<string, ReturnType<typeof setTimeout>>())

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
    const timer = toastTimers.current.get(id)
    if (timer) {
      clearTimeout(timer)
      toastTimers.current.delete(id)
    }
  }, [])

  const addToast = React.useCallback(({ type, message, duration = 3000,position = 'top-center', toastModal = false,}: Omit<ToastProps, 'id'>) => {
    const id = Math.random()?.toString(36)?.substring(2, 9)
    const newToast = { id, type, message, duration , position}

    setToasts(prev => {
      const updatedToasts = prev.length >= MAX_TOASTS 
        ? [...prev.slice(1), newToast]
        : [...prev, newToast]
      return updatedToasts
    })

    if(toastModal){
      setToastModal(true)
    }else{
      setToastModal(false)
    }

      const timer = setTimeout(() => removeToast(id), duration)
      toastTimers.current.set(id, timer)

    return id
  }, [removeToast])

  const showToast: ToastContextType['showToast'] = React.useCallback((
    type: ToastType, 
    message: string, 
    duration = 5000,
    toastModal = false,
    position:ToastPosition
  ) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = {
      id,
      type,
      message,
      duration,
      position,
      createdAt: Date.now(),
    }

    if(toastModal){
      setToastModal(true)
    }else{
      setToastModal(false)
    }

    setToasts(prev => {
      const updatedToasts = prev.length >= MAX_TOASTS 
        ? [...prev.slice(1), newToast]
        : [...prev, newToast]
      return updatedToasts
    })

      const timer = setTimeout(() => {
        removeToast(id)
      }, duration)
      toastTimers.current.set(id, timer)
  }, [removeToast])

  const addToaster = React.useCallback(({message, type, position , duration = 5000} : Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasters((prev) => [...prev, { id, message, type, position }])

    setTimeout(() => {
      setToasters((prev) => prev.filter((toast) => toast.id !== id))
    }, duration)
  }, [])

  const toggleDarkMode = React.useCallback(() => {
    setIsDarkMode(prev => !prev)
  }, [])

  React.useEffect(() => {
    return () => {
      toastTimers.current.forEach(clearTimeout)
      toastTimers.current.clear()
    }
  }, [])

  return (
    <ToastContext.Provider value={{ addToaster, addToast,showToast, removeToast, isDarkMode, toggleDarkMode,setClassName,setStyles }}>
      {children}
      <ToastContainer 
        toasts={toasts} 
        toaster={toasters}
        removeToast={removeToast} 
        isDarkMode={isDarkMode} 
        toastModal={toastModal} 
        className={className}
        styles={styles}
      />
    </ToastContext.Provider>
  )
}


export const useToastHook=()=> {
    const context = React.useContext(ToastContext);
    
    if (!context) {
      throw new Error('useToast must be used within a ToastProvider')
    }
    return context
  }

let globalAddToast: ToastContextType['addToast'] | null = null
let globalAddToaster: ToastContextType['addToaster'] | null = null

export function setGlobalAddToast(addToast: ToastContextType['addToast']) {
  globalAddToast = addToast
}
export function setGlobalAddToaster(addToaster: ToastContextType['addToaster']) {
  globalAddToaster = addToaster
}

export function toast(type: ToastType, message: string, duration?: number, position: ToastPosition = 'top-center') {
  if (typeof window !== 'undefined' && globalAddToast) {
    globalAddToast({ type, message, duration, position })
  } else {
    console.error('Toast function called before initialization or on server-side')
  }
}

export function toaster(type: ToastType, message: string, duration?: number, position: ToastPosition = 'top-center') {
  if (typeof window !== 'undefined' && globalAddToaster) {
    globalAddToaster({ type, message, duration, position })
  } else {
    console.error('Toast function called before initialization or on server-side')
  }
}
