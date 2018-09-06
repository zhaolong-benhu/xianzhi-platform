const LOAD = 'xianzhi-platform/withdrawals/LOAD';
const LOAD_SUCCESS = 'xianzhi-platform/withdrawals/LOAD_SUCCESS';
const LOAD_FAIL = 'xianzhi-platform/withdrawals/LOAD_FAIL';

const CHECK = 'xianzhi-platform/withdrawals/CHECK';
const CHECK_SUCCESS = 'xianzhi-platform/withdrawals/CHECK_SUCCESS';
const CHECK_FAIL = 'xianzhi-platform/withdrawals/CHECK_FAIL';

const PWD = 'xianzhi-platform/withdrawals/PWD';
const PWD_SUCCESS = 'xianzhi-platform/withdrawals/PWD_SUCCESS';
const PWD_FAIL = 'xianzhi-platform/withdrawals/PWD_FAIL';

const ORDER = 'xianzhi-platform/withdrawals/ORDER';
const ORDER_SUCCESS = 'xianzhi-platform/withdrawals/ORDER_SUCCESS';
const ORDER_FAIL = 'xianzhi-platform/withdrawals/ORDER_FAIL';

const MONEY = 'xianzhi-platform/withdrawals/MONEY';
const MONEY_SUCCESS = 'xianzhi-platform/withdrawals/MONEY_SUCCESS';
const MONEY_FAIL = 'xianzhi-platform/withdrawals/MONEY_FAIL';

const CHECK_PWD = 'xianzhi-platform/withdrawals/CHECK_PWD';
const CHECK_PWD_SUCCESS = 'xianzhi-platform/withdrawals/CHECK_PWD_SUCCESS';
const CHECK_PWD_FAIL = 'xianzhi-platform/withdrawals/CHECK_PWD_FAIL';

const RESET_PWD = 'xianzhi-platform/withdrawals/RESET_PWD';
const RESET_PWD_SUCCESS = 'xianzhi-platform/withdrawals/RESET_PWD_SUCCESS';
const RESET_PWD_FAIL = 'xianzhi-platform/withdrawals/RESET_PWD_FAIL';


const WDL_RESULT = 'xianzhi-platform/withdrawals/WDL_RESULT';
const WDL_RESULT_SUCCESS = 'xianzhi-platform/withdrawals/WDL_RESULT_SUCCESS';
const WDL_RESULT_FAIL = 'xianzhi-platform/withdrawals/WDL_RESULT_FAIL';


const initialState = {
  loaded: false
};

export default function withdrawals(state = initialState, action = {}) {
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
        sms: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        sms: null,
        error: action.error
      };
      case CHECK:
        return {
          ...state,
          loading: true
        };
      case CHECK_SUCCESS:
        return {
          ...state,
          loading: false,
          loaded: true,
          verify: action.result
        };
      case CHECK_FAIL:
        return {
          ...state,
          loading: false,
          loaded: false,
          verify: null,
          error: action.error
        };
        case PWD:
          return {
            ...state,
            loading: true
          };
        case PWD_SUCCESS:
          return {
            ...state,
            loading: false,
            loaded: true,
            pwd: action.result
          };
        case PWD_FAIL:
          return {
            ...state,
            loading: false,
            loaded: false,
            pwd: null,
            error: action.error
          };
          case ORDER:
            return {
              ...state,
              loading: true
            };
          case ORDER_SUCCESS:
            return {
              ...state,
              loading: false,
              loaded: true,
              order: action.result
            };
          case ORDER_FAIL:
            return {
              ...state,
              loading: false,
              loaded: false,
              order: null,
              error: action.error
            };
            case MONEY:
              return {
                ...state,
                loading: true
              };
            case MONEY_SUCCESS:
              return {
                ...state,
                loading: false,
                loaded: true,
                money: action.result
              };
            case MONEY_FAIL:
              return {
                ...state,
                loading: false,
                loaded: false,
                money: null,
                error: action.error
              };
              case CHECK_PWD:
                return {
                  ...state,
                  loading: true
                };
              case CHECK_PWD_SUCCESS:
                return {
                  ...state,
                  loading: false,
                  loaded: true,
                  check_pwd: action.result
                };
              case CHECK_PWD_FAIL:
                return {
                  ...state,
                  loading: false,
                  loaded: false,
                  check_pwd: null,
                  error: action.error
                };
                case RESET_PWD:
                  return {
                    ...state,
                    loading: true
                  };
                case RESET_PWD_SUCCESS:
                  return {
                    ...state,
                    loading: false,
                    loaded: true,
                    reset_pwd: action.result
                  };
                case RESET_PWD_FAIL:
                  return {
                    ...state,
                    loading: false,
                    loaded: false,
                    reset_pwd: null,
                    error: action.error
                  };
                  case WDL_RESULT:
                    return {
                      ...state,
                      loading: true
                    };
                  case WDL_RESULT_SUCCESS:
                    return {
                      ...state,
                      loading: false,
                      loaded: true,
                      result: action.result
                    };
                  case WDL_RESULT_FAIL:
                    return {
                      ...state,
                      loading: false,
                      loaded: false,
                      result: null,
                      error: action.error
                    };
    default:
      return state;
  }
}
//判断是否加载过
export function isLoaded(globalState) {
  return globalState.withdrawals && globalState.withdrawals.loaded;
}
//发送验证码
export function sendSms(mobile,type){
  return{
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/mv1/user/set/send-sms',{
      data:{
        mobile:mobile,
        type:type
      }
    }).then(function(json){
        return json;
    })
  }
}

