/**
 * Created by same on 2016/6/24.
 * File description:类别筛选
 */

'use strict';
import React,{Component,PropTypes} from 'react';
import {CourseCategory} from 'components';
import {connect} from 'react-redux';
const styles = require('./CourseScreen.scss');
import { push } from 'react-router-redux';
@connect(
  state => ({
    opencourse:state.openclass.courseData, //公开课数据
    course:state.course.courseData,//在线课程数据
	tutor:state.train.trainData,//内训导师数据
    subclass: state.category.data //类别数据
  }),{push}
)
export default class CourseScreen extends Component {
	static propTypes = {
	    push:PropTypes.func.isRequired,
      subclass:PropTypes.object
	}
	state = {
      	index:-1, //显示层级
      	option:0, //当前选项
      	indexClass:'',//类型
      	items:[], //选项列表
      	visible:false, //选项是否可见
      	category:[], //类别列表
        screenHight:0, //屏幕高度
        tip:null, //提示
        can_move:true, //屏幕是否可以滚动
  	};
  constructor(props) {
        super(props);
        this.touchmove = this.handleTouchMove.bind(this);
        //在线课程排序
        this.course_order=[
            {id:1,category:"综合排序"},
            {id:2,category:"人气排序"},
            {id:3,category:"价格最低"},
            {id:4,category:"价格最高"}
        ];
        //在线课程类型
        this.course_type=[
            {id:0,category:"全部"},
            {id:1,category:"免费课程"},
            {id:2,category:"单门课程"},
            {id:3,category:"专业证书"}
        ];
        //线下公开课排序
        this.opencourse_order=[
           {id:1,category:"综合排序"},
           {id:2,category:"人气排序"},
           {id:3,category:"价格最低"},
           {id:4,category:"价格最高"}
        ];
        //线下公开课类型
        this.opencourse_type=[
            {id:0,category:"全部"},
            {id:1,category:"正在报名"},
            {id:2,category:"报名结束"}
        ];
        //导师排序
        this.tutor_order=[
            {id:1,category:"综合排序"},
            {id:2,category:"人气排序"},
            {id:3,category:"内训次数最多"}
        ];
        //导师类型
        this.tutor_type=[
            {id:0,category:"全部"},
            {id:1,category:"可预约"}
        ];
        //智库文档排序
        this.paper_order=[
            {id:1,category:"综合排序"},
            {id:2,category:"最新上传"},
            {id:3,category:"浏览量最高"}
        ];
    }
  componentWillMount(){
      //路由参数
      const routes=this.props.params ? this.props.params.split("-") : 0;
      //参数对象
      var params={
         order:routes[1] || 1,
         order_name:"综合排序",
         class_id:routes[0] || 0,
         class_name:"全部",
         type:routes[2] || 0,
         type_name:"筛选"
      }
      var order_list=null,//排序列表
          type_list=null; //类型列表
      switch (this.props.type) {
         case "1": //在线课程
           order_list=this.course_order;
           type_list=this.course_type;
           params.class_name=this.props.course ? this.props.course.class_name : "全部";
           break;
         case "12"://线下公开课
           order_list=this.opencourse_order;
           type_list=this.opencourse_type;
           params.class_name=this.props.opencourse ? this.props.opencourse.class_name : "全部";
           break;
         case "11"://内训
           order_list=this.tutor_order;
           type_list=this.tutor_type;
           break;
         case "22"://智库
           order_list=this.paper_order;
           params.class_name=this.props.tutor ? this.props.tutor.class_name : "全部";
           params.type_name="全部";
           break;
        case "3"://IHMA
           params.order=routes[1] || 0;
           params.order_name="职业选择";
           params.type_name="全部证书";
           break;
         default:
     }
      var category=null;//类别
      if(this.props.type=="22"){ //智库筛选
          if(this.props.data){
              this.props.data.map(function(v,i){
                 if(params.class_id==v.id){
                   params.class_name=v.title;
                 }
              })
          }
          category=[{id:params.order,category:params.order_name},{id:params.class_id,category:params.class_name}];
      }
      else if(this.props.type=="3"){ //IHMA筛选
          if(this.props.data){
            this.props.data.quarters.map(function(v,i){
               if(v.id==params.class_id){
                 params.class_name=v.name;
               }
            })
            this.props.data.position.map(function(v,i){
               if(v.id==params.order){
                 params.order_name=v.name;
               }
            })
          }
          category=[{id:params.order,category:params.order_name},{id:params.class_id,category:params.class_name},{id:0,category:params.type_name}];
      }
      else{
          //排序筛选
          if(order_list){
            order_list.map(function(v,i){
               if(v.id==params.order){
                 params.order_name=v.category;
               }
            })
          }
          //类型筛选
          if(type_list){
            type_list.map(function(v,i){
               if(v.id==params.type){
                 params.type_name=v.category;
               }
            })
          }
          category=[{id:params.class_id,category:params.class_name},{id:params.order,category:params.order_name},{id:params.type,category:params.type_name}];
          let subclass=this.handleGetCategory(params.class_id);
          category[0].index=subclass.parent_id;
          category[0].items=subclass.items;
          category[0].itemId=subclass.item_id;
          category[0].name=subclass.name;
      }
      this.setState({category:category});
  }

