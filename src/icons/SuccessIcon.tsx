import * as React from 'react';
import { IconProps } from './IconTypes';

 export const SuccessIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  bgColor = 'transparent',
  strokeWidth = 2,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="11" fill={bgColor} stroke={color} strokeWidth={strokeWidth} />
      <path
        d="M7 13l3 3 7-7"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};


