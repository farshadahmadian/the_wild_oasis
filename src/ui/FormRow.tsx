import { FieldErrors } from "react-hook-form";
import styled from "styled-components";

export const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const StyledError = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

type ErrorPropsType = {
  // errors: { [key: string]: { message: string } };
  errors: FieldErrors;
  label: string;
};

function Error({ errors, label }: ErrorPropsType) {
  console.log(errors);
  if (!errors || !Object.keys(errors).length || !errors?.[label]) {
    return null;
  }

  return errors?.[label]?.message &&
    typeof errors[label].message === "string" ? (
    <StyledError>{errors[label]?.message}</StyledError>
  ) : (
    <StyledError>Invalid input</StyledError>
  );
}

type FormRowPropsType = {
  children: JSX.Element;
  errors: FieldErrors;
  label?: string;
};

function FormRow({ children, errors, label = "" }: FormRowPropsType) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      <Error errors={errors} label={children.props.id} />
    </StyledFormRow>
  );
}

export default FormRow;
