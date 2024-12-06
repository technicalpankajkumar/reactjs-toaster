

import { useEffect, useRef } from 'react';
import { ProgressBarProps } from './hookTypes';


export const useProgressBarHook = ({duration, type, startWidth,endWidth}:ProgressBarProps) => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.transition = `width ${duration}ms linear`
      progressRef.current.style.width = startWidth || '100%'
      
      progressRef.current.getBoundingClientRect()
      
      requestAnimationFrame(() => {
        if (progressRef.current) {
          progressRef.current.style.width = endWidth || '0%'
        }
      })
    }
  }, [duration, type , startWidth,endWidth])

  return progressRef;
};