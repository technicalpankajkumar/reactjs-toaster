import { IconProps } from './IconTypes';
import * as React from 'react';

export const LoaderIcon: React.FC<IconProps> = ({
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
      className={`animate-spin ${className}`}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={bgColor}
        strokeWidth={strokeWidth}
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
};

