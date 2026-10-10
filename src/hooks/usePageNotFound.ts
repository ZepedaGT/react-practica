import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function usePageNotFound() {
  const { pathname, search } = useLocation();
  const lastWarnedLocation = useRef<string | null>(null);

  useEffect(() => {
    const location = `${pathname}${search}`;
    if (lastWarnedLocation.current === location) return;

    lastWarnedLocation.current = location;
    console.warn(`No se encontró la ruta: ${pathname}${search}`);
  }, [pathname, search]);
}