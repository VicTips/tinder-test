import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { Navigate, NavLink, useOutlet } from "react-router-dom";
import Swal from "sweetalert2";

function UserInterface() {
  const outlet = useOutlet();
  function handleSignOut() {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1A5BE1",
      cancelButtonColor: "#D36060",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth)
          .then(() => {
            Swal.fire({
              title: "You're out!",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
              allowEscapeKey: true,
            });
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              title: "Oops!",
              text: "Something went wriong, Please try again.",
              icon: "error",
              showConfirmButton: false,
              timer: 4000,
              allowEscapeKey: true,
            });
          });
      }
    });
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
