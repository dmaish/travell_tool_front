const initialState = {
  modal: {
    shouldOpen: false,
    modalType: null,
    page: null,
  }
};

const modal = (state = initialState, action) => {
  switch (action.type) {
  case 'OPEN_MODAL':
    return {
      ...state,
      modal: {
        shouldOpen: true,
        modalType: action.modal.modalType,
        page: action.modal.page,
      },
    };
  case 'CLOSE_MODAL':
    return {
      ...state,
      modal: {
        shouldOpen: false,
        modalType: null
      }
    };
  default: return state;
  }
};

export default modal;
