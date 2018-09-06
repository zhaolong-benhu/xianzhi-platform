/**
 * Created by zhaolong on 2016/7/12.
 * File description:登录
 */
export default function login(req) {
	const user = {
    	username: req.body.username,
    	userid: req.body.userid,
    	ticket: req.body.ticket
	};
	req.session.user = user;
  	return Promise.resolve(user);
}
