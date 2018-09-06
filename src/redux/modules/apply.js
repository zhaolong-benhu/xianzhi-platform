const APPLY = 'xianzhi-platform/apply/APPLY';
const APPLY_SUCCESS = 'xianzhi-platform/apply/APPLY_SUCCESS';
const APPLY_FAIL = 'xianzhi-platform/apply/APPLY_FAIL';

const DATA = 'xianzhi-platform/apply/DATA';
const DATA_SUCCESS = 'xianzhi-platform/apply/DATA_SUCCESS';
const DATA_FAIL = 'xianzhi-platform/apply/DATA_FAIL';

const initialState = {
  loaded: false
};

export default function apply(state = initialState, action = {}) {
  switch (action.type) {
    case APPLY:
      return {
        ...state,
        loading: true
      };
    case APPLY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        flag: action.result,
        error: null
      };
    case APPLY_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
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
    default:
      return state;
  }
}

//导师详情
export function isLoaded(globalState) {
  return globalState.apply && globalState.apply.loaded;
}
//用户申请导师信息
export function load(){
  return{
    types: [DATA, DATA_SUCCESS, DATA_FAIL],
    promise:(client) => client.post('/mv1/user/teacher/detail').then(function(json){
      return json;
    })
  }
}
//申请导师
export function applyTeacher(name,gender,phone,is_experience,teaching_style,teaching_type,adept_areare){
  return{
    types: [APPLY,APPLY_SUCCESS,APPLY_FAIL],
    promise: (client) => client.post('/mv1/user/teacher/register',{
      data:{
        name:name,
        gender:gender,
        phone:phone,
        is_experience:is_experience,
        teaching_style:teaching_style,
        teaching_type:teaching_type,
        adept_areare:adept_areare
      }
    }).then(function(json){
      return json;
    })
  }
}
