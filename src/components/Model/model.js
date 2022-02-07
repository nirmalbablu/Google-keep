import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Model = ({ children, isOpen = false, setIsOpen = () => {} }) => {
  if (!isOpen) return <></>;
  return createPortal(
    <StyledModal onClick={() => setIsOpen(prev => !prev)}>
      {children}
    </StyledModal>,
    document.body
  );
};

export default Model;
