const FETCH_RESOURCE_SUCCESS = 'FETCH_RESOURCE_SUCCESS';
const FETCH_RESOURCE_FAILURE = 'FETCH_RESOURCE_FAILURE';

const initialState = {
  resourceData: [],
};

const resourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESOURCE_SUCCESS:
      return {
        ...state,
        resourceData: action.payload,
      };

    default:
      return state;
  }
};

export default resourceReducer;
