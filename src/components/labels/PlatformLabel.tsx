import React from 'react'
import styles from './styles.module.css'

interface PlatformLabelProps {
  variant?: 'contained' | 'outlined'
  text: string
  className?: string
}

const PlatformLabel = ({variant, text, className}: PlatformLabelProps) => {
  return (
    <div className={`${className} ${styles.label} ${variant ? styles[`label-${variant}`] : undefined}`}>
        {text}
    </div>
  )
}

export default PlatformLabel