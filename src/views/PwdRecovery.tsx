import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import Swal from "sweetalert2";

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
  padding: 22px 38px;
  font-size: 18px;
  line-height: 21.96px;
  font-weight: 700;
  width: fit-content;
  display: flex;
  justify-content: center;
  box-shadow: 0px 4px 30px 0px #2269fbcc;
  background: linear-gradient(99deg, #236bfe 6.69%, #0d4ed3 80.95%);
  border: none;
  margin: 12px auto 0;
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
  background-color: ${(props) => props.theme.colors.bgInput};
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
`;

const StyledLink = styled(Link)`
  color: #1a5be1;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }
`;

function PwdRecovery() {
  const [email, setEmail] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Email sent!",
          showConfirmButton: false,
          timer: 2000,
          allowEscapeKey: true,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: `${error.code}`,
          showConfirmButton: false,
          timer: 4000,
          allowEscapeKey: true,
        });
      });
  }

  return (
    <Container>
      <Title>Reset Password</Title>
      <Text>
        Please enter the email address you'd like your password reset
        information sent to
      </Text>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <FormGroup>
          <Label htmlFor="email">User</Label>
          <InputField
            id="email"
            onChange={(e) => {
              handleChange(e);
            }}
            type="email"
            name="email"
            placeholder="sample@email.com"
            required
          />
        </FormGroup>
        <SubmitBtn type="submit" value="Reset Password" />
      </Form>
      <FormFooter>
        <StyledLink to="/login">Back to Login</StyledLink>
      </FormFooter>
    </Container>
  );
}
export default PwdRecovery;
