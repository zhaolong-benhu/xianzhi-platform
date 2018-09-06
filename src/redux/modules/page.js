const DATA = 'xianzhi-platform/page/DATA';
const DATA_SUCCESS = 'xianzhi-platform/page/DATA_SUCCESS';
const DATA_FAIL = 'xianzhi-platform/page/DATA_FAIL';

const ACTION = 'xianzhi-platform/page/ACTION';
const ACTION_SUCCESS = 'xianzhi-platform/page/ACTION_SUCCESS';
const ACTION_FAIL = 'xianzhi-platform/page/ACTION_FAIL';

const initialState = {
  data:null
};

export default function page(state = initialState, action = {}) {
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

    case ACTION:
        return {
          ...state
        };
    case ACTION_SUCCESS:
        return {
          ...state,
          result: action.result
        };
    case ACTION_FAIL:
        return {
          ...state,
          action_error: action.error
        };
    default:
      return state
  }
}


//get获取数据
export function getData(params,url){
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

//post获取数据
export function postData(data,url){
  return{
    types: [ACTION, ACTION_SUCCESS, ACTION_FAIL],
    promise: (client) => client.post(url,{
      data:data
    }).then(function(json){
        return json;
    })
  }
}
