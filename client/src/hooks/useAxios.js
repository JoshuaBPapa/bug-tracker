import { useReducer, useCallback, useEffect } from 'react';
import axios from 'axios';

const fetchReducer = (state, action) => {
  switch (action.type) {
    case 'REQUEST_INIT':
      return {
        loading: true,
        data: null,
        error: null
      }
    case 'REQUEST_SUCCESS':
      return {
        loading: false,
        data: action.payload,
        error: null
      }
    case 'REQUEST_FAIL':
      return {
        loading: false,
        data: null,
        error: action.payload
      }
    default:
      throw new Error();
  };
};

const useAxios = () => {
  const [state, dispatch] = useReducer(fetchReducer, {
    loading: false,
    data: null,
    error: null
  });
  axios.defaults.baseURL = 'http://localhost:8080';

  useEffect(() => {
    const source = axios.CancelToken.source();

    return () => {
      source.cancel('component was unmounted')
    };
  });

  const getData = useCallback(endpoint => {
    dispatch({ type: 'REQUEST_INIT' });

    axios.get(endpoint)
      .then(res => {
        dispatch(
          {
            type: 'REQUEST_SUCCESS',
            payload: res.data
          }
        );
      })
      .catch(err => {
        dispatch(
          {
            type: 'REQUEST_FAIL',
            payload: err
          }
        );
      });
  }, []);

  const sendData = useCallback((endpoint, method, formData) => {
    axios(
      {
        method: method,
        url: endpoint,
        data: formData
      }
    )
      .then(res => {
        dispatch(
          {
            type: 'REQUEST_SUCCESS',
            payload: res.data
          }
        );
      })
      .catch(err => {
        dispatch(
          {
            type: 'REQUEST_FAIL',
            payload: err.response.data.errors
          }
        )
      });
  }, []);

  return {
    loading: state.loading,
    data: state.data,
    error: state.error,
    sendData: sendData,
    getData: getData
  };
};

export default useAxios;