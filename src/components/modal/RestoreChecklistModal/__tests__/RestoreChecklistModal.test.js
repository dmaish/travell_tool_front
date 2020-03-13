import React from 'react';
import RestoreChecklistItem from '../RestoreChecklistModal';

describe('Renders',() => {
  let closeModal, wrapper;
  closeModal = jest.fn();
  const props = {
    closeModal: closeModal(),
  };
  beforeEach(() => {
    wrapper = mount( <RestoreChecklistItem {...props}
    />);
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
