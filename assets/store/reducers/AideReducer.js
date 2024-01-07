const FETCH_AIDE_SUCCESS = 'FETCH_AIDE_SUCCESS';
const FETCH_AIDE_BY_FILTER_SUCCESS = 'FETCH_AIDE_BY_FILTER_SUCCESS';

const initialState = {
  aideData: [],
  aideDataByEffectif: [],
};

const aideReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AIDE_SUCCESS:
      return {
        ...state,
        aideData: action.payload,
      };
    case FETCH_AIDE_BY_FILTER_SUCCESS:
      return {
        ...state,
        aideDataByEffectif: action.payload,
      };
    default:
      return state;
  }
};

export default aideReducer;
