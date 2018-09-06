const LOAD = 'xianzhi-platform/teacher_trainlist/LOAD';
const LOAD_SUCCESS = 'xianzhi-platform/teacher_trainlist/LOAD_SUCCESS';
const LOAD_FAIL = 'xianzhi-platform/teacher_trainlist/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function teacher_trainlist(state = initialState, action = {}) {
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
    default:
      return state;
  }
}
//判断是否加载过
export function isLoaded(globalState) {
  return globalState.teacher_trainlist && globalState.teacher_trainlist.loaded;
}

//获取导师内训课程列表
export function load(params){
  return{
    types:  [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/mv1/teacher/activitylist',{
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
