import { ToastPosition } from "./types/toastTypes"

export function getPositionClasses(position: ToastPosition): string {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4'
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2'
      case 'top-right':
        return 'top-4 right-4'
      case 'middle-left':
        return 'top-1/2 left-4 transform -translate-y-1/2'
      case 'middle-center':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
      case 'middle-right':
        return 'top-1/2 right-4 transform -translate-y-1/2'
      case 'bottom-left':
        return 'bottom-4 left-4'
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2'
      case 'bottom-right':
        return 'bottom-4 right-4'
    }
  }