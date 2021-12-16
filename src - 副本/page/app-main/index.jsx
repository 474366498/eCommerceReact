import React , { Component } from 'react' ;
import { BrowserRouter as Router , Switch , Redirect , Route , Link } from 'react-router-dom';
// 子组件
import Home from 'cope/home/index' ;
import Advice from 'cope/advice/index';
import ErrorPage from 'uide/error/index';
console.log(7,Advice)
class ApplianceMain extends Component {
   render() {
      return (
         <div className='appliance-main'>
            <Router>
               <Switch>
                  <Route exact path='/' render={prpos=>(
                     <Home headingBoolean = {this.props.homeHeadingBoolean} />
                     )} />
                  <Route path='/advice' component = {Advice} />    
                  <Route path="/order/index" component={Home}/>
                  <Redirect exact strict from="/order" to="/order/index"/>
                  <Route component={ErrorPage} />
               </Switch>
            </Router>
         </div>
      )
   }
}
export default ApplianceMain;