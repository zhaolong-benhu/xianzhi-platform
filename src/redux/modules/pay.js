const PAY = 'xianzhi-platform/pay/PAY';
const PAY_SUCCESS = 'xianzhi-platform/pay/PAY_SUCCESS';
const PAY_FAIL = 'xianzhi-platform/pay/PAY_FAIL';
const SEC_PAY = 'xianzhi-platform/pay/SEC_PAY';
const SEC_PAY_SUCCESS = 'xianzhi-platform/pay/SEC_PAY_SUCCESS';
const SEC_PAY_FAIL = 'xianzhi-platform/pay/SEC_PAY_FAIL';
const DATA = 'xianzhi-platform/pay/DATA';
const DATA_SUCCESS = 'xianzhi-platform/pay/DATA_SUCCESS';
const DATA_FAIL = 'xianzhi-platform/pay/DATA_FAIL';
const initialState = {
  data:null
};

export default function pay(state = initialState, action = {}) {
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
    case PAY:
        return {
          ...state
        };
    case PAY_SUCCESS:
        return {
          ...state,
          result: action.result
        };
    case PAY_FAIL:
        return {
          ...state,
          action_error: action.error
        };
    case SEC_PAY:
      return {
        ...state
      };
    case SEC_PAY_SUCCESS:
      return {
        ...state,
        result: action.result
      };
    case SEC_PAY_FAIL:
      return {
        ...state,
        action_error: action.error
      };
    default:
      return state
  }
}
//订单详情
export function orderDetail(order_num,str){
  return{
    types: [DATA, DATA_SUCCESS, DATA_FAIL],
    promise: (client) => client.post('/mv1/user/order/detail',{
      data:{
        order_num:order_num,
        str:str
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
//线下活动订单接口（支付）
export function creatactivityorder(id){
  return{
    types: [PAY, PAY_SUCCESS, PAY_FAIL],
    promise: (client) => client.post('/mv1/user/order/creatactivityorder',{
      data:{
        id:id
      }
    }).then(function(json){
        return json;
    })
  }
}
//线上活动订单接口（支付）
export function createcourseorder(id,type){
  return{
    types: [PAY, PAY_SUCCESS, PAY_FAIL],
    promise: (client) => client.post('/mv1/user/order/createcourseorder',{
      data:{
        id:id,
        type:type
      }
    }).then(function(json){
        return json;
    })
  }
}
//秒杀活动订单接口（支付）
export function createSecKill(secId, proId, type){
  return {
    types: [SEC_PAY, SEC_PAY_SUCCESS, SEC_PAY_FAIL],
    promise: (client) => client.post('/mv1/user/seckill/apply', {
      data: {
        sec_id: secId,
        pro_id: proId,
        type: type,
      },
    }).then((json) => {
      return json;
    }),
  };
}
