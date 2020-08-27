import { useReducer, useCallback, useEffect, useRef } from 'react';
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
  const cancelToken = useRef(null);
  axios.defaults.baseURL = 'http://localhost:8080';

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source() 

    return () => {
      if (cancelToken.current) {
        cancelToken.current.cancel()
      }
    };
  }, []);

  const getData = useCallback(endpoint => {
    dispatch({ type: 'REQUEST_INIT' });

    axios.get(endpoint, { cancelToken: cancelToken.current.token })
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
            payload: err.response.data
          }
        );
      });
  }, []);

  const sendData = useCallback((endpoint, method, formData) => {
    dispatch({ type: 'REQUEST_INIT' });

    axios(
      {
        method: method,
        url: endpoint,
        data: formData
      },
      { cancelToken: cancelToken.current.token }
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
            payload: err.response.data
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