import styled from "styled-components";

const StyledSidebar = styled.aside`
  padding: 3.2rem 2.4rem;
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);
  grid-column: 1;
  grid-row: 1 / -1;
`;

function Sidebar() {
  return <StyledSidebar>sidebar</StyledSidebar>;
}

export default Sidebar;
