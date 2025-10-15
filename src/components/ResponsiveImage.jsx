import React from 'react';

// ResponsiveImage takes a `srcBase` (without extension) and tries avif -> webp -> png -> jpg
// Example srcBase: '/assets/electronics-1' will resolve to
//  /assets/electronics-1.avif, /assets/electronics-1.webp, /assets/electronics-1.png

export default function ResponsiveImage({ srcBase, alt = '', className = '' , sizes='(max-width: 768px) 100vw, 33vw'}) {
  return (
    <picture>
      <source srcSet={`${import.meta.env.BASE_URL}${srcBase}.avif`} type="image/avif" />
      <source srcSet={`${import.meta.env.BASE_URL}${srcBase}.webp`} type="image/webp" />
      <source srcSet={`${import.meta.env.BASE_URL}${srcBase}.png`} type="image/png" />
      <img src={`${import.meta.env.BASE_URL}${srcBase}.jpg`} alt={alt} className={`${className} object-cover`} sizes={sizes} style={{width:'100%'}} />
    </picture>
  );
}