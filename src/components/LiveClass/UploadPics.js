/**
 * Created by qzy on 2016/11/29.
 * File description:上传照片
 */
import React, {
  Component,
  PropTypes,
} from 'react';
import FileBase64 from './uploadBase64';
const styles = require('./UploadPics.scss');
export default class UploadPics extends Component {
  static propTypes = {};
  static defaultProps = {};
  constructor() {
    super();
  }

  // // Callback~
  // getFiles(file) {
  //   this.setState({
  //     files: { ...this.state.files, ...file },
  //   });
  // }

  handleType() {
    if (this.props.type === 'personalImg') {
      return (
        <div className={styles.personalImg}>

          <div className={styles.header}>上传主播照片</div>
          <div className={styles.uploadWrapper}>
            <FileBase64
              multiple={ false }
              onDone={ this.props.getFiles.bind(this) }
              icon="&#xe62f;"
              id="pic"
            />
          </div>
          <div className={styles.prompt}>{this.props.picSize !== 2 ? '' : '图片大于2M'}</div>
        </div>
      );
    }
    if (this.props.type === 'nameCard') {
      return (
        <div className={styles.nameCard}>
          <div className={styles.header}>工牌/名片</div>
          <div className={styles.uploadWrapper}>
            <FileBase64
              id="card_pic1"
              multiple={ false }
              onDone={ this.props.getFiles.bind(this) }
              icon="&#xe67b;"
              containerStyle={ {width: '136px', height: '96px', borderRadius: '20px', display: 'inline-block', marginTop: '20px', marginLeft: '0'} }
              iconStyle={{fontSize: '90px', lineHeight: '90px'}}
            />
            <FileBase64
              id="card_pic2"
              multiple={ false }
              onDone={ this.props.getFiles.bind(this) }
              icon="&#xe67b;"
              containerStyle={ {width: '136px', height: '96px', borderRadius: '20px', display: 'inline-block', marginLeft: '10px', marginTop: '20px', float:'left'} }
              iconStyle={{fontSize: '90px', lineHeight: '90px'}}
            />
          </div>
          <div className={styles.tips}>请上传身份证/工牌/名片正反面</div>
          <div className={styles.prompt}>
            {this.props.card_pic1Size !== 2 && this.props.card_pic2Size !== 2 ? '' : '(图片大于4M)'}
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className={styles.container}>
        {this.handleType()}
      </div>
    );
  }
}
