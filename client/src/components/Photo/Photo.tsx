// components/Photo.tsx
import React from 'react';
import './Photo.css';

interface PhotoProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  zoomOnHover?: boolean;
  onClick?: () => void;
}

const Photo: React.FC<PhotoProps> = ({
  src,
  alt = '',
  width = 240,
  height = 160,
  zoomOnHover = true,
  onClick,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`photo ${zoomOnHover ? 'hover-zoom' : ''}`}
      style={{ width, height }}
      onClick={onClick}
    />
  );
};

export default Photo;
