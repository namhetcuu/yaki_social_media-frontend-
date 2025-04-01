import { GET_USERS_FAILURE, GET_USERS_REQUEST, GET_USERS_SUCCESS } from "./user.actionType";

const initialState = {
  users: {},  // Lưu user theo ID { "userId1": {name, avatar}, "userId2": {name, avatar} }
  loading: false,
  error: null
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { 
        ...state, 
        loading: true, 
        error: null // ✅ Reset lỗi khi bắt đầu request
      };

    case GET_USERS_SUCCESS:
      if (!Array.isArray(action.payload)) {
        console.error("❌ GET_USERS_SUCCESS payload is not an array:", action.payload);
        return { ...state, loading: false, error: "Invalid response data" };
      }

      const newUsers = state.users ? { ...state.users } : {};
      action.payload.forEach(user => {
        if (user?.id) {
          newUsers[user.id] = user;  // ✅ Chỉ thêm nếu user có `id`
        }
      });

      return { 
        ...state, 
        loading: false, 
        users: newUsers
      };

    case GET_USERS_FAILURE:
      return { 
        ...state, 
        loading: false, 
        error: action.payload // ✅ Giữ nguyên users khi lỗi xảy ra
      };

    default:
      return state;
  }
};
