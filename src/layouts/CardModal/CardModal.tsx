import React from 'react';
import classes from './CardModal.module.scss';
import { RxCross1 } from 'react-icons/rx';

type ModalProps = {
  onClose: () => void;
  children:
    | string
    | number
    | boolean
    | React.ReactElement<string | React.JSXElementConstructor<unknown>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
};

const CardModal = (props: ModalProps) => {
  function bgCloseHandler() {
    props.onClose();
  }
  return (
    <>
      <div className={classes['modal-overlay']} onClick={bgCloseHandler} />
      <div className={classes.modal}>
        <RxCross1 className={classes.cross} onClick={bgCloseHandler} />
        {props.children}
      </div>
    </>
  );
};

export default CardModal;
