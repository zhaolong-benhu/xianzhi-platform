import superagent from 'superagent';
import config from '../config';
import jsonp from '../jsonp/jsonp';
const methods = ['get', 'post', 'put', 'patch', 'del'];

//获取API请求地址
function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  //是否是服务器请求
  if (__SERVER__) {
    //Prepend host and port of the API server to the path.
    if(path=='/loadAuth' || path=='/wxAuth'){
      return 'http://'+config.host+':' + config.nodePort + adjustedPath;
    }
    else{
      return 'http://'+config.host+':'+config.port+'/api'+adjustedPath;
    }
  }else{
    //Prepend `/api` to relative URL, to proxy to API server.
      return path[0] !== '/' ? 'https://' + adjustedPath : '/api' + adjustedPath;
  }
}
//获取ticket
function getTicket(cookie){
  if(cookie){
    const cookies=unescape(cookie).split("; ");
    if(cookies.length>0){
      for(let i in cookies){
        if(cookies[i].indexOf("ticket")==0){
          let key=cookies[i].split("=");
          if(key[0]=='ticket'){
            return key[1];
          }
        }
      }
    }
  }
  return null;
}
export default class ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path,{ params, data } = {}) => new Promise((resolve, reject) => {
        var url=formatUrl(path),
            request=superagent[method](url);
        if(url.indexOf('sso.9first.com')!=-1){
          request.use(jsonp);
        }
        if (params) {
          request.query(params);
        }
        //post请求获取用户ticket
        if(method == 'post'){
          request.set('Content-Type', 'application/x-www-form-urlencoded');
          const ticket = getTicket(__SERVER__ ? req.get('cookie') : document.cookie);
          if (ticket) {
            request.send({user_ticket: ticket });
          }
        }
        if(__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }
        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));

      }));
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {}
}
