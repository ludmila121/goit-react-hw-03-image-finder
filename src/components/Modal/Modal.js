import React, {Component} from 'react';
import { createPortal } from 'react-dom';
import {PropTypes} from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

 class Modal extends Component {
  static propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onEscClick);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEscClick);
  }

  onEscClick = e => {
    if (!e.key === 'Escape') return;

    this.props.onCloseModal();
  };

  onBackdropClick = e => {
    if (e.target !== e.currentTarget) return;

    this.props.onCloseModal();
  };

  render = () => {
    const { largeImageURL, alt } = this.props;
    return createPortal(
        <div className={s.Overlay} onClick={this.onBackdropClick}>
            <div className={s.Modal}>
                <img src={largeImageURL} alt={alt} />
            </div>
        </div>,
            modalRoot,
    );
  }
}
export default Modal;