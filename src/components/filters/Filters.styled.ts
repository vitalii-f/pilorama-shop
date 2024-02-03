'use client'

import styled from "styled-components"

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 30px;

    margin-top: 30px;
`

export const SubmitButton = styled.button`
    width: 100%;
    height: 30px;

    border-radius: 5px;
    background-color: var(--color-primary);
    cursor: pointer;
`

export const Label = styled.label`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const BudgeteInput = styled.input`
    text-align: center;

    width: 70px;
    height: 30px;

    border: unset;
    border-radius: 5px;
    background-color: var(--color-primary);
`

export const BudgeteInputs = styled.div`
    display: flex;
    /* gap: 10px; */
    justify-content: space-between;
`

export const CheckboxContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const CheckboxLabel = styled.label`
    display: flex;
    justify-content: space-between;
    align-items: center;

    transition: background-color 0.3s;

    &:has(input:checked) {
        background-color: var(--color-primary);
    }

    height: 30px;
    padding: 0 5px;
    border-radius: 5px;

    cursor: pointer;
`

export const StyledCheckbox = styled.input`

`