//校验验证码
export function checkSms(mobile,code){
  return{
    types: [CHECK, CHECK_SUCCESS, CHECK_FAIL],
    promise: (client) => client.post('/mv1/user/set/verify-code',{
      data:{
        mobile:mobile,
        code:code
      }
    }).then(function(json){
        return json;
    })
  }
}

//设置提现密码
export function setPwd(password,repeat_password){
  return{
    types: [PWD, PWD_SUCCESS, PWD_FAIL],
    promise: (client) => client.post('/mv1/user/set/reset-password',{
      data:{
        password:password,
        repeat_password:repeat_password
      }
    }).then(function(json){
        return json;
    })
  }
}

//创建提现订单
export function createWithdrawals(money,password){
  return{
    types: [ORDER, ORDER_SUCCESS, ORDER_FAIL],
    promise: (client) => client.post('/mv1/user/order/createwithdrawals',{
      data:{
        money:money,
        password:password
        // user_ticket:"25483JIAWkJiLt/D5dUf5w1MpyTbGDVVtNCZ8xvm/Z6GIJM6XlCW12uqUGwyp5ufvgQew7+p5LU4s4MZqV7I"
      }
    }).then(function(json){
        return json;
    })
  }
}

//跳转到api进行提现再回跳
export function withdrawalsMoney(money){
  return{
    types: [MONEY, MONEY_SUCCESS, MONEY_FAIL],
    promise: (client) => client.get('/pay/request/withdrawals?payid=3&order_id='+money).then(function(json){
        return json;
    })
  }
}

//验证旧的提现密码
export function authenticationPwd(password){
    return{
      types: [CHECK_PWD, CHECK_PWD_SUCCESS, CHECK_PWD_FAIL],
      promise: (client) => client.post('/mv1/user/set/check-password',{
        data:{
          password:password,
        }
      }).then(function(json){
          return json;
      })
    }
}

//重置提现密码
export function resetPassword(password,repeat_password){
    return{
      types: [RESET_PWD, RESET_PWD_SUCCESS, RESET_PWD_FAIL],
      promise: (client) => client.post('/mv1/user/set/reset-password',{
        data:{
          password:password,
          repeat_password:repeat_password
        }
      }).then(function(json){
          return json;
      })
    }
}

//提现结果页
export function wdsResult(str){
    return{
      types: [WDL_RESULT, WDL_RESULT_SUCCESS, WDL_RESULT_FAIL],
      promise: (client) => client.post('/mv1/user/order/withdrawalsdetail',{
        data:{
          str:str
        }
      }).then(function(json){
          return json;
      })
    }
}
