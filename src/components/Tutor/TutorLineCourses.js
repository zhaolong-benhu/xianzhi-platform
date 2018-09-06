/**
 * Created by zhaolong on 2016/6/30.
 * File description:导师所有在线课程
 */
import React,{Component,PropTypes} from 'react';
import {Link} from 'react-router';
import Helmet from 'react-helmet';
import {Header} from 'components';
import {teacher_linecourses} from '../../api/common/Global';
import {connect} from 'react-redux';
import {getData} from 'redux/modules/page';
const styles = require('./TutorLineCourses.scss');

@connect(
  state => ({
    data:state.page.data
  }),
  {getData}
)

export default class TutorLineCourses extends Component{

  static propTypes = {
      data: PropTypes.object,
      getData: PropTypes.func.isRequired
  }
  state={
    data:[],
    index:1,
    pageNum:0,
    bLock:false,
  };
  constructor(props) {
      super(props);
      this.array = [];
      this.scroll = this.handleScroll.bind(this);
  }
  componentDidMount(){
    //添加滚动条事件
    window.addEventListener('scroll',this.scroll);
    const params={
      id:this.props.params.id,
      page:this.state.index
    }
    this.props.getData(params,teacher_linecourses);
  }
  componentWillUnmount(){
    window.removeEventListener('scroll',this.scroll);
  }
//页面滚动
handleScroll(e){
  let srollPos = window.pageYOffset; //滚动条距顶部距离(页面超出窗口的高度)
  let totalheight = parseFloat(document.documentElement.clientHeight) + parseFloat(srollPos); //屏幕高度+滚动条距顶部距离
  if((document.body.scrollHeight-10) <= totalheight){//屏幕高度+滚动条距顶部距离>页面高度
    //加锁处理
    if(!this.state.bLock){
      this.setState({bLock:true});
      if(this.state.index<this.state.pageNum){
          this.setState({index:this.state.index+1});
          const params={
            id:this.props.params.id,
            page:this.state.index
          }
          this.props.getData(params,teacher_linecourses);

      }else {
      }
    }
  }
}
componentWillReceiveProps(nextProps){
  if(this.props.data!=nextProps.data){
    this.array.push(nextProps.data.list);
    this.setState({pageNum:nextProps.data.total_page});
    this.setState({data:this.array});
    this.setState({bLock:false});
  }
}
  render(){
    return(
      <div className={styles.container}>
        <Helmet title="导师在线课程"/>
        <Header title="导师在线课程"/>

        <div className={styles.course}>
          <ol className={styles.list}>
              {this.state.data.map(function(v,i){
                return(
                  <div>
                    {this.state.data[i].map(function(data,index){
                      return  <Link to={'/kecheng/'+data.id} activeClassName="active" key={'data'+index}>
                                  <li key={'data' + index}>
                                    <div className={styles.pic}>
                                      <img src={data.thumb}/>
                                    </div>

                                    <div className={styles.info}>
                                      <div>
                                        <span className={styles.title}>{data.title}</span>
                                      </div>

                                      <div className={styles.people}>{data.study_num}人学过</div>

                                      {(()=>{
                                        if(data.real_price == "0.00")
                                        {
                                          return <div className={styles.combination}>免费</div>
                                        }
                                        else{
                                          return<div className={styles.combination}>
                                            ¥{data.real_price}
                                          </div>
                                        }
                                      })()}

                                    </div>
                                  </li>
                        </Link>
                    })}
                  </div>
                  )
           }.bind(this))}
          </ol>
        </div>

      </div>
    )
  }
}
