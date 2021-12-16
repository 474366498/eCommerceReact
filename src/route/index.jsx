import React , { Component } from 'react';
import {
   BrowserRouter as Router ,
   Switch ,
   Route,
   Redirect
} from 'react-router-dom';
//   import createHistory from 'history/createHashHistory'
import Home from 'page/home/index';
import Advice from 'page/advice/index';
import Product from 'page/product/index';
import Order from 'page/order/index' ;
import Address from 'page/address/index' ;
//   const history = createHistory();

class RouterList extends Component{
   render(){
      return (
         <Router >
            <Switch>
               <Route exact path='/' component={Home} />
               <Route path='/advice' render={()=> Advice } />
               <Route path='/product/:id' component={Product} />
               <Route path='/order' component={Order} />
               <Route path='/address' component={Address} />
            </Switch>
         </Router>
      )
   }
}
export default RouterList;
