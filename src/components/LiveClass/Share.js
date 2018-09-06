/**
 * Created by qzy on 03/05/2017.
 * File description:
 */
import React, {Component,PropTypes} from 'react';
export default class Share extends Component {
	constructor(props){
		super(props);
	}
	componentDidMount(){
		if(this.props.params.id){
    	location.href="//api.9first.com/mv1/live/getopenid?live_id="+this.props.params.id
		}else{
			location.href="https://m.9first.com"
		}
	}
	render() {
		return (
			<div></div>
		)
	}
}