	componentWillReceiveProps(nextProps){
		var name='all';
		if(this.props.opencourse!=nextProps.opencourse){
			name=nextProps.opencourse.class_name || '全部';
		}else if(this.props.course!=nextProps.course){
			name=nextProps.course.class_name || '全部';
		}else if(this.props.tutor!=nextProps.tutor){
			name=nextProps.tutor.class_name || '全部';
		}
		if(name!='all'){
			let category=this.state.category;
			category[0].category=name;
			this.setState({category:category});
		}
	}
  componentDidMount(){
    var height = screen.height-92;
    this.setState({screenHight:height+"px"});
    //是否默认指定筛选条件
    if(this.props.option && this.props.category[1].id==0){
      this.handleChangeTab(Number(this.props.option),1);
    }
    //监听屏幕滚动
    window.addEventListener('touchmove',this.touchmove);
  }
  componentWillUnmount() {
    window.removeEventListener('touchmove', this.touchmove);
  }
  //屏幕滚动设置
  handleTouchMove(e){
      if(!this.state.can_move){
          e.preventDefault();
      }
  }
  //获取类别信息
  handleGetCategory(id){
    let category={
       item_id:0, //子类id
       parent_id:1, //大类ID
       items:0, //子类索引
       name:'全部' //大类名称
    }
    if(this.props.subclass){
       this.props.subclass.map(function(v,i){
            if(v.id==id){
                category.parent_id=Number(id);
                category.name=v.name;
            }else{
                v.list.map(function(value,w){
                    if(value.id==id){
                      category.parent_id=Number(value.parent_id);
                      category.item_id=Number(id);
                      category.items=Number(w+1);
                      category.name=v.name;
                    }else{
                        value.list.map(function(data,k){
                            if(data.id==id){
                              category.item_id=Number(data.parent_id);
                              category.items=Number(w+1);
                              category.name=v.name;
                              v.list.map(function(v,l){
                                 if(v.id==data.parent_id){
                                   category.parent_id=Number(v.parent_id);
                                 }
                              })
                            }
                        })
                   }
              })
            }
       })
    }
    return category;
  }
  //类别筛选
	handleChangeTab(index,id) {
    var mask=document.getElementById('mask');
    //IHMA筛选全部证书
    if(index==2 && this.props.type==3){
      let category=[{id:0,category:'职业选择'},{id:0,category:'全部'},{id:0,category:'全部证书'}];
      this.handleSelect(category,2,'全部证书',0);
      return;
    }
    if(this.state.index==index){
  		mask.style.display="none";
      mask.style.zIndex=100;
      document.getElementById('header').style.zIndex=99;
      document.getElementById('menu').style.zIndex=99;
      this.setState({visible:false});
    	this.setState({index:-1});
      return;
    }
    //设置屏幕不可以滑动
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    //设置屏幕手机版设置
    this.setState({can_move:false});
    // if(index==0){
  	// 	mask.style.display="none";
    //   mask.style.zIndex=100;
    //   document.getElementById('header').style.zIndex=99;
    //   document.getElementById('menu').style.zIndex=99;
    // }
    mask.style.display="block";
    mask.style.zIndex=101;
    document.getElementById('header').style.zIndex=110;
    document.getElementById('menu').style.zIndex=102;

    switch (this.props.type) {
      case "1":  //在线课程
      {
          switch(index){
            case 1:
            {
                this.setState({indexClass:''});
                this.setState({items: this.course_order});
              break;
            }
            case 0:
            {
                this.setState({indexClass:'category'});
                break;
            }
            case 2:
            {
                this.setState({indexClass:styles.category});
                this.setState({items: this.course_type});
              break;
            }
          }
      }
      break;
      case "12":  //线下公开课
      {
          switch(index){
            case 1:
            {
                this.setState({indexClass:''});
                this.setState({items: this.opencourse_order});
                break;
            }
            case 0:
            {
                this.setState({indexClass:'category'});
                break;
            }
            case 2:
            {
                this.setState({indexClass:styles.category});
                this.setState({items: this.opencourse_type});
                break;
            }
          }
      }
      break;
      case "11": //内训
      {
          switch (index) {
            case 1:
      			{
      		    	this.setState({indexClass:''});
      		    	this.setState({items: this.tutor_order});
      				  break;
      			}
            case 0:
      			{
      		    	this.setState({indexClass:'category'});
      				  break;
      			}
            case 2:
      			{
      		    	this.setState({indexClass:styles.category +" "+ styles.tutar});
      		    	this.setState({items: this.tutor_type});
      				  break;
      			}
          }
      }
      break;
      case "22": //智库
      {
          switch (index) {
            case 0:
            {
                this.setState({indexClass:''});
                this.setState({items: this.paper_order});
                break;
            }
            case 1:
            {
                this.setState({indexClass:'document'});
                break;
            }
          }
      }
      break;
      case "3": //IHMA
      {
          switch (index) {
            case 0:
            {
                this.setState({items:this.props.data.position});
                this.setState({indexClass:'ihma'});
                break;
            }
            case 1:
            {
                this.setState({items:this.props.data.quarters});
                this.setState({indexClass:'ihma'});
                break;
            }
            case 2:
            {
                break;
            }
          }

      }
      break;
      default:{
        break;
      }
    }
		this.setState({index:index});
		this.setState({option: id});
		this.setState({visible:true});
	}
  //类别选择
	handleSelect(category,i,name,id,index,items,item_id,sub_name) {
      if(i==0 && this.props.type!="22"){
        category[i].category=name;
  	    category[i].id=id;
        category[i].index=index;
        category[i].items=items;
        category[i].itemId=item_id;
        category[i].name=sub_name;
      }else{
        category[i].category=name;
        category[i].id=id;
      }
      this.setState({category:category});
    	this.setState({visible:false});
    	this.setState({index:-1});
      var params=null,
					url='';
      switch (this.props.type) {
        case "1": //在线课程
        {
        	  params={
              order:category[1].id,
        	    class_id:category[0].id,
        	    type:category[2].id,
              page:1
            }
            url=this.props.url+'/'+params.class_id+'-'+params.order+'-'+params.type;
            this.props.push(url);
            break;
        }
        case "22"://智库
        {
            params={
              order:category[0].id,
              category_id:category[1].id,
              page:1
            };
            url=this.props.url+'/'+params.category_id+'-'+params.order;
            this.props.push(url);
            break;
        }
        case "3"://IHMA
        {
          params={
            position:category[0].id,
            quarters:category[1].id,
            page:1
          };
          url=this.props.url+'/'+params.quarters+'-'+params.position;
          this.props.push(params.quarters==0 && params.quarters==0 ? '/ihma' : url);
          break;

        }
        default: //线下版块（公开课和内训）
        {
          params={
            type:this.props.type,
          	order:category[1].id,
          	class_id:category[0].id,
          	status:category[2].id,
            page:1
          }
          url=this.props.url+'/'+params.class_id+'-'+params.order+'-'+params.status;
          this.props.push(url);
          break;
        }
      }
	    let mask=document.getElementById('mask');
      mask.style.display="none";
      mask.style.zIndex=100;
      document.getElementById('menu').style.zIndex=99;
      document.getElementById('header').style.zIndex=99;
      this.props.callbackParent(params);
      //设置可以滚动屏幕
      document.documentElement.style.overflow = 'visible';
      document.body.style.overflow = 'visible';
      this.setState({can_move:true});
      if(this.props.type == "22"){
        ga('send','event',this.props.type+'-'+category[1].id,'detail-1','fenlei');
      }else {
        ga('send','event',this.props.type+'-'+category[0].index+'-'+category[0].id,'detail-1','fenlei');
      }
  }
	render(){
		return(
			<div className={this.state.index==5 ? styles.fixed : styles.fixed +" "+ styles.zindex } id="menu">
				<div className={styles.screen}>
					<ol className={this.props.type==3 ? styles.nothing : ''}>
					{
			      		this.state.category.map(function(data,i) {
		          		return 	<li className={this.state.index==i ? this.props.type==22 ? styles.document_active :styles.active : this.props.type==22 ? styles.document : ''} key={'category'+i} onClick={this.handleChangeTab.bind(this,i,data.id)}>{data.category}</li>
		          		}.bind(this))
			      	}
					</ol>
				</div>
				{this.state.visible &&
					<div>
						{(()=>{
							if(this.state.indexClass=='category'){
								return(
									<CourseCategory data={this.props.data} handleSelect={this.handleSelect.bind(this,this.state.category)} option={this.state.category[0]} url={this.props.url} type="3"/>
								)
							}else if(this.state.indexClass=='ihma'){
                return(
                  <div className={styles.items} style={this.state.index==1 ? {height:this.state.screenHight} : {}}>
                    <ul className={styles.ihma}>
                      <li className={this.state.option==0  ? styles.active:''} key={'ihma0'} onClick={this.handleSelect.bind(this,this.state.category,this.state.index,'全部',0)}>全部</li>
                      {
                        this.state.items.map(function(data,i) {
                              return 	<li className={this.state.option==data.id  ? styles.active:''} key={'ihma'+i+1} onClick={this.handleSelect.bind(this,this.state.category,this.state.index,data.name,data.id)}>{data.name}</li>
                              }.bind(this))
                      }
                    </ul>
                  </div>
                )
              }else if(this.state.indexClass=='document'){
                return(
                  <div className={styles.items} style={{height:this.state.screenHight}}>
                    <ul className={styles.document}>
                      <li className={this.state.option==0  ? styles.active:''} key={'document0'} onClick={this.handleSelect.bind(this,this.state.category,this.state.index,'全部',0)}>全部</li>
                      {
                        this.props.data.map(function(data,i) {
                              return 	<li className={this.state.option==data.id  ? styles.active:''} key={'document'+i+1} onClick={this.handleSelect.bind(this,this.state.category,this.state.index,data.title,data.id)}>{data.title}</li>
                              }.bind(this))
                      }
                    </ul>
                  </div>
                )
              }else{
								return(
									<div className={styles.items}>
										<ul className={this.state.indexClass}>
											{
												this.state.items.map(function(data,i) {
								          		return 	<li className={this.state.option==data.id  ? this.props.type==1 ? styles.course +" "+styles.active : styles.active : this.props.type==1 ? styles.course:''} key={'items'+i} onClick={this.handleSelect.bind(this,this.state.category,this.state.index,data.category,data.id)}>{data.category}</li>
								          		}.bind(this))
											}
										</ul>
									</div>
								)
							}
						})()}
					</div>
				}
				{this.state.index==-1 &&
					<div className={styles.screeninfo}>
              在“ <em>
              {
                this.props.type==22 ? this.state.category[1].category :
                this.props.type==3  ? this.state.category[0].id==this.state.category[1].id && this.state.category[1].id==0 ? '全部' : this.state.category[0].category +' - '+ this.state.category[1].category :
                this.state.category[0].name==this.state.category[0].category ? this.state.category[0].category :
                this.state.category[0].name + ' - ' + this.state.category[0].category
              }</em> ”
              分类下，共有
              {this.props.total_num} {
                this.props.type==11 ? '位导师' :
                this.props.type==22 ? '份文档' :
                this.props.type==1  ? '门课程' :
                this.props.type==3  ? '门IHMA证书' : '门公开课'
              }
          </div>
				}
			</div>
		)
	}
}
