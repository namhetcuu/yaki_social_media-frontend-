import { api } from "../../config/api";
import { CREATE_POST_REQUEST, CREATE_POST_SUCCESS, 
    CREATE_POST_FAILURE, GET_ALL_POST_REQUEST, 
    GET_ALL_POST_SUCCESS, GET_ALL_POST_FAILURE, 
    GET_USERS_POST_REQUEST, GET_USERS_POST_SUCCESS,
     GET_USERS_POST_FAILURE, LIKE_POST_REQUEST, 
     LIKE_POST_SUCCESS, LIKE_POST_FAILURE, 
     CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS,
      CREATE_COMMENT_FAILURE,GET_POST_REQUEST,GET_POST_SUCCESS,GET_POST_FAILURE, 
      SAVE_POST_SUCCESS,
      SAVE_POST_REQUEST,
      SAVE_POST_FAILURE} from "./post.actionType";

export const createPostAction = (userId, { caption, image }) => async (dispatch, getState) => {
    dispatch({ type: CREATE_POST_REQUEST });

    try {
        const { auth } = getState(); // Lấy token từ Redux state
        const token = auth?.userToken || localStorage.getItem("jwt"); 

        if (!token) {
            throw new Error("Unauthorized: No token provided");
        }

        const payload = { caption, imageUrl: image }; // Đổi `image` thành `imageUrl`
        console.log("Dữ liệu thực sự gửi đi:", JSON.stringify(payload, null, 2));

        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Thêm token vào header
                "Content-Type": "application/json"
            }
        };

        const { data } = await api.post(`/posts/users/${userId}`, payload, config);

        dispatch({ type: CREATE_POST_SUCCESS, payload: data });

        // 🔥 Gọi API để lấy danh sách bài viết mới nhất
        dispatch(getAllPostAction());

        console.log("create post: ", data);
    } catch (error) {
        console.error("Lỗi khi tạo bài viết:", error.response?.data?.message || error.message);
        dispatch({ type: CREATE_POST_FAILURE, payload: error.response?.data?.message || error.message });
    }
};


export const getAllPostAction = () => async (dispatch) => {
    dispatch({ type: GET_ALL_POST_REQUEST });
    try {

        const token = localStorage.getItem("jwt");
        console.log("📌 Token gửi API:", token); // Kiểm tra token

        //const { data } = await api.get("/posts");
        const { data } = await api.get("/posts", {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Dữ liệu API Post trả về:", data); // ✅ Kiểm tra dữ liệu

        if (!Array.isArray(data.result)) {
            console.error("Dữ liệu result không phải là mảng:", data.result);
        }

        dispatch({ type: GET_ALL_POST_SUCCESS, payload: data.result });
    } catch (error) {
        console.error("Lỗi khi lấy tất cả bài viết:", error);
        dispatch({ type: GET_ALL_POST_FAILURE, payload: error });
    }
};

// Lấy bài viết của người dùng
export const getUsersPostAction = (userId) => async (dispatch, getState) => {
    dispatch({ type: GET_USERS_POST_REQUEST });

    try {
        const { auth } = getState();
        const token = auth?.userToken || localStorage.getItem("jwt"); // ✅ Lấy token từ Redux hoặc localStorage

        if (!token) {
            throw new Error("Unauthorized: No token provided");
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await api.get(`/posts/users/${userId}`, config); // ✅ Sửa đường dẫn `/posts/users/` thay vì `/posts/user/`

        console.log("📌 API response:", data); // ✅ Debug response

        if (!Array.isArray(data.result)) {
            console.error("❌ Lỗi: Dữ liệu result không phải là mảng!", data.result);
            throw new Error("Invalid API response format");
        }

        dispatch({ type: GET_USERS_POST_SUCCESS, payload: data.result }); // ✅ Đảm bảo chỉ lấy `data.result`
        console.log("✅ Action GET_USERS_POST_SUCCESS dispatched với payload:", data.result);
    } catch (error) {
        console.error("❌ Lỗi khi lấy bài viết của người dùng:", error.response?.data?.message || error.message);
        dispatch({ type: GET_USERS_POST_FAILURE, payload: error.response?.data?.message || error.message });
    }
};


// Like bài viết
export const likePostAction = (postId, userId) => async (dispatch, getState) => {
    dispatch({ type: LIKE_POST_REQUEST });
    try {
        const { auth } = getState();
        const token = auth?.userToken || localStorage.getItem("jwt");

        if (!token) {
            throw new Error("Unauthorized: No token provided");
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`, 
                "Content-Type": "application/json",
            },
        };

        const { data } = await api.put(`/posts/like/${postId}/users/${userId}`, {}, config);
        dispatch({ type: LIKE_POST_SUCCESS, payload: data });
        console.log("liked post: ", data);

    } catch (error) {
        console.error("Lỗi khi thích bài viết:", error.response?.data?.message || error.message);
        dispatch({ type: LIKE_POST_FAILURE, payload: error.response?.data?.message || error.message });
    }
};


//create comment
export const createCommentAction = (commentData) => async (dispatch) => {
    dispatch({ type: CREATE_COMMENT_REQUEST });
    try {
        const {data} = await api.post(`/comments`,commentData);
        
        dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data });
        console.log("create comment: ", data);
        await dispatch(getAllPostAction())
            
        } catch (error) {
            console.error("Lỗi khi tạo bài viết:", error);
            dispatch({type: CREATE_COMMENT_FAILURE, payload: error})
        }
}

export const getPostByIdAction = (id) => async (dispatch) => {
    dispatch({type: GET_ALL_POST_REQUEST});
    try {
        const token = localStorage.getItem("jwt");
        console.log("📌 Token gửi API:", token); // Kiểm tra token

        const {data} = await api.get(`/posts/${id}`,{
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({type: GET_ALL_POST_SUCCESS, payload: data});
        console.log("get post by id: ",data);
        
    } catch (error) {
        console.error("Lỗi khi get bài viết:", error);
            dispatch({type: GET_ALL_POST_FAILURE, payload: error})
    }
}

export const savedPost = (idPost,idUser,isBookmarked) => async (dispatch) => {
    dispatch({type: SAVE_POST_REQUEST})
    try {
        const token = localStorage.getItem("jwt");
        console.log("📌 Token gửi API:", token); // Kiểm tra token
        if(isBookmarked){
            
            const {data} = await api.delete(`/posts/unsave/${idPost}/users/${idUser}`,{
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch({type: SAVE_POST_SUCCESS, payload: data});
            
        }else{

            const {data} = await api.put(`/posts/save/${idPost}/users/${idUser}`,{},{
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch({type: SAVE_POST_SUCCESS, payload: data});
        }
        await dispatch(getAllPostAction())
        
    } catch (error) {
        console.error("Lỗi khi save bài viết:", error);
        dispatch({type: SAVE_POST_FAILURE, payload: error})
    }
}