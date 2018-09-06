const LOAD = 'xianzhi-platform/ihma/LOAD';
const LOAD_SUCCESS = 'xianzhi-platform/ihma/LOAD_SUCCESS';
const LOAD_FAIL = 'xianzhi-platform/ihma/LOAD_FAIL';

const IHMA = 'xianzhi-platform/ihma/IHMA';
const IHMA_SUCCESS = 'xianzhi-platform/ihma/IHMA_SUCCESS';
const IHMA_FAIL = 'xianzhi-platform/ihma/IHMA_FAIL';

const CLASS = 'xianzhi-platform/ihma/CLASS';
const CLASS_SUCCESS = 'xianzhi-platform/ihma/CLASS_SUCCESS';
const CLASS_FAIL = 'xianzhi-platform/ihma/CLASS_FAIL';

const DATA = 'xianzhi-platform/ihma/DATA';
const DATA_SUCCESS = 'xianzhi-platform/ihma/DATA_SUCCESS';
const DATA_FAIL = 'xianzhi-platform/ihma/DATA_FAIL';

const APPLY = 'xianzhi-platform/ihma/APPLY';
const APPLY_SUCCESS = 'xianzhi-platform/ihma/APPLY_SUCCESS';
const APPLY_FAIL = 'xianzhi-platform/ihma/APPLY_FAIL';

const initialState = {
  loaded: false
};

export default function ihma(state = initialState, action = {}) {
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
      case IHMA:
        return {
          ...state,
          detail:null
        }
      case IHMA_SUCCESS:
        return {
          ...state,
          detail:action.result
        }
      case IHMA_FAIL:
        return {
          ...state,
          detail_error: action.error
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
        case DATA:
          return {
            ...state,
            dataIn:true
          }
       case DATA_SUCCESS:
          return {
            ...state,
            dataIn: false,
            ihmaData:action.result
          }
        case DATA_FAIL:
          return {
            ...state,
            dataIn: false,
            dataError: action.error
          };
    case CLASS:
      return {
        ...state,
        loading: true
      };
    case CLASS_SUCCESS:
      return {
        ...state,
        loaded: true,
        category: action.result
      };
    case CLASS_FAIL:
      return {
        ...state,
        loaded: false,
        category: null,
        class_error: action.error
      };
    default:
      return state;
  }
}
//判断是否加载过
export function isLoaded(globalState) {
  return globalState.ihma && globalState.ihma.loaded;
}
//ihma列表
export function load(){
  return{
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/mv1/user/index/ihmalist').then(function(json){
        return json;
    })
  }
}

//获取ihma列表数据
export function ihmaList(params){
  return{
    types: [DATA, DATA_SUCCESS, DATA_FAIL],
    promise: (client) => client.get('/mv1/ihma/screen',{
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

//IHMA详情
export function ihmaDetail(params){
  return{
    types: [IHMA, IHMA_SUCCESS, IHMA_FAIL],
    promise: (client) => client.post('/mv1/ihma/detail',{
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
//IHMA分类
export function category(){
  return{
    types: [CLASS, CLASS_SUCCESS, CLASS_FAIL],
    promise: (client) => client.post('/mv1/ihma/class').then(function(json){
        if(json.status==1){
          return json.data;
        }else{
          return json;
        }
    })
  }
}
//ihma报名
export function ihmaEnroll(data){
  return{
    types: [APPLY, APPLY_SUCCESS, APPLY_FAIL],
    promise: (client) => client.post('/mv1/ihma/ihma-enroll',{
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
