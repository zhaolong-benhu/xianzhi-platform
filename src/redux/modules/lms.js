const LMS_ISAPPLY = 'xianzhi-platform/tutor/LMS_ISAPPLY';
const LMS_ISAPPLY_SUCCESS = 'xianzhi-platform/tutor/LMS_ISAPPLY_SUCCESS';
const LMS_ISAPPLY_FAIL = 'xianzhi-platform/tutor/LMS_ISAPPLY_FAIL';

const LMS_APPLY = 'xianzhi-platform/tutor/LMS_APPLY';
const LMS_APPLY_SUCCESS = 'xianzhi-platform/tutor/LMS_APPLY_SUCCESS';
const LMS_APPLY_FAIL = 'xianzhi-platform/tutor/LMS_APPLY_FAIL';

const initialState = {
  loaded: false
};

export default function tutor(state = initialState, action = {}) {
  switch (action.type) {
      case LMS_ISAPPLY:
          return {
            ...state
          };
      case LMS_ISAPPLY_SUCCESS:
          return {
            ...state,
            apply: action.result
          };
      case LMS_ISAPPLY_FAIL:
          return {
            ...state,
            apply_error: action.error
          };
    case LMS_APPLY:
        return {
          ...state
        };
    case LMS_APPLY_SUCCESS:
        return {
          ...state,
          result: action.result
        };
    case LMS_APPLY_FAIL:
        return {
          ...state,
          apply_error: action.error
        };
    default:
      return state;
  }
}
//判断是否加载过
export function isLoaded(globalState) {
  return globalState.tutor && globalState.tutor.loaded;
}

//是否申请过
export function isApply(){
  return{
    types: [LMS_ISAPPLY, LMS_ISAPPLY_SUCCESS, LMS_ISAPPLY_FAIL],
    promise: (client) => client.post('/mv1/user/favorite/isfavorite',{
      data:{
        id:1,
        type:1
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

//lms申请
export function userApplyLms(data){
  return{
    types: [LMS_APPLY, LMS_APPLY_SUCCESS, LMS_APPLY_FAIL],
    promise: (client) => client.post('/mv1/user/index/lms-apply',{
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
