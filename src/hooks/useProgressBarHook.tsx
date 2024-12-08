

import { useEffect, useRef } from 'react';
import { ProgressBarProps } from './hookTypes';


export const useProgressBarHook = ({duration, type, startWidth = "100%",endWidth="0%"}:ProgressBarProps) => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.transition = `width ${duration}ms linear`
      progressRef.current.style.width = startWidth ;
      
      progressRef.current.getBoundingClientRect()
      
      window.requestAnimationFrame(() => {
        if (progressRef.current) {
          progressRef.current.style.width = endWidth;
        }
      })
    }
  }, [duration, type, startWidth, endWidth])

  return progressRef;
};