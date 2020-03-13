import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../modal/Modal';
import ImageLink from '../../image-link/ImageLink';
import ConnectedCommentBox from '../CommentBox/CommentBox';
import './UserComments.scss';

export default class CommentItem extends Component {
  state = {
    deleteModalState: 'invisible'
  };

  handleDeleteComment = () => {
    this.setState ({ deleteModalState: 'visible' });
  }

  closeDeleteCommentModal = () => {
    this.setState ({ deleteModalState: 'invisible' });
  }

  confirmDeleteComment = () => {
    const { deleteComment, comment } = this.props;
    deleteComment(comment.requestId, comment.id);
    this.setState ({ deleteModalState: 'invisible' });
  }

  renderDeleteOption = () => {
    const { deleteModalState } = this.state;
    return (
      <button
        type="button"
        className={`modal__delete-btn ${deleteModalState === 'visible' ? 'blue-text' : ''}`}
        onClick={this.handleDeleteComment}
      >
        Delete
        <Modal
          customModalStyles="delete-comment-modal"
          customOverlayStyle="delete-modal-overlay"
          visibility={deleteModalState}
          closeDeleteModal={this.closeDeleteCommentModal}
          title="Delete Comment ?"
          showOverlay={false}
        >
          <p className="delete-comment-modal__text">This action cannot be undone</p>
          <button className="delete-comment-modal__btn" type="button" onClick={this.confirmDeleteComment}>Delete</button>
        </Modal>
      </button>
    );
  }

  render() {
    const { editedLabel, commentToEdit, activeCommentId, email, handleNoEdit, resetEditing, formatDate, comment, renderCancelButton, editComment, editReady } = this.props;
    return (
      <div className="modal__modal1" key={comment.id}>
        <hr />
        <div className="modal__mdl-icons">
          <ImageLink imageSrc={comment.picture} altText="avatar" imageClass="modal__oval-copy" />
          <span className="modal__user-name">
            { comment.userName }
          </span>
          <span className="modal__hours-status">
            {formatDate(comment.createdAt)}
          </span>
          {email === comment.userEmail ? (
            <span className="modal__dialog">
              <button
                type="button" className={`edit-button ${activeCommentId === comment.id ? 'active': ''}`} onClick={() => editComment(comment)}>
              Edit
              </button>
              {this.renderDeleteOption()}
            </span>) : null }
          {commentToEdit == comment.comment ? (
            <div className="comment-box">
              <ConnectedCommentBox startSubmitReady={true} handleNoEdit={handleNoEdit} afterSubmit={resetEditing} editReady={editReady} editComment={editComment} comment={commentToEdit} requestId={comment.requestId} id={comment.id} />  {/* eslint-disable-line */}
              {renderCancelButton()}
            </div>
          ) :  (
            <div className="modal__modal2">
                <div className="modal__status-update" dangerouslySetInnerHTML={{ __html: `${comment.comment} ${editedLabel}` }} /> {/*eslint-disable-line*/}
            </div>)}
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  handleNoEdit: PropTypes.func.isRequired,
  editReady: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  editedLabel: PropTypes.string.isRequired,
  commentToEdit: PropTypes.string.isRequired,
  activeCommentId: PropTypes.string.isRequired,
  resetEditing: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
  renderCancelButton: PropTypes.func.isRequired
};
