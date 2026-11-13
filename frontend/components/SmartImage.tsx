'use client';

import { useEffect, useRef, useState } from 'react';

type Props = React.ImgHTMLAttributes<HTMLImageElement>;

export default function SmartImage({ className = '', onLoad, onError, ...props }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  // An empty src makes the browser re-download the current page.
  if (!props.src) return null;

  return (
    <img
      ref={ref}
      {...props}
      className={`${className} ${loaded ? 'img-loaded' : 'img-loading'}`}
      onLoad={(event) => {
        setLoaded(true);
        onLoad?.(event);
      }}
      onError={(event) => {
        setLoaded(true);
        onError?.(event);
      }}
    />
  );
}
