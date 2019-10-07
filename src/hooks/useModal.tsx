import { useContext, useCallback } from 'react';
import { ModalContext } from '../components/util/ModalController';

const useModal = (modalKey: string, Component: JSX.Element) => {
  const { addModalToStack } = useContext(ModalContext);
  
  const showModal = useCallback(() => {
    addModalToStack({ modalKey, Component });
  }, [addModalToStack, modalKey, Component]);

  return { showModal };
};

export default useModal;
