import React , { Component } from 'react' ;
import './index.scss';
import PriceSelector from './price/index';
class DialogFilter extends Component {
   constructor (props) {
      super (props);
      this.state = {

      }
   }
   componentWillMount (){
      let filters = this.props.filters ;
      this.setState({
         filters
      })
   }
   onCloseMyself (key) {
      this.props.onChangeDialogBoolean(key)
   }
   onNotCloseMyself (e) {
      e.stopPropagation()
   }
   // 单元项的显示隐藏 字段 'an'
   onChangeAnState (index) {
      let filters = this.state.filters, 
          newAn = !filters[index].an ;
          filters[index].an = newAn;   
      this.setState({
         filters
      })
   }
   // 添加filter(筛选)条件 字段'choose'
   onAddChoose (obj,index,i) {
      let filters = this.state.filters,
          choose = filters[index].choose;
      filters[index].children[i].c = !filters[index].children[i].c ;
      if(filters[index].children[i].c) {
         choose.push(obj)
      }else {
        choose.splice(choose.findIndex((item) =>item===obj) ,1)
      }
      console.log(35,choose)
      filters[index].choose = choose
      this.setState({
         filters
      })
   }
   //重置choose选项    
   onResetChoose () {
      let choose = [] ,
          boolean = false ,
          filters = this.state.filters;
      filters.map((item,index) => {
         item.choose = choose;
         item.children.map((el,i)=>{
            el.c = boolean
         })
      })    
      console.log(52,filters)
      this.setState({
         filters
      })
   }
   // 价格选择器回调
   getBackPriceRange (obj) {
      console.log(60,obj);
      this.setState({
         'priceRange' : obj
      })
   }
   // 提交choose选项   
   onSubmitChoose () {

   }
   render () {
      let {
         filters
      } = this.state;
      return (
         <div className='dialog-filter-background' onClick={e => this.onCloseMyself('dialogFilter') }>
            <div className='dialog-filter'  onClick={e=>this.onNotCloseMyself(e)}>
               <div className='dialog-filter-head'>
                  <strong>Filters </strong> <i className='iconfont icon-settings-filter'></i>
               </div>
               <div className='dialog-filter-body'>
                  <div className='dialog-filter-list'>
                     {
                        filters.map((item,index) =>(
                           <div className='dialog-filter-item' key={index}>
                              <div className={item.an ? 'dialog-filter-title' : 'dialog-filter-title dialog-filter-close'}>
                                 <strong>{item.text}</strong>
                                 <i className={'iconfont ' + item.icon}></i>
                                 <i 
                                    className={
                                       item.an 
                                       ? 'iconfont icon-iconfonticontrianglecopy' 
                                       :'iconfont icon-xiangxiajiantou'
                                    }
                                    onClick={e=>this.onChangeAnState(index)}
                                 ></i>
                              </div>
                              <div 
                                 className={
                                    item.an 
                                    ? 'dialog-filter-main row dialog-filter-'+item.title 
                                    : 'dialog-filter-main row dialog-filter-close dialog-filter-'+item.title 
                                    }
                              >  
                                 {
                                   item.title==='Price'
                                   ? (<PriceSelector options={{'min':10,'max':500}} onChangePrice = {e => this.getBackPriceRange(e)} ></PriceSelector>)
                                   : null 
                                 }
                                 {  item.title!=='Price'   
                                    ?( // 非价格模块
                                       item.title==='Colour' 
                                       ?(  // 颜色模块
                                          item.children.map((link,i)=>(
                                             <div className='col-xs-2' key={index+'-'+i}>
                                                <a 
                                                   className={link.c ? 'btn-block active' :'btn-block'} 
                                                   title={link.t} 
                                                   style={{'background':link.bg}}
                                                   onClick={e=>this.onAddChoose(link,index,i)}
                                                ></a>
                                             </div>
                                          ))
                                       )
                                       :( // 非颜色模块
                                          item.children.map((link,i)=>(
                                             <div className='col-xs-4' key={index+'-'+i}>
                                                <a 
                                                   className={link.c ? 'btn-block active' :'btn-block'} 
                                                   onClick={e=>this.onAddChoose(link,index,i)}
                                                >{link.t}</a>
                                             </div>
                                          ))
                                       )
                                    )
                                    : (  // 价格模块
                                       item.children.map((link,i)=>(
                                          <div className='col-xs-4' key={index+'-'+i}>
                                             <a 
                                                className={link.c ? 'btn-block active' :'btn-block'} 
                                                onClick={e=>this.onAddChoose(link,index,i)}
                                             >{link.t}</a>
                                          </div>
                                       ))
                                    )
                                 }
                              </div>
                           </div>
                        ))
                     }
                     <div className='dialog-filter-btns'>
                        <div className='btn-group btn-group-justified'>
                           <div className='btn-group'>
                              <button 
                                 type='button' 
                                 className='btn btn-warning'
                                 onClick={e=>this.onResetChoose()}
                              >重置</button>
                           </div>
                           <div className='btn-group'>
                              <button 
                                 type='button' 
                                 className='btn btn-primary'
                                 onClick={e=>this.onSubmitChoose()}
                              >提交</button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}
function ArrayToAdd (Arr,obj) {
   if(Arr.length < 1 ) {
      Arr.push(obj)
   }else {
      let boolean = false 
      for(let i = 0; i < Arr.length ; i ++ ) {
         boolean = (Arr[i] !== obj)
      }
      if (boolean ) {
         Arr.push(obj)
      }
   }
   return Arr
}
export default DialogFilter ;