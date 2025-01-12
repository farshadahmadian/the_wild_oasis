import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { HiOutlineX } from "react-icons/hi";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  width: 80%;
  max-width: 1400px;

  @media screen and (max-width: 980px) {
    width: 90%;
  }

  @media screen and (max-width: 500px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
  overflow: auto;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

type ModalPropsType = {
  children: ReactNode;
  onClose: () => void;
};

function Modal({ children, onClose }: ModalPropsType) {
  /* 
    using createPortal(), the component maintains its position
    in React Elemenet Tree, but its position in DOM Element Tree
    will change to the 2nd argument of createPortal()

    Can be used if the Modal component is used as a child of another Parent 
    component where an overflow: hidden CSS rule might affect the 
    Modal component
  */
  return createPortal(
    <Overlay>
      <StyledModal>
        <Button onClick={onClose}>
          <HiOutlineX />
        </Button>
        <div>{children}</div>
      </StyledModal>
    </Overlay>,
    document.body
    // document.querySelector("#root")!
  );
}

export default Modal;
