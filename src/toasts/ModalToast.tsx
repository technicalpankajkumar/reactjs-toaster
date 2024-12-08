import * as React from 'react'
import { AlertIcon, SuccessIcon, WarningIcon , LoaderIcon, InfoIcon} from '../icons/index'
import { ToastProps } from '../types/toastTypes'
import useStyleHook from '../hooks/useStyleHook'
import { useProgressBarHook } from '../hooks/useProgressBarHook'


const icons = {
  success: SuccessIcon,
  error: AlertIcon,
  warning: WarningIcon,
  info: InfoIcon,
  loading: LoaderIcon
}

export function ToastModal({ 
  type, 
  message, 
  onClose, 
  duration = 5000 ,
  styles,
  className,
}: ToastProps) {
  const toastRef = React.useRef<HTMLDivElement>(null)
  const { backgroundColors, textColors, progressColors, style, setStyles, setClassName } = useStyleHook()
  const Icon = icons[type]
  let startWidth="0%";
  let endWidth = "100%"

  React.useEffect(()=>{
    setClassName(className)
    setStyles(styles)
  },[className])

  
  const progressRef  = useProgressBarHook({duration, type , startWidth,endWidth})
  
  const buttonText = {
    success: 'OKAY',
    error: 'TRY AGAIN',
    warning: 'ACKNOWLEDGE',
    info: 'GOT IT',
    loading: 'PLEASE WAIT ...'
  }

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black/50 animate-in fade-in duration-200 ${backgroundColors[type]}`} style={style.body}>
      <div
        ref={toastRef}
        className={`min-w-96 rounded-lg bg-white p-4 shadow-lg flex flex-col items-center text-center gap-2 animate-in slide-in-from-bottom-4 duration-300`}
        style={style.contentBody}
      >
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full
            
          `}
          style={style.iconBody}
        >
          <Icon 
            className={`h-6 w-6
              ${textColors[type]}
              ${type === 'loading' && "animate-spin"}
            `} 
            style={style.icon}
          />
        </div>
       <div style={style.messageBody}>
       <p className={`text-sm text-gray-600 ${textColors[type]}`} style={style.message}>{message}</p>
       </div>
       <div className='w-full' style={style.closeBtnBody}>
       <button
          onClick={onClose}
          className={`mt-2 w-full px-4 py-2 rounded-md text-white transition-colors 
            ${progressColors[type]}`}
          disabled={type === 'loading'}
          style={style.closeBtn}
        >
          {buttonText[type]}
        </button>
       </div>
        <div className={`h-1 w-full ${backgroundColors[type]}`} style={style.progressBody}>
          <div
            ref={progressRef}
            className={`h-full w-full ${progressColors[type]}`}
            style={style.progress}
          />
        </div>
      </div>
    </div>
  )
}

