import { useState } from "react";
import { auth } from "../../firebase/config.ts";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

type Props = {
  variant: "login" | "signup";
};

function Auth(props: Props) {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  function handleCredentials(e: React.ChangeEvent<HTMLInputElement>) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    props.variant === "login"
      ? signInWithEmailAndPassword(
          auth,
          userCredentials.email,
          userCredentials.password
        )
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user); //Pending
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
            const user = userCredential.user;
            console.log(user); //Pending
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage); //Pending
          });
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => {
            handleCredentials(e);
          }}
          type="email"
          name="email"
          placeholder="Email..."
        />
        <input
          onChange={(e) => {
            handleCredentials(e);
          }}
          type="password"
          name="password"
          placeholder="Password..."
        />
        <input
          type="submit"
          value={props.variant === "login" ? "Login" : "Sign Up"}
        />
      </form>
    </>
  );
}

export default Auth;
