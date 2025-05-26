import { GET_USERS_FAILURE, GET_USERS_REQUEST, 
  GET_USERS_SUCCESS, GET_ALL_STORY_USER_SUCCESS,
  GET_LIST_USER_WITH_STATUS_SUCCESS } from "./user.actionType";

const initialState = {
  allUsers: {},  // Lưu user theo ID { "userId1": {name, avatar}, "userId2": {name, avatar} }
  loading: false,
  error: null,
  reels: [],
  userWithFollow: []
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_USERS_SUCCESS:
      return { ...state, loading: false, allUsers: { ...state.allUsers, ...action.payload } };

    case GET_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GET_ALL_STORY_USER_SUCCESS:
      return { ...state, loading: false ,reels: action.payload};
    case GET_LIST_USER_WITH_STATUS_SUCCESS:{
      return {
        ...state,
        userWithFollow:action.payload,
        loading:false,
        error:null
        }
      }
    default:
      return state;
  }
};
