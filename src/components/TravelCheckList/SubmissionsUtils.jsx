import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import check from '../../images/check.svg';
import uploadIcon from '../../images/uploadIcon.svg';

class SubmissionsUtils extends Component {
  state = { showUploadedField: false }

  componentDidMount() {
    this.getItemValue();
  }

  componentWillReceiveProps(nextProps) {
    const { postSuccess, checkId } = nextProps;
    postSuccess.includes(checkId) && this.setState({ showUploadedField: true });
  }

  getItemValue = () => {
    const { checklistItem: { submissions: [item] }, utilsType, checkId,
      setTextArea, setTicketFields, setUploadedFileName } = this.props;
    utilsType.match('textarea') && item && setTextArea(item.value, checkId);
    utilsType.match('ticketFieldset') && item && 
    setTicketFields(item.value, checkId);
    utilsType.match('uploadField') && item && 
    setUploadedFileName(item.value.fileName, checkId);
  }

  renderTextarea = () => {
    const { itemsToCheck, checkId, submissionText,
      handleInputChange, handleTextAreaSubmit, fileUploadData: { isUploading } 
    } = this.props;
  
    return (
      <div className="travelSubmission--item__textarea">
        <textarea
          placeholder="input information here..."
          name="submissionText"
          rows="4"
          cols="80"
          type="submit" 
          className="textArea"
          value={submissionText}
          onChange={handleInputChange}
          onBlur={handleTextAreaSubmit}
        />
        {
          itemsToCheck.includes(checkId) && (
            <img
              src={check}
              alt="check_icon"
              className="travelCheckList--input__check-image__ticket visible"
            />
          )}
      </div>
    );
  }
  renderUploadField = () => {
    const { fileUploadData, itemsToCheck, checkId, handleUpload } = this.props;
    const { isUploading } = fileUploadData;
    return (
      <div className="travelSubmission--input__upload-field">
        <div className="travelSubmission--input__input-field">
          <div role="presentation" className="travelSubmission--input__btn">
            <img
              src={uploadIcon} alt="upload_icon"
              className="travelSubmission--input__image"
            />
            <span id="file-upload" role="presentation">Upload file</span>
          </div>
          <input 
            type="file" 
            name="file"
            className="uploadFile"
            onChange={handleUpload} 
            disabled={isUploading}
          />
        </div>
        {
          itemsToCheck.includes(checkId) && (
            <img
              src={check}
              alt="check_icon"
              className="travelCheckList--input__check-image__ticket visible"
            />
          )
        }
      </div>
    );
  }

  renderUploadedField = () => {
    const { itemsToCheck, checkId, uploadedFileName, handleUpload,
      fileUploadData: { isUploading }, uploadProcess } = this.props;
    const fileName = (!uploadProcess || uploadProcess.match('success'))
      && uploadedFileName;
    return (
      <div className="travelSubmission--input__upload-field__">
        <div className="travelSubmission--input__input-field__">
          <div role="presentation" className="travelSubmission--input__btn--">
            <span id="file-upload" role="presentation" className="uploadedFileName">{fileName}</span>
            <img
              src={uploadIcon} alt="upload_icon"
              className="travelSubmission--input__image"
            />
          </div>
          <input 
            type="file" 
            name="file"
            className="uploadedFile"
            onChange={handleUpload} 
            disabled={isUploading}
          />
        </div>
        {
          itemsToCheck.includes(checkId) && (
            <img
              src={check}
              alt="check_icon"
              className="travelCheckList--input__check-image__ticket visible"
            />
          )
        }
      </div>                 
    );
  }

  renderTicketInput= (type, placeholder, label, name, tripId, value) => {
    const { handleInputChange, handleTicketSubmit } = this.props;
    return (
      <div className="airline-name">
        <span id="label">{label}</span>
        <input
          id={`${name}-${tripId}`}
          type={type}
          value={value}
          onChange={handleInputChange}
          onBlur={handleTicketSubmit}
          name={name} placeholder={placeholder}
          className={name}
        />
      </div>
    );
  }

