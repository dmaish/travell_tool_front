import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import editIcon from '../../images/edit.svg';
import checkListIcon from '../../images/checklisticon.svg';
import cancelIcon from '../../images/cancel.svg';
import deleteIcon from '../../images/deleted.svg';
import DeleteModal from '../../views/Documents/DeleteModal';

class TableMenu extends PureComponent {

  showDeleteModal = () => {
    let { openModal } = this.props;
    openModal(true, 'delete document');
  }

  confirmDeleteRequest = (e) => {
    e.preventDefault();
    const { deleteRequest, request, closeModal } = this.props;
    const requestId = request.id;
    deleteRequest(requestId);
    closeModal(true, 'new model');
  }

  handleIconOpentoggle = (toggleMenu, requestId) => {
    return (
      <i
        className="fa fa-ellipsis-v"
        id="toggleIcon"
        role="presentation"
        onClick={() => toggleMenu(requestId)}
      />
    );
  };

  handleIconClosetoggle = (toggleMenu, requestId) => {
    return (
      <li
        className="table__menu-list-item"
        id="toggleButton"
        onClick={() => toggleMenu(requestId)}
        role="presentation"
      >
        <img src={cancelIcon} alt="cancel-icon" className="menu-icon" />
        Cancel
      </li>
    );
  };

  renderTravelCheckListBtn = () => {
    const { showTravelChecklist, request, toggleMenu } = this.props;
    return (
      <li
        className="table__menu-list-item"
        id="travelChecklistBtn"
        onClick={() => {
          showTravelChecklist(request, 'travel checklist');
          toggleMenu(request.id);
        }}
        role="presentation"
      >
        <img src={checkListIcon} alt="cancel-icon" className="menu-icon" />
        Travel Checklist
      </li>
    );
  }

  renderCheckListSubmissionBtn = () => {
    const {
      requestStatus, showTravelChecklist,
      request, toggleMenu
    } = this.props;
    return (
      requestStatus === 'Approved' && (
        <li
          className="table__menu-list-item"
          id="checklistSubmission"
          onClick={() => {
            showTravelChecklist(request, 'upload submissions');
            toggleMenu(request.id);
          }}
          role="presentation"
        >
          <img src={checkListIcon} alt="list-icon" className="menu-icon" />
          Travel Checklist
        </li>
      )
    );
  }

  renderDelete = () => {
    const { shouldOpen, closeModal, modalType, request } = this.props;
    return (
      <li
        className="table__menu-list-item"
        id="deleteRequest"
        onClick={this.showDeleteModal}
        role="presentation"
      >
        <img src={deleteIcon} alt="delete-icon" className="menu-icon" />
        Delete
        <DeleteModal
          closeModal={closeModal}
          shouldOpen={shouldOpen}
          modalType={modalType}
          handleDelete={this.confirmDeleteRequest}
          documentName={request.id}
          title="Delete Request"
        />
      </li>
    );
  }

  renderToggle = () => {
    const {
      toggleMenu,
      editRequest,
      request,
      type,
      requestStatus,
      menuOpen } = this.props;
    const openMenu = menuOpen.id === request.id && menuOpen.open;
    return (
      <div>
        {this.handleIconOpentoggle(toggleMenu, request.id)}
        <div className={`table__menu-container ${openMenu ? 'open' : ''}`}>
          {type === 'requests' && (
            <ul className="table__menu-list">
              {requestStatus === 'Open' && (
                <li
                  className="table__menu-list-item"
                  id="iconBtn"
                  onClick={() => {
                    editRequest(request.id);
                    toggleMenu(request.id);
                  }}
                  role="presentation"
                >
                  <img src={editIcon} alt="edit-icon" className="menu-icon" />
                  Edit
                </li>)}
              {type === 'requests' &&
                requestStatus === 'Open' && this.renderTravelCheckListBtn()
              }
              {this.renderCheckListSubmissionBtn()}
              {requestStatus === 'Open' && this.renderDelete()}
              {this.handleIconClosetoggle(toggleMenu, request.id)}
            </ul>
          )}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="menu__container">
        {this.renderToggle()}
      </div>
    );
  }
}

TableMenu.propTypes = {
  editRequest: PropTypes.func.isRequired,
  showTravelChecklist: PropTypes.func.isRequired,
  request: PropTypes.object.isRequired,
  requestStatus: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  menuOpen: PropTypes.object.isRequired,
  deleteRequest: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default TableMenu;
