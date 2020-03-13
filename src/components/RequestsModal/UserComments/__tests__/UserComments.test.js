import React from 'react';
import { shallow } from 'enzyme';
import { UserComments } from '../UserComments';

const deleteComment = jest.fn();
const event = {
  preventDefault: jest.fn()
};

const comments = [{
  id: 1,
  userName: 'Smith Allen',
  picture: '/path/to/image',
  createdAt: '',
  comment: 'Can you clarify why',
  userEmail: 'ik@gmail.com',
  isEdited: true,
}];

const secondComments = [{
  id: 1,
  userName: 'Smith Allen',
  picture: '/path/to/image',
  createdAt: '',
  comment: 'Can you clarify why',
  userEmail: 'ik@gmail.com',
  isEdited: false,
}];

describe('UserComments component', () => {
  const wrapper = shallow(<UserComments
    deleteComment={deleteComment}
    comments={comments}
  />);

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<UserComments
      deleteComment={deleteComment}
      comments={secondComments}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call formatDate', () => {
    const spy = jest.spyOn(wrapper.instance(), 'formatDate');
    wrapper.instance().formatDate('date');
    expect(spy).toHaveBeenCalledTimes(1);  });

  it('should call editComment', () => {
    const spy = jest.spyOn(wrapper.instance(), 'editComment');
    wrapper.instance().editComment(1);
    expect(spy).toHaveBeenCalledTimes(1);  });

  it('should call handleCancelClick', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleCancelClick');
    wrapper.instance().handleCancelClick(event);
    expect(spy).toHaveBeenCalledTimes(1);  });

  it('should call renderCancelButton', () => {
    const spy = jest.spyOn(wrapper.instance(), 'renderCancelButton');
    wrapper.instance().renderCancelButton();
    expect(spy).toHaveBeenCalledTimes(1);  });

  it('should handle reset editing', () => {
    const spy = jest.spyOn(wrapper.instance(), 'resetEditing');
    wrapper.instance().resetEditing();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should handleNoEdit', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleNoEdit');
    wrapper.instance().handleNoEdit();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('should have default deleteComment', () => {
    const result = UserComments.defaultProps.deleteComment();
    expect(result).toEqual(undefined);
  });
});
