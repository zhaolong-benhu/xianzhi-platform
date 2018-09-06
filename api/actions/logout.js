/**
 * Created by zhaolong on 2016/7/11.
 * File description:用户退出
 */
export default function logout(req) {
  return new Promise((resolve) => {
    req.session.destroy(() => {
      req.session.user = null;
      return resolve(null);
    });
  });
}
