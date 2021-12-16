import React , { Component } from 'react' ;
import { connect } from 'react-redux';
import ApplianceHead from 'cope/head/index';

class AddressForm extends Component {
   constructor (props) {
      super(props);
      this.state = {

      }
      this.formTextarea = React.createRef()
   }
   componentDidMount () {
      let {
         item ,
         index
      } = this.props.data
      this.setState({
         item , 
         index
      })
      console.log(21,this.formTextarea)
   }
   shouldComponentUpdate(nextProps,nextState){
      //console.log(36,nextProps,nextState)
      if(nextProps.data.index === nextState.index ) {
         return true
      }else {
         let {item , index } = nextProps.data
         this.setState({
            item , 
            index 
         },()=>{return true})
      } 
   }
   // 关闭自身
   onCloseMyself () {
      this.props.onChangeAddressFormState();
   }
   // input 
   onChangeText (key,el) {
      let item = this.state.item;
      item[key] = el.target.value ;
      console.log(43,el.target.value) ;
      this.setState({
         item
      })
   }
   addressSection (str,code) {
      let temp = str.split(/^\s+|\s+/g);
      console.log(50,temp,code)
   }
   render(){
      //console.log(35,this.state.item)
      let { 
         item 
      } = this.state
      return (
         <div className='container address-from'>
         <ApplianceHead
               section = {{
                  'l':{
                     'id':'01',
                     'icon':'icon-close',
                     'keyText':'dialogCart',
                     'action':'icon-close',
                     'event':()=>{
                        this.onCloseMyself()
                     }
                  },
                  'r':[
                     {
                        'id':'021',
                        'icon':'icon-add',
                        'keyText':'dialogCart',
                        'action':'icon-add',
                        'event':()=>{
                          // this.onAddAddressItem()
                        }
                     }
                  ]
               }}
               title='我的收货地址'
            >
            
            </ApplianceHead> 
            {
               item 
               ? (
                  <div className='from'>
                     <div className='row'>
                        <label for='from-1' className='col-xs-3 from-label'>收货人</label>
                        <div className='col-xs-8 from-right'>
                           <input type='text' className='from-1' id='from-1' value={ item.user } onChange={e => this.onChangeText('user',e) } />
                        </div>
                     </div>
                     <div className='row'>
                        <label for='from-2' className='col-xs-3 from-label'>联系方式</label>
                        <div className='col-xs-8 from-right'>
                           <input type='text' className='from-2' id='from-2' value={ item.phone } onChange={e => this.onChangeText('phone',e) } />
                        </div>
                     </div>
                     <div className='row'>
                        <label for='from-3' className='col-xs-3 from-label' >收货地址</label>
                       {/*  <div className='col-xs-8 from-right'>
                           <ReactRegion address = {item} ></ReactRegion>
                        </div> */}
                        <div className='col-xs-8 from-right'>
                           <textarea 
                              ref = { this.formTextarea }
                              type='text' 
                              className='from-3' 
                              id='from-3' 
                              value = { stringWrapText(item.address) } 
                              rows = { stringWrapRows(item.address) <= 5 ? stringWrapRows(item.address) : 5  }
                              onChange={e => this.onChangeText('address',e) }
                           > </textarea>
                           <button className='btn btn-xs btn-crice btn-info btn-address' 
                              code = {item.addressCode}
                              onClick={e=>{this.addressSection(item.address,item.addressCode)}}
                           >
                              <i className='iconfont icon-add'></i>
                           </button>
                        </div>
                     </div>
                     <div className='row'>
                        
                     </div>
                  </div>
               )
            : <div className='row'>正在加载中....</div>
            }
         </div>
      )
   }
}
const stringWrapText = (str) => {
   let reg = /^\s+|\s+/g ,
       ss = str.replace(reg ,'\n') ;
   return ss
}
const stringWrapRows = (str) => {
   let num = str.split(/^\s+|\s+/g).length ;
   return num
}
const mapState = (state) => {
   return {
      addressList : state.AddressReduce.addressList
   }
}
const mapDispatch = (dispatch) => {
   return {

   }
}
export default connect(mapState,mapDispatch)(AddressForm) ;