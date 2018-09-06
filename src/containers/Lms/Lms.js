/**
 * Created by zhaolong on 2016/9/1
 * File description:首页-LMS
 */

'use strict';
import React, { Component,PropTypes } from 'react';
import Helmet from 'react-helmet';
import {Header,Slider,ApplyLms,Login_Box,Warning,CommitInfo_Box,CommitSuccess_Box} from 'components';
import { Link } from 'react-router';
import {userApplyLms,isApply} from 'redux/modules/lms';
import {connect} from 'react-redux';
import {imageUrl} from '../../api/common/Global';

const styles = require('./Lms.scss');

@connect(
  state => ({
	  apply:state.lms.apply,
      user: state.auth.user
  }),
  {userApplyLms,isApply}
)

export default class Lms extends Component{
	static propTypes = {
		userApplyLms:PropTypes.func.isRequired,
		isApply:PropTypes.func.isRequired,
        user:PropTypes.object
	}
	//定义静态数据
	state={
		banner:[
			{alt:"1",imageurl:"http://f3-xz.veimg.cn/m/images/lms/lms-slider1.jpg?v=2",linkurl:"http://m.study.9first.com/lms/apply"},
			{alt:"2",imageurl:"http://f3-xz.veimg.cn/m/images/lms/lms-slider2.jpg?v=2",linkurl:"http://m.study.9first.com/lms/apply"}
		],
		thumb1:"/images/lms/lms1.png",
		thumb2:"/images/lms/lms2.png",
		thumb3:"/images/lms/lms3.png",
		thumb4:"/images/lms/lms4.png",
		thumb5:"/images/lms/lms5.png",

		title1:"中国酒店发展难题解决方案提供者",
		description1:"300多位酒店业跨国集团资深职业经理人及酒店业业主、行业知名人士深入研究中国酒店十余载，针对酒店行业存在的问题疑惑，根据企业在实践中所欠缺经营、管理、服务能力，研究和汇集成专业、科学、全面的课程资源和管理方案，并结合现代网络科技的优势，形成全员学习网络管理系统。",

		title2:"强势推出2000多门酒店专业课程",
		description2:"源于20000家酒店的运营问题和发展需求",
		description3:"根据酒店业各岗位胜任力模型，制定实战课程",
		description4:"根据酒店各部门不同职业需求，进行全员培训",
		description5:"根据酒店业在发展中既有问题，提供管理方案",


		title3:"优质的师资力量",
		description6:"中国酒店业权威专家顾问团队",
		description7:"张祖望、张黎明、奚晏平......",
		description8:"300多位酒店业资深人士组成的核心讲师团队",
		description9:"安强、姜玲、陈镇、李勇、吴峥......",

		title4:"E-learning+M-learning双效学习模式",
		description10:"快捷双效学习模式，三屏在线学习平台",
		description11:"让培训随时随地、无时无刻",
		description12:"让学习自由自在、轻松愉快",

		title5:"全心全意的售后服务团队",
		description13:"以客户为中心的专业售后服务团队",
		description14:"为客户提供高效而有序的集成服务",
		description15:"随时咨询，解答在线学习困惑",
		description16:"最大服务价值，来源于客户满意度",

		use:"他们都在使用先之学院",
		btnText:"申请试用",
		login_box:false,//登录框
		sign_box:false,//报名
		can_move:true,//屏幕是否可以移动
		commitok_box:false,//提交框
		tips_box:false,//msg提示框
	};

