import React from 'react';
// Next image optimization is outside this isolated component fixture.
export default function Image({ src, alt, fill, priority, ...props }) {
  // eslint-disable-next-line @next/next/no-img-element -- Isolated replacement for next/image in browser tests.
  return <img src={src} alt={alt} {...props} data-fill={fill || undefined} data-priority={priority || undefined} />;
}
