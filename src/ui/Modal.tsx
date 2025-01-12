import {
  cloneElement,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
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

type ModalContextValueType = {
  openName: string;
  open: (modalNameToOpen: string) => void;
  close: () => void;
};

const modalContextDefaultValue: ModalContextValueType = {
  openName: "",
  open() {},
  close() {},
};

const ModalContext = createContext(modalContextDefaultValue);

type ModalContextProviderPropsType = {
  children: ReactNode;
};

function ModalContextProvider({ children }: ModalContextProviderPropsType) {
  const [openName, setOpenName] = useState("");

  function open(modalNameToOpen: string) {
    setOpenName(modalNameToOpen);
  }

  function close() {
    setOpenName("");
  }

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

type OpenPropsType = {
  children: ReactElement;
  modalNameToOpen: string;
};

function Open({ children, modalNameToOpen }: OpenPropsType) {
  const { open } = useContext(ModalContext);

  /* 
    the child component of "Open", which is Button, needs to have access to 
    the context state "open() function". How to have access to "open()" in the child component (Button)?
    1. call useContext(ModalContext) inside the Button component. But Button is a reusable components
    and only in this case it has access to "ModalContext". Other Button components inside the app do not
    have access to "ModalContext"
    2. instead of returning <ModalContextProvider value={{}}> from the Modal component,
    wrap <ModalContextProvider> around <AddCabin> inside the "Cabins" page. This makes AddCabin component
    to have access to "open()" from the context and it can be passed to the onClick() prop of the Button
    inside the AddCabin component. But this approach is against keeping the "Modal states" only inside the
    "Modal" component
    3. clone the child (Button) and attach the onClick() prop to the cloned Button and assign the open() 
    function value as its value and render the cloned Button component instead of the child (Button) component.
    In other words, if "Button instance" were rendered inside the "Open" component as <Button />, we could
    pass "open() function" to the "Button" instance as <Button open={open} /> but now that the Button instance
    is created during the run-time (because the "Open" component does not know what its children are) and
    dynamically, it can be cloned and the prop can be passed to the cloned component
  */
  return cloneElement(children, { onClick: () => open(modalNameToOpen) });
}

type ModalWindowPropsType = {
  children: ReactElement;
  modalNameToOpen: string;
};

function ModalWindow({ children, modalNameToOpen }: ModalWindowPropsType) {
  const { openName, close } = useContext(ModalContext);
  if (modalNameToOpen !== openName) return null;
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
        <Button onClick={close}>
          <HiOutlineX />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
    // document.querySelector("#root")!
  );
}

type ModalPropsType = {
  children: ReactNode;
};

function Modal({ children }: ModalPropsType) {
  return <ModalContextProvider>{children}</ModalContextProvider>;
}

Modal.Open = Open;
Modal.ModalWindow = ModalWindow;

export default Modal;
