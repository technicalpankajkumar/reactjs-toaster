import * as React from 'react'
import { AlertIcon, SuccessIcon, WarningIcon , LoaderIcon, InfoIcon, CrossIcon} from '../icons/index'
import useStyleHook from '../hooks/useStyleHook'
import { ToastProps } from '../types/toastTypes'
import { useProgressBarHook } from '../hooks/useProgressBarHook'

const icons = {
  success: SuccessIcon,
  error: AlertIcon,
  warning: WarningIcon,
  info: InfoIcon,
  loading: LoaderIcon
}

export function Toast({ 
  type, 
  message, 
  duration = 5000,
  onClose,
  isDarkMode,
  styles,
  className,
}: ToastProps) {
  const { backgroundColors, textColors, progressColors ,style, setStyles, setClassName} = useStyleHook()
  const Icon = icons[type]

  React.useEffect(()=>{
    setClassName(className)
    setStyles(styles)
  },[className])

  const progressRef  = useProgressBarHook({duration, type})

  return (
    <div className={`relative w-full max-w-sm overflow-hidden rounded-lg shadow-lg duration-300 z-50
      ${isDarkMode ? "bg-red-800 text-white" : "bg-white text-gray-900"}
    `} style={style.body}>
      <div className="flex items-start gap-3 p-4" style={style.contentBody}>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${backgroundColors[type]}`}
          style={style.iconBody}
        >
          <Icon 
            className={`
              h-4 w-4 
              ${isDarkMode ? "text-white" : progressColors[type],
              type === 'loading' && "animate-spin"}
            `} 
            style={style.iconBody}
          />
        </div>
        <div className="flex-1 min-w-0" style={style.messageBody}>
          <p className={`mt-1 text-sm max-w-48 text-wrap ${textColors[type]} ${ isDarkMode ? "text-gray-300" : "text-gray-500"}`} style={style.message}>
            {message}
          </p>
        </div>
          <button
            onClick={onClose}
            className={`text-gray-400 hover:text-gray-600 ${isDarkMode && "hover:text-gray-300"}`}
            style={style.closeBtnBody}
          > 
            <CrossIcon className="h-5 w-5" style={style.closeBtnIcon}/>
            <span className="sr-only" style={style.closeBtn}>Close</span>
          </button>
      </div>
        <div className={`h-1 w-full ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`} style={style.progressBody}>
          <div
            ref={progressRef}
            className={`h-full w-full ${progressColors[type]}`}
            style={style.progress}
          />
        </div>
    </div>
  )
}

