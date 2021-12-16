import React , {Component} from 'react';

import DeviceStatus from 'page/status/index';
import ApplianceHead from 'page/app-head/index';
import ApplianceMain from 'page/app-main/index';

import DialogSetting from 'uide/menu/index';
import DialogCart from 'uide/cart/index';

class Device extends Component {
  
   constructor (props) {
      super(props);
      this.state = {
         dialogSetting : false ,
         dialogCart    : false ,
         homeHeading     : true
      }
   }
   componentDidMount(){
      
   }
   getChangeDialogBoolean (key) {
      let newVal = !this.state[key];
      for(var k in this.state ) { 
         k === key && newVal 
         ? this.setState({
            [k] : newVal
         })
         : this.setState({
            [k] : false
         })
      }
   
   }
   render () { 
      let {
         dialogSetting,
         dialogCart,
         homeHeading
      } = this.state
      return (
         <div id='device' > {/* 添加click 关闭dialog 弹窗 */}
            <DeviceStatus cartBoolean = {dialogCart} />
            <div id='DeviceAppliance'>
               <ApplianceHead 
                  settingBoolean = {dialogSetting}
                  cartBoolean = {dialogCart}
                  homeHeadingBoolean = {homeHeading}
                  onChangeDialogBoolean = {e=>this.getChangeDialogBoolean(e)} 
               />
               <ApplianceMain  homeHeadingBoolean = {homeHeading} />
            </div>
            <div id='dialogGroups'>
               { 
                  this.state.dialogSetting 
                  ? (<DialogSetting 
                        statusBoolean = {dialogSetting}
                        onChangeDialogBoolean = {e=>this.getChangeDialogBoolean(e)}
                     /> )
                  : null 
               }     
               { 
                  this.state.dialogCart 
                  ? (<DialogCart
                     statusBoolean = {dialogCart}
                     onChangeDialogBoolean = {e=>this.getChangeDialogBoolean(e)}
                     />) 
                  : null 
               } 
               
            </div>
         </div>
      )
   }
}

export default Device;