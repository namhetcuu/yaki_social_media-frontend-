import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import {
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  GET_USERS_REQUEST,GET_USERS_SUCCESS,GET_USERS_FAILURE
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

// 🔹 Lấy danh sách người dùng
export const getStoriesAction = () => async (dispatch) => {
  dispatch({ type: GET_ALL_USERS_REQUEST });
  try {
    setAuthHeader(); // Đảm bảo luôn có token trước khi gửi yêu cầu
    const { data } = await api.get("/users");
    console.log("Danh sách story của các user trả về:", data); 
    dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
  } catch (error) {
    console.error("❌ Get Users Error:", error.response?.data?.message || error.message);
    dispatch({ type: GET_ALL_USERS_FAIL, payload: error.message });
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

