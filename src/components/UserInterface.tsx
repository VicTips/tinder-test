import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { Navigate, NavLink, useOutlet } from "react-router-dom";

function UserInterface() {
  const outlet = useOutlet();
  function handleSignOut() {
    if (confirm("Are you sure you want to log out?")) {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        });
    }
  }
  return (
    <>
      {outlet || <Navigate to="/home" replace />}
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/history">History</NavLink>
      <button onClick={handleSignOut}>Sign Out</button>
    </>
  );
}

export default UserInterface;
