import React from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from '../../types/ModalProps.type';

const modalRoot = document.querySelector('#modal-root') as HTMLElement;

const Portal = ({ children }: ModalProps) => {
  const el = React.useRef(document.createElement('div'));

  React.useEffect(() => {
    const current = el.current;
    modalRoot!.appendChild(current);
    return () => void modalRoot!.removeChild(current);
  }, []);

  return createPortal(children, el.current);
};

export default Portal;
