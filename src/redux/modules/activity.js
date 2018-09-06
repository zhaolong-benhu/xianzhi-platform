const DATA = 'xianzhi-platform/activity/DATA';
const DATA_SUCCESS = 'xianzhi-platform/activity/DATA_SUCCESS';
const DATA_FAIL = 'xianzhi-platform/activity/DATA_FAIL';

const OPENCLASS = 'xianzhi-platform/activity/OPENCLASS';
const OPENCLASS_SUCCESS = 'xianzhi-platform/activity/OPENCLASS_SUCCESS';
const OPENCLASS_FAIL = 'xianzhi-platform/activity/OPENCLASS_FAIL';

const LIST = 'xianzhi-platform/activity/LIST';
const LIST_SUCCESS = 'xianzhi-platform/activity/LIST_SUCCESS';
const LIST_FAIL = 'xianzhi-platform/activity/LIST_FAIL';

const LOAD = 'xianzhi-platform/activity/LOAD';
const LOAD_SUCCESS = 'xianzhi-platform/activity/LOAD_SUCCESS';
const LOAD_FAIL = 'xianzhi-platform/activity/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function activity(state = initialState, action = {}) {
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
        userdata: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        userdata: null,
        error: action.error
      };
    case DATA:
      return {
        ...state,
        dataIn:true
      }
    case DATA_SUCCESS:
      return {
        ...state,
        dataIn: false,
        data:action.result
      }
    case DATA_FAIL:
      return {
        ...state,
        dataIn: false,
        error: action.error
      };
    case LIST:
      return {
        ...state
      }
    case LIST_SUCCESS:
      return {
        ...state,
        listIn: false,
        list:action.result
      }
    case LIST_FAIL:
      return {
        ...state,
        listIn: false,
        error: action.error
      };
    case OPENCLASS:
      return {
        ...state,
        detail:null
      }
    case OPENCLASS_SUCCESS:
      return {
        ...state,
        detail:action.result
      }
    case OPENCLASS_FAIL:
      return {
        ...state,
        detail_error: action.error
      };
    default:
      return state
  }
}
//判断是否加载过
export function isLoaded(globalState) {
  return globalState.activity && globalState.activity.loaded;
}
//用户活动列表
export function load(page){
  return{
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/mv1/user/index/activitylist',{
      data:{
        page:page
      }
    }).then(function(json){
        return json;
    })
  }
}
//公开课详细页
export function openClassDetail(id){
  return{
    types: [OPENCLASS,OPENCLASS_SUCCESS, OPENCLASS_FAIL],
    promise: (client) => client.post('/mv1/activity/detail',{
      data:{
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

//活动详细页
export function detail(params){
  return{
    types: [DATA, DATA_SUCCESS, DATA_FAIL],
    promise: (client) => client.post('/mv1/activity/detail',{
      data:params
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

//活动列表
export function list(type=0,num=1,other_all=0){
  return{
    types: [LIST, LIST_SUCCESS, LIST_FAIL],
    promise: (client) => client.get('/mv1/class/search',{
      params:{
        class_id:0,
        other_all:other_all,
        type:type,
        page:num
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
