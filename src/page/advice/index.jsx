
import React , {Component} from 'react' ;
import {
   BrowserRouter as Router ,
   Link ,
   NavLink ,
   Redirect ,
   Route ,
   Switch
} from 'react-router-dom';
import Product from 'page/product/index';
import Order from 'page/order/index' ;
import './index.scss' ;
import {
   DialogMenu ,
   DialogCart ,
   DialogFilter
} from 'cope/dialog/index';
import ApplianceHead from 'cope/head/index';
import HeadSelect from 'cope/select/index' ;
import HeaderNavs from 'cope/navs/index';
import PageSearch from 'cope/search/index' ;
import AdviceView from './advice-view';


class AdviceHome extends Component{
   constructor(props){
      super(props);
      this.state = {
         waresHrefIndex : 0 ,
         ApplianceHeadKey : 'null',       // 头部导航 icon 切换关键字
         dialogBoolean : {                // dialog 弹窗boolean 
            dialogMenu : false
         },
         CategoriesIndex : 0 ,            // 大类
         SmallClassIndex : 0              // 小类
      }
   }
   getHeaderNavsIndex (e) {

   }
   onOpenMenu (key) {
      let newBool = !this.state.dialogBoolean[key]
      let text = '';
      newBool ? text = key : text ='' ;
      this.setState({
         ApplianceHeadKey : text ,
         dialogBoolean:{
            [key] : newBool
         }
      })
   }
   onChangeDialogBoolean (key) {
      let newBool = !this.state.dialogBoolean[key]
      this.setState({
         ApplianceHeadKey : 'null',
         dialogBoolean:{
            [key] : newBool
         }
      })
   }

   render(){
      let { 
         dialogMenu ,
         dialogCart 
      } = this.state.dialogBoolean;
      let hide ='' ;
      if( dialogMenu || dialogCart ) {
         hide = 'hidden'
      }
      return (
         <div className='app-device' style={{'overflow':hide}}>
            <ApplianceHead 
               section = {{
                  'l':{
                     'id':'01',
                     'icon':'icon-menu',
                     'keyText':'dialogMenu',  // 默认
                     'action':'icon-menu',   // 选中 如点击后的classname
                     'event':(e) => this.onOpenMenu('dialogMenu') 
                         // event事件 父子事件传递 等同于 funs = {e=>this.funs(e)} 的funs
                  },
                  'r':[
                     {
                        'id':'021',
                        'icon':'icon-gouwuche',
                        'keyText':'dialogCart',
                        'action':'icon-close',
                        'event':(e) => this.onOpenMenu('dialogCart')
                     }
                  ]
               }}
               keyText = {this.state.ApplianceHeadKey}
               title='Our Advice'
            > </ApplianceHead>
            <div className='advice-barand-list row'>
               <div className='advice-barand-man col-xs-12'>
                  <a className='thumbnail'>
                     <img src='//c.vpimg1.com/upcb/2018/12/05/73/ias_154400820988242_570x273_90.jpg' />
                  </a>
               </div>
               <div className='advice-barand-woman col-xs-12'>
                  <a className='thumbnail'>
                     <img src='//d.vpimg1.com/upcb/2018/11/14/177/ias_154218884933598_570x273_90.jpg' />
                  </a>
               </div>
            </div>
            <HeaderNavs
               navLists = {[
                  {'id': 1,'text':'ALL','href':'all','filter':'false','title':'所有'},
                  {'id': 2,'text':'MAN','href':'advice/man','filter':false,'title':'男士'},
                  {'id': 3,'text':'WOMAN','href':'advice/woman','filter':false,'title':'女士'},
                  {'id': 4,'text':'KID','href':'advice/kid','filter':false,'title':'儿童'}
               ]}
               navIndex = {this.state.waresHrefIndex}
               onChangeNavIndex = {e => this.getHeaderNavsIndex(e)}
            ></HeaderNavs>
            <PageSearch></PageSearch>

            <AdviceView
               CategoriesIndex = {this.state.CategoriesIndex} 
               SmallClassIndex = {this.state.SmallClassIndex}
            ></AdviceView>   
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
         </div>
      )
   }
}

