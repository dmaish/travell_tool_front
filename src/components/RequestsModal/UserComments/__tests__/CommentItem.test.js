import React from 'react';
import { shallow } from 'enzyme';
import CommentItem from '../CommentItem';

const props = {
  comment: {
    id: 1,
    userName: 'Smith Allen',
    picture: '/path/to/image',
    createdAt: '',
    comment: 'Can you clarify why',
    userEmail: 'ik@gmail.com',
  },
  deleteComment: jest.fn(),
  email: 'ik@gmail.com',
  editedLabel: '',
  editReady: false,
  commentToEdit: '',
  activeCommentId: '',
  resetEditing: jest.fn(),
  editComment: jest.fn(),
  handleNoEdit: jest.fn(),
  formatDate: jest.fn(),
  renderCancelButton: jest.fn()
};


describe('CommentItem component', () => {
  const wrapper = shallow(<CommentItem {...props} />);

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<CommentItem
      comment={{
        id: 1,
        userName: 'Smith Allen',
        picture: '/path/to/image',
        createdAt: '',
        comment: 'Can you clarify why',
        userEmail: 'ik@gmail.com',
      }}
      deleteComment={jest.fn()}
      email="ik@gmail.com"
      editedLabel=""
      editReady={false}
      commentToEdit="Can you clarify why"
      activeCommentId=""
      resetEditing={jest.fn()}
      editComment={jest.fn()}
      formatDate={jest.fn()}
      handleNoEdit={jest.fn()}
      renderCancelButton={jest.fn()}
    />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.active').length).toEqual(0);
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<CommentItem
      comment={{
        id: '1',
        userName: 'Smith Allen',
        picture: '/path/to/image',
        createdAt: '',
        comment: 'Can you clarify why',
        userEmail: 'ikechukwu@gmail.com',
      }}
      deleteComment={jest.fn()}
      email="ik@gmail.com"
      editedLabel=""
      editReady={false}
      commentToEdit="Can you clarify why"
      activeCommentId=""
      resetEditing={jest.fn()}
      editComment={jest.fn()}
      formatDate={jest.fn()}
      handleNoEdit={jest.fn()}
      renderCancelButton={jest.fn()}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<CommentItem
      comment={{
        id: '1',
        userName: 'Smith Allen',
        picture: '/path/to/image',
        createdAt: '',
        comment: 'Can you clarify why',
        userEmail: 'ik@gmail.com',
      }}
      deleteComment={jest.fn()}
      email="ik@gmail.com"
      editedLabel=""
      editReady={false}
      commentToEdit="Can you clarify why"
      activeCommentId="1"
      resetEditing={jest.fn()}
      editComment={jest.fn()}
      formatDate={jest.fn()}
      handleNoEdit={jest.fn()}
      renderCancelButton={jest.fn()}
    />);
    expect(wrapper.find('.active').length).toEqual(1);
    wrapper.find('.active').simulate('click');
  });

  it('should call closeDeleteCommentModal when delete button is clicked', () => {
    wrapper.instance().closeDeleteCommentModal();
    expect(wrapper.state().deleteModalState).toBe('invisible');
  });

  it('should call handleDeleteComment when delete button is clicked', () => {
    const handleDeleteCommentSpy = jest.spyOn(wrapper.instance(), 'handleDeleteComment');
    wrapper.find('.modal__delete-btn').simulate('click');
    expect(handleDeleteCommentSpy).toHaveBeenCalledTimes(0);
  });

  it('should call confirmDeleteComment when delete button is clicked', () => {
    const confirmDeleteCommentSpy = jest.spyOn(wrapper.instance(), 'confirmDeleteComment');
    wrapper.find('.delete-comment-modal__btn').simulate('click');
    expect(confirmDeleteCommentSpy).toHaveBeenCalledTimes(0);
  });
});
