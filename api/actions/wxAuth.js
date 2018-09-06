/**
 * Created by zhaolong on 2016/7/12.
 * File description:用户微信认证
 */
import superagent from 'superagent';
import jsonp from '../../src/jsonp/jsonp';
export default function wxAuth(req) {
    return new Promise((resolve) => {
        if(req.session.openid==null){
            let code=GetQueryString("code",unescape(req.url.substr(1).split('?url=')[1]));
            const params={
              grant_type:'authorization_code',
              appid     :'wx19ea9cf1559ecaa2',
              secret    :'cc1edcb0889d2217e5b9276d6838ee38',
              code      :code,
              callbackParam:'callback'
            };
            superagent.get("https://api.weixin.qq.com/sns/oauth2/access_token").use(jsonp).query(params).end(function(err,res){
              if(!err)
              {
                let result = JSON.parse(res.text);
                req.session.openid = result.openid || null;
                return resolve(req.session.openid);
              }
            }.bind(this))
        }else{
            return resolve(req.session.openid);
        }
  });
}
//获取地址栏参数
function GetQueryString(name,url)
{
   var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
   var r = url.match(reg);
   if(r!=null)return  unescape(r[2]); return null;
}
