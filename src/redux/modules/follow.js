const LOAD = 'xianzhi-platform/follow/LOAD';
const LOAD_SUCCESS = 'xianzhi-platform/follow/LOAD_SUCCESS';
const LOAD_FAIL = 'xianzhi-platform/follow/LOAD_FAIL';

const ACTION = 'xianzhi-platform/follow/ACTION';
const ACTION_SUCCESS = 'xianzhi-platform/follow/ACTION_SUCCESS';
const ACTION_FAIL = 'xianzhi-platform/follow/ACTION_FAIL';

const ADDFOLLOW = 'xianzhi-platform/follow/ADDFOLLOW';
const ADDFOLLOW_SUCCESS = 'xianzhi-platform/follow/ADDFOLLOW_SUCCESS';
const ADDFOLLOW_FAIL = 'xianzhi-platform/follow/ADDFOLLOW_FAIL';

const SEARCHFOLLOW = 'xianzhi-platform/follow/SEARCHFOLLOW';
const SEARCHFOLLOW_SUCCESS = 'xianzhi-platform/follow/SEARCHFOLLOW_SUCCESS';
const SEARCHFOLLOW_FAIL = 'xianzhi-platform/follow/SEARCHFOLLOW_FAIL';

const initialState = {
  loaded: false
};

export default function follow(state = initialState, action = {}) {
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

    case ACTION:
        return {
          ...state
        };
    case ACTION_SUCCESS:
        return {
          ...state,
          isfollow: action.result
        };
    case ACTION_FAIL:
        return {
          ...state,
          error: action.error
        };
    case ADDFOLLOW:
        return {
          ...state,
          action:false
        };
    case ADDFOLLOW_SUCCESS:
        return {
          ...state,
          action:true,
          isfollow: action.result
        };
    case ADDFOLLOW_FAIL:
        return {
          ...state,
          error: action.error
        };
    case SEARCHFOLLOW:
        return {
          ...state,
          search:false
        };
    case SEARCHFOLLOW_SUCCESS:
        return {
          ...state,
          search:true,
          searchlist: action.result
        };
    case SEARCHFOLLOW_FAIL:
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
  return globalState.follow && globalState.follow.loaded && !globalState.follow.action;
}
//关注列表
export function load(page){
  return{
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/mv1/user/favorite/list',{
      data:{
        page:page
      }
    }).then(function(json){
        return json;
    })
  }
}
//是否关注
export function isFollow(id,type){
  return{
    types: [ACTION, ACTION_SUCCESS, ACTION_FAIL],
    promise: (client) => client.post('/mv1/user/favorite/isfavorite',{
      data:{
        id:id,
        type:type
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
//添加关注
export function addFollow(id,type){
  return{
    types: [ADDFOLLOW, ADDFOLLOW_SUCCESS, ADDFOLLOW_FAIL],
    promise: (client) => client.post('/mv1/user/favorite/add',{
      data:{
        id:id,
        type:type
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

//post获取数据
export function searchFollow(data){
  return{
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/mv1/user/favorite/search',{
      data:data
    }).then(function(json){
        return json;
    })
  }
}
