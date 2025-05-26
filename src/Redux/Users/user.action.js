import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import {
  GET_USERS_REQUEST,GET_USERS_SUCCESS,GET_USERS_FAILURE,
   GET_ALL_STORY_USER_REQUEST, GET_ALL_STORY_USER_SUCCESS,
    GET_ALL_STORY_USER_FAIL,
    GET_LIST_USER_WITH_STATUS_REQUEST,
  GET_LIST_USER_WITH_STATUS_SUCCESS,
} from "./user.actionType";

// 🔹 Cấu hình Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// 📌 Lấy token từ localStorage
const getToken = () => localStorage.getItem("jwt");

// 📌 Cập nhật token nếu có
const setAuthHeader = () => {
  const token = getToken();
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

//Những action gọi API thường phải có async, await vì chúng thường trả về 1 promise, 
// 1 promise tượng trưng cho 1 action tốn thời gian để trả dữ liệu về

// 🔹 Lấy danh sách người dùng
export const getReelsAction = (userId) => async (dispatch) => {
  dispatch({ type: GET_ALL_STORY_USER_REQUEST });
  try {
    setAuthHeader(); // Đảm bảo luôn có token trước khi gửi yêu cầu
    const { data } = await api.get(`/reels/user/${userId}`);
    console.log("Danh sách story của các user trả về:", data); 
    dispatch({ type: GET_ALL_STORY_USER_SUCCESS, payload: data.result });
  } catch (error) {
    console.error("❌ Get Users Error:", error.response?.data?.message || error.message);
    dispatch({ type: GET_ALL_STORY_USER_FAIL, payload: error.message });
  }
};

export const getUsersByIds = (userIds) => async (dispatch, getState) => {
  if (!userIds || userIds.length === 0) {
      console.log('No userIds provided, skipping request');
      return;
  }
  console.log('Starting getUsersByIds with userIds:', userIds);
  dispatch({ type: GET_USERS_REQUEST });
  try {
      const { auth } = getState();
      const token = auth?.userToken || localStorage.getItem("jwt");
      console.log('Token checked in getUsersByIds:', token);
      if (!token) {
          throw new Error("Unauthorized: No token provided");
      }
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const userPromises = userIds.map(async (id) => {
          console.log(`Fetching user with ID: ${id}`);
          const { data } = await api.get(`/users/${id}`);
          console.log(`User details for ${id} from API:`, data);
          return { [id]: data.result || data };
      });
      const userResults = await Promise.all(userPromises);
      //Dùng Promise.all để chờ tất cả kết quả trả về.
      // Gộp kết quả thành object payload rồi dispatch lên Redux.
      const payload = Object.assign({}, ...userResults);
      console.log('Payload to dispatch:', payload);
      dispatch({ type: GET_USERS_SUCCESS, payload });
      // return { type: GET_USERS_SUCCESS, payload };
  } catch (error) {
      console.error("❌ Get Users Error:", error.response?.data?.message || error.message);
      dispatch({ type: GET_USERS_FAILURE, payload: error.message });
      throw error;
  }
};

export const getUserWithFollowStatus = (userId) => async (dispatch) => {
  dispatch({type: GET_LIST_USER_WITH_STATUS_REQUEST});
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const {data} = await api.get(`/users/users-with-follow-status/${userId}`,config);
    console.log("Api response: ", data);
    
    if(!Array.isArray(data.result)){
      console.error("Data Response is not Array");
      throw new Error("Invalid API response format");
      
    }
    dispatch({type: GET_LIST_USER_WITH_STATUS_SUCCESS, payload: data.result})

  } catch (error) {
    console.log(" Error:", error.response?.data?.message || error.message);
    
  }
}

export const followUser = (userId1,userId2) => async (dispatch) => {
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await api.put(`/users/follow/${userId1}/${userId2}`,{},config);
    dispatch(getUserWithFollowStatus(userId1))
  } catch (error) {
     console.error("❌ Follow Error:", error.response?.data?.message || error.message);
  }
}

export const unfollowUser = (userId1,userId2) => async (dispatch) => {
  try {
    const token = getToken();
    const config = {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    };
    await api.delete(`/users/unfollow/${userId1}/${userId2}`, config);
    dispatch(getUserWithFollowStatus(userId1));
  } catch (error) {
     console.error("❌ UnFollow Error:", error.response?.data?.message || error.message);
  }
}