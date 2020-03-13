import React from 'react';
import Modal from '../Modal';

describe('<Modal />', () => {
  let props, click, wrapper;

  beforeEach(() => {
    click = jest.fn();
    props = {
      title: 'test modal',
      visibility: 'visible',
      closeModal: jest.fn(),
      closeDeleteModal: jest.fn()
    };
    wrapper = shallow(
      <Modal {...props}>
        <div>
          Test content
        </div>
      </Modal>
    );
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('prevents closing modal on clicking modal body', () => {
    const stopPropagation = jest.fn();
    const modal = wrapper.find('div.modal').simulate('click', {
      stopPropagation
    });
    expect(stopPropagation).toHaveBeenCalled();
  });
});
