import React , { Component } from 'react' ;

import { connect } from 'react-redux' ;
import HeadTitle from 'uide/head-title/index';

import './index.scss'; 
class ApplianceHead extends Component {
   constructor(props){
      super(props)  
   }
   componentDidMount(){
      //console.log('14',this.props)
   }
   onChangeDialogBoolean (key) {
      this.props.onChangeDialogBoolean(key)
   }
   render() {
      return (
      <div className={this.props.cartBoolean ? 'container appliance-head appliance-head-pink' : 'container appliance-head' }>
         <div className='row'>
            <div className='col-xs-1'>
               <a className='nav-item' name='dialogSetting' onClick={e=>this.onChangeDialogBoolean('dialogSetting')}>
                  { this.props.dialogSetting ? <i className='iconfont icon-menu open'></i> : <i className='iconfont icon-menu'></i> }    
               </a>
            </div>
            <div className='col-xs-8'>
               <HeadTitle 
                  title={
                     this.props.cartBoolean 
                     ? 'Your Cart ' 
                     : 'eCommerceReact'
                  } 
                  styles={
                     this.props.cartBoolean 
                     ? {'font-size':'1.5125rem','line-height':'3rem','margin-bottom':'0','color':'white'} 
                     : {'font-size':'1.5125rem','line-height':'3rem','margin-bottom':'0'} 
                  } 
               >
               </HeadTitle>
            </div>
            <div className='col-xs-3 ' >
               <a className='nav-item' name='dialogCart' style={{'margin-right':'.75rem'}} onClick={e=>this.onChangeDialogBoolean('dialogCart')}>
                  { 
                     this.props.cartBoolean 
                     ? <i className='iconfont icon-close'></i> 
                     : <i className='iconfont icon-gouwuche'></i> 
                  }       
               </a>   
               <a className='nav-item' onClick={e=>this.onChangeDialogBoolean('homeHeading')}>
                  <i className={this.props.homeHeadingBoolean ? 'iconfont icon-shengqian icon-white' : 'iconfont icon-shengqian'}></i>
               </a>
            </div> 
         </div>
        
      </div>
      )
   }
}
const mapStateToProps = (state) => { // state 是 store 上的state
   return {
      num : state.num
   }
}
const mapDispatchToProps = (dispatch) => {
   return{

   }
}
export default connect(mapStateToProps,mapDispatchToProps)(ApplianceHead);