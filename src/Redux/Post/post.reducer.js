import { 
    CREATE_COMMENT_SUCCESS,
    CREATE_POST_FAILURE, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, 
    GET_ALL_POST_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, 
    LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, 
    GET_USERS_POST_REQUEST, GET_USERS_POST_SUCCESS, GET_USERS_POST_FAILURE,GET_POST_REQUEST,GET_POST_SUCCESS,
    SAVE_POST_REQUEST,
    SAVE_POST_FAILURE,
    SAVE_POST_SUCCESS
} from "./post.actionType";

const initialState = {
    post: null,        // Lưu trữ bài viết vừa tạo
    posts: [],         // Danh sách tất cả bài viết
    userPosts: [],     // Danh sách bài viết của người dùng cụ thể
    like: null,        // Lưu trữ thông tin bài viết được thích
    loading: false,    // Trạng thái loading
    error: null,       // Lưu lỗi nếu có
    comments: [],      // Danh sách tất cả bình luận
    newComment: null   // Bình luận mới tạo
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_POST_REQUEST:
        case GET_ALL_POST_REQUEST:
        case LIKE_POST_REQUEST:
        case GET_USERS_POST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case CREATE_POST_SUCCESS:
            return {
                ...state,
                post: action.payload,
                posts: [action.payload, ...state.posts],
                loading: false,
                error: null
            };

        case GET_ALL_POST_SUCCESS:
            console.log("📌 Reducer nhận tất cả bài viết:", action.payload);
            return {
                ...state,
                posts: Array.isArray(action.payload) ? [...action.payload] : [],
                loading: false,
                error: null,
            };

        case LIKE_POST_SUCCESS:
            return {
                ...state,
                like: action.payload,
                posts: state.posts.map((item) =>
                    item.id === action.payload.result.id ? action.payload.result : item
                ),
                loading: false,
                error: null
            };

        case CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                newComment: action.payload,
                comments: [action.payload, ...state.comments],
                loading: false,
                error: null
            };

        case GET_USERS_POST_SUCCESS:
            console.log("📌 Reducer nhận userPosts:", action.payload);
            return {
                ...state,
                userPosts: action.payload,
                loading: false,
                error: null
            };

        case CREATE_POST_FAILURE:
        case GET_ALL_POST_FAILURE:
        case LIKE_POST_FAILURE:
        case GET_USERS_POST_FAILURE:
            console.error("🔴 Redux lỗi:", action.payload);
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case GET_POST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                post: null,
            }
        case GET_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                post: action.payload,
            }
        case SAVE_POST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                post: null,
            }
        case SAVE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                
            }
        default:
            return state;
    }
};

export default postReducer;
