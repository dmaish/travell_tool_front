import React from 'react';
import DeleteRequestForm from '../DeleteRequestForm';

describe('Renders',() => {
  let closeModal, wrapper;
  closeModal = jest.fn();
  const props = {
    closeModal: closeModal(),
  };
  beforeEach(() => {
    wrapper = mount( <DeleteRequestForm {...props}
    />);
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
