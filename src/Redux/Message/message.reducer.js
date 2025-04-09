import * as actionType from "../Message/message.actionType";
const initialState = {
    messages:[],
    chats:[],
    loading: false,
    error: null,
    message:null
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
            return {...state,chats:[action.payload,...state.chats]}
            
        case actionType.GET_ALL_CHATS_SUCCESS:
            return {...state,chats:action.payload}
        case actionType.GET_MESSAGES_SUCCESS:
            return {
                ...state,
                messages: action.payload,  // Lưu payload từ action vào state
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