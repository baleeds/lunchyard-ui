import { useContext, useCallback } from 'react';
import { ModalContext } from '../ModalController';

const useModal = (modalKey: string, Component: JSX.Element) => {
  const { addModalToStack } = useContext(ModalContext);
  
  const showModal = useCallback(() => {
    addModalToStack({ modalKey, Component });
  }, [addModalToStack]);

  return { showModal };
};

export default useModal;
