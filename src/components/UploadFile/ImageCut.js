/**
 * Created by same on 2017/2/8.
  File description:slider 图片裁剪
 */
'use strict';
import React,{Component} from 'react';
const styles = require('./ImageCut.scss');
export default class ImageCut extends Component {
  state={
        touch:{
            x:0,
            y:0
        },
        positionX:0,
        positionY:0,
        defaultPosition:{
            x:0,
            y:0
        },
        hasEnd:true,
        frameWidth:this.props.config.frameWidth?this.props.config.frameWidth:'100%',
        frameHeight:this.props.config.frameHeight?this.props.config.frameHeight:200,
        defaultBtPosition:{
            x:0,
            y:0
        },
        defaultWidth:'100%',
        defaultHeight:200,
        defaultPositionX:0,
        defaultPositionY:0,
        realImage:''
  };
  handleTouchStart(e){
      let touch = e.touches[0];
      this.setState({
          touch:{
              x:touch.pageX,
              y:touch.pageY
          },
          defaultPosition:{
              x:this.state.positionX,
              y:this.state.positionY
          }
      })
  }
  handleTouchMove(e){
      e.preventDefault();
      let touch = e.touches[0],
          X = touch.pageX,
          Y = touch.pageY,
          startX = this.state.touch.x,
          startY = this.state.touch.y;
      let moveX = X - startX,
          moveY = Y - startY;
      if((this.state.defaultPosition.x + moveX)>-1&&(this.state.defaultPosition.x + moveX + this.refs.frame.clientWidth)<this.refs.cutting.clientWidth-1){
          this.setState({
              positionX:this.state.defaultPosition.x + moveX
          })
      }

      if((this.state.defaultPosition.x + moveX)<0){
          this.setState({
              positionX:0
          })
      }

      if((this.state.defaultPosition.x + moveX + this.refs.frame.clientWidth)>this.refs.cutting.clientWidth){
          this.setState({
              positionX:this.refs.cutting.clientWidth - this.refs.frame.clientWidth
          })
      }

      if((this.state.defaultPosition.y + moveY)>-1&&(this.state.defaultPosition.y + moveY + this.refs.frame.clientHeight)<this.refs.cutting.clientHeight-1){
          this.setState({
              positionY:this.state.defaultPosition.y + moveY
          })
      }

      if((this.state.defaultPosition.y + moveY)<0){
          this.setState({
              positionY:0
          })
      }

      if((this.state.defaultPosition.y + moveY + this.refs.frame.clientHeight)>this.refs.cutting.clientHeight-1){
          this.setState({
              positionY:this.refs.cutting.clientHeight - this.refs.frame.clientHeight
          })
      }
  }
  handleTouchEnd(){
      this.setState({
          hasEnd:true
      })
  }
  handleBtTouchStart(e){
      let touch = e.touches[0];
      this.setState({
          defaultBtPosition:{
              x:touch.pageX,
              y:touch.pageY
          },
          defaultWidth:this.refs.frame.clientWidth,
          defaultHeight:this.refs.frame.clientHeight,
          defaultPositionX:this.state.positionX,
          defaultPositionY:this.state.positionY
      })
  }
  onTouchBtMove(num,e){
      if(this.props.config.frameScale){
          e.stopPropagation();
          e.preventDefault();
          let touch = e.touches[0],
              moveX = touch.pageX - this.state.defaultBtPosition.x,
              moveY = touch.pageY - this.state.defaultBtPosition.y;
          let minW = this.props.config.minW?this.props.config.minW:200,
              minH = this.props.config.minH?this.props.config.minH:200;
          if(num == 'bt0'||num == 'bt2'){
              if((this.state.defaultWidth - moveX>minW-1)){
                  this.setState({
                      frameWidth:this.state.defaultWidth - moveX,
                      positionX:this.state.defaultPosition.x + moveX
                  })
              }
              if(this.state.defaultWidth - moveX<minW){
                  this.setState({
                      frameWidth:minW,
                      positionX:this.state.defaultPosition.x + this.state.defaultWidth - minW
                  })
              }
              if(this.state.defaultPosition.x + moveX<0){
                  this.setState({
                      frameWidth:this.state.defaultWidth + this.state.defaultPositionX,
                      positionX:0
                  })
              }
          }
          if(num == 'bt0'||num == 'bt1'){
              if((this.state.defaultHeight - moveY>minH-1)){
                  this.setState({
                      frameHeight:this.state.defaultHeight - moveY,
                      positionY:this.state.defaultPosition.y + moveY
                  })
              }
              if(this.state.defaultHeight - moveY<minH){
                  this.setState({
                      frameHeight:minH,
                      positionY:this.state.defaultPosition.y + this.state.defaultHeight - minH
                  })
              }
              if(this.state.defaultPosition.y + moveY<0){
                  this.setState({
                      frameHeight:this.state.defaultHeight + this.state.defaultPositionY,
                      positionY:0
                  })
              }
          }
          if(num == 'bt1'||num == 'bt3'){
              if((this.state.defaultWidth + moveX>minW-1)){
                  this.setState({
                      frameWidth:this.state.defaultWidth + moveX
                  })
              }
              if((this.state.defaultWidth + moveX + this.state.defaultPosition.x)> this.refs.cutting.clientWidth){
                  this.setState({
                      frameWidth:this.refs.cutting.clientWidth - this.state.defaultPosition.x
                  })
              }
              if((this.state.defaultWidth + moveX<minW)){
                  this.setState({
                      frameWidth:minW
                  })
              }
          }
          if(num == 'bt2'||num == 'bt3'){
              if((this.state.defaultHeight + moveY>minH-1)){
                  this.setState({
                      frameHeight:this.state.defaultHeight + moveY
                  })
              }
              if((this.state.defaultHeight + moveY<minH)){
                  this.setState({
                      frameHeight:minH
                  })
              }
              if((this.state.defaultHeight + moveY + this.state.defaultPosition.y)>this.refs.cutting.clientHeight){
                  this.setState({
                      frameHeight:this.refs.cutting.clientHeight - this.state.defaultPosition.y
                  })
              }
          }
      }
  }
  cacheExternalImage(url){
      let img = new Image();
      //img.crossOrigin = "anonymous";
      img.src = url;
      return img
  }
  cutting(){
        let img = this.cacheExternalImage(this.state.realImage),//Images = new Image(),
            that = this,
            canvas = this.refs.canvas,
            ctx=canvas.getContext('2d');
        canvas.width = that.state.frameWidth;
        canvas.height =that.state.frameHeight;
        canvas.style.width =that.state.frameWidth + 'px';
        canvas.style.height =that.state.frameHeight + 'px';
        //在canvas绘制前填充白色背景
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img,that.state.positionX,that.state.positionY,that.state.frameWidth,that.state.frameHeight,0,0,that.state.frameWidth,that.state.frameHeight);
        that.props.getCutImage(canvas.toDataURL("image/jpeg", 1.0),that.convertBase64UrlToBlob(canvas.toDataURL("image/jpeg", 1.0)));
  }
  copyImageToFixSize(url){
      let Images = new Image(),
          img = this.cacheExternalImage(url),
          that = this,
          canvas = this.refs.canvas,
          ctx=canvas.getContext('2d');
          Images.src = url;
      Images.onload = function(){
          canvas.style.height = that.refs.bgImg.clientHeight+'px';
          canvas.style.width = that.refs.bgImg.clientWidth+'px';
          canvas.height = that.refs.bgImg.clientHeight;
          canvas.width = that.refs.bgImg.clientWidth;
          ctx.drawImage(img,0,0,that.refs.bgImg.clientWidth,that.refs.bgImg.clientHeight);
          that.setState({
              realImage:canvas.toDataURL("image/jpeg", 1.0)
          })
          that.initCut();
      }
  }
  initCut(){
      let img = this.cacheExternalImage(this.state.realImage), //Images = new Image(),
          that = this,
          canvas = this.refs.canvas,
          ctx=canvas.getContext('2d');
      canvas.width = this.state.frameWidth;
      canvas.height = this.state.frameHeight;
      canvas.style.width = this.state.frameWidth + 'px';
      canvas.style.height = this.state.frameHeight + 'px';
      ctx.drawImage(img,this.state.positionX,this.state.positionY,this.state.frameWidth,this.state.frameHeight,0,0,this.state.frameWidth,this.state.frameHeight);
  }
    convertBase64UrlToBlob(dataURI){
      let byteString;
      if (dataURI.split(',')[0].indexOf('base64') >= 0){
          byteString = atob(dataURI.split(',')[1]);
      }else{
          byteString = unescape(dataURI.split(',')[1]);
      }
      let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      let ia = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], {type:mimeString});
  }
  componentWillReceiveProps(next){
      if(next.config.url!=this.props.config.url){
          this.copyImageToFixSize(next.config.url);
          this.setState({
            positionX:0,
            positionY:0
          })
      }
  }
  render() {
      return (
          <div className={styles.cutting} ref='cutting'>
              <img src={this.props.config.url} className={styles.bgimg} ref='bgImg'/>
              <div className={styles.cover}>
                  <div className={styles.frame} ref='frame' style={{left:this.state.positionX,top:this.state.positionY,width:this.state.frameWidth,height:this.state.frameHeight}} onTouchStart={this.handleTouchStart.bind(this)} onTouchMove={this.handleTouchMove.bind(this)} onTouchEnd={this.handleTouchEnd.bind(this)}>
                      <span style={this.props.config.frameScale?{display:'block'}:{display:'none'}} onTouchStart={this.handleBtTouchStart.bind(this)} onTouchMove={this.onTouchBtMove.bind(this,'bt0')}></span>
                      <span style={this.props.config.frameScale?{display:'block'}:{display:'none'}} onTouchStart={this.handleBtTouchStart.bind(this)} onTouchMove={this.onTouchBtMove.bind(this,'bt1')}></span>
                      <span style={this.props.config.frameScale?{display:'block'}:{display:'none'}} onTouchStart={this.handleBtTouchStart.bind(this)} onTouchMove={this.onTouchBtMove.bind(this,'bt2')}></span>
                      <span style={this.props.config.frameScale?{display:'block'}:{display:'none'}} onTouchStart={this.handleBtTouchStart.bind(this)} onTouchMove={this.onTouchBtMove.bind(this,'bt3')}></span>
                      <img src={this.props.config.url} style={{width:this.props.config.width,left:-this.state.positionX,top:-this.state.positionY}}/>
                      <div></div>
                  </div>
              </div>
              <canvas ref='canvas' style={{display:'none'}}></canvas>
              <div className={styles.cutBt} onClick={this.cutting.bind(this)}>保存头像</div>
          </div>
      )
  }
}