class AdviceFilter extends Component {
   constructor (props) {
      super(props);
      this.state = {
         ApplianceHeadKey : 'null', // 头部导航 icon 切换关键字
         dialogBoolean : {
         }
      }
   }
   componentWillMount(){
      let title = this.props.match.params.name ,
          pageTitle ='Welcome '+title +' Zone' ,
          selectTitle = title +' Select';
      let select = [] ,
          CategoriesIndex ,
          SmallClassIndex
      switch (title) {
         case 'man' : 
         select = [
            {'id':'0001001','title':'短袖T恤'}, 
            {'id':'0001002','title':'毛衣'}, 
            {'id':'0001003','title':'羽绒服'}, 
            {'id':'0001004','title':'皮衣'},  
            {'id':'0001005','title':'风衣'}, 
            {'id':'0001006','title':'长袖T恤'}, 
            {'id':'0001007','title':'外套'}, 
            {'id':'0001008','title':'针织衫'}, 
            {'id':'0001009','title':'西装'}, 
            {'id':'0001010','title':'短裤'}, 
            {'id':'0001011','title':'运动裤'}, 
            {'id':'0001012','title':'西裤'},  
            {'id':'0001013','title':'牛仔裤'},     
            {'id':'0001014','title':'冬季裤装'},   
            {'id':'0001015','title':'休闲裤'}, 
            {'id':'0001016','title':'九分裤'}
         ];
         CategoriesIndex = 0 ;
         SmallClassIndex = 5
         break;
         case 'woman' :
          select = [
            {'id':'0002001','title':'短袖T恤'}, 
            {'id':'0002002','title':'毛衣'}, 
            {'id':'0002003','title':'羽绒服'}, 
            {'id':'0002004','title':'皮衣'},  
            {'id':'0002005','title':'风衣'}, 
            {'id':'0002006','title':'长袖T恤'}, 
            {'id':'0002007','title':'外套'}, 
            {'id':'0002008','title':'针织衫'}, 
            {'id':'0002009','title':'西装'}, 
            {'id':'0002010','title':'短裤'}, 
            {'id':'0002011','title':'运动裤'}, 
            {'id':'0002012','title':'西裤'},  
            {'id':'0002013','title':'牛仔裤'},     
            {'id':'0002014','title':'冬季裤装'},   
            {'id':'0002015','title':'休闲裤'}, 
            {'id':'0002016','title':'九分裤'}
         ] ;
         CategoriesIndex = 0 ;
         SmallClassIndex = 2
         break ;
         default :  
         select = [
            {'id':'0003001','title':'男童上装'}, 
            {'id':'0003002','title':'男童裤装'}, 
            {'id':'0003003','title':'女童上装'}, 
            {'id':'0003004','title':'女童裤装'},  
            {'id':'0003005','title':'女童裙装'}, 
            {'id':'0003006','title':'卫衣/运动服'}, 
            {'id':'0003007','title':'儿童家居服'}, 
            {'id':'0003008','title':'毛衣/线衫'}, 
            {'id':'0003009','title':'儿童衬衫'}, 
            {'id':'0003010','title':'儿童T恤/polo'}, 
            {'id':'0003011','title':'儿童裤装'}, 
            {'id':'0003012','title':'儿童外套'},  
            {'id':'0003013','title':'配饰配件'},     
            {'id':'0003014','title':'儿童套装'}
         ]
         CategoriesIndex = 5 ;
         SmallClassIndex = 0
      }
      this.setState({
         pageTitle ,
         selectTitle,
         select ,
         CategoriesIndex ,
         SmallClassIndex
      })
   }
   // 获取 子组件 HeadSelect 的返回值  
   getSelectItem (e) {
      let pageTitle = this.props.match.params.name +' '+ e.title 
      this.setState({
         pageTitle
      })
   }
   onOpenMenu (key) {
      let newBool = !this.state.dialogBoolean[key]
      let text = '';
      newBool ? text = key : text ='' ;
      this.setState({
         ApplianceHeadKey : text ,
         dialogBoolean:{
            [key] : newBool
         }
      })
   }
   onChangeDialogBoolean (key) {
      let newBool = !this.state.dialogBoolean[key]
      this.setState({
         ApplianceHeadKey : 'null',
         dialogBoolean:{
            [key] : newBool
         }
      })
      console.log(79,key)
   }
   render (){
      let { 
         pageTitle , 
         selectTitle , 
         select 
      } = this.state;
      let { 
         dialogCart ,
         dialogFilter
      } = this.state.dialogBoolean;
      let hide ='' ;
      if( dialogCart || dialogFilter ) {
         hide = 'hidden'
      }
      return (
         <div className='app-device' style={{'overflow':hide}}>
            <ApplianceHead
               section = {{
                  'l':{
                     'id':'01',
                     'icon':'icon-back',
                     'keyText':'dialogCart',  // 默认
                     'action':'icon-back',   // 选中 如点击后的classname
                     'event':()=>{
                        //console.log(window.location)
                        window.history.go(-1)  
                     }     // event事件 父子事件传递 等同于 funs = {e=>this.funs(e)} 的funs
                  },
                  'r':[
                     {
                        'id':'021',
                        'icon':'icon-gouwuche',
                        'keyText':'dialogCart',
                        'action':'icon-close',
                        'event':(e) => this.onOpenMenu('dialogCart')
                     },
                     {
                        'id':'022',
                        'icon':'icon-settings-filter',
                        'keyText':'dialogFilter',
                        'action':'icon-settings-filter icon-white',
                        'event':(e) => this.onOpenMenu('dialogFilter')
                     }
                  ]
               }}
               keyText = {this.state.ApplianceHeadKey}
               title={pageTitle}
            > </ApplianceHead>
            <HeadSelect 
               options={{
                  'text'          : selectTitle ,
                  'defaultIcon'   : 'icon-arrow-right',
                  'actionIcon'    : 'icon-xiangxiajiantou',
                  'bgColor'       : '#67b0d6',
                  'fontColor'     : '#fff' ,
                  'listBgColor' : '#67b0d6' ,
                  select
               }}
               getHeadSelectItem = {e=> this.getSelectItem(e)}
            ></HeadSelect>
            <PageSearch></PageSearch>

            <AdviceView
               CategoriesIndex = {this.state.CategoriesIndex} 
               SmallClassIndex = {this.state.SmallClassIndex}
            ></AdviceView>  

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
               dialogFilter 
               ?(
                  <DialogFilter
                     filters = {[
                        {
                           'title':'Barand',
                           'text':'品牌',
                           'icon':'icon-pinpaibiaozhibarand',
                           'an':true,
                           'choose':[],
                           'children':[
                              {'t':'杰克琼斯','c':false},
                              {'t':'李维斯','c':false},
                              {'t':'优衣库','c':false},
                              {'t':'ZARA','c':false},
                              {'t':'ONLY','c':false},
                              {'t':'Lee','c':false}
                           ]
                        },
                        {
                           'title':'Colour',
                           'text':'颜色',
                           'icon':'icon-ic_color_lens',
                           'an':false,
                           'choose':[],
                           'children':[
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
                           ]
                        },
                        {
                           'title':'Price',
                           'text' :'价格',
                           'icon': 'icon-price',
                           'an':true,
                           'choose':[],
                           'children' : [
                              {'t':'0-49','c':false,'s':'10%'},
                              {'t':'49-99','c':false,'s':'50%'},
                              {'t':'99-199','c':false,'s':'30%'},
                              {'t':'199+','c':false,'s':'9%'}
                           ]
                        },
                        {
                           'title':'Size',
                           'text' : '尺寸',
                           'icon' :'icon-hangeryijia',
                           'an':false,
                           'choose':[],
                           'children' : [
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
                        },
                        {
                           'title':'Occasion',
                           'text':'场合' ,
                           'icon':'icon-changjing',
                           'an':false,
                           'choose':[],
                           'children' : [
                              {'t':'工作','c':false},
                              {'t':'家居休闲','c':false},
                              {'t':'运动','c':false},
                              {'t':'舞会','c':false},
                              {'t':'出行','c':false},
                              {'t':'时尚休闲','c':false}
                           ]
                        },
                        {
                           'title':'Hot',
                           'text' :'选购热点',
                           'icon' : 'icon-hot' ,
                           'an':false,
                           'choose':[],
                           'children' : [
                              {'t':'潮流','c':false},
                              {'t':'牛仔','c':false},
                              {'t':'加绒','c':false},
                              {'t':'修身','c':false},
                              {'t':'韩版','c':false},
                              {'t':'英伦','c':false},
                              {'t':'保暖','c':false}
                           ]
                        },      
                        {
                           'title':'Season',
                           'text' :'季节',
                           'icon' : 'icon-tianqishili',
                           'an':false,
                           'choose':[],
                           'children' : [
                              {'t':'春季','c':false},
                              {'t':'夏季','c':false},
                              {'t':'秋季','c':false},
                              {'t':'冬季','c':false},
                              {'t':'四季','c':false}
                           ]
                        }
                     ]}
                     onChangeDialogBoolean={e=> this.onChangeDialogBoolean(e)}
                  ></DialogFilter>
               )
               : null
            }
            
            {/* this.props.match.params.name */}
         </div>
      )
   }
}

const Advice = (
   <div className='advice' id='advice'>
      <Router>
         <Switch>
            <Route path='/advice' exact component={AdviceHome}></Route>
            <Route path='/advice/:name' component={AdviceFilter}></Route>
            <Route path='/product/:id' component={Product} > </Route>
            <Route path='/order' component={Order} ></Route>
            {/* <Redirect to='/advice' /> */}
         </Switch>
      </Router>
   </div>
)
export default Advice ;
