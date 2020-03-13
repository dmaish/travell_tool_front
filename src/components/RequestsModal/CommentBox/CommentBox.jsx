import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill'; 
import sanitizeHtml from 'sanitize-html-react';
import './_CommentBox.scss';
import {
  createComment,
  editComment
} from '../../../redux/actionCreator/commentsActions';
import 'react-quill/dist/quill.snow.css'; 

export class CommentBox extends Component {
  constructor(props) {
    super(props);
    const { comment, startSubmitReady } = this.props;
    this.state = {
      text: comment || '',
      submitReady: startSubmitReady || false
    };
  }

  handleKeyUp = event => {
    if (event.target.innerText.trim().length >= 1) {
      this.setState({
        text: event.target.innerHTML,
        submitReady: true
      });
    } else {
      this.setState({
        text: '',
        submitReady: false
      });
    }
  };

  handleChange = value => {
    this.setState({
      text: value,
      submitReady: true
    });
  };

  handleFocus = event => {
    event.target.editorContainer.style.border = '1px solid blue';
    const { dataInput } = this.state;
    this.setState({
      text: ''
    });
  };

  handleBlur = event => {
    event.target.editorContainer.style.border = '1px solid #E4E4E4';
    const { text } = this.state;
    if (text == '') {
      this.setState({
        text: '',
        submitReady: false
      });
    }
  };

  handleSubmit = event => {
    const { text } = this.state;
    const { createComment, requestId } = this.props;
    event.preventDefault();
    if (text.trim() !== '') {
      createComment(requestId, this.sanitizeInputData(text));
    }
    this.setState({
      text: '',
      submitReady: false
    });
  };

  // sanitize input data from comment box
  sanitizeInputData = dirtyHtml => {
    const cleanHtml = sanitizeHtml(dirtyHtml, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['u']),
      allowedAttributes: {
        a: ['href', 'target']
      }
    });
    return cleanHtml;
  };

  handleEditComment = event => {
    event.preventDefault();
    const { text } = this.state;
    const cachedComment = localStorage.getItem('comment');
    const {
      editComment,
      requestId,
      id,
      afterSubmit,
      handleNoEdit
    } = this.props;
    if (text !== cachedComment && text !== '') {
      editComment(requestId, text, id);
    } else {
      handleNoEdit();
    }
    afterSubmit();
  };

  renderButtons = () => {
    const { submitReady, text } = this.state;
    const { comment } = this.props;
    const status = submitReady ? '--active' : '';
    return (
      <span className="editor__btn-wrap">
        {comment ? (
          <div>
            <button
              type="submit"
              onClick={this.handleEditComment}
              className={`editor__post-btn editor__post-btn${status} --active post-btn-text edit-buttons`}
              disabled={!text && true}
            >
              Save
            </button>
          </div>
        ) : (
          <button
            className={`editor__post-btn editor__post-btn${status} post-btn-text`}
            type="submit"
            id="post-submit"
            onClick={this.handleSubmit}
            disabled={!text && true}
          >
            Post
          </button>
        )}
      </span>
    );
  }

  render() {
    const { text } = this.state;
    return (
      <form className="editor__editor-form">
        <ReactQuill
          value={text}
          className="quill-contents"  
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          modules={CommentBox.modules}
          placeholder="Write a comment"
        />
        <div className="editor__btn-size">
          {this.renderButtons()}
        </div>
      </form>
    );
  }
}

CommentBox.modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ]
  ]
};

CommentBox.propTypes = {
  createComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  requestId: PropTypes.string,
  comment: PropTypes.string,
  id: PropTypes.string,
  afterSubmit: PropTypes.func,
  handleNoEdit: PropTypes.func,
  startSubmitReady: PropTypes.bool
};

CommentBox.defaultProps = {
  afterSubmit: () => {},
  requestId: '',
  comment: '',
  id: '',
  handleNoEdit: () => {},
  startSubmitReady: false
};

export default connect(
  null,
  { createComment, editComment }
)(CommentBox);

