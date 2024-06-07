import { useState } from "react";
import { auth } from "../../firebase/config.ts";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setUser } from "../../store/slices/usersSlice.ts";
import { useAppDispatch } from "../../store/hooks.ts";
import { onAuthStateChanged } from "firebase/auth/web-extension";

interface AuthProps {
  variant: "login" | "signup";
}

function Auth(props: AuthProps) {
  const dispatch = useAppDispatch();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

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

    props.variant === "login"
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
