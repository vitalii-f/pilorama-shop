'use client';

import styled from 'styled-components';

export const Settings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const SettingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SettingsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const SettingsBlockTitle = styled.h3`
  padding-bottom: 10px;
  border-bottom: 2px solid var(--color-hover-link);
`;

export const SettingsBlockContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(max-content, 400px));
  justify-content: space-between;
  gap: 30px;
`;
