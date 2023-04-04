import { Component } from 'react';
import PropTypes from 'prop-types';
import css from "./Modal.module.css";

class Modal extends Component {
    state = {} 
    
    handleClick = (evt) => {
        const currentTarget = evt.currentTarget
        if (currentTarget === evt.target) {
            this.props.onClose()
        }
    }

    handlePressEsc = (evt) => {
        if (evt.code === "Escape") { 
            this.props.onClose()
        }
    }

    componentDidMount() { 
        document.addEventListener("keydown", this.handlePressEsc)
    }

    render() { 
        return (
            <div className={css.overlay} onClick={this.handleClick} >
                <div className={css.modal}>
                    <img src={this.props.largeImageURL} alt="" />
                </div>
            </div>)
    }
}
 
export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

