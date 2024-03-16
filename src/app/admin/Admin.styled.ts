'use client';

import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
`;

export const AdminAside = styled.aside`
  min-height: calc(100vh - var(--navbar-height));

  max-width: 70px;
  width: 100%;

  background-color: #1c2536;
  padding: 10px 0px 10px 10px;

  z-index: 1;
`;