  renderTicketFieldset = () => {
    const { 
      checklistItem, itemsToCheck, tripType,
      departureTime, arrivalTime, airline, ticketNumber, checkId,
      returnDepartureTime, returnTime, returnTicketNumber, returnAirline
    } = this.props;
    const { name, submissions: { tripId } } = checklistItem;
    return (
      name.toLowerCase().includes('travel ticket') && 
      (
        <form className="ticket-submission">
          <div className="ticket-submission--ticket__fieldSet">
            <div 
              className="travel-submission-details__return" 
              id="departure-fields"
            >
              {this.renderTicketInput(
                'datetime-local', '19:35:00', 'Departure Time',
                'departureTime', tripId, departureTime
              )}
              {this.renderTicketInput(
                'datetime-local', '19:35:00', 'Arrival Time',
                'arrivalTime', tripId, arrivalTime
              )}
              {this.renderTicketInput(
                'text', 'e.g KQ 532', 'Flight Number',
                'ticketNumber', tripId, ticketNumber
              )}
              {this.renderTicketInput(
                'text', 'e.g Kenya Airways', 'Airline',
                'airline', tripId, airline
              )}
            </div>
            {tripType.match('return') && (
              <div 
                className="travel-submission-details__return" 
                id="return-fields"
              >
                {this.renderTicketInput(
                  'datetime-local', '19:35:00', 'Departure Time',
                  'returnDepartureTime', tripId, returnDepartureTime
                )}
                {this.renderTicketInput(
                  'datetime-local', '19:35:00', 'Arrival Time',
                  'returnTime', tripId, returnTime
                )}
                {this.renderTicketInput(
                  'text', 'e.g KQ 532', 'Return Flight Number',
                  'returnTicketNumber', tripId, returnTicketNumber
                )}
                {this.renderTicketInput(
                  'text', 'e.g Kenya Airways', 'Airline',
                  'returnAirline', tripId, returnAirline
                )}
              </div>
            )}
          </div>
          {itemsToCheck.includes(checkId) && (
            <img 
              src={check} alt="check_icon" 
              className="travelCheckList--input__check-image__ticket visible" 
            />
          )}
        </form>
      )
    );
  }

  renderSubmissionsUtils = () => {
    const { utilsType, checklistItem: { submissions: [item] } } = this.props;
    const { showUploadedField } = this.state;
    return (
      <Fragment>
        {utilsType && utilsType.match('ticketFieldset') && this.renderTicketFieldset()}
        {(utilsType && utilsType.match('uploadField') && !item && !showUploadedField)
          && this.renderUploadField()}
        {utilsType && utilsType.match('uploadField') && (item || showUploadedField)
          && this.renderUploadedField()}
        {utilsType && utilsType.match('textarea') && this.renderTextarea()}
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>{this.renderSubmissionsUtils()}</Fragment>
    );
  }
}

SubmissionsUtils.propTypes = {
  checklistItem: PropTypes.object.isRequired, utilsType: PropTypes.string, checkId: PropTypes.string.isRequired,
  submissionText: PropTypes.string.isRequired, departureTime: PropTypes.string.isRequired,
  returnDepartureTime: PropTypes.string.isRequired, arrivalTime: PropTypes.string.isRequired,
  returnTime: PropTypes.string.isRequired, ticketNumber: PropTypes.string.isRequired,
  returnTicketNumber: PropTypes.string.isRequired, airline: PropTypes.string.isRequired,
  returnAirline: PropTypes.string.isRequired, handleUpload: PropTypes.func.isRequired,
  setTextArea: PropTypes.func.isRequired, postSuccess: PropTypes.array.isRequired,
  setTicketFields: PropTypes.func.isRequired, setUploadedFileName: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired, handleTextAreaSubmit: PropTypes.func.isRequired,
  handleTicketSubmit: PropTypes.func.isRequired, fileUploadData: PropTypes.object.isRequired,
  tripType: PropTypes.string.isRequired, uploadedFileName: PropTypes.string.isRequired,
  uploadProcess: PropTypes.string.isRequired, itemsToCheck: PropTypes.array.isRequired,
};

SubmissionsUtils.defaultProps = { utilsType: '' };

export default SubmissionsUtils;
