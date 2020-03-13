export const openModal = (shouldOpen, modalType, page) => ({
  type: 'OPEN_MODAL',
  modal: {
    shouldOpen,
    modalType,
    page
  }
});

export const closeModal = () => ({
  type: 'CLOSE_MODAL',
});
