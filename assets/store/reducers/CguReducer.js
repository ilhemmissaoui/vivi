const FETCH_CGU_SUCCESS = 'FETCH_CGU_SUCCESS';
const FETCH_CGU_FAILURE = 'FETCH_CGU_FAILURE';

const initialState = {
  cguData: [],
};

const cguReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CGU_SUCCESS:
      return {
        ...state,
        cguData: action.payload,
      };

    default:
      return state;
  }
};

export default cguReducer;
