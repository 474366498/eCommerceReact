import React , { Component } from 'react' ;
import { connect } from 'react-redux' ;
import { Link } from 'react-router-dom' ;
import ApplianceHead from 'cope/head/index';

import './index.scss';

class Order extends Component {
   constructor (props) {
      super(props);
      this.state = {
         formArray : [
            {
               't':'配送方式',    //text
               'f':true          //function 
            },        //   快递 免邮
            {
               't':'运费险',
               'f':true
            },          //   卖家送，确认收货前退货可赔
            {
               't':'留言',
               'f':false ,
               'input':true 
            },            //   input textarea
            {
               't':'小计',
               'f':false ,
               'input' : false
            }             //   合计 number
         ],
         addressBoolean : false ,  // 下address boolea 
         dialogBottom : {         // 由下向上的dialog 弹窗  
            boolean : false ,
            title : '' ,
            text : '' 
         }
      }
      this.getViewport = this.getViewport.bind(this);
      this.onChangeAddress = this.onChangeAddress.bind(this);
   }
   componentWillMount ()　{
      window.addEventListener('resize',this.getViewport) ;
      window.addEventListener('scroll',this.onChangeAddress) ;
      this.getViewport()
      let wares = this.props.location.cartList || this.props.cartList ;
      let grossPrice = 0;
      for(let i = 0 ; i < wares.length ; i++) {
         grossPrice+= wares[i].vipShopNumber * wares[i].vipshopPrice ;
      }
      
      console.log(44,grossPrice)
      this.setState({
         wares ,
         grossPrice
      })
   }
   componentDidMount () {
      
   }
   componentWillUpdate () {
      
   }
   componentWillUnmount () {
      window.removeEventListener('resize',this.getViewport);
      window.removeEventListener('scroll',this.onChangeAddress);
   }
   // 获取 viewport 基本信息
   getViewport () {
      let viewport = {
         w : document.documentElement.clientWidth || document.body.clientWidth ,
         h : document.documentElement.clienHeight || document.body.clientHeight
      }
      this.setState({
         viewport
      },()=>this.setTextSpan())
   }
   // col-xs-9 span class 设置
   setTextSpan () {
       let {
         w 
      } = this.state.viewport ;
      let spanW = w / 12 * 8 ;
      let $publicSpan =  $('.publicSpan');

      $publicSpan.each(function () {
         if($(this).text().length * 14 > spanW) {
            $(this).addClass('odd').removeClass('even')
         }else {
            $(this).addClass('even').removeClass('odd')
         }
      }) 
      let $insuranceSpan =  $('.insuranceSpan');

      $insuranceSpan.each(function () {
         if($(this).text().length * 14 > spanW) {
            $(this).addClass('odd').removeClass('even')
         }else {
            $(this).addClass('even').removeClass('odd')
         }
      }) 
   }
   // scroll 简单address 显示 隐藏
   onChangeAddress () {
      let $add = this.addressSection ;
      let $addH = $add.offsetTop + $add.offsetHeight ;
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop ;
      let addressBoolean;
      if( scrollTop > $addH ) {
         addressBoolean= true 
      } else {
         addressBoolean= false 
      }
      this.setState({
         addressBoolean
      })
      //console.log(90,$add.offsetTop , $add.offsetHeight);
   }
   // 由下向上的dialog 弹窗 
   onChangeDialog (e) {
      let { dialogBottom } = this.state ,
         boolean = !dialogBottom.boolean;
      let $row = parents(e.target,'row')
      let title = $row.getAttribute('title')
      let child =  findNode($row,'col-xs-9') ;
      let text = child.innerText ;
      //let text = e.target.innerHTML ;
      //console.log(123,$row,child,text)
      this.setState({
         dialogBottom:{
            boolean ,
            title ,
            text
         }
      })
   }
   //关闭 由下向上的dialog 弹窗 
   onChangecolseDialog () {
      let boolean = !this.state.dialogBottom.boolean ;
      this.setState({
         dialogBottom :{
            boolean
         }
      })
   }
   //保持 由下向上的dialog 弹窗 
   onHoldDialog (e) {
      e.stopPropagation();
   }
   render () {
      let {
         wares ,
         grossPrice ,
         formArray ,
         addressBoolean ,
         dialogBottom
      } = this.state ;
      let hide = dialogBottom.boolean ? 'hidden' : '' ;
      return (
         <div className='app-device' style={{'overflow':hide}}> 
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
                  }
               }}
               title='确认订单'
            >
            </ApplianceHead>
            <div 
               className='container addressSection' 
               title='订单地址 （可选择）超过一屏时 在屏幕下方'
               ref={section => {this.addressSection = section}}
            >
               <Link className='row addressMain' to={{
                  pathname :'/address'
               }}>
                  
                  <div 
                     className='
                     col-xs-10 
                     col-xs-offset-2 
                     row
                     user-info
                     '
                  >
                     <div className='col-xs-3'>
                        <p>姓名</p>
                     </div>
                     <div className='col-xs-9'>
                        <p>电话号码 1333333333</p>
                     </div>
                  </div>
                  <div className='col-xs-2'>
                     <i className='iconfont icon-weizhi-tianchong'></i>
                  </div>
                  <div className='col-xs-9 user-address'>
                     <p>收货详细地址</p>
                  </div>
                  <div className='col-xs-1'>
                     <i className='iconfont icon-arrow-right'></i>
                  </div>
                  <div className='col-xs-offset-2 col-xs-10'>
                     <small>(收货不便时，可选择免费代收货服务)</small>
                  </div>
               </Link>

               <div className='row envelopeGrid'></div>
            </div> 

            <div className='container wares-list' title='商品列表'>
               {
                  wares 
                  ? wares.map((item,index)=>(
                     <div className='wares-item' key={item.brandId}>
                        <div className='wares-info' title='商品详细'>
                           <div className='row brand-name'>
                              <div className='col-xs-2'>
                                 {
                                    item.icons 
                                    ? (
                                       <a className='thumbnail'>
                                          <img src={item.icons[0].image} />
                                       </a>
                                    )
                                    : null
                                 }
                              </div>
                              <div className='col-xs-10'>
                                 <p> {item.brandName} </p>
                              </div>
                           </div>
                           <div className='container wares-info-list'>
                              {
                                 item.vipShopColor.map((it,i)=>(
                                    <div className='wares-info-item' key={item.brandId+''+i}>
                                       <div className='row info'>
                                          <div className='col-xs-4'>
                                             <a className='thumbnail'>
                                                <img src={item.smallImage} alt={item.productName} />
                                             </a>
                                          </div>
                                          <div className='col-xs-8'>
                                             <p className='product-name'>{item.productName}</p>
                                             <p className='size-color'>
                                                <span>SIZE : </span>
                                                <strong>{item.vipShopSize[i].t}</strong>
                                                <span>COLOR :</span> 
                                                <strong>{item.vipShopColor[i].t}</strong>
                                             </p>
                                             <p className='price'>
                                                <del className='market-price'>${item.marketPrice}</del>   
                                                <a className='vip-discount'>{item.vipDiscount}</a>
                                                <div className='vipshop-price'>
                                                   <span className='u-yen  currency-symbol'>$</span>
                                                   <span className='price'>{item.vipshopPrice}</span>
                                                </div>
                                             </p>
                                          </div>
                                       </div>
                                       <div className='row public' title='公益宝贝' onClick={e=>this.onChangeDialog(e)}>
                                          <div className='col-xs-3'>
                                             <p>公益宝贝</p>
                                          </div>
                                          <div className='col-xs-9'>
                                             <span className='publicSpan' ref={(span)=>{this.publicSpan = span}}>公益宝贝公益宝贝公益宝贝公益宝贝公益宝贝{index}</span>
                                             <i className='iconfont icon-arrow-right' ></i>
                                          </div>
                                       </div>   
                                       <div className='row insurance' title='保价险' onClick={e=>this.onChangeDialog(e)}>
                                          <div className='col-xs-3'>
                                             <p>保价险</p>
                                          </div>
                                          <div className='col-xs-9' >
                                             <span className='insuranceSpan' >保价险保价险保价险保价险保价险保价险{index}</span>
                                             <i className='iconfont icon-arrow-right' ></i>
                                          </div>
                                       </div>
                                    </div>
                                 ))   
                              }
                              <form>
                                 <div className='wares-form'>
                                    {
                                       formArray
                                       ? formArray.map((formItem,formIndex)=>(
                                          <div className='row' key={item.productId + '-' + formIndex} onClick={formItem.f ? e=>this.onChangeDialog(e) : null }>
                                             <div className={formItem.input ? 'col-xs-3 message' : 'col-xs-3'}>
                                                <span>{formItem.t}</span>
                                             </div>
                                             {
                                                formItem.f 
                                                ? (
                                                   <div className='col-xs-9 col-user-right'>
                                                      <span>{formItem.t} </span>
                                                      <i className='iconfont icon-arrow-right'></i>
                                                   </div>
                                                ) 
                                                : (
                                                   formItem.input 
                                                   ? (
                                                      <div className='col-xs-9 form-group message'>
                                                         <input className='form-control' type='text' placeholder='留言' />
                                                      </div>
                                                      )
                                                      : (
                                                         <div className='col-xs-9 price'>
                                                            <p className='price'>{item.vipshopPrice * item.vipShopNumber}</p>
                                                         </div>
                                                      )
                                                   )
                                             }  
                                          </div>
                                       ))
                                       : null
                                    } 
                                 </div>  
                              </form>
                           </div>
                        </div>
                        
                     </div>
                  ))
                  : null
               }
               
            </div>
            
            {  // 小地址
               addressBoolean 
               ?  (
                     <div 
                        className={
                           addressBoolean
                           ? 'container address addressMove'
                           : 'container address'
                        }
                     >
                        <p>收货地址 ：收货地址收货地址收货地址收货地址收货地址8888888888******* </p>
                     </div> 
                  ) 
               :null
            }   
               

            <div className='container submit-order' title='提交表单'>
               <div className='row'>
                  <div className='col-xs-9 valuation'>
                     合计 
                     <span className='u-yen  currency-symbol'>$</span>
                     <span className='gross-price'>{grossPrice}</span>
                  </div>
                  <div className='col-xs-3 submit'>
                     <button className='btn btn-block btn-submit' color='#FF4400'>提交订单</button>
                  </div>
               </div>
            </div>

            {  //
               dialogBottom.boolean 
               ? (
                  <div className='dialogBottom' onClick={e=>this.onChangecolseDialog(e)}>
                     <div className='container dialog' onClick={e => this.onHoldDialog(e)}>
                        <div className='dialog-head'>
                           {dialogBottom.title}
                        </div>
                        <div className='dialog-body'>
                           <div className='from-group'>
                              {dialogBottom.text}
                           </div>
                        </div>
                        <div className='dialog-foot'>
                           <div className='row'>
                              <div className='col-xs-6'>
                                 <a>取消</a>
                              </div>
                              <div className='col-xs-6'>
                                 <a>确定</a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               )
               : null
            }

         </div>
      )
   }
}

const parents = (e,key) => { 
   let boolean = hasClass(e,key) ;
   let el = boolean ? e : parents(e.parentNode,key)
   return el
} 
const findNode = (p,key) => {
   let pc = p.children ;
   let child;
   for(let i = 0 ; i < pc.length ; i++ ) {
      if(hasClass(pc[i],key)) {
         child = pc[i]
      }else {
         findNode(pc[i],key)
      }
   }
   return child
}
const hasClass = (el,cls) => {
   cls = cls || '' ;
   if(cls.replace(/\s/g,'').length === 0) return false ;
   return new RegExp(' '+ cls +' ').test(' '+el.className+ ' ')
}

const mapStateToProps = (state) => {
   return {
      cartList : state.AdviceReduce.cartList
   }
}
const mapDispatchToProps = (dispatch) => {
   return {

   }
}
export default connect(mapStateToProps,mapDispatchToProps)(Order) ;
