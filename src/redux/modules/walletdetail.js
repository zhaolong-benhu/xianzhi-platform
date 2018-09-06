const LOAD = 'xianzhi-platform/walletdetail/LOAD';
const LOAD_SUCCESS = 'xianzhi-platform/walletdetail/LOAD_SUCCESS';
const LOAD_FAIL = 'xianzhi-platform/walletdetail/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function walletdetail(state = initialState, action = {}) {
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
  return globalState.walletdetail && globalState.walletdetail.loaded;
}
//提现记录
export function load(type,time,page){
  return{
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/mv1/user/index/wallet',{
         data:{
           type:type,
           time:time,
           page:page
         }
    }).then(function(json){
      if(json.status==1){
        return json.data;
      }
      else{
        return json;
      }
    }),function(err){
     console.error(err);
    }
  }
}
