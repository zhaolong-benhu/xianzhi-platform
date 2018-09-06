
const LOAD = 'xianzhi-platform/sysmessage/LOAD';
const LOAD_SUCCESS = 'xianzhi-platform/sysmessage/LOAD_SUCCESS';
const LOAD_FAIL = 'xianzhi-platform/sysmessage/LOAD_FAIL';
const LOAD_ORD = 'xianzhi-platform/sysmessage/LOAD_ORD';
const LOAD_ORD_SUCCESS = 'xianzhi-platform/sysmessage/LOAD_ORD_SUCCESS';
const LOAD_ORD_FAIL = 'xianzhi-platform/sysmessage/LOAD_ORD_FAIL';

const initialState = {
  loaded: false,
  loaded_ord:false
};

export default function sysmessage(state = initialState, action = {}) {
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
      case LOAD_ORD:
        return {
          ...state,
          loading: true
        };
      case LOAD_ORD_SUCCESS:
        return {
          ...state,
          loading: false,
          loaded_ord: true,
          data: action.result
        };
      case LOAD_ORD_FAIL:
        return {
          ...state,
          loading: false,
          loaded_ord: false,
          data: null,
          error: action.error
        };
    default:
      return state;
  }
}
//判断是否加载过
export function isLoaded(globalState) {
  return globalState.sysmessage && globalState.sysmessage.loaded;
}
//判断是否加载过
export function isLoaded_ord(globalState) {
  return globalState.sysmessage && globalState.sysmessage.loaded_ord;
}
//获取系统通知数据
export function loadsysdata(page){
  return{
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/mv1/user/message/list',{
      data:{
        type:1,
        page:page
      }
    }).then(function(json){
        return json;
    })
  }
}
//获取系统提醒数据
export function loadorddata(page){
  return{
    types: [LOAD_ORD, LOAD_ORD_SUCCESS, LOAD_ORD_FAIL],
    promise: (client) => client.post('/mv1/user/message/list',{
      data:{
        type:2,
        page:page
      }
    }).then(function(json){
        return json;
    })
  }
}
