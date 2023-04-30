import React from 'react';
import classes from './Modal.module.scss';

function Modal(props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<string | React.JSXElementConstructor<unknown>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) {
  return (
    <div className={classes.modal}>
      <div className={classes.modalContent}>{props.children}</div>
    </div>
  );
}

export default Modal;
