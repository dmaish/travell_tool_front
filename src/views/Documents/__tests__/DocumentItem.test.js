import React from 'react';
import { shallow } from 'enzyme';
import DocumentItem from '../DocumentItem';

describe('<DocumentItem />', () => {
  it('should render correctly with image icon', () => {
    const props = {
      document: {
        id: '1',
        name: 'Passport',
        cloudinary_public_id: 'e93h236FvT',
        cloudinary_url: 'https://image.jpg',
        userId: '-LMgZQKq6MXAj_41iRWi',
        createdAt: '2018-08-16 012:11:52.181+01',
        updatedAt: '2018-08-16 012:11:52.181+01',
      },
      menuOpen: {
        open: true
      },
      toggleMenu: jest.fn(),
      openModal: jest.fn(),
      setItemToDelete: jest.fn()
    };
    const wrapper = shallow(<DocumentItem {...props} />);
    expect(wrapper.find('img').length).toBe(1);
  });

  it('should render correctly with file icon', () => {
    const props = {
      document: {
        id: '1',
        name: 'Passport',
        cloudinary_public_id: 'e93h236FvT',
        cloudinary_url: 'https://image.pdf',
        userId: '-LMgZQKq6MXAj_41iRWi',
        createdAt: '2018-08-16 012:11:52.181+01',
        updatedAt: '2018-08-16 012:11:52.181+01',
      },
    };
    const wrapper = shallow(<DocumentItem {...props} />);
    expect(wrapper.find('img').length).toBe(1);
  });
});
