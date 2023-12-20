'use client'

import { useState, useEffect } from 'react'

export function TrackImage({
  src,
  alt = '',
  className = ''
}: {
  src: string,
  alt?: string,
  className?: string
}) {
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    setIsError(false)
  }, [src])

  return (
    <img 
      src={isError ? '/img/cover/default.jpg' : src}
      width={250}
      height={250}
      onError={() => setIsError(true)}
      className={className}
      alt={alt}
    />
  )
}
