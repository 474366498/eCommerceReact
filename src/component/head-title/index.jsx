// title 应用于跳转路径 更换组件时更新网页头部标题
import React , { Component } from 'react';

class HeadTitle extends Component {
   componentDidMount(){
      console.log('head-title',window.location.pathname)
   }
   render(){
      return (
         <p style={{
               'line-height':'3.3rem',
               'max-height':'3.3rem',
               'overflow':'hidden',
               'word-break':'normal',
               'margin':'0'
            }}>
            {this.props.title}
         </p>
      )
   }
}
export default HeadTitle;