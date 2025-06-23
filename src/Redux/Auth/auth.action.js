import axios from "axios";
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
  GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_REQUEST,
  SEARCH_USER_FAILURE,
  
} from "./auth.actionType";
import { API_BASE_URL } from "../../config/api";
import { getAllPostAction } from "../Post/post.action";
import  isTokenExpired  from '../../utils/tokenUtils';

// 🔹 Cấu hình Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// 📌 Lưu token vào localStorage
const storeToken = (token) => {
  if (token) {
    localStorage.setItem("jwt", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

// 📌 Xóa token khỏi localStorage
const removeToken = () => {
  localStorage.removeItem("jwt");
  delete api.defaults.headers.common["Authorization"];
};

// 📌 Lấy token từ localStorage
const getToken = () => localStorage.getItem("jwt");

// 📌 Cập nhật token nếu có khi load ứng dụng
const setAuthHeader = () => {
  const token = getToken();
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// 🔹 Lấy thông tin user
export const fetchUserProfile = () => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });
  try {
    setAuthHeader();
    const { data } = await api.get("/users/profile");
    dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.error("❌ Profile Error:", error.response?.data?.message || error.message);
    dispatch({ type: GET_PROFILE_FAILURE, payload: error.message });
  }
};

// 🔹 Login Action
export const loginUserAction = (loginData, navigate, onSuccess, onError) => async (dispatch) => {
  //có tác dụng gửi một action đến Redux store để thông báo rằng một hành động đã xảy ra.
  //dispatch là hàm do Redux cung cấp để gửi các action đến store.
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await api.post("/auth/token", loginData);
    
    const token = data?.result?.token;
    if (!token) throw new Error("No token received from API");

    storeToken(token);
    dispatch({ type: LOGIN_SUCCESS, payload: { token } });
    
    // Gọi thêm các action khác để lấy thông tin user và danh sách bài viết
    //Hai action này cũng là thunk, nên await để đảm bảo hoàn thành trước khi điều hướng.
    await dispatch(fetchUserProfile());
    await dispatch(getAllPostAction());

    onSuccess?.(); // 👈 Gọi callback nếu có
    navigate("/home");
  } catch (error) {
    console.error("❌ Login Error:", error.response?.data?.message || error.message);
    dispatch({ type: LOGIN_FAILURE, payload: error.message });

    onError?.(error.message); // 👈 Gọi callback nếu có lỗi
  }
};

// 🔹 Register Action
export const registerUserAction = (registerData, navigate, onSuccess) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await api.post("/auth/signup", registerData);
    
    const token = data?.result?.token;
    if (!token) throw new Error("No token received");

    storeToken(token);
    dispatch({ type: REGISTER_SUCCESS, payload: { token } });

    if (onSuccess) onSuccess(); // 👈 Gọi callback nếu có
    
    await dispatch(fetchUserProfile());
    navigate("/home");
  } catch (error) {
    console.error("❌ Register Error:", error.response?.data?.message || error.message);
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
  }
};

// 🔹 Update Profile Action
export const updateProfileAction = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });
  try {
    setAuthHeader();
    const { data } = await api.put("/users/profile", reqData);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    console.error("❌ Update Profile Error:", error.response?.data?.message || error.message);
    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error.message });
  }
};

// 🔹 Kiểm tra và load user khi ứng dụng khởi động
export const checkAuthStatus = () => async (dispatch) => {
  const token = getToken();
  if (token) {
    if(isTokenExpired(token)) {
      console.log("token expired");
      
      removeToken();
      delete axios.defaults.headers.common["Authorization"];
      dispatch(logoutUserAction());
      return;
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      await dispatch(fetchUserProfile()); // Load lại user khi reload
      await dispatch(getAllPostAction()); // Load lại danh sách bài viết khi reload
    } catch (error) {
      console.log("❌ Check Auth Error:", error.response?.data?.message || error.message);
      
    }
    
  }
};

// 🔹 Logout Action
export const logoutUserAction = () => (dispatch) => {
  removeToken();
  dispatch({ type: LOGIN_FAILURE, payload: "Logged out successfully" });
  dispatch({ type: GET_PROFILE_SUCCESS, payload: null }); // Reset user profile
  dispatch({ type: SEARCH_USER_SUCCESS, payload: [] }); // Reset search results
};

export const searchUser = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_USER_REQUEST });
  try {
    
    const { data } = await api.get(`/users/search?query=${query}`);
    console.log("search user----",data);
    
    dispatch({ type: SEARCH_USER_SUCCESS, payload: data });
  } catch (error) {
    console.error("❌ Profile Error:", error.response?.data?.message || error.message);
    dispatch({ type: SEARCH_USER_FAILURE, payload: error.message });
  }
};

export const forgotPasswordAction = (email, callback) => async () => {
  try {
    const res = await api.post('/auth/forgot-password', { email });
    callback(res.data.message, true);
  } catch (error) {
    callback(error.response?.data?.message || 'Failed to send reset link', false);
  }
};

export const resetPasswordAction = (token, newPassword, callback) => async () => {
  try {
    const res = await api.post(`/auth/reset-password/${token}`, { password: newPassword });
    callback(res.data.message, true);
  } catch (error) {
    callback(error.response?.data?.message || 'Failed to reset password', false);
  }
};



