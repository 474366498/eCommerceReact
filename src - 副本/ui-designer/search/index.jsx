import React , { Component } from 'react' ;
import './index.scss';
class SearchChild extends Component {
   render () {
      return (
         <div className='search-element container'>
            <div className="form-group">
               <i className='iconfont icon-search'></i>
               <input type="text" className="form-control" placeholder="Search a item ..." />
            </div>
            {/* 是不是应该单独设置一个路径 /search  加载一个search 模板了？？？？？ */}
         </div>
      )
   } 
}
export default SearchChild;