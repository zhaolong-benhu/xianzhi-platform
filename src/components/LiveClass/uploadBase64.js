/**
 * Created by qzy on 2016/12/15.
 * File description:文件上传转base64组件
 */

import React from 'react';
const styles = require('./uploadBase64.scss');
class FileBase64 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
    this.props = {
      multiple: false,
    };
  }

  handleChange(e) {

    // get the files
    const files = e.target.files;

    // Process each file
    const allFiles = [];
    for (let i = 0; i < files.length; i++) {

      const file = files[i];

      // Make new FileReader
      const reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {

        // Make a fileInfo Object
        const fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000),
          base64: reader.result,
          file: file,
        };

        // Push it to the state
        allFiles.push(fileInfo);

        // If all files have been proceed
        if (allFiles.length == files.length) {
          // Apply Callback function
          this.setState({
            files: allFiles,
          });
          const id = this.props.id;
          this.props.onDone({[id]: allFiles});
        }
      };
    }
  }

  renderImg() {
    const files = this.state.files;
    if (files.length > 0) {
      return files.map((file, i,) => {
        return <img key={i} src={file.base64}/>;
      });
    }else {
      return <i style={this.props.iconStyle}>{this.props.icon}</i>;
    }
  }

  render() {
    return (<div className={this.state.files.length > 0 ? styles.wrapper : styles.container} style={this.props.containerStyle}>
      <label className={this.state.files.length > 0 ? styles.outline : ''}>
        {this.renderImg()}
        <input
          style={{position: 'absolute', clip: 'rect(0 0 0 0)', width: '0', height: '0', top: '0', left: '0' }}
          type="file"
          onChange={ this.handleChange.bind(this) }
          multiple={ this.props.multiple }
        />
      </label>
    </div>);
  }
}

export default FileBase64;
