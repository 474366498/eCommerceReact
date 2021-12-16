import React , { Component } from 'react' ;
import { Link } from 'react-router-dom' ;
import axios from 'axios';
import './index.scss';
import StringFunc from 'func/string/index.js';
const _str = new StringFunc() ;
class DialogMenu extends Component {
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
   }
   componentDidUpdate(){
      this.state.childrenBoolean ? this.onLoadingChildrenList() : null
   }
   // 关闭自身这个dialog
   onCloseMyself (key,obj) {
      if(obj === undefined) {
         obj = {
            index         : 0 ,
            childrenIndex : 0 ,
            key
         }
      }else {
         let {index,childrenIndex} = obj 
         obj = {
            index ,
            childrenIndex ,
            key
         }
      }
      this.props.onChangeDialogBoolean(obj)
   }
   onNotCloseMyself (e) {
      e.stopPropagation();
   }
   // 二级菜单的展开与否
   onChangeChildrenIndex (e,key,eq) {
      e.stopPropagation();
      let oldKey = this.state.categoryId 
      oldKey !== key 
      /* ? this.setState({
         categoryId      : key ,
         categoryIndex   : eq ,
         childrenBoolean : true
      }) */
      ? this.setState({
         children : []
      },()=>{
         this.setState({
            categoryId      : key ,
            categoryIndex   : eq ,
            childrenBoolean : true
         })
      })
      : this.setState({
         categoryId      : null ,
         categoryIndex   : null ,
         childrenBoolean : false
      })
   }
   // 二级菜单选择
   onChoiceChildrenData (el,index,childrenIndex) {
      alert(`您选择的是${el.cate_name}`);
      let obj = {
         index ,
         childrenIndex
      }
      this.onCloseMyself('dialogMenu',obj);
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
      let { 
         category ,
         categoryIndex ,
         children
      } = this.state
      return (
         <div className='row dialog-menu-background' onClick={e => this.onCloseMyself('dialogMenu') }>
            <div className='col-sm-8 col-xs-8 col-md-8 dialog-menu' onClick={e=>this.onNotCloseMyself(e)}>
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
                        {
                           category.map((item,index) => {
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
                                          children.map((childrenItem,childrenIndex) => (
                                             <li 
                                                className='dialog-menu-second-item' 
                                                key={childrenItem.cate_id}
                                                onClick={(e)=>{this.onChoiceChildrenData(childrenItem,index,childrenIndex)}}
                                             >
                                                   <a id={childrenItem.cate_id}>{childrenItem.cate_id}:{childrenItem.cate_name}</a>
                                             </li>
                                          ))
                                       }
                                    </ul>) 
                                       :  ''
                                    } 
                                 </li> 
                              )
                           }) 
                        }
                          
                     </ul>
                  </div>

                  <div className='dialkog-menu-user'>
                     <ul>
                        <li><Link to='/location'><i className='iconfont icon-weizhi-tianchong'></i>LOCATION</Link></li>
                        <li><Link to='/order'><i className='iconfont icon-order'></i>ORDER</Link></li>
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
export default DialogMenu ;