import { URL } from 'url';
import {
  pastApprovalsResponse,
  openApprovalsResponse,
  allApprovalsResponse,
  errorResponse
} from './approvalsResponses';

const axios = {
  get: jest.fn((url) => {
    const searchParams = (new URL(url)).searchParams;

    switch (searchParams.get('status')) {
    case 'past':
      return Promise.resolve({data: pastApprovalsResponse});
    case 'open':
      return Promise.resolve({data: openApprovalsResponse});
    case 'badquery':
      return Promise.reject(errorResponse);
    default:
      return Promise.resolve({data: allApprovalsResponse});
    }
  })
};

export default axios;
