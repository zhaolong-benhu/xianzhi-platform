const LOAD = 'xianzhi-platform/wallet/LOAD';
const LOAD_SUCCESS = 'xianzhi-platform/wallet/LOAD_SUCCESS';
const LOAD_FAIL = 'xianzhi-platform/wallet/LOAD_FAIL';

const ISEXISTSPASSWORD = 'xianzhi-platform/wallet/ISEXISTSPASSWORD';
const ISEXISTSPASSWORD_SUCCESS = 'xianzhi-platform/wallet/ISEXISTSPASSWORD_SUCCESS';
const ISEXISTSPASSWORD_FAIL = 'xianzhi-platform/wallet/ISEXISTSPASSWORD_FAIL';

const initialState = {
  loaded: false
};

export default function wallet(state = initialState, action = {}) {
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
      case ISEXISTSPASSWORD:
        return {
          ...state,
          loading: true
        };
      case ISEXISTSPASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          loaded: true,
          isExist: action.result
        };
      case ISEXISTSPASSWORD_FAIL:
        return {
          ...state,
          loading: false,
          loaded: false,
          isExist: null,
          error: action.error
        };
    default:
      return state;
  }
}
//判断是否加载过
export function isLoaded(globalState) {
  return globalState.wallet && globalState.wallet.loaded;
}

//提现记录
export function load(time,page){
  return{
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/mv1/user/index/wallet',{
         data:{
           time:time,
           page:page
         }
    }).then(function(json){
        return json;
    })
  }
}

//是否存在提现im
export function isExistsPassword(){
  return{
    types: [ISEXISTSPASSWORD, ISEXISTSPASSWORD_SUCCESS, ISEXISTSPASSWORD_FAIL],
    promise: (client) => client.post('/mv1/user/set/is-exists-password').then(function(json){
        return json;
    })
  }
}
