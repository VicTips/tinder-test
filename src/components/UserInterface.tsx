import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { Navigate, NavLink, useOutlet } from "react-router-dom";
import Swal from "sweetalert2";
import HomeIcon from "./icons/HomeIcon";
import SignOutIcon from "./icons/SignOutIcon";
import HistoryIcon from "./icons/HistoryIcon";
import styled from "styled-components";

const SignOutBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  width: 59px;
  aspect-ratio: 1/1;
  border-radius: 16px;
  background-color: transparent;
  color: #777777;
  &:hover {
    background-color: ${(props) => props.theme.colors.bgMenuBtn};
    color: ${(props) => props.theme.colors.icon};
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 59px;
  aspect-ratio: 1/1;
  border-radius: 16px;
  background-color: transparent;
  color: #777777;
  &:hover {
    background-color: ${(props) => props.theme.colors.bgMenuBtn};
    color: ${(props) => props.theme.colors.icon};
  }
  &.active {
    background-color: ${(props) => props.theme.colors.bgMenuBtn};
    color: ${(props) => props.theme.colors.icon};
  }
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.bgNavBar};
  padding: 13px 12px;
  border-radius: 24px;
  max-width: 347px;
  width: 80%;
  position: sticky;
  bottom: 20px;
  margin: 0 auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
`;

const UserInterface = () => {
  const outlet = useOutlet();
  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
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
  };
  return (
    <Container>
      {outlet || <Navigate to="/home" replace />}
      <NavBar>
        <StyledNavLink to="/home">
          <HomeIcon />
        </StyledNavLink>
        <StyledNavLink to="/history">
          <HistoryIcon />
        </StyledNavLink>
        <SignOutBtn onClick={handleSignOut}>
          <SignOutIcon />
        </SignOutBtn>
      </NavBar>
    </Container>
  );
};

export default UserInterface;
