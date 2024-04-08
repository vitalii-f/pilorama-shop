import { ReactNode } from 'react';
import { Wrapper } from './Login.styled';
import Image from 'next/image';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Wrapper>
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: '-1',
        }}
      >
        <Image src='/auth_background.png' alt='game charecters' fill priority />
      </div>
      {children}
    </Wrapper>
  );
};

export default AuthLayout;
