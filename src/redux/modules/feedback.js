const LOAD = 'xianzhi-platform/feedback/LOAD';
const LOAD_SUCCESS = 'xianzhi-platform/feedback/LOAD_SUCCESS';
const LOAD_FAIL = 'xianzhi-platform/feedback/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function feedback(state = initialState, action = {}) {
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
  return globalState.feedback && globalState.feedback.state;
}
//添加反馈
export function load(type,email,content){
  return{
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/mv1/user/info/addfeedback',{
         data:{
           type:type,
           email:email,
           content:content
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
