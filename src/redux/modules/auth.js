const LOAD = 'xianzhi-platform/auth/LOAD';
const LOAD_SUCCESS = 'xianzhi-platform/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'xianzhi-platform/auth/LOAD_FAIL';

const LOGIN = 'xianzhi-platform/auth/LOGIN';
const LOGIN_SUCCESS = 'xianzhi-platform/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'xianzhi-platform/auth/LOGIN_FAIL';

const LOGOUT = 'xianzhi-platform/auth/LOGOUT';
const LOGOUT_SUCCESS = 'xianzhi-platform/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'xianzhi-platform/auth/LOGOUT_FAIL';

const USER = 'xianzhi-platform/auth/USER';
const USER_SUCCESS = 'xianzhi-platform/auth/USER_SUCCESS';
const USER_FAIL = 'xianzhi-platform/auth/USER_FAIL';

const REGISTER = 'xianzhi-platform/auth/REGISTER';
const REGISTER_SUCCESS = 'xianzhi-platform/auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'xianzhi-platform/auth/REGISTER_FAIL';

const VALID = 'xianzhi-platform/auth/VALID';
const VALID_SUCCESS = 'xianzhi-platform/auth/VALID_SUCCESS';
const VALID_FAIL = 'xianzhi-platform/auth/VALID_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: false
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
     case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case USER:
      return {
        ...state,
      };
    case USER_SUCCESS:
      return {
        ...state,
        userData: action.result,
      };
    case USER_FAIL:
      return {
        ...state,
        userError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        isout:action.result,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case REGISTER:
      return {
        ...state,
        registerIn: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerIn: false,
        user:action.result
      };
    case REGISTER_FAIL:
      return {
        ...state,
        registerIn: false,
        registerError: action.error
      };
    case VALID:
      return {
        ...state,
        validIn: true
      };
    case VALID_SUCCESS:
      return {
        ...state,
        validIn: false,
        valid:action.result
      };
    case VALID_FAIL:
      return {
        ...state,
        validIn: false,
        validError: action.error
      };
    default:
      return state;
  }
}
//获取用户是否登录状态
export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}
//取得用户是否登录
export function load() {
  return {
    types: [LOAD,LOAD_SUCCESS,LOAD_FAIL],
    promise: (client) => client.get('/loadAuth')
  };
}
//用户登录
export function login(username,password,captcha,store_login_time){
  return{
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: (client) => client.post('/authorization/client/login',{
      data:{
          username: username,
          password: password,
          captcha: captcha,
          store_login_time:store_login_time
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

//设置用户登录信息
export function setlogin(username,userid,ticket) {
  return {
    types: [USER, USER_SUCCESS, USER_FAIL],
    promise: (client) => client.post('/login', {
      data: {
        username:username,
        userid:userid,
        ticket:ticket
      }
    })
  };
}
//用户退出
export function clientlogout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout')
  };
}

//用户退出
export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.post('/authorization/client/logout').then(function(json){
      return json;
    })
  };
}
//判断用户是否已登录
export function validticket(user_name) {
  return {
    types: [VALID, VALID_SUCCESS, VALID_FAIL],
    promise: (client) => client.post('/authorization/client/validticket',{
      data:{
        user_name:user_name
      }
    }).then(function(json){
      return json;
    })
  };
}

//用户注册
export function userReg(mobile,code,password,type=1,str=null){
  return{
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: (client) => client.get('/authorization/client/register',{
      params:{
          username:mobile,
          mobile:mobile,
          password:password,
          code:code,
          type:type,
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
