import React from 'react';
import Cookie from 'cookies-js';
import { Login } from '..';
import TextLink from '../../../components/TextLink/TextLink';

const props = {
  setCurrentUser: () => {},
  isAuthenticated: true,
  user:{
    UserInfo: {
      fullName: 'Tomato Jos',
      email: 'tomato@andela.com',
      userId: '29492494',
      picture: 'https://fakephote.jpg'
    }
  },
  history: {
    push: jest.fn()
  },
  postUserData: jest.fn(),
  match: {
    params: [{}]
  }
};
const historyMock = { push: jest.fn() };

const wrapper = shallow(<Login {...props} />);

describe('Login Component', () => {
  it('should render Login page correctly', () => {
    expect(wrapper.find(TextLink)).toHaveLength(2);
    expect(wrapper.find('#login')).toHaveLength(1);
    expect(wrapper.find('img')).toHaveLength(2);
    expect(wrapper.find('p')).toHaveLength(1);
  });

  it('should find the Login button', () => {
    expect(wrapper.find('button').exists).toBeTruthy();
  });

  it('should redirect to andela micro service when login is Clicked', () => {
    const redirectUrl = `${process.env.REACT_APP_ANDELA_AUTH_HOST}/login?redirect_url=${process.env.REACT_APP_AUTH_REDIRECT_URL}`;
    window.location.replace = jest.fn();
    wrapper.find('#login').simulate('click');
    expect(window.location.replace).toHaveBeenCalledWith(redirectUrl);
  });

  it('should set user Login status to undefined if user not is authenticated', () => {
    const loginStatus = Cookie.get('login-status');
    expect(loginStatus).toEqual(undefined);
  });

  it('should call authenticate method on component mount', (done) => {
    const authenticatedSpy= jest.spyOn(wrapper.instance(), 'authenticated');
    wrapper.instance().componentDidMount();
    expect(authenticatedSpy).toHaveBeenCalledTimes(1);

    done();
  });

  it('should call checkTokenExpiration method on component mount', (done) => {
    const checkTokenExpirationSpy = jest
      .spyOn(wrapper.instance(), 'checkTokenExpiration');
    const expiredDate = new Date();
    const expiredDateInSeconds = expiredDate.getTime() * 0.001;
    wrapper.instance().checkTokenExpiration(expiredDateInSeconds);
    expect(checkTokenExpirationSpy).toHaveBeenCalledTimes(1);

    done();
  });
});
