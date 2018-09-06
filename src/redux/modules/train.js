const LOAD = 'xianzhi-platform/train/LOAD';
const LOAD_SUCCESS = 'xianzhi-platform/train/LOAD_SUCCESS';
const LOAD_FAIL = 'xianzhi-platform/train/LOAD_FAIL';

const DATA = 'xianzhi-platform/train/DATA';
const DATA_SUCCESS = 'xianzhi-platform/train/DATA_SUCCESS';
const DATA_FAIL = 'xianzhi-platform/train/DATA_FAIL';

const DETAIL = 'xianzhi-platform/train/DETAIL';
const DETAIL_SUCCESS = 'xianzhi-platform/train/DETAIL_SUCCESS';
const DETAIL_FAIL = 'xianzhi-platform/train/DETAIL_FAIL';

const initialState = {
  loaded: false
};

export default function train(state = initialState, action = {}) {
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
    case DATA:
      return {
        ...state,
        dataIn:true
      }
    case DATA_SUCCESS:
      return {
        ...state,
        dataIn: false,
        trainData:action.result
      }
    case DATA_FAIL:
      return {
        ...state,
        dataIn: false,
        dataError: action.error
      };
    case DETAIL:
      return {
        ...state,
        detialIn:true,
        detail:null
      }
    case DETAIL_SUCCESS:
      return {
        ...state,
        detail:action.result,
        detialIn:false
      }
    case DETAIL_FAIL:
      return {
        ...state,
        detialIn: false,
        detail:null,
        detailError: action.error
      };
    default:
      return state;
  }
}
//判断是否加载过
export function isLoaded(globalState) {
  return globalState.train && globalState.train.loaded;
}

//判断是否内训过
export function isapply(id){
  return{
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/mv1/user/index/isapply',{
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

//获取内训数据
export function List(params){
  return{
    types: [DATA, DATA_SUCCESS, DATA_FAIL],
    promise: (client) => client.get('/mv1/class/teachersearch',{
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

//获取内训数据
export function detail(id){
  return{
    types: [DETAIL, DETAIL_SUCCESS, DETAIL_FAIL],
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
