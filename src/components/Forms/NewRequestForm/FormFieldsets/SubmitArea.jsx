import React from 'react';
import {PropTypes} from 'prop-types';
import ButtonLoadingIcon from '../../ButtonLoadingIcon';

const SubmitArea = (props) => {
  const { hasBlankFields,sameOriginDestination, onCancel, send, modalType,
    onEditCancel, selection, loading, disableOnChangeProfile } = props;
  return (
    <fieldset>
      <div className={selection ? `submit-area submit-area--${selection}` : 'submit-area'}>
        { modalType === 'edit accomodation' ? (
          <button type="button" className="bg-btn bg-btn--inactive" id="oncancel" onClick={onEditCancel}>
          Cancel
          </button>)
          : (
            <button type="button" className="bg-btn bg-btn--inactive" onClick={onCancel} id="cancel">
              Cancel
            </button>
          )}
        <button type="submit" disabled={hasBlankFields || loading || (sameOriginDestination && disableOnChangeProfile)} className="bg-btn bg-btn--active" id="submit">
          <ButtonLoadingIcon isLoading={loading} buttonText={send} />
        </button>
      </div>
    </fieldset>
  );
};

SubmitArea.propTypes = {
  onCancel: PropTypes.func.isRequired,
  hasBlankFields: PropTypes.bool.isRequired,
  sameOriginDestination: PropTypes.bool.isRequired,
  send: PropTypes.string.isRequired,
  modalType: PropTypes.string,
  onEditCancel: PropTypes.func,
  selection: PropTypes.string,
  loading: PropTypes.bool,
  disableOnChangeProfile: PropTypes.bool.isRequired
};

SubmitArea.defaultProps = {
  modalType: '',
  selection: '',
  loading: false,
  onEditCancel: () => {}
};

export default SubmitArea;
