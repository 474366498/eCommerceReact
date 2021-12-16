import React , { Component } from 'react' ;
import './index.scss';
class PriceSelector extends Component {
   constructor (props) {
      super(props)
      this.state = {
         count : ''           //  % 百分比 非% 就是实数
      }
   }
   componentDidMount () {
      let leng = this.refs['slider-leng'].clientWidth,                              // slider 长度
          p_l  = getLeft (this.refs['slider-leng']) ,                              // slider 相对位置(left)
          h_w  = this.refs['handle'].clientWidth,                                   // slider 滑动块
          min  = this.props.options ? this.props.options['min'] : 0  ,                // slider 最小值
          max  = this.props.options ? this.props.options['max'] : leng - h_w ,        // slider 最大值
          ratio = (max-min)/leng ? (max-min)/leng : 1,                              // props options 有min max 值时的比例
          h1_l = 0,                                                              // 动块1 left 
          h2_l = (max - min) / ratio - h_w / 2 ,                                                              // 动块2 left
          s_l  = h1_l + h_w/2,                                                       // slider 深色条 left 位置
          s_r  = h2_l - (h2_l - h_w / 2);                                             // slider 深色条 right 位置  

      this.onAcquirePrice({min,max})   
      this.setState ({
         leng  ,
         p_l   ,
         min   ,
         max   ,
         'p_min' : min ,
         'p_max' : max ,
         ratio ,
         h_w   ,
         h1_l  ,
         h2_l  ,
         s_l   ,
         s_r
      })
   }

   

   // 区块拖动方式
   onChangeTouchMoveNum (e,str) {
      let {
         leng ,
         min ,
         s_l ,
         p_l ,
         max ,
         p_min ,
         p_max ,
         ratio ,
         h_w
      } = this.state;
   
      if(str ==='min') {
         let num = e.targetTouches[0].pageX - p_l < 0 
         ? 0 
         : (
            e.targetTouches[0].pageX - p_l > leng - h_w 
            ? leng - h_w 
            : e.targetTouches[0].pageX - p_l
            )
         let min  = p_min + Math.ceil (num * ratio)    
         this.onAcquirePrice({min,max})       
         this.setState({
            [str]  :  min ,
            'h1_l' : num  ,
            's_l'  : num  + h_w / 2
         })
      }else {
         let num = leng - e.targetTouches[0].pageX + p_l < 0 
                   ? 0 
                   :( 
                      leng - e.targetTouches[0].pageX + p_l > leng - s_l - h_w / 2 
                      ? leng - s_l - h_w / 2 
                      : leng - e.targetTouches[0].pageX + p_l
                     ) ,
             max = p_max - Math.ceil(num * ratio) ;        
               this.onAcquirePrice({min,max}) 
               this.setState({
                  [str]  : max ,
                  'h2_l' : leng - num ,
                  's_r'  : num
               })
      
      }    
   }
   // 文本输入方式
   onChangeInputNum (e,key) {
      let {
         leng ,
         h_w ,
         min ,
         max ,
         p_min ,
         p_max ,
         ratio
      } = this.state ;
      let val = parseInt(e.target.value);
      if(key ==='min') {
         if(val < p_min ) {
            alert('error ')
            val = p_min
         }
         let s_l  = val + h_w/2;
         this.onAcquirePrice({val,max}) 
         this.setState({
            [key]  : val ,
            'h1_l' : val / ratio ,
            's_l'  : s_l / ratio
         })
      }else {
         if(val > p_max - h_w * ratio ) {
            alert('error ')
            val = p_max - h_w * ratio
         }
         let s_r  = leng - val ;
         this.onAcquirePrice({min,val}) 
         this.setState({
            [key] : val ,
            'h2_l' : val / ratio ,
            's_r'  : leng - val / ratio - h_w/2
         })
      }
   }
   // 父子组件回调
   onAcquirePrice (obj) {
      //console.log(108,obj)
      // this.props.onChangePrice(obj)
   }
   // this.props.onChangePrice (obj)
   render () {
      let {
         leng ,
         min  ,
         max  ,
         h_w  ,
         h1_l ,
         h2_l ,
         s_l  ,
         s_r 
      } = this.state 
      return (
         <div className='price-selector'>
            <div className='slider' ref='slider-leng'>
               <div 
                  className='slider-range' 
                  style={{'left':s_l+'px','right':s_r+'px'}}
               ></div>
               <span 
                  className='slider-handle slider-handle-0' 
                  name='min' 
                  ref='handle'
                  style={{'left':h1_l+'px'}}
                  onTouchMove = {e => this.onChangeTouchMoveNum(e,'min') }
               ></span>
               <span 
                  className='slider-handle slider-handle-1' 
                  name='max' 
                  ref='handle'
                  style={{'left':h2_l+'px'}}
                  onTouchMove = {e => this.onChangeTouchMoveNum(e,'max') }
               ></span>
            </div>
            <div className='slide-input-group row'>
               <div className='slide-input col-xs-5'>
                  <div class="input-group">
                     <span class="input-group-addon">$</span>
                     <input type="text" class="form-control" name='min' type='text' value={min} onChange = {e=>this.onChangeInputNum(e,'min') } placeholder = {min} />   
                  </div>
               </div>
               <div className='slide-input col-xs-5 col-xs-offset-1'>
                  <div class="input-group">
                     <span class="input-group-addon">$</span>
                     <input type="text" class="form-control" name='max' type='text' value={max} onChange = {e=>this.onChangeInputNum(e,'max') } placeholder = {max} />
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

function getLeft (e) {
   var offset=e.offsetLeft;
   if(e.offsetParent!=null) offset+=getLeft(e.offsetParent);
   return offset;
}
function getTop (e) {
   var offset = e.offsetTop ;
   if(e.offsetParent != null) offset+=getTop(e.offsetParent);
   return offset
}

export default PriceSelector;