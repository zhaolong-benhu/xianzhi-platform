/**
 * Created by qzy on 2016/12/1.
 * File description:
 */
const DATA = 'xianzhi-platform/freepromotion/DATA';
const DATA_SUCCESS = 'xianzhi-platform/freepromotion/DATA_SUCCESS';
const DATA_FAIL = 'xianzhi-platform/freepromotion/DATA_FAIL';

const initialState = {
  loading:false,
  loaded: false
};

export default function freepromition(state = initialState,action={}) {
  switch (action.type){
    case DATA:
      return {
        ...state,
        loading: true,
        loaded: false,
      }
    case DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      }
    case DATA_FAIL:
      return {
        ...state,
        loading:false,
        loaded:true,
        data:action.error
      }
    default:
      return state;
  }
}
//秒杀
export function getData(params) {
  return{
    types: [DATA, DATA_SUCCESS, DATA_FAIL],
    promise: (client) => client.get('/mv1/seckill/list',{
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
