const LOAD = 'xianzhi-platform/tutor/LOAD';
const LOAD_SUCCESS = 'xianzhi-platform/tutor/LOAD_SUCCESS';
const LOAD_FAIL = 'xianzhi-platform/tutor/LOAD_FAIL';

const DETAIL = 'xianzhi-platform/tutor/DETAIL';
const DETAIL_SUCCESS = 'xianzhi-platform/tutor/DETAIL_SUCCESS';
const DETAIL_FAIL = 'xianzhi-platform/tutor/DETAIL_FAIL';

const APPLY = 'xianzhi-platform/tutor/APPLY';
const APPLY_SUCCESS = 'xianzhi-platform/tutor/APPLY_SUCCESS';
const APPLY_FAIL = 'xianzhi-platform/tutor/APPLY_FAIL';

const TRAIN = 'xianzhi-platform/tutor/TRAIN';
const TRAIN_SUCCESS = 'xianzhi-platform/tutor/TRAIN_SUCCESS';
const TRAIN_FAIL = 'xianzhi-platform/tutor/TRAIN_FAIL';

const ONLINE = 'xianzhi-platform/tutor/ONLINE';
const ONLINE_SUCCESS = 'xianzhi-platform/tutor/ONLINE_SUCCESS';
const ONLINE_FAIL = 'xianzhi-platform/tutor/ONLINE_FAIL';

const BUY = 'xianzhi-platform/tutor/BUY';
const BUY_SUCCESS = 'xianzhi-platform/tutor/BUY_SUCCESS';
const BUY_FAIL = 'xianzhi-platform/tutor/BUY_FAIL';

const initialState = {
  loaded: false
};

export default function tutor(state = initialState, action = {}) {
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
    case APPLY:
        return {
          ...state
        };
    case APPLY_SUCCESS:
        return {
          ...state,
          result: action.result
        };
    case APPLY_FAIL:
        return {
          ...state,
          apply_error: action.error
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
    case TRAIN:
      return {
        ...state
      };
    case TRAIN_SUCCESS:
      return {
        ...state,
        train: action.result
      };
    case TRAIN_FAIL:
      return {
        ...state,
        error: action.error
      };
      case ONLINE:
        return {
          ...state
        };
      case ONLINE_SUCCESS:
        return {
          ...state,
          online: action.result
        };
      case ONLINE_FAIL:
        return {
          ...state,
          error: action.error
        };
      case BUY:
        return {
          ...state
        };
      case BUY_SUCCESS:
        return {
          ...state,
          buy: action.result
        };
      case BUY_FAIL:
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
  return globalState.tutor && globalState.tutor.loaded;
}

//我要内训
export function userApply(data){
  return{
    types: [APPLY, APPLY_SUCCESS, APPLY_FAIL],
    promise: (client) => client.post('/mv1/user/index/apply',{
      data:data
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
//内训详情
export function detail(id){
  return{
    types: [DETAIL, DETAIL_SUCCESS, DETAIL_FAIL],
    promise: (client) => client.post('/mv1/teacher/detail',{
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
//导师内训课程
export function trainingcourse(id){
  return{
    types: [TRAIN, TRAIN_SUCCESS, TRAIN_FAIL],
    promise: (client) => client.get('/mv1/teacher/training',{
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
//导师在线课程
export function onlinecourse(id){
  return{
    types: [ONLINE, ONLINE_SUCCESS, ONLINE_FAIL],
    promise: (client) => client.get('/mv1/teacher/course',{
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

//判断是否已购买
export function isbuy(data){
  return{
    types: [BUY, BUY_SUCCESS, BUY_FAIL],
    promise: (client) => client.post('/mv1/user/index/teacherisbuy',{
      data:data
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
