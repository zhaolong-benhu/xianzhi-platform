/**
 * Created by zhaolong on 2016/6/27
 * File description:项目全局配置
 */
require('babel-polyfill');

const environment = {
  development: {
    isProduction: false,
  },
  production: {
    isProduction: true,
  },
}[process.env.NODE_ENV || 'production'];

module.exports = Object.assign({
  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'api.9first.com',
  apiPort: process.env.APIPORT,
  nodePort:30002,
  app: {
    title: '先之云课堂',
    description: '中国旅游服务业首创O2O学习平台，提供酒店教育培训,职业技能教育,酒店技能培训,酒店教育培训,网络视频课程,职业证书查询,8大岗位知识技能，34个专业课程以及学习实战课程，使酒店人掌握实用职业技能。',
    head: {
      titleTemplate: '%s-先之云课堂',
      meta: [
        {name:'Keywords', content: '先之云课堂、酒店教育、酒店培训、职业技能培训、网络在线课程、IHMA证书、酒店英语，酒店公开课，酒店在线学习，酒店视频学习，酒店考证，酒店新员工培训，酒店总经理培训，客服培训，餐饮培训。'},
        {name: 'description', content: '中国旅游服务业首创O2O学习平台，提供酒店教育培训,职业技能教育,酒店技能培训,酒店教育培训,网络视频课程,职业证书查询,8大岗位知识技能，34个专业课程以及学习实战课程，使酒店人掌握实用职业技能。'},
        {name:"baidu-site-verification",content:"omg64drZqE"},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: '先之云课堂'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: '9first.com'},
      ],
    },
  },
}, environment);
