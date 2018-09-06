const LOAD = 'xianzhi-platform/home/LOAD';
const LOAD_SUCCESS = 'xianzhi-platform/home/LOAD_SUCCESS';
const LOAD_FAIL = 'xianzhi-platform/home/LOAD_FAIL';

const BANNER_SUCCESS = 'xianzhi-platform/home/BANNER_SUCCESS';
const FREECOURSE_SUCCESS = 'xianzhi-platform/home/FREECOURSE_SUCCESS';
const COURSE_SUCCESS = 'xianzhi-platform/home/COURSE_SUCCESS';
const OPENCOURSE_SUCCESS = 'xianzhi-platform/home/OPENCOURSE_SUCCESS';
const TEACHER_SUCCESS = 'xianzhi-platform/home/TEACHER_SUCCESS';
const IHMA_SUCCESS = 'xianzhi-platform/home/IHMA_SUCCESS';



const initialState = {
  loaded: false
};

export default function home(state = initialState, action = {}) {
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
    case BANNER_SUCCESS:
      return {
        ...state,
        banner:action.result
      };
    case FREECOURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        freecourse:action.result
      };
      case COURSE_SUCCESS:
        return {
          ...state,
          course:action.result
        };
      case OPENCOURSE_SUCCESS:
        return {
          ...state,
          opencourse:action.result
        };
      case TEACHER_SUCCESS:
        return {
          ...state,
          teacher:action.result
        };
      case IHMA_SUCCESS:
        return {
          ...state,
          ihma:action.result
        };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.home && globalState.home.loaded;
}
//广告
export function loadBanner(url){
  return{
    types:[LOAD, BANNER_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(url).then(function(json){
      if(json.status==1){
        return json.data;
      }
      else{
        return json;
      }
    })
  }
}
//首页在线好课
export function loadFreeCourse(){
  return{
    types:[LOAD, FREECOURSE_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/mv1/home/freecouse').then(function(json){
      if(json.status==1){
        return json.data;
      }
      else{
        return json;
      }
    })
  }
}

//首页在线课程
export function loadCourse(){
  return{
    types:[LOAD, COURSE_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/mv1/home/course').then(function(json){
      if(json.status==1){
        return json.data;
      }
      else{
        return json;
      }
    })
  }
}

//首页线下公开课
export function loadOpenCourse(){
  return{
    types:[LOAD, OPENCOURSE_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/mv1/home/opencourse').then(function(json){
      if(json.status==1){
        return json.data;
      }
      else{
        return json;
      }
    })
  }
}

//首页导师
export function loadTeacher(){
  return{
    types:[LOAD, TEACHER_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/mv1/home/teacher').then(function(json){
      if(json.status==1){
        return json.data;
      }
      else{
        return json;
      }
    })
  }
}

//首页IHMA证书
export function loadIHMA(){
  return{
    types:[LOAD, IHMA_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/mv1/home/cert').then(function(json){
      if(json.status==1){
        return json.data;
      }
      else{
        return json;
      }
    })
  }
}
