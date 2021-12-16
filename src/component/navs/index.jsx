import React , { Component } from 'react' ;
import { BrowserRouter as Router , NavLink } from 'react-router-dom' ;
import './index.scss';
// tab式链接  根据路径 path 来设置 链接的内容
class HeaderNavs extends Component {
   constructor(props) {
      super(props) ;
   } 
   componentDidMount () {
      this.props.onChangeNavIndex(this.props.navIndex) ;
   }
   onChangeIndex (e,index){
      this.props.onChangeNavIndex(index)
   }
   render () {
      let { 
         navLists ,
         navIndex 
      } = this.props
      return (
         <div 
            className='container  header-navs'  
         >
            <div className='row dialog-tab '>
               {
                  navLists.map((item,index) => (
                     <div 
                        key={index} 
                        className={'col-xs-'+12/navLists.length}   
                     >
                        {
                           !item.filter 
                           ? <NavLink className={ 
                                 navIndex===index
                                 ? 'btn btn-sm btn-block btn-default' 
                                 : 'btn btn-sm btn-block'
                              }
                              to = {'/'+item.href}
                           >{item.text}</NavLink>
                           :<a className={ 
                                 navIndex===index
                                 ? 'btn btn-sm btn-block btn-default' 
                                 : 'btn btn-sm btn-block'
                              }
                              onClick={e=>this.onChangeIndex(e,index)}
                           >{item.text}</a>
                        } 
                     </div>
                  ))
               }    
            </div>
         </div>
      )
   }
}


export default HeaderNavs;