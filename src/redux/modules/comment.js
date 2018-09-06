const DATA = 'xianzhi-platform/comment/DATA';
const DATA_SUCCESS = 'xianzhi-platform/comment/DATA_SUCCESS';
const DATA_FAIL = 'xianzhi-platform/comment/DATA_FAIL';

const ADD = 'xianzhi-platform/comment/ADD';
const ADD_SUCCESS = 'xianzhi-platform/comment/ADD_SUCCESS';
const ADD_FAIL = 'xianzhi-platform/comment/ADD_FAIL';

const IS = 'xianzhi-platform/comment/IS';
const IS_SUCCESS = 'xianzhi-platform/comment/IS_SUCCESS';
const IS_FAIL = 'xianzhi-platform/comment/IS_FAIL';

const initialState = {
  data:null
};

export default function comment(state = initialState, action = {}) {
  switch (action.type) {
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

    case ADD:
      return {
        ...state,
        addIn:true
      }
    case ADD_SUCCESS:
      return {
        ...state,
        addIn: false,
        result:action.result
      }
    case ADD_FAIL:
      return {
        ...state,
        addIn: false,
        add_error: action.error
      };
    case IS:
      return {
        ...state,
        isIn:true
      }
    case IS_SUCCESS:
      return {
        ...state,
        isIn: false,
        is_result:action.result
      }
    case IS_FAIL:
      return {
        ...state,
        isIn: false,
        is_error: action.error
      };
    default:
      return state
  }
}

//get获取数据
export function commentList(params,url){
  return{
    types: [DATA, DATA_SUCCESS, DATA_FAIL],
    promise: (client) => client.get(url,{
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

//添加评论数据
export function addComment(params,url){
  return{
    types: [ADD, ADD_SUCCESS, ADD_FAIL],
    promise: (client) => client.post(url,{
      data:params
    }).then(function(json){
        return json;
    })
  }
}

//是否可以评论
export function isComment(params,url){
  return{
    types: [IS, IS_SUCCESS, IS_FAIL],
    promise: (client) => client.post(url,{
      data:params
    }).then(function(json){
        return json;
    })
  }
}
