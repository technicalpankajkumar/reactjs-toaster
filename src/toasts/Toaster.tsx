
import { useEffect, useState } from 'react'
import { ToastType, classNameProps, styleProps } from '../types/toastTypes'
import { AlertIcon, InfoIcon, LoaderIcon, SuccessIcon, WarningIcon } from '../icons/index'
import useStyleHook from '../hooks/useStyleHook'
import * as React from 'react'

interface ToastProps {
  type: ToastType
  message: string
  className?: classNameProps
  styles?:styleProps
}

const icons = {
    success: SuccessIcon,
    error: AlertIcon,
    warning: WarningIcon,
    info: InfoIcon,
    loading: LoaderIcon
  }

export function Toaster({ type = 'success', message, className, styles }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const { backgroundColors, textColors, style, setStyles, setClassName} = useStyleHook()
  const Icon = icons[type]

  useEffect(()=>{
    setClassName(className)
    setStyles(styles)
  },[className,styles])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2900) // Slightly less than the removal time to allow for fade out

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`text-wrap text-sm max-w-72 rounded-lg px-3 py-2 shadow z-50 animate-enter mb-2 ${backgroundColors[type]}`}
      style={style.body}
    >
      <div className={`flex items-center gap-2`} style={style.contentBody}>
        <Icon className={`h-5 w-5`}  style={style.icon}/>
        <p className={`text-sm ${textColors[type]} `}style={style.message}>{message}</p>
      </div>
    </div>
  )
}
