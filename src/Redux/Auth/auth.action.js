import axios from "axios";
import { 
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
  GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE
} from "./auth.actionType";
import { API_BASE_URL } from "../../config/api";

// 📌 Lưu token và cập nhật axios header
const storeToken = (token) => {
  if (token) {
    localStorage.setItem("jwt", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

// 📌 Lấy token từ localStorage
const getToken = () => localStorage.getItem("jwt");

// 🔹 Lấy thông tin user
export const fetchUserProfile = () => async (dispatch) => {
  dispatch({ type: GET_PROFILE_REQUEST });

  try {
    const jwt = getToken();
    if (!jwt) throw new Error("⚠ No authentication token found");

    const { data } = await axios.get(`${API_BASE_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage = error.response?.data?.message || "❌ Failed to fetch profile";
    console.error("Profile Error:", errorMessage);

    dispatch({ type: GET_PROFILE_FAILURE, payload: errorMessage });
  }
};

// 🔹 Login Action
export const loginUserAction = (loginData, navigate) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/token`, loginData, {
      headers: { "Content-Type": "application/json" },
    });

    const token = data?.result?.token;
    if (!token) throw new Error("❌ No token received from API");

    storeToken(token);
    dispatch({ type: LOGIN_SUCCESS, payload: { token } });

    // Lấy thông tin người dùng ngay sau khi login
    await dispatch(fetchUserProfile());

    alert("✅ Login successful!");
    navigate("/home");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "❌ Login failed";
    console.error("Login Error:", errorMessage);
    alert(errorMessage);

    dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
  }
};

// 🔹 Register Action
export const registerUserAction = (registerData, navigate) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, registerData, {
      headers: { "Content-Type": "application/json" },
    });

    const token = data?.result?.token;
    if (!token) throw new Error("❌ No token received");

    storeToken(token);
    dispatch({ type: REGISTER_SUCCESS, payload: { token } });

    // Lấy thông tin user ngay sau khi đăng ký
    await dispatch(fetchUserProfile());

    alert("✅ Registration successful!");
    navigate("/home");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "❌ Registration failed";
    console.error("Register Error:", errorMessage);

    dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
  }
};

// 🔹 Update Profile Action
export const updateProfileAction = (reqData) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });

  try {
    const jwt = getToken();
    if (!jwt) throw new Error("⚠ No authentication token found");

    const { data } = await axios.put(`${API_BASE_URL}/users/profile`, reqData, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });

    alert("✅ Profile updated successfully!");
  } catch (error) {
    const errorMessage = error.response?.data?.message || "❌ Profile update failed";
    console.error("Update Profile Error:", errorMessage);

    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: errorMessage });
  }
};

// 🔹 Kiểm tra và load user khi ứng dụng khởi động
export const checkAuthStatus = () => async (dispatch) => {
  const token = getToken();
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await dispatch(fetchUserProfile()); // Gọi API lấy user ngay khi mở app
  }
};
