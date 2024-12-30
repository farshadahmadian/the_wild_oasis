import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

const HeaderLogo = styled.img`
  width: 4.2rem;
  height: auto;
  display: none;

  @media screen and (max-width: 980px) {
    display: block;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <HeaderLogo src="/logo-light.png" alt="logo" />
    </StyledHeader>
  );
}

export default Header;
