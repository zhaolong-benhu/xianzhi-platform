/**
 * Created by zhaolong on 2016/11/15
 * File description:IHMA证书介绍
 */

'use strict';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {Header} from 'components';
import {Link} from 'react-router';
import {imageUrl} from '../../api/common/Global';
const styles = require('./IhmaIntroduce.scss');

export default class IhmaIntroduce extends Component{
	state={
        img:"/images/ihma/ihma.png",
        text1:"IHMA岗位胜任能力证书汇集了知名酒店管理者的成功关键因素，汇聚全球最具影响力酒店行业知名人士，提供专业的饭店业教育、培训及岗位胜任能力证书。为全球酒店业职业经理人服务，帮助他们实现卓越目标。300余位专业领域独树一帜的专家和学者组成的导师团，从一般能力、前瞻能力、专业能力三个维度制定特色课程2000多门。",
        text2:"IHMA秉承了“以岗位胜任力为导向”的特色，并使之保持了行业的引领者地位。",
        text3:"截止2017年，已有34000多名酒店人选择了IHMA岗位胜任能力证书。证书学员城市已覆盖全国34个省市地区，覆盖酒店6000多家，86.2%的学员通过证书获得了职位及薪资提升。"
	}
	//返回
    GoBack(){
        history.go(-1);
    }
	render(){
		return(
			<div>
				<Helmet title="IHMA证书介绍"/>
				<Header title="IHMA证书介绍"/>
                <div className={styles.container}>
					<div className={styles.img}>
                        <img className={styles.ihma} src={imageUrl+this.state.img}/>
                    </div>
                    <div className={styles.introduce}>
                        <div className={styles.text}>{this.state.text1}</div>
                        <div className={styles.text}>{this.state.text2}</div>
                        <div className={styles.text}>{this.state.text3}</div>
                    </div>
                    <div className={styles.return} onClick={()=>this.GoBack()}>返回</div>
				</div>
            </div>
      )
    }
  }
