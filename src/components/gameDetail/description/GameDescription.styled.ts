'use client';

import styled from 'styled-components';

export const DescriptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

export const ListItem = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h4`
  color: var(--color-secondary);
  font-size: 10px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export const Text = styled.p`
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
`;
