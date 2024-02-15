import React from 'react'
import { Label } from './PlatformLabel.styled'

interface PlatformLabelProps {
  variant?: 'contained' | 'outlined'
  text: string
  className?: string
}

const PlatformLabel = ({variant, text, className}: PlatformLabelProps) => {
  return (
    <Label $variant={variant} className={className}>
        {text}
    </Label>
  )
}

export default PlatformLabel