import React , { Component } from 'react' ;
import { BrowserRouter as Router , Link} from 'react-router-dom'
import { connect } from 'react-redux' ;
import axios from 'axios' ;
import './home-view.scss';
import StringFunc from 'func/string/index.js';
const _str = new StringFunc() ;
class WaresImage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showImage : false 
      }
   }
   updatePosition() {
      const el = this.refs.image;
      let parentTop = this.props.viewport.parentTop;
      this.props.updateImagePosition(getTop(el) - parentTop,el.offsetHeight );
   }
   componentDidMount () {
      this.updatePosition()
   }
   componentDidUpdate (prevProps) {
      if(!this.props.showImage && prevProps.viewport) {
         this.updatePosition()
      } else {
         if(!this.state.showImage) {
            this.loadImage()
         }
      }
   }
   loadImage () {
      const img = new Image() 
      img.onload = () =>{
         this.setState({
            showImage : true
         })
      }
      img.src = this.props.imageSrc
   }
   render () {
      const imageSrc = 
         this.props.showImage && this.state.showImage 
         ? this.props.imageSrc 
         : 'http://shop.vipstatic.com/img/te/vip_loading.gif';
      return <img ref="image" src={imageSrc} />
   }
}

function getTop (e) {
   var offset = e.offsetTop ;
   if(e.offsetParent !=null) offset += getTop(e.offsetParent);
   return offset
}

