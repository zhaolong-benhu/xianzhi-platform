/**
 * Created by same on 2016/9/1.
 * File description:智库详情页面
 */
import React,{Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Header} from 'components';
import {Link} from 'react-router';
import {PDF} from 'components';
import {connect} from 'react-redux';
import {detail} from 'redux/modules/thinktank';
import {xz_document_detail_api} from '../../api/common/Global';
const styles = require('./Document.scss');

@connect(
  state => ({
    document:state.thinktank.detail
  }),
  {detail}
)
export default class DocumentDetail extends Component{
  static propTypes = {
		detail: PropTypes.func,
		document: PropTypes.object
	}
  state={
	    data:[],
        width:0
  };
  constructor(props){
    super(props);
    this.back = null;
  }
  componentWillReceiveProps(nextProps,nextState){
    if(this.props.document !=nextProps.document){
      this.setState({data:nextProps.document});
    }
  }
  componentWillMount(){
    let id=this.props.params.id || 0;
    this.props.detail(id);
  }
  componentDidMount(){
     this.setState({width:document.body.clientWidth});
     if(localStorage.oldbackUrl){
       this.back=localStorage.oldbackUrl;
     }
    setTimeout(() =>{
        var oMeta = document.createElement('meta');
        oMeta.name = "Keywords";
        oMeta.content = this.state.data.title+",先之云课堂、先之智库";
        document.getElementsByTagName('head')[0].appendChild(oMeta);
    },2000);
  }
  render(){
    var title = this.state.data.title;
    if(this.state.width<=320){
      if(title && title.length>8){
        title = title.substr(0,8)+'...';
      }
    }
    if(this.state.width>320){
      if(title && title.length>11){
        title = title.substr(0,11)+'...';
      }
    }
    // const id = this.props.params.id;
    const docId = this.state.data.docId;
    const token = this.state.data.token;
    const host = this.state.data.host;
    return(
      <div>
        <Helmet title={this.state.data.title}/>
        <Header title={title} back={this.back}/>
        <div className={styles.detail}>
        <PDF docId={docId} token={token} host={host} />
        </div>
      </div>
    )
  }
}
