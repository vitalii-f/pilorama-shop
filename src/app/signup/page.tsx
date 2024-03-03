import { signup } from './actions';
import {
  Form,
  FormButtons,
  Wrapper,
  Input,
  Label,
  FormContainer,
  LoginButton,
  Login,
} from './Signup.styled';

const SignupPage = () => {
  return (
    <Wrapper>
      <FormContainer>
        <Form>
          <Label>
            Email:
            <Input id='email' name='email' type='email' required />
          </Label>
          <Label>
            Login:
            <Input id='login' name='login' type='text' required />
          </Label>
          <Label>
            Password:
            <Input id='password' name='password' type='password' required />
          </Label>
          <FormButtons>
            <LoginButton formAction={signup}>Sign up</LoginButton>
          </FormButtons>
          <p>
            You have account? <Login href='/login'>Login</Login>
          </p>
        </Form>
      </FormContainer>
    </Wrapper>
  );
};

export default SignupPage;
