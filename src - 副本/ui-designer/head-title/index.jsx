// title 应用于跳转路径 更换组件时更新网页头部标题
import React , { Component } from 'react';

class HeadTitle extends Component {
   componentDidMount(){
      document.title=this.props.title
      console.log(window.location)
   }
   render(){
      return (
         <p style={this.props.styles}>{this.props.title}</p>
      )
   }
}
export default HeadTitle;