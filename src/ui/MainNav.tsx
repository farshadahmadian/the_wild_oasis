import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media screen and (max-width: 980px) {
    flex-direction: row;
  }

  /* @media screen and (max-width: 980px) {
    flex-direction: row;
  } */
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
    @media screen and (max-width: 980px) {
      gap: 0.4rem;
    }
    @media screen and (max-width: 700px) {
      /* font-size: 1.2rem; */
      padding: 0.6rem 1.2rem;
    }

    @media screen and (max-width: 600px) {
      padding: 0.6rem 0.6rem;
      font-size: 1.2rem;
      /* gap: 0.2rem; */
    }

    @media screen and (max-width: 450px) {
      padding: 0.3rem 0.3rem;
      font-size: 1rem;
      /* gap: 0.2rem; */
    }

    @media screen and (max-width: 380px) {
      /* font-size: 1rem; */
      /* gap: 0.2rem; */
      /* padding: 0; */
      font-size: 0.8rem;
    }
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 1.8rem;
    height: 1.8rem;
    color: var(--color-grey-400);
    transition: all 0.3s;

    /* @media screen and (max-width: 730px) {
      width: 1.2rem;
      height: 1.2rem;
    } */
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/bookings">
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/cabins">
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <HiOutlineUsers />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
