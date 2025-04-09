import { api } from "../../config/api"; 
import * as actionType from "../Message/message.actionType";
export const createMessage = (reqData)=>async(dispatch, getState)=>{
    dispatch({type:actionType.CREATE_MESSAGE_REQUEST})

    try {
        const state = getState();
        const token = state.auth?.userToken || localStorage.getItem("jwt");

        if (!token) {
            throw new Error("Unauthorized: No token provided");
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        };

        const {data} = await api.post(`/message`,reqData,config)

        //reqData.sendMessageToServer(data)

        console.log("create message: ", data);
        dispatch({type:actionType.CREATE_MESSAGE_SUCCESS,payload:data.result})

        return { payload: data.result, success: true };
        
    } catch (error) {
        console.error("Lỗi khi tạo bài viết:", error.response?.data?.message || error.message);
        dispatch({ type: actionType.CREATE_MESSAGE_FAILURE, payload: error.response?.data?.message || error.message });
    }
}

export const getMessages = (chatId)=>async(dispatch, getState)=>{
    dispatch({type:actionType.GET_MESSAGES_REQUEST})

    try {
        const state = getState();
        const token = state.auth?.userToken || localStorage.getItem("jwt");

        if (!token) {
            throw new Error("Unauthorized: No token provided");
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        };

        const {data} = await api.get(`/message/chat-messages/${chatId}`,config)
        console.log("get messages: ", data);
        dispatch({type:actionType.GET_MESSAGES_SUCCESS,payload:data.result})
        return { messages: data.result }; 

    } catch (error) {
        console.error("Lỗi khi lấy danh sách bài viết:", error.response?.data?.message || error.message);
        dispatch({ type: actionType.GET_MESSAGES_FAILURE, payload: error.response?.data?.message || error.message });
    }
}

export const createChat = (chat) => async (dispatch, getState) => {
    dispatch({ type: actionType.CREATE_CHAT_REQUEST });

    try {
        const state = getState();
        const token = state.auth?.userToken || localStorage.getItem("jwt");

        if (!token) {
            throw new Error("Unauthorized: No token provided");
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        };

        const { data } = await api.post(`/chat`, chat, config);
        console.log("✅ Chat created:", data);

        if (data.code === 1000) {
            dispatch({
                type: actionType.CREATE_CHAT_SUCCESS,
                payload: data.result
            });

            // 🔄 Load lại danh sách chat của user sau khi tạo
            const userId = state.auth?.user?.id;
            if (userId) {
                dispatch(getAllChats(userId));
            }
        } else {
            throw new Error(data.message || "Lỗi không xác định");
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;

        if (error.response?.status === 401) {
            console.error("⛔ Unauthorized: Token is invalid or expired");
        } else {
            console.error("❌ Lỗi khi tạo chat:", errorMessage);
        }

        dispatch({
            type: actionType.CREATE_CHAT_FAILURE,
            payload: errorMessage
        });
    }
};



export const getAllChats = (userId)=>async(dispatch, getState)=>{
    dispatch({type:actionType.GET_ALL_CHATS_REQUEST})

    try {
        const state = getState();

        const token = state.auth?.userToken || localStorage.getItem("jwt");

        if (!token) {
            throw new Error("Unauthorized: No token provided");
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        };

        const {data} = await api.get(`/chat/user/${userId}`, config)
        console.log("get all chats: ", data);
        dispatch({type:actionType.GET_ALL_CHATS_SUCCESS,payload:data.result})
        return { payload: data.result };
    } catch (error) {
        console.error("Lỗi khi lay danh sach chat:", error.response?.data?.message || error.message);
        dispatch({ type: actionType.GET_ALL_CHATS_FAILURE, payload: error.response?.data?.message || error.message });
    }
}