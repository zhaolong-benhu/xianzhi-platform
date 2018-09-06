/**
 * Created by same on 2016/6/17.
 * File description:课程分类
 */

'use strict';
import React,{Component} from 'react';
import { shallowEqualImmutable  } from 'react-immutable-render-mixin';
import { Link} from 'react-router';
const styles = require('./CourseCategory.scss');

export default class CourseCategory extends Component {
	state = {
    	index: this.props.option ? this.props.option.index : 1, //类别索引
			items: this.props.option ? this.props.option.items : 0,	//选项
    	id: this.props.option ? this.props.option.itemId : 0,	//类别ID
			screenHight:0 //屏幕高度
  };
	//大类别切换
	handleChangeTab(index) {
		this.setState({index: index});
		this.setState({items: 0});
	}
	//二级类别切换
	handleChangeItem(index,id) {
		this.setState({items: index});
		this.setState({id: id});
	}
	//当前选中类别
	handleChangeMenu(id) {
		this.setState({index: id});
	}
	componentDidMount(){
		var height = screen.height-92;
		this.setState({screenHight:height+"px"});
	}
	render(){
    	return (
    		<div>
    		{(()=>{
    			if(this.props.type==1)
    			{
    				return (
	    				<div className={styles.CourseCategory}>
			    			<ol>
			    				<li key={'category-0'} onClick={this.props.handleSelect.bind(this,1,'全部',0,1,0,0)}>全部</li>
					      	{
					      		this.props.data.map(function(data,i) {
				          		return 	<li className={this.state.index==i+1 ? styles.active : ''} key={'category'+i+1} onClick={this.handleChangeTab.bind(this,i+1)}>{data.name}</li>
				          		}.bind(this))
					      	}
					        </ol>
					      	{
					      		this.props.data.map(function(v,i) {
					      			return (
					      			 	<ol className={this.state.index==i+1 ? '' : styles.hide} key={'ol'+i}>
						      			 	<li className={this.state.items==0 ? styles.ac : ''} key={'items-0'} onClick={this.handleChangeItem.bind(this,0,0,0)}>全部</li>
						      			 	{
								      			v.list.map(function(data,i){
								      				return 	<li className={this.state.items==i+1 ? styles.ac:''} key={'items'+i} onClick={this.handleChangeItem.bind(this,i+1,data.id)}>{data.name}</li>
								      			}.bind(this))
							      			}
					      			 	</ol>
					      			)
				          		}.bind(this))
					      	}
			    			<div className={styles.list} style={{height:this.state.screenHight}}>
			    				{
					      			this.props.data.map(function(v,x) {
				          		        return (
				          		        	<div className={this.state.index==x+1 ? '' : styles.hide} key={'v'+x}>
				          		        	{
			          		        			v.list.map(function(value,i){
																	return <dl key={'dl'+i}>
																							{(()=>{
																								if(i+1==this.state.items){
																									return <dd key={'list00'+i} className={this.props.option.id==value.id ? styles.ac : ''} onClick={this.props.handleSelect.bind(this,1,value.name,value.id,this.state.index,this.state.items,value.id)}>全部</dd>
																								}else if(this.state.items==0 && i==0){
																									return <dd key={'list000'} className={this.props.option.id==v.id ? styles.ac : ''} onClick={this.props.handleSelect.bind(this,1,v.name,v.id,this.state.index,this.state.items,value.id)}>全部</dd>
																								}
																							})()}
																							{
																								value.list.map(function(list,i){
																										return	this.state.items==0 ?
																										// <dd key={'list'+i} className={this.props.option.id==list.id ? styles.ac : ''}
																										// onClick={this.props.handleSelect.bind(this,1,list.name,list.id,this.state.index,this.state.items,value.id)}>{list.name}</dd> :
																										'':
																										list.parent_id==this.state.id ?
																										<dd className={this.props.option.id==list.id ? styles.ac : ''} key={'list'+i}
																										onClick={this.props.handleSelect.bind(this,1,list.name,list.id,this.state.index,this.state.items,value.id)}>{list.name}</dd>
																										 : '';
																				    			}.bind(this))
																							}
																					</dl>
															    			}.bind(this))
											    			}
											    			</div>
											    		)
						    		}.bind(this))
						    	}
						    </div>
					    </div>
				    )
    			}else if(this.props.type==2)
    			{
							return (
								<div className={styles.category}>
								<ol>
										{
											this.props.data.map(function(data,i) {
											return 	<li className={this.state.index==i+1 ? styles.active:''} key={'itemssss'+i} onClick={this.handleChangeTab.bind(this,i+1)}>{data.name}</li>
											}.bind(this))
										}
								</ol>
								<div className={styles.list}>
									{
											this.props.data.map(function(v,i) {
											return (
															<div className={this.state.index==i+1 ? '' : styles.hide} key={'vss'+i}>
															{
															v.list.map(function(value,i){
																return <dl key={'dlss'+i}>
																<dt>{value.name}</dt>
																{
																	value.list.map(function(list,i){
																		return	<Link to={'/'+this.props.url+'/'+list.id}  key={'listss'+i}><dd>{list.name}</dd></Link>
																		}.bind(this))
																}
															</dl>
														}.bind(this))
															}
															</div>
												)
											}.bind(this))
										}
									</div>
								</div>
							)
    			}else if(this.props.type==3){
							return (
								<div className={styles.category}>
								<ol>
										<li key={'itemssss0'} onClick={this.props.handleSelect.bind(this,0,'全部',0,1,1,0,'全部')}>全部</li>
										{
											this.props.data.map(function(data,i) {
											return 	<li className={this.state.index==1 && i==0  ? styles.active: this.state.index==data.id ? styles.active:''} key={'itemssss'+i} onClick={this.handleChangeMenu.bind(this,data.id)}>{data.name}</li>
											}.bind(this))
										}
										</ol>
								<div className={styles.list}>
									{
											this.props.data.map(function(v,i) {
												return (
													<div className={this.state.index==1 && i==0 ? '' : this.state.index==v.id ? '' : styles.hide} key={'vss'+i}>
														<dl key={'dlss'+i}>
														<dt>{v.name}</dt>
														<dd className={this.props.option.id==v.id ? styles.ac : ''} onClick={this.props.handleSelect.bind(this,0,v.name,v.id,this.state.index,this.state.items,v.id,v.name)}>全部</dd>
														{
																v.list.map(function(list,i){
																	return	<dd className={this.props.option.id==list.id ? styles.ac : ''} onClick={this.props.handleSelect.bind(this,0,list.name,list.id,this.state.index,this.state.items,v.id,v.name)}>{list.name}</dd>
																}.bind(this))
														}
														</dl>
													</div>
												)
											}.bind(this))
										}
									</div>
								</div>
							)
					}else{
						return (
							<div className={styles.category}>
							<ol>
									<li className={this.state.index==0 ? styles.active:''} key={'itemssss0'}><Link to={'/'+this.props.url+'/0'}  key={'listss0'}>全部</Link></li>
									{
										this.props.data.map(function(data,i) {
										return 	<li className={this.state.index==i+1 ? styles.active:''} key={'itemssss'+i} onClick={this.handleChangeTab.bind(this,i+1)}>{data.name}</li>
										}.bind(this))
									}
							</ol>
							<div className={styles.list}>
							{
										this.props.data.map(function(v,i) {
										return (
												<div className={this.state.index==i+1 ? '' : styles.hide} key={'vss'+i}>
														<dl key={'dlss'+i}>
														<dt>{v.name}</dt>
														<Link to={'/'+this.props.url+'/'+v.id}  key={'listss0'}><dd>全部</dd></Link>
														{
																v.list.map(function(list,i){
																	 return	<Link to={'/'+this.props.url+'/'+list.id}  key={'listss'+i}><dd>{list.name}</dd></Link>
																}.bind(this))
														}

														</dl>
												</div>
											)
										}.bind(this))
								}
								</div>
							</div>
						)
					}
    		})()}
    		</div>
    	)
	}
}