	static defaultProps = {
		company:[
			{"thumb":"/images/lms/company1.jpg?v=2"},
			{"thumb":"/images/lms/company2.jpg?v=2"},
			{"thumb":"/images/lms/company3.jpg?v=2"},
			{"thumb":"/images/lms/company4.jpg?v=2"},
			{"thumb":"/images/lms/company5.jpg?v=2"},
            {"thumb":"/images/lms/company6.jpg?v=2"}
		]

	};
	constructor(props){
		super(props);
		this.scroll = this.handleScroll.bind(this);
        this.touchmove = this.handleTouchMove.bind(this);
	}
	componentWillMount(){
		// this.props.isApply();//是否申请过
	}
	componentDidMount(){
		window.addEventListener('scroll',this.scroll);
		window.addEventListener('touchmove',this.touchmove);

		var oMeta = document.getElementsByTagName("meta");
		oMeta[1]["content"] = "酒店培训,现场培训，服务业培训，LMS企业内训，酒店企业培训，酒店职业，酒店员工价值管培训，酒店绩效";
		oMeta[2]["content"] = "先之企业内训，针对酒店企业全员培训，帮助中国酒店业建立真正具有国际化水准的人力资源及培训体系。";
	}
	//屏幕按下移动事件
	handleTouchMove(e){
	    if(!this.state.can_move){
	        e.preventDefault();
	    }
	}
	//屏幕滚动事件
	handleScroll(e){
	}
	componentWillUnmount(){
	    window.removeEventListener('scroll',this.scroll);
	    window.removeEventListener('touchmove',this.touchmove);
	}
	componentWillReceiveProps(nextProps){
        this.setState({tips_box:false});
        if(this.props.apply != nextProps.apply){
            this.setState({commitok_box: true});
            setTimeout(() => {
                this.setState({commitok_box: false});
            },3000);
        }
	 }

	//申请试用
	ImmediatelyApply(bLogin){
        //弹出灰化层
        let mask=document.getElementById('mask');
        mask.style.display="block";
        this.setState({can_move:false});

		if(bLogin){
			 //弹出报名框
			this.setState({sign_box:true});
		}else {
			this.setState({login_box:true});
		}
		// window.location.href="https://m-study.9first.com/lms/apply";
	}

    ClickImage(){
        //弹出灰化层
        let mask=document.getElementById('mask');
        mask.style.display="block";
        this.setState({can_move:false});

         if(this.props.user && this.props.user.user_ticket){
             if(!this.state.sign_box){
                 this.setState({sign_box:true});
             }
         }else {
             if(!this.state.login_box){
                 this.setState({login_box:true});
             }
         }

    }

