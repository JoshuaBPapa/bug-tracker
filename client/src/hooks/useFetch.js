import { useReducer, useCallback } from 'react';

const fetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        data: null,
        error: null
      }
    case 'FETCH_SUCCESS':
      return {
        loading: false,
        data: action.payload,
        error: null
      }
    case 'FETCH_FAIL':
      return {
        loading: false,
        data: null,
        error: action.payload
      }
    default:
      throw new Error();
  }
}

const useFetch = () => {
  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    error: null
  });

  const fetchData = useCallback(endpoint => {
    let requestCancelled = false;
    
    dispatch({ type: 'FETCH_INIT' });
    
    let url = `http://localhost:8080/${endpoint}`;
    fetch(url)
      .then(res => {
        if (!requestCancelled) {
          return res.json();
        }
      })
      .then(data => {
        dispatch(
          {
            type: 'FETCH_SUCCESS',
            payload: data
          }
        );
      })
      .catch(err => {
        dispatch(
          {
            type: 'FETCH_FAIL',
            payload: err
          }
        );
      });

    return () => {
      requestCancelled = true;
    }
  }, []);

  return {
    data: state.data,
    error: state.error,
    fetchData: fetchData
  };
};

export default useFetch;