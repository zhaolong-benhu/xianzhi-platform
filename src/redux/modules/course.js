const LOAD = 'xianzhi-platform/course/LOAD';
const LOAD_SUCCESS = 'xianzhi-platform/course/LOAD_SUCCESS';
const LOAD_FAIL = 'xianzhi-platform/course/LOAD_FAIL';

const DATA = 'xianzhi-platform/course/DATA';
const DATA_SUCCESS = 'xianzhi-platform/course/DATA_SUCCESS';
const DATA_FAIL = 'xianzhi-platform/course/DATA_FAIL';

const initialState = {
  loaded: false
};

export default function course(state = initialState, action = {}) {
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
  return globalState.course && globalState.course.loaded;
}
//课程列表
export function load(page){
  return{
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/mv1/user/teacher/courselist',{
      data:{
        page:page
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

//获取在线课程
export function courseList(params){
  return{
    types: [DATA, DATA_SUCCESS, DATA_FAIL],
    promise: (client) => client.get('/mv1/class/courselist',{
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
