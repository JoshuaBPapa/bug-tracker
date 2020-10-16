import { useReducer, useCallback, useEffect, useRef, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from '../AuthContext';

const fetchReducer = (state, action) => {
  switch (action.type) {
    case 'REQUEST_INIT':
      return {
        ...state,
        loading: true
      }
    case 'REQUEST_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case 'GET_DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      }
    case 'SENT_DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        sentDataResponse: action.payload
      }
    default:
      throw new Error();
  };
};

const useAxios = () => {
  const [state, dispatch] = useReducer(fetchReducer, {
    loading: false,
    data: null,
    error: null,
    sentDataResponse: null
  });
  const requestCancelled = useRef(false);
  const authContext = useContext(AuthContext);

  axios.defaults.baseURL = 'http://localhost:8080';

  useEffect(() => {
    const reqInterceptor = axios.interceptors.request.use(config => {
      // only send auth headers to endpoints that are not login or signup
      if (config.url !== 'login' || config.url !== 'signup') {
        config.headers['x-access-token'] = localStorage.getItem('access-token');
        config.headers['x-refresh-token'] = localStorage.getItem('refresh-token');
        config.headers['x-userid'] = localStorage.getItem('userId');
      }

      // logout the user if an auth header is missing
      if (
        !localStorage.getItem('access-token') ||
        !localStorage.getItem('refresh-token') ||
        !localStorage.getItem('userId')
      ) {
        authContext.removeAuth();
      }

      return config;
    });

    const resInterceptor = axios.interceptors.response.use(response => {
      // successful login or signup
      if (response.config.url === 'login' || response.config.url === 'signup') {
        localStorage.setItem('access-token', response.headers['x-access-token']);
        localStorage.setItem('refresh-token', response.headers['x-refresh-token']);
        localStorage.setItem('userId', response.headers['x-userid']);

        authContext.handleLogin();

        return response;
      }

      // replace expired access token
      if (
        response.config.headers['x-access-token'] &&
        localStorage.getItem('access-token') &&
        response.config.headers['x-access-token'] !== localStorage.getItem('access-token')
      ) {
        localStorage.setItem('access-token', response.config.headers['x-access-token']);

        return response;
      }

      return response;
    });

    return () => {
      requestCancelled.current = true;

      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, [authContext]);

  const sendRequest = useCallback((method, endpoint, formData) => {
    dispatch({ type: 'REQUEST_INIT' });

    axios({
      method: method,
      url: endpoint,
      data: formData
    })
      .then(res => {
        if (!requestCancelled.current) {
          if (method === 'GET' || !method) {
            dispatch({
              type: 'GET_DATA_SUCCESS',
              payload: res.data
            });
          } else {
            dispatch({
              type: 'SENT_DATA_SUCCESS',
              payload: res.data
            });
          }
        }
      })
      .catch(err => {
        if (!requestCancelled.current) {
          try {
            // if the error is a validation error, dispatch validation errors
            if (err.response.data.hasOwnProperty('validationErrors')) {
              let valErrors = {};
              err.response.data.validationErrors.forEach(error => {
                const { param, msg } = error;
                valErrors = { ...valErrors, [param]: msg };
              });

              dispatch({
                type: 'REQUEST_FAIL',
                payload: { validationErrors: valErrors }
              });
            // if the error is an invalid token or user id, logout the user
            } else if (err.response.data.message.includes('token')) {
              authContext.removeAuth();
            // else dispatch the error message
            } else {
              dispatch({
                type: 'REQUEST_FAIL',
                payload: err.response.data.message
              });
            }
          } catch (tryCatchError) {
            dispatch({
              type: 'REQUEST_FAIL',
              payload: 'There was an error attempting to connect to the server. Please check your network connection or try again later.'
            });
          }
        }
      });
  }, [authContext]);

  return {
    loading: state.loading,
    data: state.data,
    error: state.error,
    sendRequest: sendRequest,
    sentDataResponse: state.sentDataResponse
  };
};

export default useAxios;