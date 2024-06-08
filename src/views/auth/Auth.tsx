import { useState } from "react";
import { auth } from "../../firebase/config.ts";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setUser } from "../../store/slices/usersSlice.ts";
import { useAppDispatch } from "../../store/hooks.ts";
import { onAuthStateChanged } from "firebase/auth/web-extension";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface AuthProps {
  variant: "login" | "signup";
}

const Title = styled.h1`
  font-weight: 700;
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 42px;
  line-height: 51.25px;
  text-align: center;
  margin: 0 0 7px;
`;

const Text = styled.p`
  text-align: center;
  font-family: "Epilogue", sans-serif;
  font-size: 18px;
  line-height: 26.64px;
  color: ${(props) => props.theme.colors.textSecondary};
  max-width: 322px;
  margin: 0 auto 23px;
`;

const SubmitBtn = styled.input`
  border-radius: 25px;
  color: #fefefe;
  padding: 22px;
  font-size: 18px;
  line-height: 21.96px;
  font-weight: 700;
  width: 122px;
  display: flex;
  justify-content: center;
  box-shadow: 0px 4px 30px 0px #2269fbcc;
  background: linear-gradient(99deg, #236bfe 6.69%, #0d4ed3 80.95%);
  border: none;
  margin-top: 12px;
  cursor: pointer;
  &:hover {
    filter: brightness(1.05);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  position: absolute;
  font-size: 14px;
  font-weight: 700;
  line-height: 17.08px;
  color: ${(props) => props.theme.colors.label};
  top: 12px;
  left: 16px;
  opacity: 60%;
`;

const InputField = styled.input`
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 34px 16px 11px;
  border-radius: 18px;
  font-size: 18px;
  line-height: 21.96px;
  color: ${(props) => props.theme.colors.textPrimary};
  margin-bottom: 10px;
  &:focus {
    outline: none;
  }
`;

const Container = styled.div`
  width: 330px;
  margin: 0 auto;
  @media (max-width: 400px) {
    width: 95%;
    max-width: 330px;
  }
`;

const FormFooter = styled.p`
  font-size: 15px;
  text-align: center;
  margin: 26px 0 0;
  padding-top: 18px;
  color: ${(props) => props.theme.colors.textSecondary};
  border-top: 1px solid ${(props) => props.theme.colors.textSecondary80};
`;

const StyledLink = styled(Link)`
  color: #1a5be1;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

function Auth(props: AuthProps) {
  const dispatch = useAppDispatch();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const isLogin = props.variant === "login";

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({ id: user.uid, email: user.email }));
    } else {
      dispatch(setUser({ id: null, email: null }));
    }
  });

  function handleCredentials(e: React.ChangeEvent<HTMLInputElement>) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    isLogin
      ? signInWithEmailAndPassword(
          auth,
          userCredentials.email,
          userCredentials.password
        )
          .then((userCredential) => {
            const resp = userCredential.user;
            console.log(resp); //Pending
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage); //Pending
          })
      : createUserWithEmailAndPassword(
          auth,
          userCredentials.email,
          userCredentials.password
        )
          .then((userCredential) => {
            const resp = userCredential.user;
            console.log(resp); //Pending
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage); //Pending
          });
  }

  return (
    <Container>
      <Title>Welcome</Title>
      <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <FormGroup>
          <Label htmlFor="email">User</Label>
          <InputField
            id="email"
            onChange={(e) => {
              handleCredentials(e);
            }}
            type="email"
            name="email"
            placeholder="sample@email.com"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="pwd">Password</Label>
          <InputField
            id="pwd"
            onChange={(e) => {
              handleCredentials(e);
            }}
            type="password"
            name="password"
            placeholder="******"
            required
          />
        </FormGroup>
        {/* Pending */}
        {isLogin && <Link to="/forgotpw">Forgot your password?</Link>}
        <SubmitBtn type="submit" value={isLogin ? "Login" : "Sign Up"} />
      </Form>
      {isLogin ? (
        <FormFooter>
          Don't have an account yet?
          <br />
          <StyledLink to="/signup">Create one here!</StyledLink>
        </FormFooter>
      ) : (
        <FormFooter>
          Already have an account?
          <br />
          <StyledLink to="/login">Login here!</StyledLink>
        </FormFooter>
      )}
    </Container>
  );
}

export default Auth;
