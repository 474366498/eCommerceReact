import React , { Component } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './redux/index';
import DeviceStatus from './device-status' ;
import RouterList from './route/index.jsx'
import './style.scss';   // 只做整体 html body 的样式设置


class App extends Component {
   render(){
      return (
         <Provider store={store}>
            <div id='app'>
               <DeviceStatus></DeviceStatus>
               <RouterList>Provider</RouterList>
            </div>
         </Provider>
      ) 
   }
}

   
ReactDOM.render(<App />,document.getElementById('app'))