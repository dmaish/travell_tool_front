const initialState = {
  creatingComment: false,
  editingComment: false,
  deletingComment: false,
  comment: '',
  comments: [],
  error: ''
};

const comments = (state = initialState, action) => {
  switch (action.type) {
  case 'CREATE_COMMENT':
    return { ...state, creatingComment: true, comment: action.comment };
  case 'CREATE_COMMENT_SUCCESS':
    return { ...state, creatingComment: false, comment: action.comment,
      comments: [action.comment, ...state.comments], error: '' };
  case 'CREATE_COMMENT_FAILURE':
    return { ...state, creatingComment: false, error: action.error };
  case 'EDIT_COMMENT':
    return { ...state, editingComment: true, comment: action.comment };
  case 'EDIT_COMMENT_SUCCESS':
    return { ...state, editingComment: false,
      comment: action.comment,
      comments: [action.comment, ...state.comments],
      error: '', };
  case 'EDIT_COMMENT_FAILURE':
    return { ...state, editingComment: false, error: action.error };
  case 'DELETE_COMMENT':
    return { ...state, deletingComment: true };
  case 'DELETE_COMMENT_SUCCESS':
    return { ...state, deletingComment: false,
      comments: state.comments.filter(comment => comment.id !== action.commentId),
      error: ''
    };
  case 'DELETE_COMMENT_FAILURE':
    return { ...state, deletingComment: false, error: action.error };
  default: return state;
  }
};

export default comments;
