/**
 * Created by same on 2016/7/23.
 * File description:分享到其他平台
 */
'use strict';
import React,{Component} from 'react';
import QRCode from 'qrcode.react'
import {imageUrl} from '../../api/common/Global';
const styles = require('./Share.scss');
import {Link} from 'react-router';

export default class Share extends Component {
  state={
      iswechat:false //是否微信
  };
  static defaultProps = {
    share:[
          {name:"微信",icon:"&#xe61e;",img:"/images/share/wechar.png",cmd:"wechat"},
          {name:"QQ",icon:"&#xe617;",img:"/images/share/qq.png",cmd:"qq"},
          {name:"新浪",icon:"&#xe611;",img:"/images/share/sina.png",cmd:"weibo"},
          {name:"QQ空间",icon:"&#xe61b;",img:"/images/share/zone.png",cmd:"qzone"}
    ],
  };
  constructor(props) {
      super(props);
      let sites = this.props.sites; //站点
      let url = this.props.url || location.href; //分享网址
      let title = encodeURIComponent(this.props.title); //分享标题
      let description = 'https://m.9first.com'; //描述
      let image = encodeURIComponent(this.props.pic); //分享图片
      let site = '先之云课堂'; //分享站点
      let origin = encodeURIComponent(this.props.origin); //起源
      let summary = description;//摘要
      let source = site //来源
      this.templates={
          qzone: `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&imageUrl=${image}&summary=${summary}&site=${source}`,
          qq: `http://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&imageUrl=${image}&source=${source}&desc=${description}`,
          tencent: `http://share.v.t.qq.com/index.php?c=share&a=index&title=${title}&url=${url}&pic=${image}`,
          weibo: `http://service.weibo.com/share/share.php?url=${url}&title=${title}&pic=${image}`,
          wechat: `javascript:`,
          douban: `http://shuo.douban.com/!service/share?href=${url}&name=${title}&text=${description}&image=${image}&starid=0&aid=0&style=11`,
          diandian: `http://www.diandian.com/share?lo=${url}&ti=${title}&type=link`,
          linkedin: `http://www.linkedin.com/shareArticle?mini=true&ro=true&title=${title}&url=${url}&summary=${summary}&source=${source}&armin=armin`,
          facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
          twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}&via=${origin}`,
          google: `https://plus.google.com/share?url=${url}`
     }
  }

  //点击取消
  OnCancel(){
    this.props.callbackParent("cancel");
  }
  //微信
  handleIswechat(){
    // this.setState({iswechat:this.state.iswechat ? false:true});
    this.setState({iswechat:!this.state.iswechat});
    this.props.callbackParent("yes");
  }
  render()
  {
    return(
      <div className={this.props.style=="mini" ? styles.container_mini: styles.container}>
          <div className={styles.title}>分享</div>
          <div className={styles.share} data-tag="share_1">
          {this.props.share.map(function(value,index) {
              return <div className={styles.nav} key={'share' + index}>
                          {(()=>{
                              if(value.cmd=="wechat"){
                                return <a onClick={this.handleIswechat.bind(this)} style={{backgroundImage:'url('+imageUrl+value.img+')'}}></a>
                              }
                              else {
                                return <a href={this.templates[value.cmd]} style={{backgroundImage:'url('+imageUrl+value.img+')'}}></a>
                              }
                          })()}
                         <div className={styles.name}>{value.name}</div>
                    </div>
          }.bind(this))}
        </div>
        <div className={styles.cancel} onClick={this.OnCancel.bind(this)}>取消</div>
        {this.state.iswechat &&
            <div className={styles.wechat}>
                <h4>微信扫一扫：分享</h4>
                <div className={styles.qrcode}>
                    <QRCode value={location.href} size={100} />
                </div>
                <div className={styles.help}>
                  <p>微信里点“发现”，扫一下,二维码便可将本文分享至朋友圈。</p>
                </div>
            </div>
        }
      </div>
    )
  }
}
