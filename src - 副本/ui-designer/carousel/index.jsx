import React , { Component } from 'react';

/// 首页广告图片
class CarouselList extends Component {
   constructor (props) {
      super(props);
      this.state = {
         carouselIndex : 0
      }
   }
   componentDidMount() {
      document.addEventListener('onload',this.onChangeCarousel() )
   }
   onChangeCarousel(){
      let _this = this ,
          index = this.state.carouselIndex,
          length = this.props.carouselList.length;
      setInterval(function(){
         index < length -1 ? index++ : index = 0 ;
         _this.setState({
            carouselIndex : index 
         });
      },5000)
   }
   render () {
      let { carouselIndex } = this.state; 
      let carouselList = this.props.carouselList ;
      return (
         <div id='carousel-list'>
            <div className="carousel slide" data-ride="carousel">
               <ol className='carousel-indicators'>
                  {
                     carouselList.map((item,index) => (
                        <li 
                           className={carouselIndex===index ? 'active' : ''}
                           key={item.id}
                        ></li>
                     ))
                  }
               </ol>
               <div className='carousel-inner'>
                  {
                     carouselList.map((item,index) => (
                        <div 
                           className={carouselIndex === index ? 'item active':'item'}
                           key={item.id}
                        >
                           <img src= {item.pic} alt={item.title} />
                           <div className='carousel-caption'>
                              {item.info}
                              <a title={item.href}>{item.href}</a>
                           </div>
                        </div>
                     ))
                  }
               </div>  
            </div>
         </div>
      )
   }
}
export default CarouselList;