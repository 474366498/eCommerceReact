import React , { Component } from 'react';
import { connect } from 'react-redux';
import CarouselList from 'uide/carousel/index.jsx';
import SearchChild from 'uide/search/index.jsx';
import WaresContentList from './wares/index.jsx';
import HomeHeading from './heading/index';
class Home extends Component {
   constructor (props) {
      super(props);
      this.state = {
         // 滚动图片
         carouselList : [
            {
               'id':'3337601',
               'title':'对白DUIBAI特卖旗舰店',
               'info':'老客回归专享折上折',
               'href':'女装',
               'pic':'//d.vpimg1.com/upcb/2018/11/05/171/ias_154138453698375_570x273_90.jpg'
            },
            {
               'id':'3705784',
               'title':'达芙妮-最后疯抢专场',
               'info':'达芙妮-最后疯抢专场',
               'href':'鞋包',
               'pic':'//c.vpimg1.com/upcb/2018/12/03/70/ias_154383074498847_570x273_90.jpg'
            },
            {
               'id':'3621954',
               'title':'袋鼠DaiShu男装专场',
               'info':'袋鼠DaiShu男装专场',
               'href':'男装',
               'pic':'//d.vpimg1.com/upcb/2018/11/15/94/ias_154226801523143_570x273_90.jpg'
            },
            {
               'id':'3712691',
               'title':'李宁运动新品专场',
               'info':'李宁运动新品专场',
               'href':'运动品',
               'pic':'//d.vpimg1.com/upcb/2018/11/30/195/ias_154354981767089_570x273_90.jpg'
            },
            {
               'id':'3700632',
               'title':'飞亚达FIYTA时尚手表专场',
               'info':'飞亚达FIYTA时尚手表专场',
               'href':'饰品',
               'pic':'//c.vpimg1.com/upcb/2018/10/29/196/ias_154079726916482_570x273_90.jpg'
            }
         ],
         
         waresHrefIndex : 0
         
      }
   }
   componentWillMount() {

   }

   render () {
      let {
         homeWaresHrefIndex ,
         onChangeData
      } = this.props
      let { headingBoolean } = this.props
      return (
         <div>
            {
               headingBoolean 
               ? <HomeHeading onChangeHeadingIndex = {e=>onChangeData(e)}></HomeHeading> 
               : null 
            }
            <CarouselList 
               carouselList = {this.state.carouselList}
            ></CarouselList>
            <SearchChild />
            {<WaresContentList></WaresContentList> }
         </div>
      )
   }
} 
const mapStateToProps  = (state) =>{
   return {
      homeWaresHrefIndex : state.homeWaresHrefIndex
   }
}
const mapDispatchToProps = (dispatch) =>{
   return {
      onChangeData (homeWaresHrefIndex ) {
         const action = {
            type : 'onHomeChangeWaresHrefIndex' ,
            index : homeWaresHrefIndex
         }
         dispatch(action)
      }
   }
}
export default connect(mapStateToProps ,mapDispatchToProps)(Home );