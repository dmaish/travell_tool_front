import Cookie from 'cookies-js';
import jwtDecode from 'jwt-decode';
import { successMessage, errorMessage } from './toast';

export const userDetails = ()  => {
  const cookie = Cookie.get('jwt-token');
  const authChecker = cookie ? true : false;
  const decodeToken = cookie ? jwtDecode(Cookie.get('jwt-token')) : null;
  const data = {
    isAuthenticated: authChecker,
    user: decodeToken
  };
  return data;
};

export const loginStatus = () => {
  if (!Cookie.get('login-status') && Cookie.get('jwt-token')) {
    Cookie.set('login-status', 'true', { domain: '.andela.com' });
    successMessage('Login Successful');
  }
};

export const logoutUser = (history, msg) => {
  Cookie.expire('login-status', { path: '/', domain: '.andela.com' });
  Cookie.expire('jwt-token', { path: '/', domain: '.andela.com' });
  setTimeout(window.location.reload.bind(window.location), 500);
  history.push('/');
  msg ? errorMessage(msg) : successMessage('Logout Successful');
};

export const getUserRoleCenter = (userDetail, defaultCenter) => {
  const userCenter = userDetail && userDetail.centers[0] ? userDetail.centers[0].location
    : defaultCenter;
  return userCenter;
};
