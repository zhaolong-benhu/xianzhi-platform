const LOAD = 'xianzhi-platform/excellentpackage/LOAD';
const LOAD_SUCCESS = 'xianzhi-platform/excellentpackage/LOAD_SUCCESS';
const LOAD_FAIL = 'xianzhi-platform/excellentpackage/LOAD_FAIL';

const COURSE = 'xianzhi-platform/excellentpackage/COURSE';
const COURSE_SUCCESS = 'xianzhi-platform/excellentpackage/COURSE_SUCCESS';
const COURSE_FAIL = 'xianzhi-platform/excellentpackage/COURSE_FAIL';

const BUY = 'xianzhi-platform/excellentpackage/BUY';
const BUY_SUCCESS = 'xianzhi-platform/excellentpackage/BUY_SUCCESS';
const BUY_FAIL = 'xianzhi-platform/excellentpackage/BUY_FAIL';

const initialState = {
  loaded: false
};

export default function excellentpackage(state = initialState, action = {}) {
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
    case COURSE:
      return {
        ...state,
        detail:null
      }
    case COURSE_SUCCESS:
      return {
        ...state,
        detail:action.result
      }
    case COURSE_FAIL:
      return {
        ...state,
        detail_error: action.error
      };
      case BUY:
        return {
          ...state
        }
      case BUY_SUCCESS:
        return {
          ...state,
          buy:action.result
        }
      case BUY_FAIL:
        return {
          ...state,
          buy_error: action.error
        };
    default:
      return state;
  }
}
//判断是否加载过
export function isLoaded(globalState) {
  return globalState.excellentpackage && globalState.excellentpackage.loaded;
}
//专业证书列表
export function load(){
  return{
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/mv1/user/index/classroomlist').then(function(json){
        return json;
    })
  }
}
//专业证书详情
export function courseDetail(params){
  return{
    types: [COURSE, COURSE_SUCCESS, COURSE_FAIL],
    promise: (client) => client.post('/mv1/certificate/detail',{
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

//判断是否已购买
export function isbuy(data){
  return{
    types: [BUY, BUY_SUCCESS, BUY_FAIL],
    promise: (client) => client.post('/mv1/user/index/packageisbuy',{
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
