const LOAD = 'xianzhi-platform/openclass/LOAD';
const LOAD_SUCCESS = 'xianzhi-platform/openclass/LOAD_SUCCESS';
const LOAD_FAIL = 'xianzhi-platform/openclass/LOAD_FAIL';

const DATA = 'xianzhi-platform/openclass/DATA';
const DATA_SUCCESS = 'xianzhi-platform/openclass/DATA_SUCCESS';
const DATA_FAIL = 'xianzhi-platform/openclass/DATA_FAIL';

const initialState = {
  loaded: false
};

export default function openclass(state = initialState, action = {}) {
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
        courseData:action.result
      }
    case DATA_FAIL:
      return {
        ...state,
        dataIn: false,
        dataError: action.error
      };
    default:
      return state;
  }
}
//判断是否加载过
export function isLoaded(globalState) {
  return globalState.openclass && globalState.openclass.loaded;
}

//我的公开课
export function load(page){
  return{
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/mv1/user/index/openclasslist',{
      data:{
        page:page
      }
    }).then(function(json){
        return json;
    })
  }
}
//获取公开课数据
export function courseList(params){
  return{
    types: [DATA, DATA_SUCCESS, DATA_FAIL],
    promise: (client) => client.get('/mv1/class/search',{
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
