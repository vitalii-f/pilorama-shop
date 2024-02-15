import React from 'react';
import { login } from './actions';
import {
  Form,
  FormButtons,
  Wrapper,
  Input,
  Label,
  FormContainer,
  LoginButton,
  Signup,
} from './Login.styled';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <Wrapper>
      <FormContainer>
        <Form>
          <Label htmlFor='email'>
            Email:
            <Input id='email' name='email' type='email' required />
          </Label>
          <Label htmlFor='password'>
            Password:
            <Input id='password' name='password' type='password' required />
          </Label>
          <FormButtons>
            <LoginButton formAction={login}>Log in</LoginButton>
          </FormButtons>
          <p>
            Don`t have account? <Signup href='/signup'>Sign up</Signup>
          </p>
        </Form>
      </FormContainer>
    </Wrapper>
  );
};

export default LoginPage;
