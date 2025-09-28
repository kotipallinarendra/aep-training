import React from 'react';

// ResponsiveImage takes a `srcBase` (without extension) and tries avif -> webp -> png -> jpg
// Example srcBase: '/assets/electronics-1' will resolve to
//  /assets/electronics-1.avif, /assets/electronics-1.webp, /assets/electronics-1.png

export default function ResponsiveImage({ srcBase, alt = '', className = '' , sizes='(max-width: 768px) 100vw, 33vw'}) {
  return (
    <picture>
      <source srcSet={`${srcBase}.avif`} type="image/avif" />
      <source srcSet={`${srcBase}.webp`} type="image/webp" />
      <source srcSet={`${srcBase}.png`} type="image/png" />
      <img src={`${srcBase}.jpg`} alt={alt} className={className} sizes={sizes} style={{width:'100%',height:'250px'}} />
    </picture>
  );
}