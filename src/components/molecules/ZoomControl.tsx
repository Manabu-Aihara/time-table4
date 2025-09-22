import React from 'react';

interface ZoomControlProps {
  zoomIn: () => void;
  zoomOut: () => void;
}

export const ZoomControl: React.FC<ZoomControlProps> = ({ zoomIn, zoomOut }) => {
  return (
    <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 100 }}>
      <button onClick={zoomOut}>-</button>
      <button onClick={zoomIn}>+</button>
    </div>
  );
};
