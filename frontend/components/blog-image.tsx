'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ImageIcon } from 'lucide-react'

interface BlogImageProps {
  src: string
  alt: string
  className?: string
  sizes?: string
}

export function BlogImage({ src, alt, className = '', sizes = '100vw' }: BlogImageProps) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-secondary ${className}`}>
        <ImageIcon className="w-8 h-8 text-muted-foreground/40" />
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      onError={() => setError(true)}
    />
  )
}