import React , { Component } from 'react' ;
import { connect } from 'react-redux' ;
import axios from 'axios' ;
import StringFunc from 'func/string/index.js';
import './index.scss' ;
const _str = new StringFunc() ;
class WaresImage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showImage : false 
      }
   }
   updatePosition () {
      const el = this.refs.image;
      let parentTop = this.props.viewport.parentTop ;
      //console.log(15,getTop(el),el.offsetHeight , this.props.viewport);
      this.props.updateImagePosition(getTop(el) - parentTop,el.offsetHeight);
   }
   componentDidMount(){ // 初始化
      this.updatePosition()
   }
   componentDidUpdate (prevProps) {
      if(!this.props.showImage && prevProps.viewport) {
         this.updatePosition()
      }else {
         if(!this.state.showImage) this.loadImage()
      }
   }
   loadImage (){
      const img = new Image()
      img.onload =()=>{
         this.setState({
            showImage:true
         })
      }
      img.src = this.props.imageSrc;
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
   constructor(props) {
      super(props);
      this.state = {
         showImage : false 
      }
      this.updateImagePosition = this.updateImagePosition.bind(this)
   }
   updateImagePosition(top,height) { 
      if(this.state.showImage) {
         return ;
      }
      const {
         viewTop ,
         viewBot 
      } = this.props.viewport;
      const imageScope = top  + height ;
      if(imageScope >= viewTop && imageScope <= viewBot) {
         this.setShowImage(true)
      }
   }
   setShowImage (flg) {
      //console.log(62,flg)
      this.setState({
         showImage:!!flg
      })
   }
   componentWillMount(){
      if(this.props.showImage) {
         this.setShowImage(true)
      }
   }
   render () {
      let item = this.props.children ;
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
class WaresContentList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         viewport : {} ,
         loadIndex : 0 ,
         merchandiseInfoList : []
      }
      this.updateViewport = this.updateViewport.bind(this)
   }
   updateViewport () {
      let  $parent = this.refs['wares-content-list'] ;
      let  parentTop = $parent==undefined?0 :$parent.offsetTop;
      this.setState({
         viewport : {
            parentTop ,
            viewTop : window.pageYOffset,
            viewBot : window.innerHeight + window.pageYOffset
         }
      })
   }
   componentWillMount(){
      // scroll 
      window.addEventListener('scroll',this.updateViewport,false);
      window.addEventListener('resize',this.updateViewport,false);
      this.updateViewport(); 
   }
   componentDidMount(){
      this.updateViewport();
      this.loadingPropsState();
   }
   componentDidUpdate (prevProps,prevState){
      if(prevProps.homeWaresHrefIndex !== this.props.homeWaresHrefIndex){
         this.loadingPropsState();
      }
   }
   componentWillUnmount () {
      window.removeEventListener('scroll',this.updateViewport);
      window.removeEventListener('resize',this.updateViewport);
   }
   loadingPropsState () {
      let {
         homeWaresHrefList ,
         homeWaresHrefIndex 
      } = this.props;
      let href = homeWaresHrefList[homeWaresHrefIndex]['hrefAddress'];
      let loadIndex = this.state.loadIndex ;
      this.loadingView(href,loadIndex)
   }
   loadingView (link,index) {
      axios.get(link[index])
         .then((res) =>{
            let {
               merchandiseInfoTotal,
               merchandiseInfoList
            } =_str.toJson(res.data).getMerchandiseInfoList ;
            this.setState({
               merchandiseInfoList
            })
         })
   }
   render () {
      let {merchandiseInfoList} = this.state 
      return (
         <div className='container wares-content-list'  ref='wares-content-list'>
            <div className='row'>
               <ul>
                  {
                     merchandiseInfoList.map((item,index) => { 
                        return (
                           <WaresItem 
                              key={index} 
                              children = {item}
                              viewport = {this.state.viewport}
                              showImage = {false}
                           ></WaresItem>
                        ) 
                     }) 
                  }
               </ul>
            </div>
         </div>
      )
   }
}
const mapStateToProps = (state) =>{
   return {
      homeWaresHrefList : state.homeWaresHrefList ,
      homeWaresHrefIndex : state.homeWaresHrefIndex
   }
}
const mapDispatchToProps = () =>{
   return {

   }
}
export default connect(mapStateToProps,null)(WaresContentList);