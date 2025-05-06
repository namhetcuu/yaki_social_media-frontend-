import * as actionType from "../Message/message.actionType";
const initialState = {
    messages:[],
    chats:[],
    loading: false,
    error: null,
    message:null// Tin nhắn mới được tạo thành công (thường dùng để thông báo)
}
const messageReducer=(state=initialState, action) => {
    switch (action.type) {
    
        case actionType.CREATE_MESSAGE_SUCCESS:
            return {
                ...state,
                message:action.payload,
                loading: false,
                error: null,
            }
 
            
        case actionType.CREATE_CHAT_SUCCESS:
            return {...state,chats:[action.payload,...state.chats]}// Thêm chat mới vào đầu danh sách chats
            
        case actionType.GET_ALL_CHATS_SUCCESS:
            return {...state,chats:action.payload}// Cập nhật danh sách chats từ API
        case actionType.GET_MESSAGES_SUCCESS:
            return {
                ...state,
                messages: action.payload,  // Lưu payload từ action vào state, Cập nhật danh sách tin nhắn trong chat hiện tại
            };
        case actionType.GET_MESSAGES_FAILURE:
            return {
                ...state,
                error: action.error,
            };
    
        default:
            return state;
    }
}

export default messageReducer;