import React , { Component } from 'react' ;
import { BrowserRouter as Router , Link } from 'react-router-dom' ;
import { connect } from 'react-redux';
import './index.scss';
// 购物车
class DialogCart extends Component {
   constructor(props) {
      super(props) ;
      this.state = {
         deleteWareStatus : false ,
         deleteWareIndex  : null  
      }
   }
   componentDidMount () {
     const _this = this ;
     var oDiv = $('.cart-item');
     oDiv.each(function(){
      $(this).bind('swipe',function(){
         let index = $(this).index() ;
         let flg = !_this.state.deleteWareStatus;
         _this.setState({
            deleteWareStatus : flg ,
            deleteWareIndex  : index
         });
        // console.log(this,index,_this)
      })
     })
   }
   onCloseMyself (key,obj) {
      if(obj === undefined) {
         obj = {
            index         : 0 ,
            childrenIndex : 0 ,
            key
         }
      }else {
         let {index,childrenIndex} = obj 
         obj = {
            index ,
            childrenIndex ,
            key
         }
      }
      this.props.onChangeDialogBoolean(obj)
   }
   onNotCloseMyself(e) {
      e.stopPropagation()
   }
   onSetStateStatus () {
      this.setState({
         deleteWareStatus : false ,
         deleteWareIndex  : null
      });
   }
   render () {
      let {
         deleteWareStatus ,
         deleteWareIndex 
      } = this.state
      let { 
         cartList,
         wareNumberIncrease ,
         wareNumberReduce ,
         wareDelete
       } = this.props
       console.log(66,cartList)
      return (
         <div 
            className='dialog-cart-background' 
            onClick={e=>this.onCloseMyself('dialogCart')}
         >
            <div className='dialog-cart' onClick={e=>this.onNotCloseMyself(e)}>
               <div className='cart-list'>
                  {
                     cartList.map((item,index) => {
                        return(
                           <div 
                              key={item.brandId - item.productId} 
                              className='cart-item' 
                              style={item.vipShopNumber === 0 ? {'display':'none'} : null}
                              onClick = {e => {e.stopPropagation()}}
                           >
                              {
                                 deleteWareStatus && deleteWareIndex === index 
                                 ? (
                                    <div className='col-xs-2 col-sm-2 wareDelete'
                                       onClick={e=>{
                                          wareDelete(e,deleteWareIndex);
                                          this.onSetStateStatus()   
                                       }}
                                    >
                                       <i className='iconfont icon-qingkongshanchu'></i>
                                    </div>
                                    )
                                 : null
                              }
                              
                              <div className='col-xs-4 col-sm-4'>
                                 <a className='thumbnail' style={{'border': '1px solid transparent'}}>
                                    <img 
                                       class='img-circle' 
                                       src={item.smallImage} 
                                       alt={item.smallImage ? item.smallImage : '图片已经不存在了'}
                                    ></img> 
                                 </a>
                              </div>
                              
                              <div className='col-xs-6 col-sm-6' style={{'padding': '0 5px'}}>
                                 <p className='title' title={item.productName}>{item.productName}</p>
                                 <p className='size'>
                                    尺码: {
                                          item.vipShopSize.map((s,i)=>(
                                                <span key={i}>{s.t}</span>
                                             ))
                                       }
                                 </p>
                                 <p className='price'><span>$ {item.vipshopPrice}</span> <span>合计: {item.vipshopPrice * item.vipShopNumber}</span></p>
                              </div>
                              <div className='col-xs-2 col-sm-2'>
                                 <a className='btn-group'>
                                    <span 
                                       onClick={e=> wareNumberIncrease(e,index,item.vipShopNumber)}
                                    >
                                       <i className='iconfont icon-iconfonticontrianglecopy'></i>
                                    </span>
                                    <span className='num'>{item.vipShopNumber}</span>
                                       {/* 
                                          // number 数量判断  小于等于0时删除单项  大于10时进行数量限制  
                                      
                                    {item.number <= 0 ? : item.number >= 10 ? :}
                                     */}
                                    <span 
                                       onClick={e=> wareNumberReduce(e,index,item.vipShopNumber)}
                                    >
                                       <i className='iconfont icon-xiangxiajiantou'></i>
                                    </span>
                                 </a>
                              </div>
                           </div>
                        )
                     })
                  }
               </div>
               
               <div className='cart-settlement'>
                     <Link 
                        to={{
                           pathname:'/order',
                           cartList
                        }}
                        className='btn btn-info btn-block ware-settlement'
                     >进行结算</Link>
               </div>
            </div>
         </div>
      )
   }
}
const mapStateToProps = (state) => { 
   return {
      cartList: state.AdviceReduce.cartList
   }
}
const mapDispatchToProps = (dispatch) =>{
   return {
      // 增加商品数量
      wareNumberIncrease (e,index,num) {
         e.stopPropagation() ;
         let action = {}
         num = Number(num)
         num = num + 1;
         if(num <= 10) {
            action = {
               type : 'wareNumberIncrease',
               index ,
               num
            }     
         } else {
            alert('10件，够了吧！！！')
            action = {
               type : 'wareNumberIncrease',
               index ,
               num : 10
            } 
         }
         dispatch(action)
      },
      // 减少商品数量
      wareNumberReduce (e,index,num) {
         e.stopPropagation() ;
         let action = {}
         num = num - 1;
         if(num <= 0) {
            const bool = confirm('您确定不要这个商品了？？？');
            bool ? num = 0 : num = 1 
            action = {
               type :'wareNumberReduce',
               index ,
               num 
            }
         }else {
            action = {
               type : 'wareNumberReduce',
               index ,
               num
            }
         }
         dispatch(action)
      },
      wareDelete (e,index) {
         e.stopPropagation();
         let action = {
            type : 'wareDelete' ,
            index
         }
         dispatch(action) ; 
      }
   }
}
export default connect(mapStateToProps,mapDispatchToProps)(DialogCart);