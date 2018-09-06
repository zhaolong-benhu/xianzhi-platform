const SMS = 'xianzhi-platform/register/SMS';
const SMS_SUCCESS = 'xianzhi-platform/register/SMS_SUCCESS';
const SMS_FAIL = 'xianzhi-platform/register/SMS_FAIL';
const VERIFY = 'xianzhi-platform/register/VERIFY';
const VERIFY_SUCCESS = 'xianzhi-platform/register/VERIFY_SUCCESS';
const VERIFY_FAIL = 'xianzhi-platform/register/VERIFY_FAIL';

const PHONE = 'xianzhi-platform/register/PHONE';
const PHONE_SUCCESS = 'xianzhi-platform/register/PHONE_SUCCESS';
const PHONE_FAIL = 'xianzhi-platform/register/PHONE_FAIL';

const initialState = {
  flag: null
};

export default function register(state = initialState, action = {}) {
  switch (action.type) {
    case SMS:
      return state;

    case SMS_SUCCESS:
      return {
        ...state,
        sms: action.result
      };
    case SMS_FAIL:
     return {
        ...state,
        sendError: action.error
      };
    case VERIFY:
      return state;

    case VERIFY_SUCCESS:
      return {
        ...state,
        verify: action.result
      };
    case VERIFY_FAIL:
     return {
        ...state,
        verifyError: action.error
      };

    case PHONE:
      return state;

    case PHONE_SUCCESS:
      return {
        ...state,
        phone: action.result
      };
    case PHONE_FAIL:
     return {
        ...state,
        phoneError: action.error
      };
    default:
      return state;
  }
}

//验证短信
export function verifyCaptcha(mobile,code){
  return{
    types: [VERIFY, VERIFY_SUCCESS, VERIFY_FAIL],
    promise: (client) => client.get('sso.9first.com/user/code_verify',{
      params:{
        callbackParam:'callback',
        return_type:"callback_json",
        sms_type:"6",
        mobile: mobile,
        code: code
      }
    }).then(function(data){
      return data;
    })
  }
}
//发送短信
export function sendCaptcha(mobile,captcha,sms=6){
  return{
    types: [SMS, SMS_SUCCESS, SMS_FAIL],
    promise: (client) => client.get('sso.9first.com/user/mobile_code',{
      params:{
        callbackParam:'callback',
        return_type:"callback_json",
        sms_type:sms,
        mobile: mobile,
        captcha: captcha
      }
    }).then(function(data){
      return data;
    })
  }
}
//修改绑定手机号
export function phoneBind(mobile,code){
  return{
    types: [PHONE, PHONE_SUCCESS, PHONE_FAIL],
    promise: (client) => client.post('/mv1/user/account/bind',{
      data:{
        code: code,
        mobile: mobile
      }
    }).then(function(data){
      return data;
    })
  }
}
//获取绑定手机号短信
export function sendCode(mobile){
  return{
    types: [SMS, SMS_SUCCESS, SMS_FAIL],
    promise: (client) => client.post('/mv1/user/account/code',{
      data:{
        mobile: mobile
      }
    }).then(function(data){
      return data;
    })
  }
}