class WaresItem extends Component {
   constructor (props) {
      super(props)
      this.state = {
         showImage : false 
      }
      this.updateImagePosition = this.updateImagePosition.bind(this)
   }
   updateImagePosition (top,height) {
      if(this.state.showImage) {
         return 
      }
      let viewHig = document.documentElement.clientHeight || document.body.clientHeight ;
      const {
         viewTop ,
         viewBot
      } = this.props.viewport ;
      const imageScope = top + height ;
      if(imageScope < viewHig || (imageScope >= viewTop && imageScope <= viewBot)) {
         this.setShowImage (true)
      }
   }
   setShowImage (flg) {
      this.setState({
         showImage :!!flg
      })
   }
   render () {
      let item = this.props.children;
      //console.log(85,this.props, item)
      return (
         <div className='col-xs-6'> 
            <div className={'waresItem wares-' + item.productId}>
               <Link 
                  className='thumbnail' 
                  to={{
                     pathname:`/product/${item.productId}`,
                     categor : this.props.CategoriesIndex ,       //  大类(一级导航序号)
                     small   : this.props.SmallClassIndex ,       //  小类(二级导航序号)
                     Index   : this.props.Index ,                 //  数据数组序号  
                     index   : this.props.index                   //  产品列表序号
                  }}
               >
                  <WaresImage 
                     showImage = {this.state.showImage}
                     imageSrc={item.smallImage}
                     viewport = {this.props.viewport}
                     updateImagePosition = {this.updateImagePosition}
                  > </WaresImage>
                  {/*  <img className='wares-pic' src={item.image3 ? item.image3 : item.smallImage} /> */}

                  <div className='caption'>
                     <p className='productName' title={item.productName}> {item.productName} </p>
                     <p className='vipshopPrice'>
                        <span className='price'><i className='iconfont'>￥</i>{item.vipshopPrice}</span>
                        <del className='marketPrice'><i className='iconfont'>￥</i>{item.marketPrice}</del>
                        <span className='vipDiscount'>{item.vipDiscount}</span>
                     </p>
                  </div>
               </Link>

            </div>
         </div>
      )
   }
}
class HomeView extends Component {
   constructor (props){
      super(props)
      this.state = {
         waresIndex : 0 ,
         viewport :{
            // parentTop ==> parent offsetTop  viewTop ==> top viewBot ==> bottom  
         },
         firstLoadingMerchandise : true ,
         timer : null
      }
      this.updateViewport = this.updateViewport.bind(this) 
      this.onFirstLoad = this.onFirstLoad.bind(this)
   }
   //图片懒加载 scroll事件
   updateViewport() {
      let $parent = this.refs['wares-content-list'] ;
      let parentTop = $parent == undefined ? 0 : $parent.offsetTop ;
       // 图片懒加载到哪一个了？？？？？？？？？？？？？ or 在最底下加一个加载更多的按钮????????????????????????
      this.setState ({
        viewport :{
            parentTop ,
            viewHig : document.documentElement.clientHeight || document.body.clientHeight ,
            viewTop : window.pageYOffset,
            viewBot : window.innerHeight + window.pageYOffset
        }
      })
   }
   componentWillMount () {
      console.log('chrome 刷新时无法回到顶部')
      this.onDocumentTop()
      window.addEventListener('scroll',this.updateViewport,false);
      window.addEventListener('resize',this.updateViewport,false);
      this.updateViewport();
   }
   componentDidMount(){
      this.onLoadingWaresLists () ;   
   }
   componentDidUpdate (prevProps,prevState){
      if((prevProps.CategoriesIndex !== this.props.CategoriesIndex)||(prevProps.SmallClassIndex !== this.props.SmallClassIndex)){
         this.onLoadingWaresLists()
      }
   }
   componentWillUnmount(){
      window.removeEventListener('scroll',this.updateViewport);
      window.removeEventListener('resize',this.updateViewport);
   }
   // 是否是第一次加载列表
   onFirstLoad () {
      let flg = this.state.firstLoadingMerchandise;
      if(flg) {
         flg = !flg 
         this.setState({
            firstLoadingMerchandise : flg
         })
      }
   }
   // 加载 get wares 列表
   onLoadingWaresLists () {
      let {
         WaresList ,
         CategoriesIndex ,
         SmallClassIndex
      } = this.props;
      console.log( 
         188,WaresList ,
         CategoriesIndex ,
         SmallClassIndex)
      let { waresIndex } = this.state; 
      let apiTop = document.documentElement.scrollTop || document.body.scrollTop ;
      if(apiTop > 0) {
         document.documentElement.scrollTop = document.body.scrollTop = 0;
      }
      let WaresArr = WaresList[CategoriesIndex].child[SmallClassIndex].children ;
      // console.log(182,WaresArr)
      let products = _str.toJson(WaresArr[waresIndex].main).products ;
      console.log(193,CategoriesIndex,products)
      this.setState({
         WaresArr ,
         products
      })
   }
   // 加载更多
   onLoadingWaresMore () {
      let waresIndex = this.state.waresIndex + 1 ;
      this.setState({
         waresIndex
      },()=>this.onLoadingWaresLists())
   } 
   // 返回顶部 
   onDocumentTop () {
      let timer = this.state.timer ;
      timer = setInterval(function () {
         let apiTop = document.documentElement.scrollTop || document.body.scrollTop ,
             apiSpeed = Math.floor(-apiTop / 6 );
         document.documentElement.scrollTop = document.body.scrollTop = apiTop + apiSpeed   
         if(apiTop ===0 ) {
            clearInterval(timer)
         }
      },20)  
   }
   render(){
      const {
         waresIndex,
         WaresArr,
         products
      } = this.state ;
      let { 
         viewTop ,
         viewHig
      } = this.state.viewport;
      return (
         <div className='wares-content-list container' ref='wares-content-list'>
            <div className='row'>
               {  products !== undefined 
                  ?  products.map((item,index) => {
                     //if(index < 5 )
                        return(
                           <WaresItem 
                              key ={index}
                              CategoriesIndex = {this.props.CategoriesIndex}        //  大类(一级导航序号)
                              SmallClassIndex = {this.props.SmallClassIndex}        //  小类(二级导航序号)
                              Index = {waresIndex}                                  //  数据数组序号  
                              index = {index}                                       //  产品列表序号
                              children = {item} 
                              viewport = {this.state.viewport}
                              showImage = {false}
                           />
                        )
                     }) 
                  : <div className='col-xs-10 col-xs-offset-1'>没有数据/后台服务器更换....</div>
               }
            </div>
            {
               products !== undefined && waresIndex < WaresArr.length - 1
               ? <div className='row'><div className='col-xs-10 col-xs-offset-1'><button className='btn btn-block btn-info' onClick={e=>this.onLoadingWaresMore(e)}>下一页</button></div></div>
               : null
            }
            {
               viewTop > viewHig * 2
               ? (
                  <div className='documentTop' onClick={e=> this.onDocumentTop(e)}>
                     <i className='iconfont icon-huojian'></i>
                  </div>
               )
               : null
            }
         </div>
      )
   }
}
const mapStateToProps = (state) =>{
   return {
      WaresList         : state.HomeReduce.WaresList
   }
}
const mapDispatchToProps = (dispatch) =>{
   return {

   }
}
export default connect(mapStateToProps ,mapDispatchToProps)(HomeView);