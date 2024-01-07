const FETCH_PC_SUCCESS = 'FETCH_PC_SUCCESS';
const FETCH_PC_FAILURE = 'FETCH_PC_FAILURE';
const initialState = {
  pcData: [],
};

const pcReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PC_SUCCESS:
      return {
        ...state,
        pcData: action.payload,
      };

    default:
      return state;
  }
};

export default pcReducer;
