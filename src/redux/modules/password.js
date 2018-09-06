const PASSWORD = 'xianzhi-platform/password/PASSWORD';
const PASSWORD_SUCCESS = 'xianzhi-platform/password/PASSWORD_SUCCESS';
const PASSWORD_FAIL = 'xianzhi-platform/password/PASSWORD_FAIL';
const UPDATE_PASSWORD = 'xianzhi-platform/password/UPDATE_PASSWORD';
const UPDATE_PASSWORD_SUCCESS = 'xianzhi-platform/password/UPDATE_PASSWORD_SUCCESS';
const UPDATE_PASSWORD_FAIL = 'xianzhi-platform/password/UPDATE_PASSWORD_FAIL';

const initialState = {
  flag: null
};

export default function password(state = initialState, action = {}) {
  switch (action.type) {
  	case PASSWORD:
      return {
        ...state,
        passwordIn: true
      };
    case PASSWORD_SUCCESS:
      return {
        ...state,
        passwordIn: false,
        password: action.result
      };
    case PASSWORD_FAIL:
      return {
        ...state,
        passwordIn: false,
        error: action.error
      };


    case UPDATE_PASSWORD:
      return {
        ...state,
        updata_passwordIn: false
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        updata_passwordIn:true,
        result: action.result
      };
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        updata_passwordIn: false,
        error: action.error
      };
    default:
      return state;
  }
}
//手机找回密码
export function getPassword(mobile,code,password){
  return{
    types: [PASSWORD, PASSWORD_SUCCESS, PASSWORD_FAIL],
    promise: (client) => client.get('sso.9first.com/user/forget_password',{
      params:{
        callbackParam:'callback',
        return_type:"callback_json",
        method: 'mobile',
        field: 'mobile',
        encoding: 'utf-8',
        value: mobile,
        code: code,
        password: password
      }
    }).then(function(data){
      return data;
    })
  }
}
//修改密码
export function resetPassWord(oldPassword,newPassword){
  return{
    types: [UPDATE_PASSWORD, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL],
    promise: (client) => client.post('/authorization/client/resetpassword',{
      data:{
        oldPassword:oldPassword,
        newPassword:newPassword
      }
    }).then(function(json){
        return json;
    })
  }
}
