const LOAD = 'xianzhi-platform/category/LOAD';
const LOAD_SUCCESS = 'xianzhi-platform/category/LOAD_SUCCESS';
const LOAD_FAIL = 'xianzhi-platform/category/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function category(state = initialState, action = {}) {
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
        data: action.result,
        error: null
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
//获取类别信息是否请求
export function isLoaded(globalState) {
  return globalState.category && globalState.category.loaded;
}
//获取类别数据
export function load(){
  return{
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/mv1/class/getclassall').then(function(json){
      if(json.status==1){
        return json.data;
      }
      else{
        return json;
      }
    })
  }
}
