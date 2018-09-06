const LOAD = 'xianzhi-platform/live/LOAD';
const LOAD_SUCCESS = 'xianzhi-platform/live/LOAD_SUCCESS';
const LOAD_FAIL = 'xianzhi-platform/live/LOAD_FAIL';

const ADD = 'xianzhi-platform/live/ADD';
const ADD_SUCCESS = 'xianzhi-platform/live/ADD_SUCCESS';
const ADD_FAIL = 'xianzhi-platform/live/ADD_FAIL';

const GET = 'xianzhi-platform/live/GET';
const GET_SUCCESS = 'xianzhi-platform/live/GET_SUCCESS';
const GET_FAIL = 'xianzhi-platform/live/GET_FAIL';

const THUMB = 'xianzhi-platform/live/THUMB';
const THUMB_SUCCESS = 'xianzhi-platform/live/THUMB_SUCCESS';
const THUMB_FAIL = 'xianzhi-platform/live/THUMB_FAIL';

const DETAIL = 'xianzhi-platform/live/DETAIL';
const DETAIL_SUCCESS = 'xianzhi-platform/live/DETAIL_SUCCESS';
const DETAIL_FAIL = 'xianzhi-platform/live/DETAIL_FAIL';

const REWARD = 'xianzhi-platform/live/REWARD';
const REWARD_SUCCESS = 'xianzhi-platform/live/REWARD_SUCCESS';
const REWARD_FAIL = 'xianzhi-platform/live/REWARD_FAIL';

const OPENID = 'xianzhi-platform/live/OPENID';
const OPENID_SUCCESS = 'xianzhi-platform/live/OPENID_SUCCESS';
const OPENID_FAIL = 'xianzhi-platform/live/OPENID_FAIL';

const QUIT = 'xianzhi-platform/live/QUIT';
const QUIT_SUCCESS = 'xianzhi-platform/live/QUIT_SUCCESS';
const QUIT_FAIL = 'xianzhi-platform/live/QUIT_FAIL';

const ONLINENUM = 'xianzhi-platform/live/ONLINENUM';
const ONLINENUM_SUCCESS = 'xianzhi-platform/live/ONLINENUM_SUCCESS';
const ONLINENUM_FAIL = 'xianzhi-platform/live/ONLINENUM_FAIL';

const HISTORYLIST = 'xianzhi-platform/live/HISTORYLIST';
const HISTORYLIST_SUCCESS = 'xianzhi-platform/live/HISTORYLIST_SUCCESS';
const HISTORYLIST_FAIL = 'xianzhi-platform/live/HISTORYLIST_FAIL';


const RED_MONEY_NUM = 'xianzhi-platform/live/red_money_num';

const initialState = {
  loaded: false,
  onlineNum:0,
  money:0,
};

export default function live(state = initialState, action = {}) {
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
        list: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        list: null,
        error: action.error
      };
    case ADD:
      return {
        ...state,
        adding: true,
      };
    case ADD_SUCCESS:
      return {
        ...state,
        adding: false,
        added: true,
        status: action.result,
      };
    case ADD_FAIL:
      return {
        ...state,
        adding: false,
        added: false,
        error: action.error,
      };
    case GET:
      return {
        ...state,
        getting: true,
      };
    case GET_SUCCESS:
      return {
        ...state,
        getting: false,
        getted: true,
        status: action.result,
      };
    case GET_FAIL:
      return {
        ...state,
        getting: false,
        getted: false,
        error: action.error,
      };
    case THUMB:
      return {
        ...state,
        thumbIn: true
      };
    case THUMB_SUCCESS:
      return {
        ...state,
        thumbIn: false,
        thumb: action.result
      };
    case THUMB_FAIL:
      return {
        ...state,
        thumbIn: false,
        thumbError: action.error
      };
    case DETAIL:
      return {
        ...state
      }
    case DETAIL_SUCCESS:
      return {
        ...state,
        detail: action.result,
        // money:action.result.data.red_packet
      }
    case DETAIL_FAIL:
      return {
        ...state,
        detail_error: action.error
      };
      case HISTORYLIST:
        return {
          ...state
        }
      case HISTORYLIST_SUCCESS:
        return {
          ...state,
          liveHistoryList: action.result
        }
      case HISTORYLIST_FAIL:
        return {
          ...state,
          liveHistoryList_error: action.error
        };
    case REWARD:
      return {
        ...state
      }
    case REWARD_SUCCESS:
      return {
        ...state,
        data: action.result
      }
    case REWARD_FAIL:
      return {
        ...state,
        data_error: action.error
      };
    case OPENID:
      return {
        ...state
      }
    case OPENID_SUCCESS:
      return {
        ...state,
        openId: action.result
      }
    case OPENID_FAIL:
      return {
        ...state,
        openId_error: action.error
      };
      case QUIT:
        return {
          ...state
        }
      case QUIT_SUCCESS:
        return {
          ...state,
          quit: action.result
        }
      case QUIT_FAIL:
        return {
          ...state,
          quit_error: action.error
        };

      case ONLINENUM:
        return {
          ...state
        }
      case ONLINENUM_SUCCESS:
        return {
          ...state,
          onlineNum: action.result.num_show
        }
      case ONLINENUM_FAIL:
        return {
          ...state,
          onlineNum_error: action.error
        };

      case RED_MONEY_NUM:
        return {
          ...state,
          money:parseFloat(parseFloat(state.money)+parseFloat(action.payload)).toFixed(2)
        }
    default:
      return state;
  }
}

