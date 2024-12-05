import { CSSProperties } from "react";

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';
export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center' | 'middle-left' | 'middle-center' | 'middle-right';

export interface ToastProps {
  id: string
  type: ToastType
  message: string
  duration?: number
  onClose?: () => void
  position?: ToastPosition,
  toastModal?:boolean,
  isDarkMode?: boolean,
  styles?:styleProps
  className?: classNameProps,
}

export interface ToastsProps {
  id: string
  type: ToastType
  message: string
  duration?: number
  onClose?: () => void
  position: ToastPosition,
}

export interface ToastMessage {
  id: string
  message: string
  type: ToastType
  position: ToastPosition
  duration?:number
}

export interface styleProps {
  body?:CSSProperties,
  contentBody?:CSSProperties,
  iconBody?:CSSProperties,
  icon?:CSSProperties,
  messageBody?:CSSProperties,
  message?:CSSProperties,
  closeBtnBody?:CSSProperties,
  closeBtnIcon?:CSSProperties,
  closeBtn?:CSSProperties,
  progressBody?:CSSProperties,
  progress?:CSSProperties
}

export interface classNameProps {
  successBgClass?:string,
  errorBgClass?:string,
  warningBgClass?:string,
  infoBgClass?:string,
  loadingBgClass?:string,

  successProgClass?:string,
  errorProgClass?:string,
  warningProgClass?:string,
  infoProgClass?:string,
  loadingProgClass?:string,
  
  successTextClass?:string,
  errorTextClass?:string,
  warningTextClass?:string,
  infoTextClass?:string,
  loadingTextClass?:string,
}
