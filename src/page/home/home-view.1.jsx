import React , { Component } from 'react' ;
import { connect } from 'react-redux' ;
import axios from 'axios' ;
import './home-view.scss';
import YY from './yy';
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
      const {
         viewTop ,
         viewBot
      } = this.props.viewport ;
      const imageScope = top + height ;
      if(imageScope >= viewTop && imageScope <= viewBot) {
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
      return (
         <div className='col-xs-6'> 
            <div className={'waresItem wares-' + item.mid}>
               <div className='thumbnail'>
                  <WaresImage 
                     showImage = {this.state.showImage}
                     imageSrc={item.image3 ? item.image3 : item.smallImage}
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
               </div>

            </div>
         </div>
      )
   }
}
class HomeView extends Component {
   constructor (props){
      super(props)
      this.temps = {} ;       // 所有的Wares href 地址
      this.hrefArr = [] ;     // 某一项wares href 地址
      this.state = {
         hrefIndex : 0 ,
         viewport :{
            // parentTop ==> parent offsetTop  viewTop ==> top viewBot ==> bottom  
         },
         firstLoadingMerchandise : true ,
         getMerchandiseInfoList :{
            // merchandiseInfoList ==> array  ,merchandiseInfoTotal // number
         }
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
            viewTop : window.pageYOffset,
            viewBot : window.innerHeight + window.pageYOffset
        }
      })
   }
   componentWillMount () {
      window.addEventListener('scroll',this.updateViewport,false);
      window.addEventListener('resize',this.updateViewport,false);
      this.updateViewport();
   }
   componentDidMount(){
      this.onLoadingWaresHrefArray() ;
      this.onLoadingWaresLists () ;
      
   }
   componentDidUpdate (prevProps,prevState){
      if(prevProps.index !== this.props.index){
         this.onLoadingWaresHrefArray()
         this.onLoadingWaresLists ()
      }
   }
   componentWillUnmount(){
      window.removeEventListener('scroll',this.updateViewport);
      window.removeEventListener('resize',this.updateViewport);
   }
   //获取 设置 wares href 地址
   onLoadingWaresHrefArray () {
      this.temps = this.props.homeWaresHrefList[this.props.index] ;
      this.hrefArr = this.temps['hrefAddress'] ;
      let firstLoadingMerchandise = true ,
            getMerchandiseInfoList ={} ;
      this.setState({
         firstLoadingMerchandise ,
         getMerchandiseInfoList
      })
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
      console.log(186,_str.toJson(YY[0].children));
      let hrefIndex = this.state.hrefIndex ;
      //console.log(177,this.hrefArr[hrefIndex])
      axios.post(this.hrefArr[hrefIndex])
         .then((res) =>{
            this.onFirstLoad()
            let list = this.state.getMerchandiseInfoList ;
            let waresList = _str.toJson(res.data)['getMerchandiseInfoList'];
            //console.log(192,res)
            if(list.merchandiseInfoList == undefined) {
               list.merchandiseInfoList = waresList.merchandiseInfoList ;
               list.merchandiseInfoTotal = waresList.merchandiseInfoTotal
            }else {
               list.merchandiseInfoList = list.merchandiseInfoList.concat(waresList.merchandiseInfoList)
               list.merchandiseInfoTotal += waresList.merchandiseInfoTotal
            }
            this.setState({
               getMerchandiseInfoList : list
            },()=>{
               if(!this.state.getMerchandiseInfoList.merchandiseInfoTotal) {
                  console.log(200,'往下一个路径试试');
                  console.log('该htef地址 数据类型改为json')
                  this.onLoadingWaresMore();
               }
            })
         })
   }
   // 加载更多
   onLoadingWaresMore () {
      let hrefIndex = this.state.hrefIndex + 1 ;
      this.setState({
         hrefIndex
      },()=>this.onLoadingWaresLists())
   } 
   render(){
      const {
         merchandiseInfoList
      } = this.state.getMerchandiseInfoList ;
      return (
         <div className='wares-content-list container' ref='wares-content-list'>
            <div className='row'>
               {  merchandiseInfoList !== undefined 
                  ?  merchandiseInfoList.map((item,index) => {
                     //if(index < 5 )
                        return(
                           <WaresItem 
                              key ={index}
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
               merchandiseInfoList !== undefined && this.state.hrefIndex < this.hrefArr.length
               ? <div className='row'><div className='col-xs-10 col-xs-offset-1'><button className='btn btn-block btn-info' onClick={e=>this.onLoadingWaresMore(e)}>加载更多...</button></div></div>
               : null
            }
         </div>
      )
   }
}
const mapStateToProps = (state) =>{
   return {
      homeWaresHrefList : state.HomeReduce.homeWaresHrefList ,
      WaresList         : state.HomeReduce.WaresList
   }
}
const mapDispatchToProps = (dispatch) =>{
   return {

   }
}
export default connect(mapStateToProps ,mapDispatchToProps)(HomeView);