	//判断用户登录选择是or否
	UserIsSeclectedLogin(){
	    let mask=document.getElementById('mask');
	    mask.style.display="none";
	    this.setState({login_box:false,can_move:true});
	}
	//校验用户输入的数据
	onCommitInfoBoxChanged(strResult,strName,strPhone){
        this.setState({commitok_box: false});

	    if("name_null" == strResult)
	    {
	      this.setState({tips_box:true});
	      this.setState({msg:"姓名不能为空"});
	    }
	    else if("phone_null" == strResult)
	    {
	      this.setState({tips_box:true});
	      this.setState({msg:"电话号码不能为空"});
	    }
	    else if("one" == strResult)
	    {
	      this.setState({tips_box:true});
	      this.setState({msg:"姓名不能少于2个字"});
	    }
	    else if("lack" == strResult)
	    {
	      this.setState({tips_box:true});
	      this.setState({msg:"电话号码格式不正确"});
	    }
	    else
	    {
	      let mask=document.getElementById('mask');
	      mask.style.display="none";

	      this.setState({sign_box:false});
	      this.setState({tips_box:false});
	      this.setState({can_move:true});

	      //此刻屏幕可以滑动
	      document.documentElement.style.overflow='visible';
	      document.body.style.overflow='visible';//手机版设置这个。

	      if(strResult)//提交成功-内训报名
	      {
	        const params={
	          name:strName,
	          tel:strPhone,
	        }
	        this.props.userApplyLms(params);
	        this.setState({btnText:"再次申请"});
	        this.setState({commitok_box: true});
            setTimeout(() => {
                this.setState({commitok_box: false});
            },3000);
	      }
	      else//取消
	      {
	        this.setState({commitok_box: false});
	      }
	    }

	  }
	render(){
		return(
			<div className={styles.root}>
				<Helmet title="先之学院"/>
				<Header title="先之学院" back="/"/>
        		<div className={styles.lms}>
            	<Slider data={this.state.banner} time="5000" type="lms" callbackParent={() => this.ClickImage()}/>
						<div className={styles.part}>
							<div className={styles.pic}>
								<img className={styles.img} src={imageUrl+this.state.thumb1}/>
							</div>
							<div className={styles.title}>
							<div className={styles.text}>{this.state.title1}</div>
							</div>
						</div>

						<div className={styles.description}>{this.state.description1}</div>

						<div className={styles.part}>
							<div className={styles.pic}>
								<img className={styles.img} src={imageUrl+this.state.thumb2}/>
							</div>
							<div className={styles.title}>
								<div className={styles.text}>{this.state.title2}</div>
							</div>
						</div>
						<div className={styles.description}>{this.state.description2}</div>
						<div className={styles.description}>{this.state.description3}</div>
						<div className={styles.description}>{this.state.description4}</div>
						<div className={styles.description}>{this.state.description5}</div>

						<div className={styles.part}>
							<div className={styles.pic}>
								<img className={styles.img} src={imageUrl+this.state.thumb3}/>
							</div>
							<div className={styles.title}>
							<div className={styles.text}>{this.state.title3}</div>
							</div>
						</div>
						<div className={styles.description}>{this.state.description6}</div>
						<div className={styles.description}>{this.state.description7}</div>
						<div className={styles.description}>{this.state.description8}</div>
						<div className={styles.description}>{this.state.description9}</div>

						<div className={styles.part}>
							<div className={styles.pic}>
								<img className={styles.img} src={this.state.thumb4}/>
							</div>
							<div className={styles.title}>
							<div className={styles.text}>{this.state.title4}</div>
							</div>
						</div>
						<div className={styles.description}>{this.state.description10}</div>
						<div className={styles.description}>{this.state.description11}</div>
						<div className={styles.description}>{this.state.description12}</div>

						<div className={styles.part}>
							<div className={styles.pic}>
								<img className={styles.img} src={imageUrl+this.state.thumb5}/>
							</div>
							<div className={styles.title}>
							<div className={styles.text}>{this.state.title5}</div>
							</div>
						</div>
						<div className={styles.description}>{this.state.description13}</div>
						<div className={styles.description}>{this.state.description14}</div>
						<div className={styles.description}>{this.state.description15}</div>
						<div className={styles.description}>{this.state.description16}</div>

						<div className={styles.company}>
								<div className={styles.use}>{this.state.use}</div>
								<div className={styles.all}>
									{this.props.company.map(function(value,index){
										return <div className={styles.nav} key={'all_plates' + index}>
											<div className={styles.bor}>
												<img src={imageUrl+value.thumb} className={styles.img}></img>
											</div>
										</div>
									})}
								</div>
						</div>
        </div>

				<div className={styles.float_bottom}>
				 <ApplyLms btnText={this.state.btnText} callbackParent={this.ImmediatelyApply.bind(this)}/>
			  </div>
			  {(()=>{
				 if(this.state.login_box){
					 return <Login_Box callbackParent={()=>this.UserIsSeclectedLogin()}/>
				 }
			  })()}

			  {(()=>{
				 if(this.state.sign_box){
					 return <CommitInfo_Box callbackParent={this.onCommitInfoBoxChanged.bind(this)}/>
				 }
			  })()}

			  {(()=>{
	             if(this.state.commitok_box)
	             {
	               return <CommitSuccess_Box msg="提交成功！" autoHide="true"/>
	             }
	          })()}

			  {(()=>{
	            if(this.state.tips_box)
	            {
	              return <Warning visible="true" msg={this.state.msg}/>
	            }
	          })()}
        </div>
      )
    }
  }
