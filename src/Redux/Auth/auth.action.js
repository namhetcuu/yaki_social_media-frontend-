import axios from "axios";
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
  GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_REQUEST,
  SEARCH_USER_FAILURE
} from "./auth.actionType";
import { API_BASE_URL } from "../../config/api";
import { getAllPostAction } from "../Post/post.action";

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
export const loginUserAction = (loginData, navigate) => async (dispatch) => {
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

    navigate("/home");
  } catch (error) {
    console.error("❌ Login Error:", error.response?.data?.message || error.message);
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

// 🔹 Register Action
export const registerUserAction = (registerData, navigate) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await api.post("/auth/signup", registerData);
    
    const token = data?.result?.token;
    if (!token) throw new Error("No token received");

    storeToken(token);
    dispatch({ type: REGISTER_SUCCESS, payload: { token } });
    
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
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await dispatch(fetchUserProfile()); // Load lại user khi reload
    await dispatch(getAllPostAction()); // Load lại danh sách bài viết khi reload
  }
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
