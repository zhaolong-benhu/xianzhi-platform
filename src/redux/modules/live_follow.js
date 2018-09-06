const ADDFOLLOW = 'xianzhi-platform/live_follow/ADDFOLLOW';
const ADDFOLLOW_SUCCESS = 'xianzhi-platform/live_follow/ADDFOLLOW_SUCCESS';
const ADDFOLLOW_FAIL = 'xianzhi-platform/live_follow/ADDFOLLOW_FAIL';

const CANCELFOLLOW = 'xianzhi-platform/live_follow/CANCELFOLLOW';
const CANCELFOLLOW_SUCCESS = 'xianzhi-platform/live_follow/CANCELFOLLOW_SUCCESS';
const CANCELFOLLOW_FAIL = 'xianzhi-platform/live_follow/CANCELFOLLOW_FAIL';

const ADDANCHOROLLOW = 'xianzhi-platform/live_follow/ADDANCHOROLLOW';
const ADDANCHOROLLOW_SUCCESS = 'xianzhi-platform/live_follow/ADDANCHOROLLOW_SUCCESS';
const ADDANCHOROLLOW_FAIL = 'xianzhi-platform/live_follow/ADDANCHOROLLOW_FAIL';

const initialState = {
  loaded: false
};

export default function live_follow(state = initialState, action = {}) {
  switch (action.type) {
    case ADDFOLLOW:
      return {
        ...state,
        loading: true
      };
    case ADDFOLLOW_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        add_data: action.result
      };
    case ADDFOLLOW_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        add_data: null,
        error: action.error
      };
      case CANCELFOLLOW:
        return {
          ...state,
          loading: true
        };
      case CANCELFOLLOW_SUCCESS:
        return {
          ...state,
          loading: false,
          loaded: true,
          cancel_data: action.result
        };
      case CANCELFOLLOW_FAIL:
        return {
          ...state,
          loading: false,
          loaded: false,
          cancel_data: null,
          error: action.error
        };
        case ADDANCHOROLLOW:
          return {
            ...state,
            loading: true
          };
        case ADDANCHOROLLOW_SUCCESS:
          return {
            ...state,
            loading: false,
            loaded: true,
            addanchor_data: action.result
          };
        case ADDANCHOROLLOW_FAIL:
          return {
            ...state,
            loading: false,
            loaded: false,
            addanchor_data: null,
            error: action.error
          };
    default:
      return state;
  }
}
//判断是否加载过
export function isLoaded(globalState) {
  return globalState.live_follow && globalState.live_follow.loaded;
}

//添加提醒
export function addFollow(live_id){
  return{
    types: [ADDFOLLOW, ADDFOLLOW_SUCCESS, ADDFOLLOW_FAIL],
    promise: (client) => client.post('/mv1/user/live/add-remind',{
        data:{
            live_id:live_id
        }
    }).then(function(json){
          return json;
    })
  }
}
//取消提醒
export function cancelFollow(live_id){
  return{
    types: [CANCELFOLLOW, CANCELFOLLOW_SUCCESS, CANCELFOLLOW_FAIL],
    promise: (client) => client.post('/mv1/user/live/delete-remind',{
        data:{
            live_id:live_id
        }
    }).then(function(json){
          return json;
    })
  }
}

//关注主播/取消关注
export function addAnchorFollow(user_id){
  return{
    types: [ADDANCHOROLLOW, ADDANCHOROLLOW_SUCCESS, ADDANCHOROLLOW_FAIL],
    promise: (client) => client.post('/mv1/user/favorite/add',{
        data:{
            id:user_id,
            type:24
        }
    }).then(function(json){
          return json;
    })
  }
}
