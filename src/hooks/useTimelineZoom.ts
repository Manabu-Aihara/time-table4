import { useState, useCallback } from 'react';

export const useTimelineZoom = (initialZoom: number, minZoom: number, maxZoom: number) => {
  const [zoom, setZoom] = useState(initialZoom);

  const zoomIn = useCallback(() => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, maxZoom));
  }, [maxZoom]);

  const zoomOut = useCallback(() => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, minZoom));
  }, [minZoom]);

  return { zoom, zoomIn, zoomOut, setZoom };
};
