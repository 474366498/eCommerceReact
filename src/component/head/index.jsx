import React , { Component } from 'react' ;

import { connect } from 'react-redux' ;
import HeadTitle from 'cope/head-title/index';
import './index.scss'; 
class ApplianceHead extends Component {
   constructor(props){
      super(props)  
   }
   componentDidMount(){
      console.log('14',this.props)
   }
   onChangeDialogBoolean (key) {
      this.props.onChangeDialogBoolean(key)
   }
   
   render() {
      let {
         section ,
         keyText ,
         title
      } = this.props;
      //console.log(23,keyText)
      return (
      <div className= 'container appliance-head'>
         <div className='row'>
            <div className='col-xs-1'>
               <a 
                  className='nav-item' 
                  name='dialogSetting'
                  onClick={section.l.event ? section.l.event : null } 
               >
                 <i 
                  className={
                     keyText===section.l.keyText 
                     ? 'iconfont '+section.l.action 
                     : 'iconfont '+section.l.icon
                  }
                 ></i> 
               </a>
            </div>
            <div className='col-xs-8'>
               <HeadTitle title={title} />
            </div>
            <div className='col-xs-3 ' >
               {
                  section.r 
                  ? section.r.map((item,index)=>(
                     <a 
                        className='nav-item' 
                        key={index} 
                        onClick={item.event ? item.event : null }
                        style={
                           index%2 !=0
                           ?{'margin':'0 .5rem'}
                           :{'margin-right':'.5rem'}}
                     >
                        <i 
                           className={
                              keyText===item.keyText 
                              ? 'iconfont '+item.action
                              : 'iconfont '+item.icon
                           }
                        ></i>
                     </a>
                  ))
                  : null
               }
              {/*  <a className='nav-item' name='dialogCart' style={{'margin-right':'.75rem'}} onClick={e=>this.onChangeDialogBoolean('dialogCart')}>              
                  <i className='iconfont icon-close'></i> 
                  <i className='iconfont icon-gouwuche'></i>            
               </a>   
               <a className='nav-item' onClick={e=>this.onChangeDialogBoolean('homeHeading')}>
                  <i className='iconfont icon-shengqian icon-white' title=':iconfont icon-shengqian}'></i>
               </a> */}
            </div> 
         </div>
        
      </div>
      )
   }
}
const mapStateToProps = (state) => { // state 是 store 上的state
   return {
     
   }
}
const mapDispatchToProps = (dispatch) => {
   return{

   }
}
export default connect(mapStateToProps,mapDispatchToProps)(ApplianceHead);