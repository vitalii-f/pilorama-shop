'use client'

import styled from "styled-components"

interface StyledProps {
    $isActive?: 'active' | 'unactive'
}

export const NavLinks = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const NavLink = styled.li<StyledProps>`
    display: flex;
    align-items: center;

    width: 100%;

    padding: 0 5px;

    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    

    transition: background-color 0.3s;

    background-color: ${props => props.$isActive === 'active' ? 'var(--color-dark-grey)' : undefined};
    &:hover {
        background-color: var(--color-dark-grey);
    }

    a {
        padding: 5px 0;
        width: 100%;
    }
`