import React , { Component } from 'react' ;
import { connect } from 'react-redux' ; 
import ApplianceHead from 'cope/head/index';
import { 
   ReactRegionForm   ,
   ReactRegionTabWidget
} from 'cope/r-region/index';
import AddressForm from './form' ;
import './index.scss';

class Address extends Component {
   constructor (props) {
      super(props)
      this.state = {
         addressForm : {

         }
      }
   }
   onAddAddressItem (obj) {
      //console.log(obj)
      let addressBool = true ;
      if(obj) {   // item index
         let addressForm = obj ;
         this.setState({
            addressForm ,
            addressBool
         })    
      }else {
         let index = this.props.addressList.length + 1
         let addressForm = {
            item :{
               'id':' ',
               'user':' ',
               'phone':' ' ,
               'address' : ' ' ,
               'default' : false 
            } ,
            index 
         }
         this.setState({
            addressForm ,
            addressBool
         }) 
      }
      //console.log('向左移动100% 宽度显示')
   }
   onChageAddressForm () {
      let newBoolean = !this.state.addressBool ;
      this.setState({
         addressBool : newBoolean
      })
   }
   render () {
      //console.log(45,this.props)
      let {
         addressForm  ,
         addressBool
      }  = this.state 
      let {  
         addressList 
      } = this.props;
      return (
         <div className='app-device'>
            <ApplianceHead
               section = {{
                  'l':{
                     'id':'01',
                     'icon':'icon-back',
                     'keyText':'dialogCart',
                     'action':'icon-back',
                     'event':()=>{
                        window.history.go(-1)
                     }
                  },
                  'r':[
                     {
                        'id':'021',
                        'icon':'icon-add',
                        'keyText':'dialogCart',
                        'action':'icon-add',
                        'event':()=>{
                           this.onAddAddressItem()
                        }
                     }
                  ]
               }}
               title='我的收货地址'
            >
            
            </ApplianceHead> 
            <div className='container address-list'>
            {  
               addressList
               ? addressList.map((item,index) => (
                  <div className='row address-item' key={item.id}>
                     <div className='col-xs-10'>
                        <div className='user user-circle'>{splitFirst(item.user)}</div>
                        <div className='address-info'>
                           <p className='address-user'>
                              <strong>{item.user}</strong>
                              <small>{item.phone}</small>
                           </p>
                           <p className='address-text'>
                              {item.default ? <span>默认</span> : null }
                              {item.address}
                           </p>
                        </div>
                     </div>
                     <div className='col-xs-2' onClick={e=>this.onAddAddressItem({item,index})}>
                        <a>编辑</a>
                     </div>
                  </div>
               ))
               : null 
            }
            </div>
         
            {
               addressBool 
               ?(
                  <AddressForm 
                     data={addressForm} 
                     onChangeAddressFormState = {e => this.onChageAddressForm()}
                  ></AddressForm>
               )
               :null
            }
            <ReactRegionForm address = {addressList[0]} ></ReactRegionForm>
            
            <ReactRegionTabWidget address = {addressList[0]} ></ReactRegionTabWidget>
         </div>
      )
   }
}
const splitFirst = (str) => {
   if(str.length <= 2 ) {
      return str
   } else {
      let s = str.slice(0,1) ;
      if(escape(s).indexOf('%u') < 0 ) {
         return s.toLocaleUpperCase()
      }else {
         return s
      } 
   }
}
const mapState = (state)=>{
   return {
      addressList : state.AddressReduce.addressList
   }
}
const mapDispatch = (dispatch) => {
   return {

   }
}
export default connect(mapState , mapDispatch)(Address) ;