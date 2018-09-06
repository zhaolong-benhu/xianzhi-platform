/**
 * Created by same on 2016/8/26.
  File description:slider 上传文件图片
 */
'use strict';
import React,{Component} from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
const styles = require('./UploadFile.scss');
const CLOUDINARY_UPLOAD_PRESET = 'iq9w9sx9';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dxxlfqxul/upload';
export default class UploadFile extends Component {
    state={
      uploadedFile:null
    };
    //上传图片
    onImageDrop(files) {
       this.setState({
         uploadedFile: files[0]
       });
       this.handleImageUpload(files[0]);
    }
    //图片处理
    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
                            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                            .field('file', file);

        upload.end((err, response) => {
          if (err) {
            console.error(err);
          }
          if (response.body.secure_url !== '') {
            this.props.handleImage(response.body.secure_url);
          }
        });
    }
    render(){
      return(
            <Dropzone
              className={this.props.className}
              multiple={false}
              accept="image/*"
              onDrop={this.onImageDrop.bind(this)}>
            </Dropzone>
        )
    }
}
