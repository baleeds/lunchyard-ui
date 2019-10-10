import { useContext, useCallback } from 'react';
import { ModalContext } from '../components/common/ModalController';

export const useModal = (modalKey: string, Component: JSX.Element) => {
  const { addModalToStack } = useContext(ModalContext);
  
  const showModal = useCallback(() => {
    addModalToStack({ modalKey, Component });
  }, [addModalToStack, modalKey, Component]);

  return { showModal };
};
