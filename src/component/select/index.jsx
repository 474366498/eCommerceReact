import React , { Component } from 'react' ;
import './index.scss' ;
// 头部返回上一层路径
class HeadSelect extends Component {
   constructor (props) {
      super(props)
      this.state = {
         showBoolean : false
      }
   }
   componentWillMount () {
      console.log(8,this.props.options)
   }
   onChangeShowBoolean () {
      let newBoolean = !this.state.showBoolean ;
      this.setState({
         showBoolean : newBoolean
      })
   }
   onChangeSelectItem (e,item) {
      this.props.getHeadSelectItem(item);
      this.setState({
         showBoolean : false 
      })
   }
   render () {
      let options , {
         text,
         defaultIcon,
         actionIcon,
         bgColor,
         fontColor,
         listBgColor,       
         select
      } = this.props.options ;
      let {showBoolean} = this.state
      return (
         <div className='head-select container' style={{'background':bgColor,'color':fontColor}}>
            <div className='select-head'>
               <div className='col-xs-10'><p>{text}</p></div>
               <div className='col-xs-2'>
                  <a 
                     className={showBoolean ? 'iconfont '+actionIcon : 'iconfont '+defaultIcon} 
                     style={{'color':fontColor}}
                     onClick={e=>this.onChangeShowBoolean(e)}
                  ></a>
               </div>
            </div>
            {
               showBoolean 
               ? (
                  <div className='select-body'>
                     <ul className='select-list row' style={{'background':listBgColor}}>
                        { 
                           select.map(item=>(
                              <li 
                                 className='col-xs-6' 
                                 key={item.id}
                                 onClick={e=>this.onChangeSelectItem(e,item)}
                              >
                                 <a className='btn-primary'>{item.title}</a>
                              </li>
                           )) 
                        }
                     </ul>
                  </div>
               )
            :null
            }
            
         </div>
      )
   }
}
export default HeadSelect;