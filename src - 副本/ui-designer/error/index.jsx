import React , { Component } from 'react' ;
import { Link } from 'react-router-dom' ;

class ErrorPage extends Component {
   constructor (props) {
      super(props);
   }
   render () {
      return (
         <div className='errorPage'>
            <p>出错了!!!</p>
            <Link to='/'>返回首页</Link>
         </div>    
      )
   }
}
export default ErrorPage;