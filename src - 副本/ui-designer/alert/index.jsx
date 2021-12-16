import React , { Component } from 'react' ;
// 弹窗
class DialogAlert extends Component {
   constructor(props) {
      super(props) ;
   }
   render () {
      return (
         <div className='dialog-background'>
            <div className='row dialog-alert'>
               <div className='col-xs-12'>
               DialogAlert
               </div>
            </div>
         </div>
      )
   }
}
export default DialogAlert;