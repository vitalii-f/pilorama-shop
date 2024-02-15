'use client'

import styled from "styled-components";

interface StyledProps {
    $variant?: 'contained' | 'outlined'
}

export const Label = styled.label<StyledProps>`
    display: flex;
    align-items: center;
    justify-content: center;
  
    width: 32px;
    height: 16px;
  
    border-radius: 2px;
    border: 1px solid #000000;
  
    font-weight: 400;
    line-height: normal;
    text-transform: uppercase;
    font-size: 12px;
    z-index: 1;

    background-color: ${props => props.$variant === ('contained' || undefined) ? '#ffffff' : 'var(--color-dark-grey)'};
    color: ${props => props.$variant === ('contained' || undefined) ? '#000000;' : 'var(--color-secondary)'}
`