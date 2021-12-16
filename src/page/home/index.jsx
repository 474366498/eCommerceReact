import React , {Component} from 'react' ;
import { connect } from 'react-redux';
import {Link} from 'react-router-dom' ;
import ApplianceHead from 'cope/head/index';
import HeaderNavs from 'cope/navs/index';
import PageSearch from 'cope/search/index' ;
import {
   DialogMenu ,
   DialogCart
} from 'cope/dialog/index';

import HomeCarousel from './home-carousel';
import HomeView from './home-view';
class Home extends Component {
   constructor(props) {
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
         
         CategoriesIndex : 0 , // 大类序号  相当于一级菜单
         SmallClassIndex  : 0 , // 小类序号  相当于二级菜单
         ApplianceHeadKey : 'null', // 头部导航 icon 切换关键字
         dialogBoolean : {
         } ,
         timer : null
      }
   }
   
   getHeaderNavsIndex (e) {
      this.setState({
         CategoriesIndex : e
      })
   }
   onOpenMenu (key) {
      let newBool = !this.state.dialogBoolean[key] ;
      let text = '';
      newBool ? text = key : text ='' ;
      //console.log(69,key,newBool)
      this.setState({
         ApplianceHeadKey : text ,
         dialogBoolean:{
            [key] : newBool
         }
      })
   }
   onChangeDialogBoolean (obj) {
      let key = obj || obj.key ,
          newBool = !this.state.dialogBoolean[key];
      console.log(80,obj)
      this.setState({
         ApplianceHeadKey : 'null',
         dialogBoolean:{
            [key] : newBool
         },
         CategoriesIndex : obj.index ,
         SmallClassIndex : obj.childrenIndex
      })
   }
   render() {
      let hide ='';
      let { 
         dialogMenu ,
         dialogCart ,
         dialogNavs
      } = this.state.dialogBoolean;
      if(dialogMenu || dialogCart) {
         hide = 'hidden'
      } else {
         hide = ''
      }
      return (
         <div className='app-device' style={{'overflow':hide}}>
            <ApplianceHead 
               section = {{
                  'l':{
                     'id':'01',
                     'icon':'icon-menu',
                     'keyText':'dialogMenu' ,
                     'action':'icon-menu icon-white',   // 选中 如点击后的classname
                     'event':(e) => this.onOpenMenu('dialogMenu') 
                        // event事件 父子事件传递 等同于 funs = {e=>this.funs(e)} 的funs
                  },
                  'r':[
                     {
                        'id':'021',
                        'icon':'icon-gouwuche',
                        'keyText':'dialogCart' ,
                        'action':'icon-close',
                        'event':(e) => this.onOpenMenu('dialogCart') 
                     },
                     {
                        'id':'022',
                        'icon':'icon-shengqian',
                        'keyText':'dialogNavs' ,
                        'action':'icon-shengqian icon-white',
                        'event':(e) => this.onOpenMenu('dialogNavs') 
                     }
                  ]
               }}
               keyText = {this.state.ApplianceHeadKey}
               title='eCommerceShopping'
            ></ApplianceHead>
            <HomeCarousel 
               carouselList = {this.state.carouselList} 
            ></HomeCarousel>
            
            <PageSearch></PageSearch>
            <HomeView 
               CategoriesIndex = {this.state.CategoriesIndex} 
               SmallClassIndex = {this.state.SmallClassIndex}
            ></HomeView>
            {
               dialogMenu 
               ?(
               <DialogMenu 
                  onChangeDialogBoolean={e=> this.onChangeDialogBoolean(e)}
               ></DialogMenu>
               )
               : null
            }
            {
               dialogCart 
               ?(
               <DialogCart 
                  onChangeDialogBoolean={e=> this.onChangeDialogBoolean(e)}
               ></DialogCart>
               )
               : null
            }
            { 
               dialogNavs
               ?<HeaderNavs 
                  navLists = {[
                     {'id': 1,'text':'Advice','href':'advice','filter':false,'title':'建议'},
                     {'id': 2,'text':'Recent','href':'recent','filter':'recent','title':'最近'},
                     {'id': 3,'text':'Popular','href':'popular','filter':'popular','title':'受欢迎的'}
                  ]}
                  navIndex = {this.state.CategoriesIndex}
                  onChangeNavIndex = {e=>this.getHeaderNavsIndex(e)}
               ></HeaderNavs>
               :null
            }
         </div>
      )
   }
}
const mapStateToProps = (state)=>{
   return {
      
   }
}
const mapDispatchToProps = (dispatch)=>{
   return {

   }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home) ;
