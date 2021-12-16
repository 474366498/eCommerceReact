import React , { Component } from 'react' ;
import { connect } from 'react-redux' ;
import {
   DialogCart
} from 'cope/dialog/index';
import ApplianceHead from 'cope/head/index';
import './index.scss' ;
import StringFunc from 'func/string';
const _str = new StringFunc () ;
class Product extends Component {
   constructor(props) {
      super(props);
      this.state = {
         dialogBoolean : {                               // dialog cart boolean 

         },
         ProductIndex : 0 ,                              // 默认展示图片序号
         ProductDescriptionState : false  ,              // 默认Product-Description 显示隐藏
         ProductColors:[                                 // 商品颜色数组  
            {'t':'绿色','c':false,'bg':'green'},
            {'t':'蓝色','c':false,'bg':'blue'},
            {'t':'红色','c':false,'bg':'red'},
            {'t':'灰色','c':false,'bg':'gray'},
            {'t':'粉色','c':false,'bg':'pink'},
            {'t':'紫色','c':false,'bg':'purple'},
            {'t':'棕色','c':false,'bg':'brown'},
            {'t':'白色','c':false,'bg':'white'},
            {'t':'橙色','c':false,'bg':'orange'},
            {'t':'黄色','c':false,'bg':'yellow'}
         ],
         ProductSizes : [                                // 商品大小数组
            {'t':'XXS','c':false},
            {'t':'XS','c':false},
            {'t':'S','c':false},
            {'t':'M','c':false},
            {'t':'L','c':false},
            {'t':'XL','c':false},
            {'t':'XXL','c':false},
            {'t':'3XL','c':false},
            {'t':'3XL+','c':false}
         ]
      }
   }
   componentWillMount () {
      console.log(8,this.props)
      let {
         categor ,      //  大类(一级导航序号)
         small ,        //  小类(二级导航序号)
         Index ,        //  数据数组序号  
         index          //  产品列表序号
      } = this.props.location ;
      this.setState({
         categor  ,
         small    ,
         Index    ,
         index
      })
   }
   componentDidMount () {
      let WaresList = this.props.WaresList ;
      let {
         categor ,      //  大类(一级导航序号)
         small ,        //  小类(二级导航序号)
         Index ,        //  数据数组序号  
         index          //  产品列表序号
      } = this.state;
      let Product = _str.toJson(WaresList[categor].child[small].children[Index].main).products[index];
      //console.log(41,Product)
      let ProductImg = [] ;
      let ProductDescription = [] ;
      for (var key in Product ) {
         ProductDescription.push({[key]:Product[key]})
         if(key.search(/image/i) >=0) {
            ProductImg.push(Product[key])
         }
      }
      this.setState({
         WaresList ,
         Product  ,
         ProductImg ,
         ProductDescription
      })
   }
   //打开弹出窗(cart)
   onOpenMenu (key) {
      this.setState({
         dialogBoolean : {
            [key] : true 
         }
      })
   }
   // 关闭弹出窗(cart)
   onChangeDialogBoolean (obj) {
      let key = obj.key || obj ;
      let newBoolean = !this.state.dialogBoolean[key] ;
      console.log(94,key,newBoolean)
      this.setState({
         dialogBoolean : {
            [key] : newBoolean
         }
      })
   }
   // 改变productIndex 切换图片
   onChangeProductIndex (index) {
      let {
         ProductIndex
      }  = this.state ;
      if(ProductIndex !== index ) {
         ProductIndex = index ;
         this.setState({
            ProductIndex
         })
      }
   }
   // 商品详细 显示 / 隐藏
   onChangeProductDescriptionState () {
      let ProductDescriptionState = !this.state.ProductDescriptionState ;
      this.setState({
         ProductDescriptionState
      })
   }
   // 向商品添加属性 如颜色 大小
   addProductProperty (key,i) {
      let ProductKey = this.state[key] ;
      ProductKey.map((item,index)=>{
         if(index === i ) {
            item.c = !item.c
         } else {
            item.c = false
         } 
      })
      this.setState({
         [key] : ProductKey
      })
      
   }
   // 添加至列表
   onAddToList () {
      let Product = this.state.Product ;
      console.log(Product);
      alert(`你已收藏了${Product.productName}这件商品`)
   }
   // 添加至购物车
   onAddToCart () {
      // vipShopSize
      // vipShopColor
      // vipShopNumber
      let {
         Product  ,
         ProductColors  ,
         ProductSizes
      } = this.state;
     /*  Product['vipShopColor'] ? Product['vipShopColor'] : Product['vipShopColor'] = new Array();
      Product['vipShopSize'] ? Product['vipShopSize'] : Product['vipShopSize'] = new Array(); */
      Product['vipShopColor']  = new Array();
      Product['vipShopSize']  = new Array();
      let ProductColorsIndex = 0 , ProductSizesIndex = 0 ;
      ProductColors.map((item,index) => {
         if(!!item.c) {
            ProductColorsIndex = index 
         }
      })
      ProductSizes.map((item,index) => {
         if(!!item.c) {
            ProductSizesIndex = index 
         }
      })
      Product['vipShopColor'].push(ProductColors[ProductColorsIndex])
      Product['vipShopSize'].push(ProductSizes[ProductSizesIndex])
      Product['vipShopNumber'] = Product['vipShopSize'].length 
      this.props.appendToCartList(Product);
   }
   render () {
      let { 
         Product ,
         ProductImg , 
         ProductDescription ,
         ProductIndex   ,
         ProductDescriptionState   ,
         ProductColors  ,
         ProductSizes
      } =  this.state
      console.log(
         183,
         Product ,
         ProductImg , 
         ProductDescription ,
         ProductIndex   ,
         ProductDescriptionState   ,
         ProductColors  ,
         ProductSizes
         )
      let {
         dialogCart
      } = this.state.dialogBoolean ;
      return (
         <div className='app-device'>
            <ApplianceHead
               section={{
                  'l':{
                     'id':'01',
                     'icon':'icon-back',
                     'keyText':'dialogCart',
                     'action' : 'icon-back',
                     'event':()=>{
                        window.history.go(-1)
                     }
                  },
                  'r':[
                     {
                        'id':'021',
                        'icon':'icon-gouwuche',
                        'keyText':'dialogCart',
                        'action' :'icon-close',
                        'event' :(e)=> this.onOpenMenu('dialogCart')
                     }
                  ]
               }}
               keyText = 'keyText'
               title = {Product != undefined ? Product.brandName : null }
            >
            </ApplianceHead>
            <div className='container product-handle'>
               <div className='row'>
                  <div className='col-xs-6'>
                     <button className='btn btn-md btn-block btn-to-list' onClick={e=>this.onAddToList(e)}>加入列表</button>
                  </div>
                  <div className='col-xs-6'>
                     <button className='btn btn-md btn-block btn-to-cart' onClick={e=>this.onAddToCart(e)}>加入购物车</button>
                  </div>
               </div>
            </div>

            <div className='container product-details'>
               <div className='product-section' title='商品细节'>
                  <div className='product-image'>
                     <div className='thumbnail'>
                        <img 
                           src={ProductImg != undefined ? ProductImg[ProductIndex] : null }  
                           alt={ProductImg != undefined ? ProductImg[ProductIndex] : null } 
                           title={Product != undefined ? Product.productName : null } 
                        />
                        <div className='pic-sub'>
                           {
                              ProductImg != undefined 
                              ? ProductImg.map((item,index) => (
                                 <span 
                                    className={index === ProductIndex ?'action':''} 
                                    onClick={e=>this.onChangeProductIndex(index)}
                                 ></span>
                              ))
                              : null
                           }
                        </div>
                     </div>
                  </div>
                  <div className='product-price'>
                     <div className='col-xs-8'>
                        <strong>{Product != undefined ? Product.productName : null }</strong>
                     </div>  
                     <div className='col-xs-4'>
                        <button className='btn btn-md btn-block'>{Product != undefined ? Product.vipshopPrice : null }</button>
                     </div>   
                  </div>
               </div>

               <div className='product-section' title='商品详细'>
                  <div className='product-description'>
                     <div className='panel-head' onClick={e=>this.onChangeProductDescriptionState(e)}>
                        <i className={ProductDescriptionState ? 'iconfont icon-xiangxiajiantou' : 'iconfont icon-arrow-right'}></i>
                        <strong>商品详细</strong>
                     </div>
                     <div className={ProductDescriptionState ? 'panel-body' : 'panel-body collapse' }>
                        {
                           ProductDescription !== undefined 
                           ? ProductDescription.map((item,index)=>{
                              for(let key in item) {
                                 return (
                                    <div className='row' key={index}>
                                       <div className='col-xs-5'><span>{key}</span></div>
                                       <div className='col-xs-7'>
                                          {
                                             typeof(item[key]) === 'string' && item[key].indexOf('http://') > -1  
                                             ? <div className='thumbnail'><img src={item[key]} /> </div>
                                             :(
                                                typeof(item[key]) !== 'object' 
                                                ? <p>{item[key]}</p> 
                                                : null
                                             )
                                             
                                          }
                                       </div>
                                    </div>
                                 )
                              }
                              
                           })
                           : null
                        }
                        
                     </div>      
                  </div>       
               </div>

               <div className='product-section' title='商品属性'>
                  <div className='product-color'>
                     <div className='panel-head'>
                        <i className='iconfont icon-arrow-right'></i>
                        <strong>COLORS</strong>
                     </div>
                     <div className='panel-body row'>
                        {
                           ProductColors.map((item,index) =>(
                              <div className='col-xs-3' key={index}>
                                 <button 
                                    className={item.c ? 'btn btn-md active' : 'btn btn-md' } 
                                    style={{'background':item.bg}}
                                    onClick={e=>this.addProductProperty('ProductColors',index)}
                                 ></button>
                              </div>
                           ))
                        }
                     </div>     
                  </div>
                  <div className='product-size'>
                     <div className='panel-head'>
                        <i className='iconfont icon-arrow-right'></i>
                        <strong>SIZES</strong>
                     </div>
                     <div className='panel-body row'>
                        {
                           ProductSizes.map((item,index) =>(
                              <div className='col-xs-3' key={index}>
                                 <button 
                                    className={item.c ? 'btn btn-md btn-block active' : 'btn btn-md btn-block' }
                                    onClick={e=>this.addProductProperty('ProductSizes',index)}
                                 >{item.t}</button>
                              </div>
                           ))
                        }
                     </div>
                  </div>     
               </div>            

            </div>
            
            {
               dialogCart 
               ? <DialogCart onChangeDialogBoolean={e=> this.onChangeDialogBoolean(e)} ></DialogCart> 
               : null 
            }
         </div>
      )
   }
}
const IsImageSrc = (str) => {
   console.log(181,typeof(str))
   if(typeof(str) === 'string' && str.indexOf('http://') > -1) {
      console.log(182,str)
   }
}
const SplitJson = (obj) => {
   let dom = $('<div class="container"></div>');
   let html = ''
   for(let key in obj) {
      html +=`
         <div class='row' key=${key}>
            <div class='col-xs-5'>${key}</div>
            <div class='col-xs-7'>${obj[key]}</div>
         </div>
      `
   }
   dom.html(html);
   console.log(161,obj,dom)
}
const mapStateToProps = (state) => {
   return {
      WaresList         : state.HomeReduce.WaresList ,
      cartList          : state.AdviceReduce.cartList
   }
}
const mapDispatchToProps = (dispatch) => {
   return {
        // 向购物车(cartList)追加数据
      appendToCartList(product) {
         const action = {
            type : 'appendToCartList' ,
            product
         }
         dispatch(action)
      }
   }
}
export default connect(mapStateToProps , mapDispatchToProps)(Product);