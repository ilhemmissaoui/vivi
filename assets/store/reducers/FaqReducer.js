const FETCH_FAQ_SUCCESS = 'FETCH_FAQ_SUCCESS';
const FETCH_FAQ_FAILURE = 'FETCH_FAQ_FAILURE';

const initialState = {
  faqData: [],
};

const faqReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAQ_SUCCESS:
      return {
        ...state,
        faqData: action.payload,
      };

    default:
      return state;
  }
};

export default faqReducer;
