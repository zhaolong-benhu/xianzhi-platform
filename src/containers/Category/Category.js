/**
 * Created by same on 2016/6/12.
 * File description:课程类别
 */
import React,{Component,PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Header} from 'components';
import {CourseCategory} from 'components';
import {connect} from 'react-redux';
import {isLoaded, load as loadCategory} from 'redux/modules/category';
import { asyncConnect } from 'redux-async-connect';
const styles = require('./Category.scss');
@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadCategory());
    }
  }
}])
@connect(
  state => ({
    data: state.category.data
  })
)
export default class Category extends Component {
    state={
      url:'gongkaike'
    }
    static propTypes = {
        data: PropTypes.array
    }
    componentWillMount(){
      switch (Number(this.props.params.id)) {
        case 1:
          this.setState({url:'gongkaike'});
          break;
        case 2:
          this.setState({url:'neixun'});
          break;
        case 3:
          this.setState({url:'kecheng/list'});
          break;
        default:
          break;
      }
    }
  	render() {
      const {data} = this.props;
      return (
          <div>
              <Helmet title="全部分类"/>
              <Header title="全部分类" back="/"/>
              <div className={styles.container}>
              {data &&
                <CourseCategory handleSelect={this.handleSelect} url={this.state.url} data={data} />
              }
              </div>
          </div>
        );
  	}
}
