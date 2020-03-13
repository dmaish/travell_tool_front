import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import Modal from '../Modal';


const RestoreChecklistItem = ({ closeModal, shouldOpen, modalType, itemName, restoreChecklistItem }) => {
  return (
    <Fragment>
      <Modal
        closeModal={closeModal}
        customModalStyles="delete-checklist-item restore-model-content" visibility={
          shouldOpen && modalType.match('restore checklist item') ? 'visible' : 'invisible'
        }
        title="Restore Checklist Item"
      > 
        <span className="delete-checklist-item__disclaimer restore-checklist-items_span">
          Are you sure you want to restore
          <strong>{itemName}</strong>
          checklist item?
        </span>
        <div className="delete-checklist-item__hr delete-checklist-item__left" />
        <div className="delete-checklist-item__footer delete-checklist-item__right">
          <button type="button" className="delete-checklist-item__footer--cancel" onClick={closeModal}>Cancel</button>
          <button type="button" className="bg-btn bg-btn--active" onClick={restoreChecklistItem}>
            Restore
          </button>
        </div>
      </Modal>
    </Fragment>
  );
};
RestoreChecklistItem.propTypes = {
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  restoreChecklistItem: PropTypes.func.isRequired,
  itemName: PropTypes.string.isRequired
};
RestoreChecklistItem.defaultProps = {
  modalType: ''
};
export default RestoreChecklistItem;
