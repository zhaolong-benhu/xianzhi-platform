
const LOAD = 'xianzhi-platform/message/LOAD';
const LOAD_SUCCESS = 'xianzhi-platform/message/LOAD_SUCCESS';
const LOAD_FAIL = 'xianzhi-platform/message/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function message(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    default:
      return state;
  }
}
//判断是否加载过
export function isLoaded(globalState) {
  return globalState.message && globalState.message.loaded;
}
//获取通知消息
export function load(){
  return{
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/mv1/user/message/index').then(function(json){
        return json;
    })
  }
}
