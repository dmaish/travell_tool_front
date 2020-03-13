import React from 'react';
import ButtonLoadingIcon from '..';

describe('<ButtonLoadingIcon />', () => {
  const props = {
    loading: true,
    buttonText: 'Save',
  };
  const wrapper = shallow(<ButtonLoadingIcon {...props} />);

  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
