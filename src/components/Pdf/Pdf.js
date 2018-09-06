/**
 * Created by same on 2016/6/30.
 * File description:h5 PDF预览
 */
 'use strict';
import React,{Component} from 'react';
const styles = require('../NoContent/NoContent.scss');

export default class Pdf extends Component{
    state = {
      height:600, //高度
      loadText:"文档加载中...",
    };
    componentDidMount(){
      let height = screen.height-45;
      this.setState({height:height});

      // var option = {
      //     docId: 54203,
      //     token: "ab14f60a4b6151bff3c268494b04781ab560878446f0bc48c6e43508122f9151h9u3|1534252979",
      //     host: "BCEDOC",
      //     serverHost: 'http://doc.bj.baidubce.com',
      //     width: 600, //文档容器宽度
      //     zoom: false,              //是否显示放大缩小按钮
      //     zoomStepWidth:200,
      //     pn: 3,  //定位到第几页，可选
      //     fontSize:'big',
      //     toolbarConf: {
      //             page: true, //上下翻页箭头图标
      //             pagenum: true, //几分之几页
      //             full: false, //是否显示全屏图标,点击后全屏
      //             copy: true, //是否可以复制文档内容
      //             position: 'center',// 设置 toolbar中翻页和放大图标的位置(值有left/center)
      //     } //文档顶部工具条配置对象,必选
      // };
      // new Document('reader', option);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.docId && nextProps.token && nextProps.host){
            this.setState({
                loadText:"",
            })
        }else{
            setTimeout(()=>{
                this.setState({
                    loadText:"该文档已失效",
                })
            },2000)
        }
    }
  	render(){
        var docId = this.props.docId;
        var token = this.props.token;
        var host = this.props.host;
      return(
          <div>
              {(docId && token && host)?
                  <iframe id="myiframe" src={'/web/doc.html?docId='+docId+'&token='+token+'&host='+host} width="100%" height={this.state.height}></iframe>
                  :
                  <div className={styles.errText}>{this.state.loadText}</div>
              }
          </div>
      )
    }
}
