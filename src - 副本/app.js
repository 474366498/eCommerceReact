import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import store from './redux/index.js';
import Device from 'page/device/index';
import './style.scss';   // 只做整体 html body 的样式设置
/* const App = (
   <Provider store={store}> 
      <Device /> 
   </Provider>
) */ 
class App extends Component {
   render(){
      return (
         <Provider store={store}> 
            <Device /> 
         </Provider>
      ) 
   }
}
   
ReactDOM.render(<App />,document.getElementById('app'))