import styled, { css } from "styled-components";

type FormType = {
  $type?: "modal" | "regular";
};

const Form = styled.form<FormType>`
  ${props =>
    props.$type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${props =>
    props.$type === "modal" &&
    css`
      /* max-width: 80rem; */
    `}
    
  /* overflow: hidden; */
  font-size: 1.4rem;

  /* @media screen and (max-width: 500px) { */
  padding: 2.4rem 1.2rem;
  /* } */
`;

Form.defaultProps = {
  $type: "regular",
};

export default Form;
