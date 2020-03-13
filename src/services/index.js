export const resolveBaseUrl = () => { //eslint-disable-line
  const testUrl = 'http://127.0.0.1:5000/api/v1';
  const env = process.env.NODE_ENV;
  const baseUrl = ['test', 'development'].includes(env)
    ? testUrl
    : process.env.REACT_APP_API_URL;

  return baseUrl;
};