//判断是否加载过
export function isLoaded(globalState) {
  return globalState.live && globalState.live.loaded;
}

//直播列表
export function load(page) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/mv1/live/live-list', {
      data: {
        page: page,
      }
    }).then(function (json) {
      return json;
    })
  }
}

export function add(obj) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAIL],
    promise: (client) => client.post('/mv1/user/live/add', {
      data: {
        ...obj,
      },
    }).then((json) => json),
  };
}

export function get() {
  return {
    types: [GET, GET_SUCCESS, GET_FAIL],
    promise: (client) => client.post('/mv1/user/live/user-status').then((json) => json),
  };
}

//获取用户头像
export function getUserThumb() {
  return {
    types: [THUMB, THUMB_SUCCESS, THUMB_FAIL],
    promise: (client) => client.post('/mv1/user/info/thumb').then(function (json) {
      return json;
    })
  };
}

//微信获取openid
export function wxAuth(url) {
  return {
    types: [OPENID, OPENID_SUCCESS, OPENID_FAIL],
    promise: (client) => client.post('/wxAuth', {
      data: {
        url: url
      }
    }).then(function (json) {
      return json;
    })
  }
}

// 直播详情
export function detail(id) {
  return {
    types: [DETAIL, DETAIL_SUCCESS, DETAIL_FAIL],
    promise: (client) => client.post('/mv1/live/live-info', {
      data: {
        id: id,
      },
    }).then( (json) => json),
  }
}


// 历史回看列表
export function historyList(id) {
  return {
    types: [HISTORYLIST, HISTORYLIST_SUCCESS, HISTORYLIST_FAIL],
    promise: (client) => client.post('/mv1/live/get-history-live', {
      data: {
        id: id,
      },
    }).then( (json) => json),
  }
}

// 直播用户打赏
export function reward(id, money, openid) {
  return {
    types: [REWARD, REWARD_SUCCESS, REWARD_FAIL],
    promise: (client) => client.post('/pay/request/live-weixin-pay', {
      data: {
        live_id: id,
        money: money,
        openid: openid
      }
    }).then(function (json) {
      return json;
    })
  }
}
// 直播间在线人数
export function getOnlineNum(params){
  return{
    types: [ONLINENUM, ONLINENUM_SUCCESS, ONLINENUM_FAIL],
    promise: (client) => client.get('/mv1/live/live-online-num', {
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

//红包金额
export const redPocketNum = (money) => {
	return {
		type: RED_MONEY_NUM,
		payload: money
	}
}

// 直播间退出操作
export function quitOnlineNum(user_name,channel_id) {
  return {
    types: [QUIT, QUIT_SUCCESS, QUIT_FAIL],
    promise: (client) => client.post('/mv1/live/quit-online-num', {
      data: {
        user_name: user_name,
        channel_id: channel_id
      },
    }).then( (json) => json),
  }
}
