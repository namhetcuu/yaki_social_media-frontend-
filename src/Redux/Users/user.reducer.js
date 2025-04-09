import { GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS } from "./user.actionType";

const initialState = {
  allUsers: {},  // Lưu user theo ID { "userId1": {name, avatar}, "userId2": {name, avatar} }
  loading: false,
  error: null
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_USERS_SUCCESS:
      return { ...state, loading: false, allUsers: { ...state.allUsers, ...action.payload } };

    case GET_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
      

    default:
      return state;
  }
};
