export default (state,action)=>{
    switch(action.type){
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        case 'SET_TYPE':
            return {
                ...state,
                type: action.payload
            }
        case 'SET_TOP':
            return {
                ...state,
                top: action.payload
            }
        case 'SET_TIME':
            return {
                ...state,
                time: action.payload
            }
        case 'SET_DATA':
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
        }
}