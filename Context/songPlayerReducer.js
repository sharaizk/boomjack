export const initialState = {
    currentIndex:null,
    sound: null,
    isPlaying: false,
    isFinished:false,
    currentTime: 0,
    totalTime:0
}

export const reducer = (state, action)=>{
    switch(action.type){
    case 'currentIndex':
        return{...state, currentIndex:action.payload}
    case 'sound':
        return {...state, sound: action.payload}
    case 'isPlaying':
        return {...state, isPlaying:action.payload}
    case 'isFinished':
        return {...state, isFinished: action.payload}
    case 'currentTime':
        return {...state, currentTime: action.payload}
    case 'totalTime':
        return {...state, totalTime:action.payload}
    default:
        return state 
    }
}