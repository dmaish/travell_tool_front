import React from 'react';
import {PropTypes} from 'prop-types';

const SubmitArea = ({ onCancel, deleteChecklistItem, deleteReason }) => {

  return (
    <fieldset>
      <div className="submit-area">
        <button type="button" className="bg-btn bg-btn--inactive" onClick={onCancel} id="cancel">
          Cancel
        </button>
        <button 
          type="button"
          className="restore-checklist-items__footer--delete"
          id="oncancel" onClick={deleteChecklistItem}
          disabled={!deleteReason}
        >
          Disable
        </button>
      </div>
    </fieldset>
  );
};

SubmitArea.propTypes = {
  onCancel: PropTypes.func.isRequired,
  deleteChecklistItem: PropTypes.func.isRequired,
  deleteReason: PropTypes.string.isRequired
};

export default SubmitArea;
