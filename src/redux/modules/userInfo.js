const LOAD = 'xianzhi-platform/userInfo/LOAD';
const LOAD_SUCCESS = 'xianzhi-platform/userInfo/LOAD_SUCCESS';
const LOAD_FAIL = 'xianzhi-platform/userInfo/LOAD_FAIL';

const UPDATE = 'xianzhi-platform/userInfo/UPDATE';
const UPDATE_SUCCESS = 'xianzhi-platform/userInfo/UPDATE_SUCCESS';
const UPDATE_FAIL = 'xianzhi-platform/userInfo/UPDATE_FAIL';

const INFO = 'xianzhi-platform/userInfo/INFO';
const INFO_SUCCESS = 'xianzhi-platform/userInfo/INFO_SUCCESS';
const INFO_FAIL = 'xianzhi-platform/userInfo/INFO_FAIL';

const CODE = 'xianzhi-platform/userInfo/CODE';
const CODE_SUCCESS = 'xianzhi-platform/userInfo/CODE_SUCCESS';
const CODE_FAIL = 'xianzhi-platform/userInfo/CODE_FAIL';

const AVATAR = 'xianzhi-platform/userInfo/AVATAR';
const AVATAR_SUCCESS = 'xianzhi-platform/userInfo/AVATAR_SUCCESS';
const AVATAR_FAIL = 'xianzhi-platform/userInfo/AVATAR_FAIL';


const initialState = {
  loaded: false
};

export default function userInfo(state = initialState, action = {}) {
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
    case INFO:
      return {
        ...state
      };
    case INFO_SUCCESS:
      return {
        ...state,
        info: action.result
      };
    case INFO_FAIL:
      return {
        ...state,
        info: null,
        info_error: action.error
      };
    case UPDATE:
      return {
        ...state
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        flag: action.result
      };
    case UPDATE_FAIL:
      return {
        ...state,
        flag: null,
        update_error: action.error
      };
    case CODE:
      return {
        ...state
      };
    case CODE_SUCCESS:
      return {
        ...state,
        code: action.result
      };
    case CODE_FAIL:
      return {
        ...state,
        code: null,
        code_error: action.error
      };
    case AVATAR:
      return {
        ...state
      };
    case AVATAR_SUCCESS:
      return {
        ...state,
        avatar: action.result
      };
    case AVATAR_FAIL:
      return {
        ...state,
        avatar: null,
        avatar_error: action.error
      };
    default:
      return state;
  }
}
//判断是否加载过
export function isLoaded(globalState) {
  return globalState.userInfo && globalState.userInfo.loaded
}

//获取用户中心基本信息
export function load(){
  return{
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/mv1/user/info/detail').then(function(json){
      if(json.status==1){
        return json.data;
      }
      else{
        return json;
      }
    })
  }
}
//获取用户信息
export function loadUserInfo(){
  return{
    types: [INFO, INFO_SUCCESS, INFO_FAIL],
    promise: (client) => client.post('/mv1/user/info').then(function(json){
      if(json.status==1){
        return json.data;
      }
      else{
        return json;
      }
    })
  }
}
//我要赚钱（用户）信息
export function recommendUserInfo(str){
  return{
    types: [INFO, INFO_SUCCESS, INFO_FAIL],
    promise: (client) => client.get('/mv1/home/user-info',{
      params:{
        str:str
      }
    }).then(function(json){
      if(json.status==1){
        return json.data;
      }
      else{
        return json;
      }
    })
  }
}

//修改基本信息
export function updataUserInfo(phone,name,gender){
  return{
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (client) => client.post('/mv1/user/account/basic',{
      data:{
        "user_detail[phone]":phone,
        "user_detail[name]":name,
        "user_detail[gender]":gender
      }
    }).then(function(json){
        return json;
    })
  }
}
//用户头像修改
export function updateAvatar(avatar){
  return{
    types: [AVATAR, AVATAR_SUCCESS, AVATAR_FAIL],
    promise: (client) => client.post('/mv1/user/account/updateavatar',{
      data:{
        avatar:avatar
      }
    }).then(function(json){
        return json;
    })
  }
}
//我要赚钱用户信息
export function userCode(){
  return{
    types: [CODE, CODE_SUCCESS, CODE_FAIL],
    promise: (client) => client.post('/mv1/user/account/qcode').then(function(json){
        return json;
    })
  }
}
