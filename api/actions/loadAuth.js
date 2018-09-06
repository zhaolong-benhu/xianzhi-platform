/**
 * Created by zhaolong on 2016/7/12.
 * File description:用户认证
 */
export default function loadAuth(req) {
	 // 获得客户端的Cookie
	 var Cookies = {};
	 req.get('cookie') && req.get('cookie').split(';').forEach(function( Cookie ) {
			 var parts = Cookie.split('=');
			 if(parts[ 0 ].trim() == 'ticket' || parts[ 0 ].trim() == 'username'  || parts[ 0 ].trim() == 'user_type' ){
				  if(parts[ 0 ].trim() == 'ticket')
						Cookies['user_ticket'] = ( parts[ 1 ] || '' ).trim();
					else
			 			Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
		 	 }
	 });
	 if(Cookies){
			req.session.user=Cookies;
	 }else{
			req.session.user=null;
	 }
	return Promise.resolve(req.session.user || null);
}
