import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../modal/Modal';
import './ConfirmDialog.scss';

class ConfirmDialog extends Component {
  renderConfirmModal() {
    const {
      id,
      modalInvisible,
      buttonSelected,
      renderDialogText,
      closeDeleteModal,
      handleApprove,
      handleReject
    } = this.props;
    return (
      <Modal
        customModalStyles="delete-comment-modal"
        customOverlayStyle={
          `${renderDialogText(buttonSelected)}-modal-overlay`}
        visibility={modalInvisible ? 'invisible' : 'visible'}
        closeDeleteModal={closeDeleteModal('')}
        title={`${buttonSelected} Request?`}
        showOverlay={false}
      >
        <p className="approval-comment-modal__text">
          {`Confirm request ${renderDialogText(buttonSelected)}`}
        </p>
        <button
          className={`${renderDialogText(buttonSelected)}-comment-modal__btn`}
          type="button"
          id={buttonSelected}
          onClick={
            (['Approve', 'Verify'].includes(buttonSelected)) ? handleApprove(id) : handleReject(id)
          }
        >
          {buttonSelected}
        </button>
      </Modal>
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderConfirmModal()}
      </Fragment>
    );
  }
}

ConfirmDialog.propTypes = {
  id: PropTypes.string,
  modalInvisible: PropTypes.bool,
  buttonSelected: PropTypes.oneOfType([
    PropTypes.bool, PropTypes.string
  ]).isRequired,
  renderDialogText: PropTypes.func.isRequired,
  closeDeleteModal: PropTypes.func.isRequired,
  handleApprove: PropTypes.func.isRequired,
  handleReject: PropTypes.func.isRequired
};

ConfirmDialog.defaultProps = {
  id: '',
  modalInvisible: true,
};

export default ConfirmDialog;
