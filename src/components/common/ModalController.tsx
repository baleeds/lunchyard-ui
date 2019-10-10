import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';

interface Modal {
  modalKey: string;
  Component: JSX.Element;
};

interface ModalContextType {
  modalStack: Modal[];
  addModalToStack: (modal: Modal) => void;
};

// QUESTION: Sending a noop through?  How could I do that better?
export const ModalContext = React.createContext<ModalContextType>({ modalStack: [], addModalToStack: () => {} });

export const ModalController: React.FC = ({ children }) => {
  const [modalStack, setModalStack] = useState<Modal[]>([]);

  const addModalToStack = useCallback((modal: Modal) => {
    setModalStack([...modalStack, modal]);
  }, [modalStack, setModalStack]);

  const popModalStack = useCallback(() => {
    setModalStack(modalStack.slice(0, modalStack.length - 2));
  }, [modalStack, setModalStack]);
  
  return (
    <>
      <ModalContext.Provider value={{ modalStack, addModalToStack }}>
        {children}
      </ModalContext.Provider>
      {modalStack.map((modal, index) => {
        const { modalKey, Component } = modal;

        return (
          <ModalDrop
            key={`${modalKey}-${index}`}
            onClick={popModalStack}
          >
            {Component}
          </ModalDrop>
        );
      })}
    </>
  );
};

const ModalDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  background-color: rgba(0,0,0,.2);
  justify-content: center;
  align-items: center;
`;