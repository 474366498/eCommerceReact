import React , { Component } from 'react' ;
import { Link } from 'react-router-dom' ;
import axios from 'axios';
import './index.scss';
import StringFunc from 'func/string/index.js';
const _str = new StringFunc() ;
// 左侧导航
class DialogSetting extends Component {
   constructor (props){
      super(props);
      this.state = {
         categoryIcon : [
            'icon-xizhuang',
            'icon-xiezi',
            'icon-huazhuangpin',
            'icon-yundongfu',
            'icon-shuma',
            'icon-muyingwanju',
            'icon-icon-test',
            'icon-jiajujiafang',
            'icon-tubiaozhizuomobanyihuifu-',
            'icon-guojiwuliu',
            'icon-yaopin'
         ],
         categoryIndex:null,
         categoryId : null ,
         category : [/* 
            第一级导航 数据来源于唯品会
            /ajax/getSellingCategory.php?callback=getTopCategory&tree_id=117
         */],
         children : [/* 
            第二级导航
         */],
         childrenBoolean : false  
      }
   }
   componentDidMount () {
      //          /ajax/getTreeList.php?callback=getSubCategory 30074 & cid=30074 &tree_id=117&_=1543973187819
      axios.post('/ajax/getSellingCategory.php?callback=getTopCategory&tree_id=117')
      .then(res=>{
         let category = _str.toJson(res.data).category,
             categoryIcon   = this.state.categoryIcon ;
         category.map((item,index)=>{
            item['iconName'] = categoryIcon[index] 
         }) 
         this.setState({
            category
         })
      })
      .catch(error=>{
         console.error('22',error);// 异常处理
      })

      /* 
      $.ajax({
         url:'/ajax/getSellingCategory.php',
         type:'GET',
         dataType:'json',
         data:{tree_id:117},
         jsonpCallback:"getTopCategory",
         success:function(res){
            console.log('31',res.data);
         },
         error:function(error){
            console.log('34',error)
         }
      })  
      */
   }
   componentDidUpdate(){
      this.state.childrenBoolean ? this.onLoadingChildrenList() : null
   }
   // 关闭自身这个dialog
   onCloseMyself (key) {
      this.props.onChangeDialogBoolean(key)
   }
   // 二级菜单的展开与否
   onChangeChildrenIndex (e,key,eq) {
      e.stopPropagation();
      let oldKey = this.state.categoryId 
      oldKey !== key 
      ? this.setState({
         categoryId      : key ,
         categoryIndex   : eq ,
         childrenBoolean : true
      })
      : this.setState({
         categoryId      : null ,
         categoryIndex   : null ,
         childrenBoolean : false
      })
   }
   // 加载二级菜单
   onLoadingChildrenList () {
      let  categoryId = this.state.categoryId,
           path = `/ajax/getTreeList.php?callback=getSubCategory${categoryId}&cid=${categoryId}&tree_id=117`
      axios.get(path)
         .then(res=>{
            let key = this.state.categoryId,
                children = _str.toJson(res.data)[key][0]['children'];
            this.setState({
               children ,
               childrenBoolean : false 
            })
         })
         .catch(err=>{
            console.log(err)
         })     
   }
   render () {
      const {  category ,
               categoryIndex ,
               children 
            } = this.state
      return (
         <div className='row dialog-menu-background'  onClick={e=> this.onCloseMyself('dialogSetting')}>
            <div className='col-sm-8 col-xs-8 col-md-8 dialog-menu'>
               <div className='dialog-menu-head'>
                  <h4>You looking for ?</h4>
                  <div className='container'>
                     <div className='row'>
                        <div className='col-xs-6'>
                           <button className='btn btn-block'>
                              MAN
                           </button>
                        </div>
                        <div className='col-xs-6'>
                           <button className='btn btn-block'>
                              WOMAN
                           </button>
                        </div>
                     </div>
                  </div>
               </div> 

               <div className='dialog-menu-main'>
                  <div className='dialog-menu-list'> 
                     <ul className='dialog-menu-first'>
                        {category.map((item,index) => {
                           return (
                              <li 
                                 key={item.cate_id}
                                 className={
                                    categoryIndex === index
                                    ? 'dialog-menu-first-item dialog-menu-first-active' 
                                    : 'dialog-menu-first-item'
                                 }
                                 onClick={e=> this.onChangeChildrenIndex(e,item.cate_id,index)}
                              >
                                 <a>
                                    <i className={categoryIndex === index ? 'active iconfont '+ item.iconName :'iconfont '+ item.iconName} ></i> 
                                    {item.cate_name} 
                                    <span className={categoryIndex === index ? 'active iconfont icon-xiangxiajiantou':'iconfont icon-xiangxiajiantou'}></span>
                                 </a> 
                                 {
                                    categoryIndex === index 
                                    ? (<ul className='dialog-menu-second open'>
                                    {
                                       children.map((childrenItem,index) => (
                                          <li className='dialog-menu-second-item' key={childrenItem.cate_id}><a>{childrenItem.cate_name}</a></li>
                                       ))
                                    }
                                 </ul>) 
                                    :  ''
                                 } 
                              </li> 
                           )
                        })}
                          
                     </ul>
                  </div>

                  <div className='dialkog-menu-user'>
                     <ul>
                        <li><a><i className='iconfont icon-LC_icon_user_fill_3'></i>ACCOUNT</a></li>
                        <li><a><i className='iconfont icon-settings'></i>SETTINGS</a></li>   
                     </ul>  
                  </div>         
               </div>

            </div>
         </div>
      )
   }
}
 
export default DialogSetting ;

/*  

 找点图标   ？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
<ul class="dialog-menu-first">

 女装/男装/内衣 
 女鞋/男鞋/箱包 
 护肤彩妆/个护  icon-huazhuangpin
 运动户外   icon-yundongfu
 家电数码   icon-shuma
 母婴童装   icon-muyingwanju
 手表配饰   icon-icon-test
 居家用品  icon-jiajujiafang
 唯品生活  icon-tubiaozhizuomobanyihuifu-
 唯品国际/唯品奢  icon-guojiwuliu
 唯品医药  icon-yaopin

</ul> */
