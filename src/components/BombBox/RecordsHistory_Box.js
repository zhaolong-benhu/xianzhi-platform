/**
 * Created by same on 2016/8/5.
 * File description:用户消费记录
 */
'use strict';
import React from 'react';
const styles = require('./RecordsHistory_Box.scss');

export default class RecordsHistory_Box extends React.Component{
  state={
    current_month:"",
    previous_month1:"999",
    previous_month2:"",
    previous_month3:"",
    previous_month4:"",
  }


componentDidMount()
{
  var current_year = this.props.current_year;
  var previous_year = Number(current_year)-1;
  var current_month = this.props.current_month;
  if(current_month>=5){
      let previous_month1 =  Number(current_month)-1;
      let previous_month2 =  Number(current_month)-2;
      let previous_month3 =  Number(current_month)-3;
      let previous_month4 =  Number(current_month)-4;

    if(previous_month1>=1 &&previous_month1<=9){
      previous_month1 = "0"+previous_month1;
    }
    if(previous_month2>=1 &&previous_month2<=9){
      previous_month2 = "0"+previous_month2;
    }
    if(previous_month3>=1 &&previous_month3<=9){
      previous_month3 = "0"+previous_month3;
    }
    if(previous_month4>=1 &&previous_month4<=9){
      previous_month4 = "0"+previous_month4;
    }

    this.setState({current_month:current_year+"年"+current_month+"月"});
    this.setState({previous_month1:current_year+"年"+previous_month1+"月"});
    this.setState({previous_month2:current_year+"年"+previous_month2+"月"});
    this.setState({previous_month3:current_year+"年"+previous_month3+"月"});
    this.setState({previous_month4:current_year+"年"+previous_month4+"月"});
  }
  else {
   switch (current_month) {
     case "04":
       {
         let previous_month1 =  Number(current_month)-1;
         let previous_month2 =  Number(current_month)-2;
         let previous_month3 =  Number(current_month)-3;
         if(previous_month1>=1 &&previous_month1<=9){
           previous_month1 = "0"+previous_month1;
         }
         if(previous_month2>=1 &&previous_month2<=9){
           previous_month2 = "0"+previous_month2;
         }
         if(previous_month3>=1 &&previous_month3<=9){
           previous_month3 = "0"+previous_month3;
         }

         this.setState({current_month:current_year+"年"+current_month+"月"});
         this.setState({previous_month1:current_year+"年"+previous_month1+"月"});
         this.setState({previous_month2:current_year+"年"+previous_month2+"月"});
         this.setState({previous_month3:current_year+"年"+previous_month3+"月"});
         this.setState({previous_month4:previous_year+"年12月"});
       }break;

     case "03":
       {
         let previous_month1 =  Number(current_month)-1;
         let previous_month2 =  Number(current_month)-2;
         if(previous_month1>=1 &&previous_month1<=9){
           previous_month1 = "0"+previous_month1;
         }
         if(previous_month2>=1 &&previous_month2<=9){
           previous_month2 = "0"+previous_month2;
         }
         this.setState({current_month:current_year+"年"+current_month+"月"});
         this.setState({previous_month1:current_year+"年"+previous_month1+"月"});
         this.setState({previous_month2:current_year+"年"+previous_month2+"月"});
         this.setState({previous_month3:previous_year+"年12月"});
         this.setState({previous_month4:previous_year+"年11月"});
       }break;

     case "02":
       {
         let previous_month1 =  Number(current_month)-1;
         if(previous_month1>=1 &&previous_month1<=9){
           previous_month1 = "0"+previous_month1;
         }
         this.setState({current_month:current_year+"年"+current_month+"月"});
         this.setState({previous_month1:current_year+"年"+previous_month1+"月"});
         this.setState({previous_month2:current_year-1+"年12月"});
         this.setState({previous_month3:current_year-1+"年11月"});
         this.setState({previous_month4:current_year-1+"年10月"});
       }break;

     case "01":
       {
         this.setState({current_month:current_year+"年"+current_month+"月"});
         this.setState({previous_month1:previous_year+"年12月"});
         this.setState({previous_month2:previous_year+"年11月"});
         this.setState({previous_month3:previous_year+"年10月"});
         this.setState({previous_month4:previous_year+"年9月"});
       }break;

      }
   }


}

//用户选择事件
HandleSelected(index){
  this.props.callbackParent(index);
}
  render()
  {

    return(
      <div className={styles.bomb_box}>

          <div className={styles.root}>
            <div className={styles.nav} onClick={this.HandleSelected.bind(this,0)}>
                  <div className={styles.text}>{this.state.current_month}</div>
            </div>
            <div className={styles.nav} onClick={this.HandleSelected.bind(this,1)}>
                 <div className={styles.text}>{this.state.previous_month1}</div>
            </div>
            <div className={styles.nav} onClick={this.HandleSelected.bind(this,2)}>
                <div className={styles.text}>{this.state.previous_month2}</div>
            </div>
            <div className={styles.nav} onClick={this.HandleSelected.bind(this,3)}>
               <div className={styles.text}>{this.state.previous_month3}</div>
            </div>
            <div className={styles.nav_last} onClick={this.HandleSelected.bind(this,4)}>
              <div className={styles.text}>{this.state.previous_month4}</div>
           </div>
          </div>

      </div>
    )
  }

}
