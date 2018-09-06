const LOAD = 'xianzhi-platform/thinktank/LOAD';
const LOAD_SUCCESS = 'xianzhi-platform/thinktank/LOAD_SUCCESS';
const LOAD_FAIL = 'xianzhi-platform/thinktank/LOAD_FAIL';

const CLASS = 'xianzhi-platform/thinktank/CLASS';
const CLASS_SUCCESS = 'xianzhi-platform/thinktank/CLASS_SUCCESS';
const CLASS_FAIL = 'xianzhi-platform/thinktank/CLASS_FAIL';

const LIST = 'xianzhi-platform/thinktank/LIST';
const LIST_SUCCESS = 'xianzhi-platform/thinktank/LIST_SUCCESS';
const LIST_FAIL = 'xianzhi-platform/thinktank/LIST_FAIL';

const DETAIL = 'xianzhi-platform/thinktank/DETAIL';
const DETAIL_SUCCESS = 'xianzhi-platform/thinktank/DETAIL_SUCCESS';
const DETAIL_FAIL = 'xianzhi-platform/thinktank/DETAIL_FAIL';

const initialState = {
  loaded: false,
  classed: false
};

export default function thinktank(state = initialState, action = {}) {
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
    case CLASS:
      return {
        ...state,
        classing: true
      };
    case CLASS_SUCCESS:
      return {
        ...state,
        classing: false,
        classed: true,
        category: action.result
      };
    case CLASS_FAIL:
      return {
        ...state,
        classing: false,
        classed: false,
        error: action.error
      };
    case LIST:
      return {
        ...state,
        listing: true
      };
    case LIST_SUCCESS:
      return {
        ...state,
        listing: false,
        listed: true,
        doclist: action.result
      };
    case LIST_FAIL:
      return {
        ...state,
        listing: false,
        listed: false,
        error: action.error
      };
    case DETAIL:
      return {
        ...state
      };
    case DETAIL_SUCCESS:
      return {
        ...state,
        detail: action.result
      };
    case DETAIL_FAIL:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}
//判断是否加载过
export function isLoaded(globalState) {
  return globalState.thinktank && globalState.thinktank.loaded;
}
//判断是否加载过
export function isClassed(globalState) {
  return globalState.thinktank && globalState.thinktank.classed;
}
//获取用户中心我的智库列表数据
export function load(page){
  return{
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/mv1/user/papers/list',{
      data:{
        page:page
      }
    }).then(function(json){
        return json;
    })
  }
}
//获取智库列表数据
export function list(params){
  return{
    types: [LIST, LIST_SUCCESS, LIST_FAIL],
    promise: (client) => client.get('/mv1/papers/list',{
      params:params
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
//智库详情
export function detail(id){
  return{
    types: [DETAIL, DETAIL_SUCCESS, DETAIL_FAIL],
    promise: (client) => client.get('/mv1/papers/detail',{
      params:{
        id:id
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
//获取智库分类数据
export function category(){
  return{
    types: [CLASS, CLASS_SUCCESS, CLASS_FAIL],
    promise: (client) => client.get('/mv1/papers/class').then(function(json){
      if(json.status==1){
        return json.data;
      }
      else{
        return json;
      }
    })
  }
}
