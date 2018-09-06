const LOAD = 'xianzhi-platform/liveclass/LOAD';
const LOAD_SUCCESS = 'xianzhi-platform/liveclass/LOAD_SUCCESS';
const LOAD_FAIL = 'xianzhi-platform/liveclass/LOAD_FAIL';
const DATA = 'xianzhi-platform/favorite/DATA';
const DATA_SUCCESS = 'xianzhi-platform/favorite/DATA_SUCCESS';
const DATA_FAIL = 'xianzhi-platform/favorite/DATA_FAIL';
const initialState = {
  loaded: false,
};

export default function liveclass (state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error,
      };
    case DATA:
      return {
        ...state,
        loading: true,
      };
    case DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
      };
    case DATA_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error,
      };
    default:
      return state;
  }
}

//判断是否加载过
export function isLoaded(globalState) {
  return globalState.liveclass && globalState.liveclass.loaded;
}

//我的公开课
export function load(page) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/mv1/user/index/liveclasslist', {
      data: {
        page: page,
      },
    }).then((json) => json),
  }
}
//获取关注过的主播列表
export function loadLiveList(page) {
  return {
    types: [DATA, DATA_SUCCESS, DATA_FAIL],
    promise: (client) => client.post('/mv1/user/favorite/live-user-list', {
      data: {
        page: page,
      },
    }).then((json) => json),
  }
}
